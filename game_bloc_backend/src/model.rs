use candid::{CandidType, Decode, Deserialize, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{
    storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::{borrow::Cow, cell::RefCell};
use crate::*;


const MAX_VALUE_SIZE: u32 = 100;
#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub struct UserProfile {
    pub id_hash: String,
    pub age: u8,
    pub date: String,
    pub status: Status,
    pub wins: u8,
    pub tournaments_created:u8,
    pub username: String,
    pub is_mod: bool,
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
    pub status: TournamentStatus,
    pub idx: u8,
    pub starting_date: String,
    pub tournament_rules: String,
    pub tournament_type: TournamentType,
    pub game: String,
    pub squad:Vec<Squad>,
    pub messages: Option<Vec<Chat>>,
    pub user: Vec<String>,
    pub winers: Vec<String>,
    pub entry_prize: u8,
    pub total_prize: u128,
    pub no_of_winners: u8,
    pub no_of_participants: u128,
    pub game_type: String,
    pub end_date: String,
    pub title: String,

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
pub enum GameType {
    #[default]
    MP1v1,
    BRsingle,
    BRDuo,
    BRsquad
}
#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum TournamentStatus {
    #[default]
    AcceptingPlayers,
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
}

#[derive(Clone, Debug, Default, PartialEq, Ord, Eq, PartialOrd, CandidType, Deserialize, Serialize)]
pub struct Member {
    pub name: String,
    pub principal_id: String,
}

#[derive(Clone, Debug, Default, PartialEq, Ord, Eq, PartialOrd, CandidType, Deserialize, Serialize)]
pub struct Chat {
    pub name: String,
    pub message: String,
}