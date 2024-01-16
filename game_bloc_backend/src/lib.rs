
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
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap_or_default();

        tournament.clone().squad.expect("No squad").push(get_squad(squad_id));
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
fn join_squad(member: Member, principal:Principal, id: String) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        match squad.status {
            SquadType::Open => { squad.members.push(member);
                squad_store.borrow_mut().insert(id, squad.clone());
                PROFILE_STORE.with(|profile_store| {
                    let mut user = profile_store.borrow().get(&principal.to_text()).cloned().unwrap();
                    user.squad_badge = squad.id_hash.clone();
                    profile_store.borrow_mut().insert(principal.to_text(), user);
                }) },
            SquadType::Closed => println!("You can't join a closed squad"),
        }
    });
}

#[update]
fn leave_or_remove_squad_member(principal: Principal, id: String) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap_or_default();
        match squad.status {
            SquadType::Open => {
                if let Some(pos) = squad.members.iter().position(|x| *x == principal.to_text()) {
                    vec.remove(pos);
                }
                squad_store.borrow_mut().insert(id, squad.clone());
                PROFILE_STORE.with(|profile_store| {
                    let mut user = profile_store.borrow().get(&principal.to_text()).cloned().unwrap_or_default();
                    user.squad_badge = "";
                    profile_store.borrow_mut().insert(principal.to_text(), user);
                }) },
            SquadType::Closed => println!("You can't join a closed squad"),
        }
    });
}


#[init]
fn init() {
    canister_tools::init(&TOURNAMENT_STORE, TOURNAMENT_STORE_UPGRADE_SERIALIZATION_MEMORY_ID);
    canister_tools::init(&ID_STORE, ID_STORE_UPGRADE_SERIALIZATION_MEMORY_ID);
    canister_tools::init(&PROFILE_STORE, PROFILE_STORE_UPGRADE_SERIALIZATION_MEMORY_ID);
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
}


// Enable Candid export
ic_cdk::export_candid!();
