use crate::*;

///Tournament crud
#[query]
pub fn get_tournament(id: String) -> TournamentAccount {
    TOURNAMENT_STORE.with(|tournament_store| {
        tournament_store.borrow().get(&id).cloned().unwrap()
    })
}

#[query]
pub fn get_all_tournament() -> Vec<TournamentAccount> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_tournament = Vec::new();
        tournament_store.borrow().iter().for_each(|tournament| {
            all_tournament.push((*tournament.1).clone().try_into().unwrap())
        });
        all_tournament
    })
}

#[query]
pub fn count_all_tournament() -> u128 {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_tournament: Vec<TournamentAccount> = Vec::new();
        tournament_store.borrow().iter().for_each(|tournament| {
            all_tournament.push((*tournament.1).clone().try_into().unwrap())
        });
        all_tournament.len()
    }) as u128
}

#[update]
pub fn create_tournament(tournament: TournamentAccount) -> Result<u8, u8> {
    let id_hash = tournament.clone().id_hash;

    TOURNAMENT_STORE.with(|tournament_store| {
        tournament_store.borrow_mut().insert(id_hash, tournament);
    });
    Ok(1)
}

#[update]
pub fn start_tournament(id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn end_tournament(id: String, principal: Principal, )
    -> bool
{
    if get_self(principal).is_mod {
        // let mut winners = Vec::new();
        TOURNAMENT_STORE.with(|tournament_store| {
            let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
            tournament.status = match tournament.status {
                TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
                _ => {
                    TournamentStatus::GameCompleted
                }
            };
            // let mut winner = Vec::with_capacity(3);
            // winner.
            // let mut winning_squad = Vec::from(vec![..tournament.squad_points.clone().unwrap()[..3]]);
            // let mut winning_players = Vec::from(vec![..tournament.squad_points.clone().unwrap()[..3]]);
            match tournament.game_type {
                GameType::TeamvTeam => {}
                GameType::Single => {
                    // winners.append(&mut winning_players);
                    tournament.points.clone().unwrap()[..3].iter().for_each(|id_mapping|{
                        tournament.winers.push(id_mapping.0.clone())
                    });
                }
                GameType::Duo => {
                    // winners.append(&mut winning_squad);
                    tournament.squad_points.clone().unwrap()[..3].iter().for_each(|id_mapping|{
                        tournament.winers.push(id_mapping.0.clone())
                    });
                }
                GameType::Squad => {
                    // winners.append(&mut winning_squad);
                    tournament.squad_points.clone().unwrap()[..3].iter().for_each(|id_mapping|{
                        tournament.winers.push(id_mapping.0.clone())
                    });
                }
            }

            tournament_store.borrow_mut().insert(id, tournament.clone());
            // &tournament.squad_points.clone().unwrap()[..3]
            true
        })
        // winners
    } else {
        println!("you're not admin");
        false
        // Vec::new()
    }
}

#[update]
pub fn join_tournament(name: String, id: String, ign: (String, String)) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.user.push(name);
        match tournament.clone().in_game_names {
            None => {
                tournament.in_game_names = Some(vec![ign.clone()]);
            }
            Some(mut previous_igns) => {
                previous_igns.push(ign);
                tournament.in_game_names = Some(previous_igns);
            }
        }
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn  join_tournament_with_squad(squad_id: String, id: String, ign: Vec<(String, String)>, new_member_ign: Option<Vec<(String, String)>>) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        SQUAD_STORE.with(|squad_store| {
            let mut squad = squad_store.borrow().get(&squad_id).cloned().unwrap();
            if new_member_ign.is_some() {
                let count = new_member_ign.clone().unwrap().len();
                if count > 0 {
                    PROFILE_STORE.with(|profile_store| {
                        loop {
                            if count == 0 {
                                break;
                            }
                            let mut user = profile_store.borrow().get(&new_member_ign.clone().unwrap()[count - 1].0).cloned().unwrap();
                            let missing: Member = Member {
                                name: user.clone().username,
                                principal_id: new_member_ign.clone().unwrap()[count - 1].0.to_owned(),
                            };
                            squad.members.push(missing);
                            user.squad_badge = squad.id_hash.clone();
                            profile_store.borrow_mut().insert(new_member_ign.clone().unwrap()[count - 1].0.to_owned(), user);
                        }
                        squad_store.borrow_mut().insert(squad_id, squad.clone());
                    });
                }
                let mut mutable_new_member_ign = new_member_ign.unwrap();
                ign.clone().append(&mut mutable_new_member_ign);
            }
            tournament.squad.push(squad);
        });
        match tournament.clone().squad_in_game_names {
            None => {
                tournament.squad_in_game_names = Some(vec![ign]);
            }
            Some(mut previous_igns) => {
                previous_igns.push(ign);
                tournament.squad_in_game_names = Some(previous_igns);
            }
        }
        tournament_store.borrow_mut().insert(id, tournament.clone());
    });
}