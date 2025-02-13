use std::cell::RefCell;
use std::collections::{BTreeMap};

use candid::{Principal};
use ic_cdk::{init, post_upgrade, pre_upgrade, query, update};
use serialization_memory_ids::*;

use models::model::*;
use models::news::*;
use fortnite_api::response_types::news::News as NewsResponse;
use wasm_bindgen::prelude::*;


// #[cfg(target_arch = "wasm32")]
use reqwest::Client;

mod serialization_memory_ids;

mod squad_mutations;
mod tournament_lobbies_management;
mod wager_mutations;
mod tournaments;
mod models;

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

#[query(name = "whoami")]
pub fn whoami() -> Principal {
   ic_cdk::api::caller()
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
            .for_each(|user| all_users.push((*user.1).to_owned().try_into().unwrap()));
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
            .for_each(|user| users_vec.push((*user.1).to_owned().try_into().unwrap()));
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
            .for_each(|user| match user.1.referral_id.to_owned() {
                None => {}
                Some(referral_id) => {
                    if referral_id == person_referral_id {
                        users_vec.push((*user.1).to_owned().try_into().unwrap())
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
            .insert(profile.username.to_owned(), principal.to_text());
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
        let profile = profile_store
            .borrow()
            .get(&identity.to_text())
            .cloned()
            .unwrap();
        match profile.role.unwrap() {
            Role::Player => return false,
            Role::Mod => return true,
            Role::TribunalMod(_mod_tag) => {
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
            .for_each(|user| match &user.to_owned().1.role {
                None => {}
                Some(role) => match role {
                    Role::Player => {}
                    Role::Mod => {}
                    Role::TribunalMod(_role_tag) => {
                        all_users.push((user.to_owned().1).to_owned().try_into().unwrap())
                    }
                },
            });
        all_users
    })
}

#[query]
pub async fn get_fortnite_news() -> Vec<News> {
    let http_client = Client::new();

    let result_v2 = fortnite_api::get_news_v2(&http_client, None).await;
    // println!("Result: {:#?}", result);

    let result_br = fortnite_api::get_news_br_v2(&http_client, None).await;
    // println!("Result: {:#?}", result);

    let result_stw = fortnite_api::get_news_stw_v2(&http_client, None).await;
    // println!("Result: {:#?}", result);
    // let result_creative:Result<News> = fortnite_api::get_news_creative_v2(&http_client, None).await;
    // println!("Result: {:#?}", result);

    let stw_news_inner:NewsResponse = result_stw.unwrap();
    let br_news_inner:NewsResponse = result_stw.unwrap();
    let mut stw_news = News::new(&stw_news_inner);
    let mut br_news;
    match stw_news_inner {
        NewsResponse::NewsContent(stw_news) => {

        }
        NewsResponse::NoNews => {}
    }
    let all_news:Vec<News> = vec![stw_news_inner, br_news_inner];
    all_news
}

#[update]
pub fn send_message_tournament(id: String, message: Chat) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        if tournament.messages.is_none() && !tournament.messages.to_owned().is_some() {
            let mut chats: Vec<Chat> = Vec::new();
            chats.push(message.to_owned());
            tournament.messages = Some(chats);
        } else {
            let mut chats: Vec<Chat> = tournament.messages.to_owned().unwrap();
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
                squad_store.borrow_mut().insert(id, squad.to_owned());
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
            let user: UserProfile = (*user.1).to_owned().try_into().unwrap();
            match user.points {
                None => {}
                Some(point) => {
                    let mut point_gathered: u128 = 0;
                    contestant.name = (user.username).parse().unwrap();
                    contestant.losses = user.losses.unwrap();
                    contestant.wins = user.wins;
                    for x in point.iter() {
                        let points: (String, String, Point) = (*x).to_owned().try_into().unwrap();
                        point_gathered = point_gathered + (points.2 as Point).total_points;
                    }
                    contestant.point = point_gathered;
                    leaderboard.push(contestant.to_owned());
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
        x.to_owned().role.is_some_and(|y| match y {
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
