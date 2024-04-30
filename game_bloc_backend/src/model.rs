use candid::{CandidType, Decode, Deserialize, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{
    storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::{borrow::Cow, cell::RefCell};
use crate::*;
use ic_cdk::print;
use candid::{decode_one, encode_one};
use ic_cdk::{api::time};
use serde::{Serialize};

use ic_websocket_cdk::{
    send, ClientPrincipal, OnCloseCallbackArgs, OnMessageCallbackArgs, OnOpenCallbackArgs,
};

#[derive(CandidType, Clone, Debug, Deserialize, Serialize, Eq, PartialEq)]
pub struct AppMessage {
    pub text: String,
    pub timestamp: u64,
}

impl AppMessage {
    fn candid_serialize(&self) -> Vec<u8> {
        encode_one(&self).unwrap()
    }
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

const MAX_VALUE_SIZE: u32 = 100;
#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub struct UserProfile {
    pub id_hash: String,
    pub age: u8,
    pub date: String,
    pub status: Status,
    pub wins: u8,
    pub tournaments_created:u8,
    pub points: Option<u128>,
    pub username: String,
    pub is_mod: bool,
    pub role: Role,
    pub principal_id: String,
    pub account_id : String,
    pub canister_id: String,
    pub squad_badge: String,
}


// For a type to be used in a `StableBTreeMap`, it needs to implement the `Storable`
// trait, which specifies how the type can be serialized/deserialized.
//
// In this example, we're using candid to serialize/deserialize the struct, but you
// can use anything as long as you're maintaining backward-compatibility. The
// backward-compatibility allows you to change your struct over time (e.g. adding
// new fields).
//
// The `Storable` trait is already implemented for several common types (e.g. u64),
// so you can use those directly without implementing the `Storable` trait for them.
impl Storable for UserProfile {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}

#[derive(Clone,Debug, Default, CandidType, Deserialize, Serialize)]
pub struct TournamentAccount {
    pub id_hash: String,
    pub creator: String,
    pub creator_id: Option<String>,
    pub status: TournamentStatus,
    pub idx: u8,
    pub starting_date: String,
    pub tournament_rules: String,
    pub tournament_type: TournamentType,
    pub game: String,
    pub squad:Vec<Squad>,
    pub squad_points: Option<Vec<(String,u128)>>,
    pub squad_in_game_names:Option<Vec<Vec<(String, String)>>>,
    pub messages: Option<Vec<Chat>>,
    pub user: Vec<String>,
    pub winers: Vec<String>,
    pub entry_prize: u8,
    pub total_prize: u128,
    pub no_of_winners: u8,
    pub no_of_participants: u128,
    pub game_type: GameType,
    pub end_date: String,
    pub title: String,
    pub in_game_names: Option<Vec<(String,String)>>,
    pub points: Option<Vec<(String,u128)>>,
    pub lobbies: Option<Vec<LobbyAccount>>
}

#[derive(Clone,Debug, Default, CandidType, Deserialize, Serialize)]
pub struct LobbyAccount {
    pub status: TournamentStatus,
    pub lobby_status: LobbyStatus,
    pub idx: u8,
    pub starting_date: Option<String>,
    pub lobby_rules: String,
    pub tournament_type: TournamentType,
    pub game: String,
    pub squads:Vec<Squad>,
    pub messages: Option<Vec<Chat>>,
    pub participants: Vec<String>,
    pub winers: Vec<String>,
    pub no_of_winners: Option<u8>,
    pub no_of_participants: u128,
    pub game_type: GameType,
    pub name: Option<String>,
}

impl Storable for TournamentAccount {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}

// #[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
// pub struct NewTournamentAccount{
//     pub oldtournaments : TournamentAccount,
//     pub squad:  Vec<Squad>,
// }

#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum Status {
    #[default]
    Online,
    Offline,
}

#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum Role {
    #[default]
    Player,
    Mod,
}

#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum GameType {
    #[default]
    TeamvTeam,
    Single,
    Duo,
    Squad
}
#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum TournamentStatus {
    #[default]
    AcceptingPlayers,
    GameInProgress,
    GameCompleted,
    Archived,
}

#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum LobbyStatus {
    #[default]
    readyToStart,
    GameInProgress,
    GameCompleted,
}

#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum TournamentType {
    #[default]
    Crowdfunded,
    Prepaid,
}

#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub struct TokenState {
    pub bump: u8,
    pub amount: u64,
}

#[derive(Clone, Debug,  PartialEq, Default, Ord, Eq, PartialOrd, CandidType, Deserialize, Serialize)]
pub enum SquadType {
    #[default]
     Open,
     Closed,
}

#[derive(Clone, Debug, PartialEq, Default, Ord, Eq, PartialOrd, CandidType, Deserialize, Serialize)]
pub struct Squad {
    pub id_hash: String,
    pub captain: String,
    pub status: SquadType,
    pub name: String,
    pub tag: String,
    pub members: Vec<Member>,
    pub requests: Vec<String>,
    pub points: Option<u128>,
}

#[derive(Clone, Debug, Default, PartialEq, Ord, Eq, PartialOrd, CandidType, Deserialize, Serialize)]
pub struct Member {
    pub name: String,
    pub principal_id: String,
}

#[derive(Clone, Debug, Default, PartialEq, Ord, Eq, PartialOrd, CandidType, Deserialize, Serialize)]
pub struct Chat {
    pub name: String,
    pub id: String,
    pub time: String,
    pub message: String,
}