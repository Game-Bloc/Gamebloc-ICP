use candid::{CandidType, Deserialize, Principal};
use serde::Serialize;
use ic_cdk::{post_upgrade, pre_upgrade, query, update, init, storage};
use std::cell::RefCell;
use std::collections::{BTreeMap, BTreeSet};

mod model;

use crate::{model::*};

use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};

type Memory = VirtualMemory<DefaultMemoryImpl>;
type TournamentMemory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    // The memory manager is used for simulating multiple memories. Given a `MemoryId` it can
    // return a memory that can be used by stable structures.
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

     static TOURNAMENT_MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    // Initialize a `StableBTreeMap` with `MemoryId(0)`.
    static MAP: RefCell<StableBTreeMap<String, UserProfile, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );

     // Initialize a `StableBTreeMap` with `MemoryId(0)`.
    static TOURNAMENT_MAP: RefCell<StableBTreeMap<String, TournamentAccount, TournamentMemory>> = RefCell::new(
        StableBTreeMap::init(
            TOURNAMENT_MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );
}

type IdStore = BTreeMap<String, String>;
type ProfileStore = BTreeMap<String, UserProfile>;
type TournamentStore = BTreeMap<String, TournamentAccount>;

thread_local! {
    static PROFILE_STORE: RefCell<ProfileStore> = RefCell::default();
    static TOURNAMENT_STORE: RefCell<TournamentStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
}

#[query(name = "getSelf")]
fn get_self(principal: Principal) -> UserProfile {
    // let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow()
            .get(&principal.to_text())
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
        tournament_store.borrow().get(&id).cloned().unwrap_or_default()
    })
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
fn end_tournament(id: String, names: Vec<String>, principal: Principal) {
    if get_self(principal).is_mod {
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
    } else {
        println!("you're not admin");
    }
}

#[update]
fn join_tournament(name: String, id: String) {
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
                .and_then(|id| profile_store.borrow().get(id).cloned()).unwrap_or_default();
            user.is_mod
        })
    })
}


// Retrieves the value associated with the given key if it exists.
#[ic_cdk_macros::query]
fn get_stable_profile(key: String) -> Option<UserProfile> {
    MAP.with(|p| p.borrow().get(&key))
}

#[ic_cdk_macros::query]
fn get_all_stable_profile() -> Vec<UserProfile> {
    MAP.with(|stable_profile_store| {
        let mut all_stable_profile = Vec::new();
        stable_profile_store.borrow().iter().for_each(|tournament| {
            all_stable_profile.push((tournament.1).clone().try_into().unwrap_or_default())
        });
        all_stable_profile
    })
}

// Inserts an entry into the map and returns the previous value of the key if it exists.
#[ic_cdk_macros::update]
fn insert_stable_profile(key: String, value: UserProfile) -> Option<UserProfile> {
    MAP.with(|p| p.borrow_mut().insert(key, value))
}

// Retrieves the value associated with the given key if it exists.
#[ic_cdk_macros::query]
fn get_stable_tournament(key: String) -> Option<TournamentAccount> {
    TOURNAMENT_MAP.with(|p| p.borrow().get(&key))
}
#[ic_cdk_macros::query]
fn get_all_stable_tournament() -> Vec<TournamentAccount> {
    TOURNAMENT_MAP.with(|stable_tournament_store| {
        let mut all_stable_tournament = Vec::new();
        stable_tournament_store.borrow().iter().for_each(|tournament| {
            all_stable_tournament.push((tournament.1).clone().try_into().unwrap_or_default())
        });
        all_stable_tournament
    })
}

// Inserts an entry into the map and returns the previous value of the key if it exists.
#[ic_cdk_macros::update]
fn insert_stable_tournament(key: String, value: TournamentAccount) -> Option<TournamentAccount> {
    TOURNAMENT_MAP.with(|p| p.borrow_mut().insert(key, value))
}

#[pre_upgrade]
fn pre_upgrade() {
    PROFILE_STORE.with(|users| storage::stable_save((users, )).unwrap());
    PROFILE_STORE.with(|users| users.borrow().iter().for_each(|user| {
        insert_stable_profile(user.1.clone().principal_id, user.1.clone());
    }));
    TOURNAMENT_STORE.with(|tournaments| storage::stable_save((tournaments, )).unwrap());
    TOURNAMENT_STORE.with(|tournaments| tournaments.borrow().iter().for_each(|tournament| {
        insert_stable_tournament(tournament.1.clone().id_hash, tournament.1.clone());
    }));
}

#[post_upgrade]
fn post_upgrade() {
    let old_profiles = get_all_stable_profile();
    let old_tournament = get_all_stable_tournament();
    // let (old_users, ): (ProfileStore, ) = storage::stable_restore().unwrap();
    // PROFILE_STORE.with(|users| *users.borrow_mut() = old_users);
    PROFILE_STORE.with(|profile_store| {
        old_profiles.iter().for_each(
            |profile|{
                profile_store.borrow_mut().insert(profile.clone().principal_id, profile.clone());
            }
        );
    });
    // let (old_tournaments, ): (TournamentStore, ) = storage::stable_restore().expect("");
    // TOURNAMENT_STORE.with(|tournaments| *tournaments.borrow_mut() = old_tournaments);
    TOURNAMENT_STORE.with(|tournament_store| {
        old_tournament.iter().for_each(
            |tournament|{
                tournament_store.borrow_mut().insert(tournament.clone().id_hash, tournament.clone());
            }
        );
    });
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