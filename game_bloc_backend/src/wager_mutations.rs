use crate::*;

///wager crud
/// //todo:unimplemented

#[update]
pub fn mutate_() {

}

#[query]
pub fn get_wager() {

}


#[update]
pub fn add_wager_to_tournament(id: String, wager: Wager, ) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.wagers.clone() {
            None => {
                tournament.wagers = Some(vec![wager.clone()]);
            }
            Some(mut previous_wager) => {
                previous_wager.push(wager);
                 tournament.wagers = Some(previous_wager);
            }
        }
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn increase_wager_position(id: String, wager: Wager, ) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.wagers.clone() {
            None => {
                tournament.wagers = Some(vec![wager.clone()]);
            }
            Some(mut previous_wager) => {
                previous_wager.push(wager);
                tournament.wagers = Some(previous_wager);
            }
        }
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[query]
pub fn get_all_wagers(id: String, wager: Wager, ) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.wagers.clone() {
            None => {
                tournament.wagers = Some(vec![wager.clone()]);
            }
            Some(mut previous_wager) => {
                previous_wager.push(wager);
                tournament.wagers = Some(previous_wager);
            }
        }
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[query]
pub fn does_wager_exist(bounty_id: String) -> bool {
    // self.bounties.contains_key(&bounty_id)
    false
}