use std::cell::RefCell;
use std::collections::{BTreeMap, BTreeSet};

use candid::types::CandidType;
use candid::{decode_one, Deserialize, Principal};
use canister_tools::{
    localkey::refcell::{with, with_mut},
    MemoryId,
    Serializable,
};
use ic_cdk::{init, post_upgrade, pre_upgrade, print, query, storage, update};
use ic_cdk::api::time;
use ic_cdk_macros::*;
use ic_cdk_macros::*;
use serde::Serialize;

use model::*;
use model::{AppMessage};
use serialization_memory_ids::*;

mod model;

mod serialization_memory_ids;
mod tournament_mutations;

mod squad_mutations;
mod tournament_lobbies_management;
mod candid_types_impl;


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
pub fn get_self(principal: Principal) -> UserProfile {
    // let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow().get(&principal.to_text()).cloned().unwrap()
    })
}

#[query]
pub fn get_all_user() -> Vec<UserProfile> {
    PROFILE_STORE.with(|profile_store| {
        let mut all_users = Vec::new();
        profile_store.borrow().iter().for_each(|user| {
            all_users.push((*user.1).clone().try_into().unwrap())
        });
        all_users
    })
}

#[query]
pub fn count_all_users() -> u128 {
    PROFILE_STORE.with(|profile_store| {
        let mut users_vec: Vec<UserProfile> = Vec::new();
        profile_store.borrow().iter().for_each(|user| {
            users_vec.push((*user.1).clone().try_into().unwrap())
        });
        users_vec.len()
    }) as u128
}

#[query]
pub fn get_profile(name: String) -> UserProfile {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            id_store.borrow().get(&name).and_then(|id| profile_store.borrow().get(id).cloned()).unwrap()
        })
    })
}

#[update]
pub fn create_profile(profile: UserProfile, principal: Principal) -> Result<u8, u8> {
    // let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store.borrow_mut().insert(profile.username.clone(), principal.to_text());
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal.to_text(), profile);
    });
    Ok(1)
}

//setting mods and managing admins
#[update]
pub fn set_mod(identity: Principal) {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store.borrow().get(&identity.to_text()).cloned().unwrap();
        profile.role = match profile.role {
            None => {
               Some(Role::Mod)
            }
            Some(role) => {
                match role {
                    Role::Player => Some(Role::Mod),
                    _ => {
                        Some(Role::Mod)
                    }
                }
            }
        };
        profile_store.borrow_mut().insert(identity.to_text(), profile);
    });
}

#[query]
pub fn is_mod(identity: Principal) -> bool {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store.borrow().get(&identity.to_text()).cloned().unwrap();
        match profile.role.unwrap() {
            Role::Player => return false,
            Role::Mod => return true
        }
    })
}

#[update]
pub fn send_message_tournament(id: String, message: Chat) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        if tournament.messages.is_none() && !tournament.messages.clone().is_some() {
            let mut chats: Vec<Chat> = Vec::new();
            chats.push(message.clone());
            tournament.messages = Some(chats);
        } else {
            let mut chats: Vec<Chat> = tournament.messages.clone().unwrap();
            chats.push(message);
            tournament.messages = Some(chats);
        }

        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn leave_or_remove_squad_member(principal: Principal, id: String) {
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