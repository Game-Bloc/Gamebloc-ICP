use std::cell::RefCell;
use std::collections::{BTreeMap, BTreeSet};

use candid::{CandidType, decode_one, Deserialize, Principal};
use canister_tools::{
    localkey::refcell::{with, with_mut},
    MemoryId,
    Serializable,
};
use ic_cdk::{init, post_upgrade, pre_upgrade, print, query, storage, update};
use ic_cdk::api::time;
use ic_cdk_macros::*;
use ic_cdk_macros::*;
use ic_websocket_cdk::*;
use ic_websocket_cdk::{
    CanisterWsCloseArguments, CanisterWsCloseResult, CanisterWsGetMessagesArguments,
    CanisterWsGetMessagesResult, CanisterWsMessageArguments, CanisterWsMessageResult,
    CanisterWsOpenArguments, CanisterWsOpenResult, WsHandlers, WsInitParams,
};
use serde::Serialize;

use model::*;
use model::{AppMessage};
use serialization_memory_ids::*;

mod model;

mod serialization_memory_ids;
mod tournament_mutations;
mod lobbies_management;
mod squad_mutations;

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
        profile_store.borrow().get(&principal.to_text()).cloned().unwrap()
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
            id_store.borrow().get(&name).and_then(|id| profile_store.borrow().get(id).cloned()).unwrap()
        })
    })
}

#[update]
fn create_profile(profile: UserProfile, principal: Principal) -> Result<u8, u8> {
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

#[update]
fn send_message_tournament(id: String, message: Chat) {
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

pub fn on_open(args: OnOpenCallbackArgs) {
    let msg = AppMessage {
        text: String::from("ping"),
        timestamp: time(),
    };
    send_app_message(args.client_principal, msg);
}

pub fn on_message(args: OnMessageCallbackArgs) {
    let app_msg: AppMessage = decode_one(&args.message).unwrap();
    let new_msg = AppMessage {
        text: String::from("ping"),
        timestamp: time(),
    };
    print(format!("Received message: {:?}", app_msg));
    send_app_message(args.client_principal, new_msg)
}

fn send_app_message(client_principal: ClientPrincipal, msg: AppMessage) {
    print(format!("Sending message: {:?}", msg));
    if let Err(e) = send(client_principal, msg.candid_serialize()) {
        println!("Could not send message: {}", e);
    }
}

pub fn on_close(args: OnCloseCallbackArgs) {
    print(format!("Client {} disconnected", args.client_principal));
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