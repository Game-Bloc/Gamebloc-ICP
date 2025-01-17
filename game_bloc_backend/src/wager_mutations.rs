use crate::*;

///wager crud
/// //todo:unimplemented

#[query]
pub fn expected_wager_reward(tournament_id: String, staker_principal_id: String) -> Vec<u128> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        match tournament.wagers.clone() {
            None => {
                vec![]
            }
            Some(wagers) => {
               let staker_wagers:Vec<Wager> =  wagers.clone().iter().cloned().filter(|w| w.staker_principal_id == staker_principal_id).collect();
                let mut expected_rewards =  vec![];
                for x in staker_wagers {
                    let first_player_staked_on: String = x.player_principal_id.clone();
                    let player_wagered_on:Vec<Wager> = wagers.clone().iter().cloned().filter(|w| w.player_principal_id == first_player_staked_on).collect();
                    let wagers_on_other_players:Vec<Wager> = wagers.clone().iter().cloned().filter(|w| w.player_principal_id != first_player_staked_on).collect();
                    let mut total_amount_wagered_on_tournament = 0;
                    let mut total_amount_wagered_on_player_staked_on = 0;
                    let mut total_amount_wagered_against_player_staked_on = 0;
                    for j in wagers_on_other_players {
                        total_amount_wagered_against_player_staked_on = total_amount_wagered_against_player_staked_on + j.amount;
                    }
                    for i in player_wagered_on {
                        total_amount_wagered_on_player_staked_on = total_amount_wagered_on_player_staked_on + i.amount;
                    }
                    for x in wagers.clone() {
                        total_amount_wagered_on_tournament = total_amount_wagered_on_tournament + x.amount;
                    }
                    let winings_cut = (x.amount / total_amount_wagered_on_player_staked_on);

                    let player_expected_reward = total_amount_wagered_against_player_staked_on * winings_cut;
                    expected_rewards.push(player_expected_reward);
                }
                expected_rewards
            }
        }
    })
}

#[query]
pub fn get_wager(tournament_id: String, staker_principal_id: String) -> Option<Wager> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        match tournament.wagers.clone() {
            None => {
               None
            }
            Some(wagers) => {
                wagers.iter().find(|&w| w.staker_principal_id == staker_principal_id).cloned()
            }
        }
    })
}


#[update]
pub fn add_or_increase_tournament_wager(id: String, wager: Wager, ) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.wagers.clone() {
            None => {
                tournament.wagers = Some(vec![wager.clone()]);
            }
            Some(mut wagers) => {
                let exisiting_wagers:Vec<Wager> = wagers.iter().cloned().filter(|w| w.staker_principal_id == wager.staker_principal_id).collect();
                let mut exisiting_wager = exisiting_wagers[0].clone();
                if exisiting_wagers.len() == 0 {
                    wagers.push(wager);
                    tournament.wagers = Some(wagers);
                }

                else {
                   let wager_index:Option<usize> = wagers.iter().position(|w| w.staker_principal_id == wager.staker_principal_id);
                    exisiting_wager.amount = exisiting_wager.amount + wager.amount;
                    wagers.remove(wager_index.unwrap());
                    wagers.push(exisiting_wager);
                    tournament.wagers = Some(wagers);
                }
            }
        }
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[query]
pub fn get_all_wagers(id: String ) -> Vec<Wager> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.wagers.clone() {
            None => {
                vec![]
            }
            Some(wagers) => {
              wagers
            }
        }
    })
}

// #[query]
// pub fn get_wager(id: String ) -> Option<Wager> {
//     TOURNAMENT_STORE.with(|tournament_store| {
//         let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
//         match tournament.wagers.clone() {
//             None => {
//                 None
//             }
//             Some(wagers) => {
//                 wagers.iter().find(|&w| {if w.staker_principal_id == account_id  {Some(w)}}).cloned()
//
//             }
//         }
//     })
// }

// #[query]
// pub fn does_wager_exist(id:String, account_id: String) -> bool {
//     TOURNAMENT_STORE.with(|tournament_store| {
//         let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
//         match tournament.wagers.clone() {
//             None => {
//                 false
//             }
//             Some(wagers) => {
//                 wagers.iter().find(|&w| w.staker_principal_id == account_id).is_some()
//             }
//         }
//     })
// }