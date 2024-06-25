use std::borrow::Cow;

use candid::{Decode, Deserialize, CandidType, Encode};
// use candid::types::CandidType;
// use candid::CandidType as CandidType;
// use candid::types::Compound;
// use candid::types::Serializer;
use candid::encode_one;
use ic_stable_structures::{
    Storable, storable::Bound,
};
use serde::Serialize;

use crate::*;

macro_rules! pub_struct {
    ($name:ident {$($field:ident: $t:ty,)*}) => {
       #[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize
       )]
        pub struct $name {
            $(pub(crate) $field: $t),*
        }
    }
}

const MAX_VALUE_SIZE: u32 = 100;

pub_struct!(
    AppMessage {
     text: String,
     timestamp: u64,
    }
);


pub_struct!(UserProfile {
     id_hash: String,
     age: u8,
     date: String,
     status: Status,
     wins: u8,
     attendance: Option<u8>,
     losses: Option<u8>,
     tournaments_created:u8,
     points: Option<Vec<(String,String,Point)>>,
     username: String,
     is_mod: bool,
     role: Option<Role>,
     principal_id: String,
     account_id : String,
     canister_id: String,
     squad_badge: String,
});

pub_struct!(
    TournamentAccount {
     id_hash: String,
     creator: String,
     creator_id: Option<String>,
     status: TournamentStatus,
     idx: u8,
     starting_date: String,
     tournament_rules: String,
     tournament_type: TournamentType,
     game: String,
     squad:Vec<Squad>,
     squad_in_game_names:Option<Vec<Vec<(String, String)>>>,
     messages: Option<Vec<Chat>>,
     user: Vec<String>,
     winers: Vec<String>,
     entry_prize: u8,
     total_prize: u128,
     no_of_winners: u8,
     no_of_participants: u128,
     game_type: String,
     end_date: String,
     title: String,
     squad_points: Option<Vec<(String,Point)>>,
     points: Option<Vec<(String,Point)>>,
     in_game_names: Option<Vec<(String,String)>>,
     tournament_lobby_type: Option<TournamentLobbyType>,
     lobbies: Option<Vec<LobbyAccount>>,
});

// impl CandidType for i128 {
//     fn _ty() -> Type {
//         TypeInner::Int.into()
//     }
//     fn idl_serialize<S>(&self, serializer: S) -> Result<(), S::Error>
//         where
//             S: Serializer,
//     {
//         serializer.serialize_i128(*self)
//     }
// }

pub_struct!(
    LobbyAccount {
         status: TournamentStatus,
         lobby_status: LobbyStatus,
         idx: u8,
         starting_date: Option<String>,
         lobby_rules: String,
         tournament_type: TournamentType,
         game: String,
         squads:Vec<Squad>,
         messages: Option<Vec<Chat>>,
         // squad_points: Option<Vec<(String,Point)>>,
         // points: Option<Vec<(String,Point)>>,
         participants: Vec<String>,
         winers: Vec<String>,
         no_of_winners: Option<u8>,
         no_of_participants: u128,
         game_type: GameType,
         name: Option<String>,
    }
);

pub_struct!(
    Point {
     position_points: u128,
     kill_points: u128,
     total_points: u128,
});

pub_struct!(
    Squad {
    id_hash: String,
    captain: String,
    status: SquadType,
    name: String,
    tag: String,
    members: Vec<Member>,
    requests: Vec<String>,
    points: Option<Vec<(String,String,Point)>>,
});

pub_struct!(
    Member {
    name: String,
    principal_id: String,
});

pub_struct!(
    Chat {
    name: String,
    id: String,
    time: String,
    message: String,
});


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
    Squad,
}

impl GameType {
    pub fn name(&self) -> String {
        match self {
            GameType::TeamvTeam => "primary".to_string(),
            GameType::Single => "unique".to_string(),
            GameType::Duo => "unique".to_string(),
            GameType::Squad => "unique".to_string(),
        }
    }
    pub fn from_str(name: &str) -> GameType {
        match name {
            "TeamvTeam" => GameType::TeamvTeam,
            "Single" => GameType::Single,
            "Duo" => GameType::Duo,
            "Squad" => GameType::Squad,
            _ => panic!("Unsupported game type {}", name),
        }
    }
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
    ReadyToStart,
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
pub enum TournamentLobbyType {
    #[default]
    SingleLobby,
    MultiLobby,
}

#[derive(Clone, Debug, PartialEq, Default, Ord, Eq, PartialOrd, CandidType, Deserialize, Serialize)]
pub enum SquadType {
    #[default]
    Open,
    Closed,
}

impl AppMessage {
    pub fn candid_serialize(&self) -> Vec<u8> {
        encode_one(&self).unwrap()
    }
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