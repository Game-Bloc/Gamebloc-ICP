use std::cell::RefCell;
use std::collections::{BTreeMap, BTreeSet};

use candid::types::CandidType;
use candid::{decode_one, Deserialize, Principal};
use canister_tools::{
    localkey::refcell::{with, with_mut},
    MemoryId, Serializable,
};
use ic_cdk::api::time;
use ic_cdk::{init, post_upgrade, pre_upgrade, print, query, storage, update};
use ic_cdk_macros::*;
use ic_cdk_macros::*;
use serde::Serialize;

use model::AppMessage;
use model::*;
use serialization_memory_ids::*;

mod model;

mod serialization_memory_ids;

mod candid_types_impl;
mod squad_mutations;
mod tournament_lobbies_management;
mod tournaments;

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
pub fn get_self() -> UserProfile {
    let principal = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow()
            .get(&principal.to_text())
            .cloned()
            .unwrap()
    })
}

#[query]
pub fn get_profile_by_principal(principal: Principal) -> UserProfile {
    // let id = ic_cdk::api::caller();
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow()
            .get(&principal.to_text())
            .cloned()
            .unwrap()
    })
}

#[query]
pub fn get_all_user() -> Vec<UserProfile> {
    PROFILE_STORE.with(|profile_store| {
        let mut all_users = Vec::new();
        profile_store
            .borrow()
            .iter()
            .for_each(|user| all_users.push((*user.1).clone().try_into().unwrap()));
        all_users
    })
}

#[query]
pub fn count_all_users() -> u128 {
    PROFILE_STORE.with(|profile_store| {
        let mut users_vec: Vec<UserProfile> = Vec::new();
        profile_store
            .borrow()
            .iter()
            .for_each(|user| users_vec.push((*user.1).clone().try_into().unwrap()));
        users_vec.len()
    }) as u128
}

#[query]
pub fn count_all_referral(person_referral_id: String) -> u128 {
    PROFILE_STORE.with(|profile_store| {
        let mut users_vec: Vec<UserProfile> = Vec::new();
        profile_store
            .borrow()
            .iter()
            .for_each(|user| match user.1.referral_id.clone() {
                None => {}
                Some(referral_id) => {
                    if (referral_id == person_referral_id) {
                        users_vec.push((*user.1).clone().try_into().unwrap())
                    }
                }
            });
        users_vec.len()
    }) as u128
}

#[query]
pub fn get_profile(name: String) -> UserProfile {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            id_store
                .borrow()
                .get(&name)
                .and_then(|id| profile_store.borrow().get(id).cloned())
                .unwrap()
        })
    })
}

#[update]
pub fn create_profile(profile: UserProfile, principal: Principal) -> Result<u8, u8> {
    // let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(profile.username.clone(), principal.to_text());
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store
            .borrow_mut()
            .insert(principal.to_text(), profile);
    });
    Ok(1)
}

//setting mods and managing admins
#[update]
pub fn set_mod(identity: Principal) {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store
            .borrow()
            .get(&identity.to_text())
            .cloned()
            .unwrap();
        profile.role = match profile.role {
            None => Some(Role::Mod),
            Some(role) => match role {
                Role::Player => Some(Role::Mod),
                _ => Some(Role::Mod),
            },
        };
        profile_store
            .borrow_mut()
            .insert(identity.to_text(), profile);
    });
}

#[update]
pub fn add_mod_to_tribunal(identity: Principal) -> bool {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store
            .borrow()
            .get(&identity.to_text())
            .cloned()
            .unwrap();
        if !validate_mod_tag_availability(ModTag::Mod1) {
            profile.role = match profile.role {
                None => Some(Role::TribunalMod(ModTag::Mod1)),
                Some(role) => match role {
                    Role::Player => Some(Role::TribunalMod(ModTag::Mod1)),
                    _ => Some(Role::TribunalMod(ModTag::Mod1)),
                },
            };
        } else if !validate_mod_tag_availability(ModTag::Mod2) {
            profile.role = match profile.role {
                None => Some(Role::TribunalMod(ModTag::Mod2)),
                Some(role) => match role {
                    Role::Player => Some(Role::TribunalMod(ModTag::Mod2)),
                    _ => Some(Role::TribunalMod(ModTag::Mod2)),
                },
            };
        } else if !validate_mod_tag_availability(ModTag::Mod3) {
            profile.role = match profile.role {
                None => Some(Role::TribunalMod(ModTag::Mod3)),
                Some(role) => match role {
                    Role::Player => Some(Role::TribunalMod(ModTag::Mod3)),
                    _ => Some(Role::TribunalMod(ModTag::Mod3)),
                },
            };
        } else {
            println!("tribunal mod slots is full");
            return false;
        }
        profile_store
            .borrow_mut()
            .insert(identity.to_text(), profile);
        return true;
    })
}

#[query]
pub fn is_mod(identity: Principal) -> bool {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store
            .borrow()
            .get(&identity.to_text())
            .cloned()
            .unwrap();
        match profile.role.unwrap() {
            Role::Player => return false,
            Role::Mod => return true,
            Role::TribunalMod(mod_tag) => {
                return true;
            }
        }
    })
}

#[query]
pub fn get_mods() -> Vec<UserProfile> {
    PROFILE_STORE.with(|profile_store| {
        let mut all_users = Vec::new();
        profile_store
            .borrow()
            .iter()
            .for_each(|user| match &user.clone().1.role {
                None => {}
                Some(role) => match role {
                    Role::Player => {}
                    Role::Mod => {}
                    Role::TribunalMod(role_tag) => {
                        all_users.push((user.clone().1).clone().try_into().unwrap())
                    }
                },
            });
        all_users
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
                if let Some(pos) = squad
                    .members
                    .iter()
                    .position(|x| *x.principal_id == principal.to_text())
                {
                    squad.members.remove(pos);
                }
                squad_store.borrow_mut().insert(id, squad.clone());
                PROFILE_STORE.with(|profile_store| {
                    let mut user = profile_store
                        .borrow()
                        .get(&principal.to_text())
                        .cloned()
                        .unwrap_or_default();
                    user.squad_badge = "".to_string();
                    profile_store.borrow_mut().insert(principal.to_text(), user);
                })
            }
            SquadType::Closed => println!("You can't join a closed squad"),
        }
    });
}

#[query]
pub fn get_leaderboard() -> Vec<Contestant> {
    PROFILE_STORE.with(|profile_store| {
        let mut contestant = Contestant {
            ..Default::default()
        };
        let mut leaderboard: Vec<Contestant> = Vec::new();
        profile_store.borrow().iter().for_each(|user| {
            let user: UserProfile = (*user.1).clone().try_into().unwrap();
            match user.points {
                None => {}
                Some(point) => {
                    let mut point_gathered: u128 = 0;
                    contestant.name = (user.username).parse().unwrap();
                    contestant.losses = user.losses.unwrap();
                    contestant.wins = user.wins;
                    for x in point.iter() {
                        let points: (String, String, Point) = (*x).clone().try_into().unwrap();
                        point_gathered = point_gathered + (points.2 as Point).total_points;
                    }
                    contestant.point = point_gathered;
                    leaderboard.push(contestant.clone());
                }
            }
        });
        let mut sorted_leaderboard = leaderboard;
        sorted_leaderboard.sort_by_key(|k| k.point);

        sorted_leaderboard
    })
}

#[update]
pub fn assign_points(identity: Principal, user_id_and_point: (String, String, Point)) {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store
            .borrow()
            .get(&identity.to_text())
            .cloned()
            .unwrap();
        match profile.points {
            None => {
                profile.points = Some(vec![user_id_and_point]);
            }
            Some(points) => {
                let mut updated_points = points;
                updated_points.push(user_id_and_point);
                profile.points = Some(updated_points);
            }
        }
        profile_store
            .borrow_mut()
            .insert(identity.to_text(), profile);
    });
}

pub(crate) fn validate_mod_tag_availability(try_mod_tag: ModTag) -> bool {
    get_mods().iter().any(|x| {
        x.clone().role.is_some_and(|y| match y {
            Role::Player => false,
            Role::Mod => false,
            Role::TribunalMod(mod_tag) => match mod_tag {
                ModTag::Mod1 => match try_mod_tag {
                    ModTag::Mod1 => true,
                    ModTag::Mod2 => false,
                    ModTag::Mod3 => false,
                },
                ModTag::Mod2 => match try_mod_tag {
                    ModTag::Mod1 => false,
                    ModTag::Mod2 => true,
                    ModTag::Mod3 => false,
                },
                ModTag::Mod3 => match try_mod_tag {
                    ModTag::Mod1 => false,
                    ModTag::Mod2 => false,
                    ModTag::Mod3 => true,
                },
            },
        })
    })
}

#[init]
fn init() {
    canister_tools::init(
        &TOURNAMENT_STORE,
        TOURNAMENT_STORE_UPGRADE_SERIALIZATION_MEMORY_ID,
    );
    canister_tools::init(&ID_STORE, ID_STORE_UPGRADE_SERIALIZATION_MEMORY_ID);
    canister_tools::init(
        &PROFILE_STORE,
        PROFILE_STORE_UPGRADE_SERIALIZATION_MEMORY_ID,
    );
    canister_tools::init(&SQUAD_STORE, SQUAD_UPGRADE_SERIALIZATION_MEMORY_ID);
}

#[pre_upgrade]
fn pre_upgrade() {
    canister_tools::pre_upgrade();
}

#[post_upgrade]
fn post_upgrade() {
    canister_tools::post_upgrade(
        &TOURNAMENT_STORE,
        TOURNAMENT_STORE_UPGRADE_SERIALIZATION_MEMORY_ID,
        None::<fn(TournamentStore) -> TournamentStore>,
    );
    canister_tools::post_upgrade(
        &ID_STORE,
        ID_STORE_UPGRADE_SERIALIZATION_MEMORY_ID,
        None::<fn(IdStore) -> IdStore>,
    );
    canister_tools::post_upgrade(
        &PROFILE_STORE,
        PROFILE_STORE_UPGRADE_SERIALIZATION_MEMORY_ID,
        None::<fn(ProfileStore) -> ProfileStore>,
    );
    canister_tools::post_upgrade(
        &SQUAD_STORE,
        SQUAD_UPGRADE_SERIALIZATION_MEMORY_ID,
        None::<fn(SquadStore) -> SquadStore>,
    );
}

// Enable Candid export
ic_cdk::export_candid!();
