use candid::{CandidType, Deserialize, Principal};
use serde::Serialize;
use ic_cdk::{post_upgrade, pre_upgrade, query, update, init, storage};
use std::cell::RefCell;
use std::collections::{BTreeMap, BTreeSet};
use ic_cdk_macros::*;

use ic_websocket_cdk::*;

mod model;

use model::*;

mod serialization_memory_ids;

use serialization_memory_ids::*;


use canister_tools::{
    MemoryId,
    localkey::refcell::{with, with_mut},
    Serializable,
};

type IdStore = BTreeMap<String, String>;
type ProfileStore = BTreeMap<String, UserProfile>;
type TournamentStore = BTreeMap<String, TournamentAccount>;
type SquadStore = BTreeMap<String, Squad>;


// method called by the WS Gateway after receiving FirstMessage from the client
#[update]
fn ws_open(args: CanisterWsOpenArguments) -> CanisterWsOpenResult {
    ic_websocket_cdk::ws_open(args)
}

// method called by the Ws Gateway when closing the IcWebSocket connection
#[update]
fn ws_close(args: CanisterWsCloseArguments) -> CanisterWsCloseResult {
    ic_websocket_cdk::ws_close(args)
}

// method called by the WS Gateway to send a message of type GatewayMessage to the canister
#[update]
fn ws_message(
    args: CanisterWsMessageArguments,
    msg_type: Option<AppMessage>,
) -> CanisterWsMessageResult {
    ic_websocket_cdk::ws_message(args, msg_type)
}

// method called by the WS Gateway to get messages for all the clients it serves
#[query]
fn ws_get_messages(args: CanisterWsGetMessagesArguments) -> CanisterWsGetMessagesResult {
    ic_websocket_cdk::ws_get_messages(args)
}

//// Debug/tests methods
// send a message to the client, usually called by the canister itself
#[update]
fn send(client_principal: ClientPrincipal, messages: Vec<Vec<u8>>) -> CanisterSendResult {
    for msg_bytes in messages {
        match ic_websocket_cdk::send(client_principal, msg_bytes) {
            Ok(_) => {},
            Err(e) => return Err(e),
        }
    }
    Ok(())
}

// close the connection with a client, usually called by the canister itself
#[update]
fn close(client_principal: ClientPrincipal) -> CanisterCloseResult {
    ic_websocket_cdk::close(client_principal)
}

// wipes the internal state
#[update]
fn wipe(max_number_of_returned_messages: usize, send_ack_interval_ms: u64) {
    ic_websocket_cdk::wipe();

    // init(max_number_of_returned_messages, send_ack_interval_ms);
}



thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static TOURNAMENT_STORE: RefCell<TournamentStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
    static SQUAD_STORE: RefCell<SquadStore> = RefCell::default();
}

#[query(name = "getSelf")]
fn get_self(principal: Principal) -> UserProfile {
    // let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow()
            .get(&principal.to_text())
            .cloned().unwrap()
    })
}

#[query]
fn get_all_user() -> Vec<UserProfile> {
    PROFILE_STORE.with(|profile_store| {
        let mut all_users = Vec::new();
        profile_store.borrow().iter().for_each(|user| {
            all_users.push((*user.1).clone().try_into().unwrap())
        });
        all_users
    })
}
#[query]
fn count_all_users() -> u128 {
    PROFILE_STORE.with(|profile_store| {
        let mut users_vec: Vec<UserProfile> = Vec::new();
        profile_store.borrow().iter().for_each(|user| {
            users_vec.push((*user.1).clone().try_into().unwrap())
        });
        users_vec.len()
    }) as u128
}

#[query]
fn get_profile(name: String) -> UserProfile {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            id_store
                .borrow()
                .get(&name)
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap()
        })
    })
}

#[update]
fn create_profile(profile: UserProfile, principal: Principal) -> Result<u8, u8> {
    // let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(profile.username.clone(), principal.to_text());
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal.to_text(), profile);
    });
    Ok(1)
}

#[query]
fn get_tournament(id: String) -> TournamentAccount {
    TOURNAMENT_STORE.with(|tournament_store| {
        tournament_store.borrow().get(&id).cloned().unwrap()
    })
}

#[query]
fn get_all_tournament() -> Vec<TournamentAccount> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_tournament = Vec::new();
        tournament_store.borrow().iter().for_each(|tournament| {
            all_tournament.push((*tournament.1).clone().try_into().unwrap())
        });
        all_tournament
    })
}

#[query]
fn count_all_tournament() -> u128 {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_tournament: Vec<TournamentAccount> = Vec::new();
        tournament_store.borrow().iter().for_each(|tournament| {
            all_tournament.push((*tournament.1).clone().try_into().unwrap())
        });
        all_tournament.len()
    })  as u128
}

#[update]
fn create_tournament(tournament: TournamentAccount) -> Result<u8, u8> {
    let id_hash = tournament.clone().id_hash;

    TOURNAMENT_STORE.with(|tournament_store| {
        tournament_store.borrow_mut().insert(id_hash, tournament);
    });
    Ok(1)
}

#[update]
fn start_tournament(id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
fn end_tournament(id: String, names: Vec<String>, principal: Principal) {
    if get_self(principal).is_mod {
        TOURNAMENT_STORE.with(|tournament_store| {
            let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
            tournament.status = match tournament.status {
                TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
                _ => {
                    TournamentStatus::GameCompleted
                }
            };

            names.iter().for_each(|name| {
                tournament.winers.push(name.try_into().unwrap());
            });
            tournament_store.borrow_mut().insert(id, tournament);
        });
    } else {
        println!("you're not admin");
    }
}
#[update]
fn archive_tournament(id: String, names: Vec<String>, principal: Principal) {
        TOURNAMENT_STORE.with(|tournament_store| {
            let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
            tournament.status = match tournament.status {
                TournamentStatus::AcceptingPlayers => TournamentStatus::Archived,
                _ => {
                    TournamentStatus::Archived
                }
            };
        });
}

#[update]
fn join_tournament(name: String, id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.user.push(name);
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
fn join_tournament_with_squad(squad_id: String, id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        SQUAD_STORE.with(|squad_store| {
            let squad = squad_store.borrow().get(&squad_id).cloned().unwrap();
            tournament.squad.push(squad);
        });
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
fn set_mod(name: String, identity: Principal) {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            let mut user = id_store
                .borrow()
                .get(&name)
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap();
            user.is_mod = true;
            profile_store.borrow_mut().insert(identity.to_text(), user);
        })
    });
}

#[query]
fn is_mod(name: String) -> bool {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            let mut user = id_store
                .borrow()
                .get(&name)
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap();
            user.is_mod
        })
    })
}

#[query]
fn get_squad(id: String) -> Squad {
    SQUAD_STORE.with(|squad_store| {
        squad_store.borrow().get(&id).cloned().unwrap()
    })
}

#[query]
fn get_all_squad() -> Vec<Squad> {
    SQUAD_STORE.with(|squad_store| {
        let mut all_squads = Vec::new();
        squad_store.borrow().iter().for_each(|squad| {
            all_squads.push((*squad.1).clone().try_into().unwrap())
        });
        all_squads
    })
}

#[query]
fn count_all_squad() -> u128 {
    SQUAD_STORE.with(|squad_store| {
        let mut all_squads : Vec<Squad>  = Vec::new();
        squad_store.borrow().iter().for_each(|squad| {
            all_squads.push((*squad.1).clone().try_into().unwrap())
        });
        all_squads.len()
    }) as u128
}

#[update]
fn create_squad(squad: Squad, principal: Principal) -> Result<u8, u8> {
    let id_hash = squad.clone().id_hash;

    SQUAD_STORE.with(|squad_store| {
        squad_store.borrow_mut().insert(id_hash, squad.clone());
        PROFILE_STORE.with(|profile_store| {
            let mut user = profile_store.borrow().get(&principal.to_text()).cloned().unwrap();
            user.squad_badge = squad.id_hash.clone();
            profile_store.borrow_mut().insert(principal.to_text(), user);
        })
    });
    Ok(1)
}

#[update]
fn add_to_squad(member: Member, principal: Principal, id: String) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        if squad.captain == principal.to_text() {
            squad.members.push(member);
            squad_store.borrow_mut().insert(id, squad.clone());
            PROFILE_STORE.with(|profile_store| {
                let mut user = profile_store.borrow().get(&principal.to_text()).cloned().unwrap();
                user.squad_badge = squad.id_hash.clone();
                profile_store.borrow_mut().insert(principal.to_text(), user);
            });
        } else {
            println!("you're not admin");
        }
    });
}

#[update]
fn close_squad(id: String, names: Vec<String>, principal: Principal) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        if squad.captain == principal.to_text() {
            squad.status = match squad.status {
                SquadType::Open => SquadType::Closed,
                _ => {
                    SquadType::Closed
                }
            };
            squad_store.borrow_mut().insert(id, squad);
        } else {
            println!("you're not admin");
        }
    });
}

#[update]
fn open_squad(id: String, names: Vec<String>, principal: Principal) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        if squad.captain == principal.to_text() {
            squad.status = match squad.status {
                SquadType::Closed => SquadType::Open,
                _ => {
                    SquadType::Open
                }
            };
            squad_store.borrow_mut().insert(id, squad);
        } else {
            println!("you're not admin");
        }
    });
}

#[update]
fn join_squad(member: Member, principal: Principal, id: String) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        match squad.status {
            SquadType::Open => {
                squad.members.push(member.clone());
                let mut tournaments:Vec<TournamentAccount> = Vec::new();
                TOURNAMENT_STORE.with(|tournament_store| {
                    tournament_store.borrow().iter().for_each(|tournament| {
                        let mut tournament_joined = tournament.1.clone();
                        tournament.1.squad.iter().for_each(|squad| {
                            if squad.clone().id_hash == id {
                                let position = tournament.1.squad.iter().position(|r| r.id_hash == id).unwrap();
                                tournament_joined.squad[position].members.push(member.clone());
                            }
                        });
                        tournaments.push(tournament_joined);
                    });
                    tournaments.iter().for_each(|tournament| {
                        tournament_store.borrow_mut().insert(tournament.id_hash.clone(), tournament.clone());
                    });
                });
                squad_store.borrow_mut().insert(id, squad.clone());
                PROFILE_STORE.with(|profile_store| {
                    let mut user = profile_store.borrow().get(&principal.to_text()).cloned().unwrap();
                    user.squad_badge = squad.id_hash.clone();
                    profile_store.borrow_mut().insert(principal.to_text(), user);
                })
            }
            SquadType::Closed => println!("You can't join a closed squad"),
        }
    });
}

#[update]
fn update_squad_details(id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        SQUAD_STORE.with(|squad_store| {
            let mut squads:Vec<Squad> = Vec::new();
            squad_store.borrow().iter().for_each(|squad| {
                squads.push((*squad.1).clone().try_into().unwrap())
            });
            tournament.squad = squads;
        });
        tournament_store.borrow_mut().insert(id, tournament);
    });
}


#[update]
fn send_message_tournament(id: String, message:Chat) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        if tournament.messages.is_none() && !tournament.messages.clone().is_some(){
            let mut chats:Vec<Chat> = Vec::new();
            chats.push(message.clone());
            tournament.messages = Some(chats);
        }
        else {
            let mut chats:Vec<Chat> = tournament.messages.clone().unwrap();
            chats.push(message);
            tournament.messages = Some(chats);
        }
         
    tournament_store.borrow_mut().insert(id, tournament);
    });
}





#[update]
fn leave_or_remove_squad_member(principal: Principal, id: String) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap_or_default();
        match squad.status {
            SquadType::Open => {
                if let Some(pos) = squad.members.iter().position(|x| *x.principal_id == principal.to_text()) {
                    squad.members.remove(pos);
                }
                squad_store.borrow_mut().insert(id, squad.clone());
                PROFILE_STORE.with(|profile_store| {
                    let mut user = profile_store.borrow().get(&principal.to_text()).cloned().unwrap_or_default();
                    user.squad_badge = "".to_string();
                    profile_store.borrow_mut().insert(principal.to_text(), user);
                })
            }
            SquadType::Closed => println!("You can't join a closed squad"),
        }
    });
}


#[init]
fn init() {
    canister_tools::init(&TOURNAMENT_STORE, TOURNAMENT_STORE_UPGRADE_SERIALIZATION_MEMORY_ID);
    canister_tools::init(&ID_STORE, ID_STORE_UPGRADE_SERIALIZATION_MEMORY_ID);
    canister_tools::init(&PROFILE_STORE, PROFILE_STORE_UPGRADE_SERIALIZATION_MEMORY_ID);
    canister_tools::init(&SQUAD_STORE, SQUAD_UPGRADE_SERIALIZATION_MEMORY_ID);
    let handlers = WsHandlers {
        on_open: Some(on_open),
        on_message: Some(on_message),
        on_close: Some(on_close),
    };

    // let params = WsInitParams::new(handlers)
    //     .with_max_number_of_returned_messages(max_number_of_returned_messages)
    //     .with_send_ack_interval_ms(send_ack_interval_ms);

    // ic_websocket_cdk::init(params)
}

#[pre_upgrade]
fn pre_upgrade() {
    canister_tools::pre_upgrade();
}

#[post_upgrade]
fn post_upgrade() {
    canister_tools::post_upgrade(&TOURNAMENT_STORE, TOURNAMENT_STORE_UPGRADE_SERIALIZATION_MEMORY_ID, None::<fn(TournamentStore) -> TournamentStore>);
    canister_tools::post_upgrade(&ID_STORE, ID_STORE_UPGRADE_SERIALIZATION_MEMORY_ID, None::<fn(IdStore) -> IdStore>);
    canister_tools::post_upgrade(&PROFILE_STORE, PROFILE_STORE_UPGRADE_SERIALIZATION_MEMORY_ID, None::<fn(ProfileStore) -> ProfileStore>);
    canister_tools::post_upgrade(&SQUAD_STORE, SQUAD_UPGRADE_SERIALIZATION_MEMORY_ID, None::<fn(SquadStore) -> SquadStore>);
}


// Enable Candid export
ic_cdk::export_candid!();
