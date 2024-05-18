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
use ic_cdk_macros::*;

use model::{on_close, on_message, on_open, AppMessage};
use ic_websocket_cdk::{
    CanisterWsCloseArguments, CanisterWsCloseResult, CanisterWsGetMessagesArguments,
    CanisterWsGetMessagesResult, CanisterWsMessageArguments, CanisterWsMessageResult,
    CanisterWsOpenArguments, CanisterWsOpenResult, WsHandlers, WsInitParams,
};


// method called by the client to open a WS connection to the canister (relayed by the WS Gateway)
#[update]
fn ws_open(args: CanisterWsOpenArguments) -> CanisterWsOpenResult {
    ic_websocket_cdk::ws_open(args)
}

// method called by the Ws Gateway when closing the IcWebSocket connection for a client
#[update]
fn ws_close(args: CanisterWsCloseArguments) -> CanisterWsCloseResult {
    ic_websocket_cdk::ws_close(args)
}

// method called by the client to send a message to the canister (relayed by the WS Gateway)
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

type IdStore = BTreeMap<String, String>;
type ProfileStore = BTreeMap<String, UserProfile>;
type TournamentStore = BTreeMap<String, TournamentAccount>;
type SquadStore = BTreeMap<String, Squad>;


thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static TOURNAMENT_STORE: RefCell<TournamentStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
    static SQUAD_STORE: RefCell<SquadStore> = RefCell::default();
}

//User struct crud functions
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

//Tournament crud
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
fn join_tournament(name: String, id: String, ign: (String,String),) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.user.push(name);
        if tournament.clone().in_game_names == None {
            tournament.in_game_names = Some(vec![ign.clone()]);
        }
        else{
            tournament.to_owned().in_game_names.expect("List of tournament in game names is empty").push(ign);
        }
        tournament_store.borrow_mut().insert(id, tournament);
    });
}
#[update]
fn join_tournament_with_squad(squad_id: String, id: String, ign: Vec<(String,String)>, new_member_ign:Vec<(String, String)>) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        SQUAD_STORE.with(|squad_store| {
            let mut squad = squad_store.borrow().get(&squad_id).cloned().unwrap();
            let count = new_member_ign.len();
            if count > 0 {
                PROFILE_STORE.with(|profile_store| {
                    loop {
                        if count == 0 {
                            break;
                        }
                        let mut user = profile_store.borrow().get(&new_member_ign[count - 1].0).cloned().unwrap();
                        let missing: Member =
                            Member {
                                name: user.clone().username,
                                principal_id: new_member_ign[count - 1].0.to_owned(),
                            };
                        squad.members.push(missing);
                        user.squad_badge = squad.id_hash.clone();
                        profile_store.borrow_mut().insert(new_member_ign[count - 1].0.to_owned(), user);
                    }
                    squad_store.borrow_mut().insert(squad_id, squad.clone());
                });
            }
            tournament.squad.push(squad);
        });
        let mut mutable_new_member_ign = new_member_ign;
        ign.clone().append(&mut mutable_new_member_ign);
        if tournament.clone().squad_in_game_names == None {
            tournament.squad_in_game_names = Some(vec![ign]);
        }
        else{
            tournament.to_owned().squad_in_game_names.expect("List of tournament squad in game names is empty").push(ign);
        }

        tournament_store.borrow_mut().insert(id, tournament);
    });
}


//Lobby (or sub tournament) CRUD
#[query]
fn get_lobby_from_tournament(tournament_id: String, lobby_id: u8) -> LobbyAccount {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.clone().lobbies.unwrap()[lobby_id as usize].clone()
    })
}

#[query]
fn get_all_tournament_lobbies(tournament_id: String) -> Vec<LobbyAccount> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_lobbies: Vec<LobbyAccount> = Vec::new();
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.clone().lobbies.unwrap().iter().for_each(|lobby| {
            all_lobbies.push(lobby.clone())
        });
        all_lobbies
    })
}

#[query]
fn count_tournament_lobbies(tournament_id: String,) -> u128 {
    let mut all_lobbies:Vec<LobbyAccount> = Vec::new();
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_lobbies: Vec<LobbyAccount> = Vec::new();
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.clone().lobbies.unwrap().iter().for_each(|lobby| {
            all_lobbies.push(lobby.clone())
        });
        all_lobbies.len()
    })  as u128
}

#[update]
fn create_new_lobbies_from_winners(tournament_id: String, ) -> Result<u8, u8> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };

        let mut is_even: bool = tournament.clone().lobbies.unwrap().len() % 2 == 0;

        if (is_even) {
            tournament.clone().lobbies.unwrap().iter().for_each(
                |e|{
                    e.no_of_participants as f64 * 0.5;


                }
            );
        }

        // Matching arms for
        // structuring the tournament into lobbies
        match tournament.game_type {
            GameType::Single =>{
                let mut count = tournament.user.len() % 100;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount{
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: Vec::new(),
                            messages: Some(Vec::new()),
                            participants: tournament.user[..=100].to_owned(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: tournament.game_type.clone(),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count == 0 {
                        break;
                    }
                }
            },
            GameType::Duo =>{
                let mut count = tournament.squad.len() % 50;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount{
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=50].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: tournament.game_type.clone(),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count == 0 {
                        break;
                    }
                }
            },
            GameType::Squad =>{
                let mut count = tournament.squad.len() % 25;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount{
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=25].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: tournament.game_type.clone(),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count == 0 {
                        break;
                    }
                }
            },
            GameType::TeamvTeam =>{
                tournament.clone().lobbies.unwrap().push(
                    LobbyAccount{
                        status: TournamentStatus::GameInProgress,
                        lobby_status: LobbyStatus::ReadyToStart,
                        idx: 0,
                        starting_date: None,
                        lobby_rules: tournament.tournament_rules.clone(),
                        tournament_type: tournament.tournament_type.clone(),
                        game: tournament.game.clone(),
                        squads: tournament.squad.clone(),
                        messages: Some(Vec::new()),
                        participants: Vec::new(),
                        winers: Vec::new(),
                        no_of_winners: None,
                        no_of_participants: tournament.no_of_participants.clone(),
                        game_type: tournament.game_type.clone(),
                        name: Some(tournament.title.clone()),
                    })
            },
        }
        tournament_store.borrow_mut().insert(tournament_id, tournament.to_owned());
    });
    Ok(1)
}

#[update]
fn structure_tournament_into_lobbies(tournament_id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };

        // Matching arms for
        // structuring the tournament into lobbies
        match tournament.game_type {
            GameType::Single =>{
                let mut count = tournament.user.len() % 100;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount{
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: Vec::new(),
                            messages: Some(Vec::new()),
                            participants: tournament.user[..=100].to_owned(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: tournament.game_type.clone(),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count == 0 {
                        break;
                    }
                }
            },
            GameType::Duo =>{
                let mut count = tournament.squad.len() % 50;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount{
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=50].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: tournament.game_type.clone(),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count == 0 {
                        break;
                    }
                }
            },
            GameType::Squad =>{
                let mut count = tournament.squad.len() % 25;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount{
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=25].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: tournament.game_type.clone(),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count == 0 {
                        break;
                    }
                }
            },
            GameType::TeamvTeam =>{
                tournament.clone().lobbies.unwrap().push(
                    LobbyAccount{
                        status: TournamentStatus::GameInProgress.clone(),
                        lobby_status: LobbyStatus::ReadyToStart.clone(),
                        idx: 0,
                        starting_date: None,
                        lobby_rules: tournament.tournament_rules.clone(),
                        tournament_type: tournament.tournament_type.clone(),
                        game: tournament.game.clone(),
                        squads: tournament.squad.clone(),
                        messages: Some(Vec::new()),
                        participants: Vec::new(),
                        winers: Vec::new(),
                        no_of_winners: None,
                        no_of_participants: tournament.no_of_participants.clone(),
                        game_type: tournament.game_type.clone(),
                        name: Some(tournament.title.clone()),
                    })
            },
        }
        tournament_store.borrow_mut().insert(tournament_id, tournament.clone());
    });
}

#[update]
fn assign_squad_points_and_end_lobby(tournament_id: String, mut squad_id_and_points: Vec<(String, u128)>, principal: Principal, lobby_id: u8) {
    if get_self(principal).is_mod {
        TOURNAMENT_STORE.with(|tournament_store| {
            let mut all_lobbies: Vec<LobbyAccount> = Vec::new();
            let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
            tournament.clone().lobbies.unwrap()[lobby_id.clone() as usize].lobby_status = match tournament.clone().lobbies.unwrap()[lobby_id as usize].lobby_status {
                LobbyStatus::GameInProgress => LobbyStatus::GameCompleted,
                _ => LobbyStatus::GameCompleted,
            };
             squad_id_and_points.sort_by_key(|k| k.1);
            tournament.squad_points = Some(squad_id_and_points);

            tournament_store.borrow_mut().insert(tournament_id, tournament);
        })
    } else {
        println!("you're not admin");
    }
}
#[update]
fn assign_solo_points_and_end_lobby(tournament_id: String, mut user_id_and_points: Vec<(String, u128)>, principal: Principal, lobby_id: u8) {
    if get_self(principal).is_mod {
        TOURNAMENT_STORE.with(|tournament_store| {
            let mut all_lobbies: Vec<LobbyAccount> = Vec::new();
            let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
            tournament.clone().lobbies.unwrap()[lobby_id.clone() as usize].lobby_status = match tournament.clone().lobbies.unwrap()[lobby_id as usize].lobby_status {
                LobbyStatus::GameInProgress => LobbyStatus::GameCompleted,
                _ => LobbyStatus::GameCompleted,
            };
           user_id_and_points.sort_by_key(|k| k.1);
            tournament.points = Some(user_id_and_points);

            tournament_store.borrow_mut().insert(tournament_id, tournament);
        })
    } else {
        println!("you're not admin");
    }
}

// #[update]
// fn structure_tournament_into_duo_lobbies(name: String, id: String) {
//     TOURNAMENT_STORE.with(|tournament_store| {
//         let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
//         tournament.user.push(name);
//         tournament_store.borrow_mut().insert(id, tournament);
//     });
// }
//
// #[update]
// fn structure_tournament_into_squad_lobbies(squad_id: String, id: String) {
//     TOURNAMENT_STORE.with(|tournament_store| {
//         let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
//         SQUAD_STORE.with(|squad_store| {
//             let squad = squad_store.borrow().get(&squad_id).cloned().unwrap();
//             tournament.squad.push(squad);
//         });
//         tournament_store.borrow_mut().insert(id, tournament);
//     });
// }


//setting mods and managing admins
#[update]
fn set_mod(identity: Principal) {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store.borrow().get(&identity.to_text()).cloned().unwrap();
        profile.role = match profile.role {
            Role::Player => Role::Mod,
            _ => {
                Role::Mod
            }
        };
        profile_store.borrow_mut().insert(identity.to_text(), profile);
    });
}

#[query]
fn is_mod(identity: Principal) -> bool {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store.borrow().get(&identity.to_text()).cloned().unwrap();
        match profile.role {
            Role::Player => return false,
            Role::Mod => return true
        }
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

    let params = WsInitParams::new(handlers);

    ic_websocket_cdk::init(params);
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
    let handlers = WsHandlers {
        on_open: Some(on_open),
        on_message: Some(on_message),
        on_close: Some(on_close),
    };

    let params = WsInitParams::new(handlers);

    ic_websocket_cdk::init(params);
}


// Enable Candid export
ic_cdk::export_candid!();