use crate::*;
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
    pub user: Vec<String>,
    pub winers: Vec<String>,
    pub entry_prize: u8,
    pub total_prize: u128,
}



#[derive(Clone, Debug, Default, CandidType, Deserialize, Serialize)]
pub enum Status {
    #[default]
    Online,
    Offline,
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

#[update]
fn update_tournament(profile: UserProfile) {
    let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(profile.username.to_owned(), principal_id);
    });
    PROFILE_STORE.with(|profile_store| {
        profile_store.borrow_mut().insert(principal_id, profile);
    });
}