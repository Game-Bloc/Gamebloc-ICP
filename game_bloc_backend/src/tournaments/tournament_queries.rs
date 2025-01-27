use ic_cdk_macros::query;
use crate::model::TournamentAccount;
use crate::TOURNAMENT_STORE;

#[query]
pub fn get_all_tournament() -> Vec<TournamentAccount> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_tournament = Vec::new();
        tournament_store.borrow().iter().for_each(|tournament| {
            all_tournament.push((*tournament.1).to_owned().try_into().unwrap())
        });
        all_tournament
    })
}

#[query]
pub fn count_all_tournament() -> u128 {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_tournament: Vec<TournamentAccount> = Vec::new();
        tournament_store.borrow().iter().for_each(|tournament| {
            all_tournament.push((*tournament.1).to_owned().try_into().unwrap())
        });
        all_tournament.len()
    }) as u128
}


#[query]
pub fn get_tournament(id: String) -> TournamentAccount {
    TOURNAMENT_STORE.with(|tournament_store| tournament_store.borrow().get(&id).cloned().unwrap())
}