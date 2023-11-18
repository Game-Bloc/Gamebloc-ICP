use candid::{CandidType, Deserialize, Principal};

use serde::Serialize;
use ic_cdk::{api::call::ManualReply, query, update};
use std::cell::RefCell;
use std::collections::BTreeMap;

mod model;
use crate::{model::*};

type IdStore = BTreeMap<String, Principal>;
type ProfileStore = BTreeMap<Principal, UserProfile>;
type TournamentStore = BTreeMap<String, TournamentAccount>;

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static TOURNAMENT_STORE: RefCell<TournamentStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
}


#[query(name = "getSelf")]
fn get_self() -> UserProfile {
    let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow()
            .get(&id)
            .cloned().unwrap_or_default()
    })
}

#[query]
fn get_all_user() -> Vec<UserProfile> {
    PROFILE_STORE.with(|profile_store| {
        let mut all_users = Vec::new();
        profile_store.borrow().iter().for_each(|user| {
            all_users.push((*user.1).clone().try_into().unwrap_or_default())
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
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap_or_default()
        })
    })
}

#[update]
fn create_profile(profile: UserProfile) -> Result<u8,u8> {
    let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(profile.username.clone(), principal_id);
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal_id, profile);
    });
    Ok(1)
}


#[query]
fn get_tournament(id: String) -> TournamentAccount {
    TOURNAMENT_STORE.with(|tournament_store| {
        tournament_store.borrow().get(&id).cloned().unwrap_or_default()
    })
}

#[query]
fn whoami() -> Principal {
    ic_cdk::api::caller()
}

#[query]
fn get_all_tournament() -> Vec<TournamentAccount> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_tournament = Vec::new();
        tournament_store.borrow().iter().for_each(|tournament| {
            all_tournament.push((*tournament.1).clone().try_into().unwrap_or_default())
        });
        all_tournament
    })
}

#[update]
fn create_tournament(tournament: TournamentAccount) ->  Result<u8,u8>{
    let id_hash = tournament.clone().id_hash;

    TOURNAMENT_STORE.with(|tournament_store| {
        tournament_store.borrow_mut().insert(id_hash, tournament);
    });
    Ok(1)
}

#[update]
fn start_tournament(id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap_or_default();
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
fn end_tournament(id: String, names:Vec<String>) {
    if get_self().is_mod {
        TOURNAMENT_STORE.with(|tournament_store| {
            let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap_or_default();
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
    }
    else {
        println!("you're not admin");
    }
}

#[update]
fn join_tournament(name: String,id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap_or_default();
        tournament.user.push(name);
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
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap_or_default();
            user.is_mod = true;
            profile_store.borrow_mut().insert(identity, user);
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
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap_or_default();
            user.is_mod
        })
    })
}

// Enable Candid export
ic_cdk::export_candid!();

// "get_self": () -> (UserProfile) query;
// "get_all_user": () -> (vec UserProfile) query;
// "get_profile": (text) -> (UserProfile) query;
// "set_mod": (text,principal) -> ();
//
// "create_profile": (UserProfile) -> ();
// "create_tournament": (TournamentAccount) -> ();
// "get_all_tournament": () -> (vec TournamentAccount) query;
// "get_tournament": (text) -> (TournamentAccount) query;
// "get_profile": (text) -> (UserProfile) query;
//
// "get_all_user": () -> (vec UserProfile) query;