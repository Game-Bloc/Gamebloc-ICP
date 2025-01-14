use crate::tournaments::helper_functions::*;
use crate::*;
use std::cmp::Ordering;

///Tournament crud

#[update]
pub fn cleanse_all_squad_type_tournament_branching_tribunal_points(id: String) -> bool {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        let mut list: Vec<(String, String, Point)> = vec![];
        match tournament.clone().squad_vector_mod_1 {
            None => {
                match tournament.clone().squad_vector_mod_2 {
                    None => match tournament.clone().squad_vector_mod_3 {
                        None => {}
                        Some(squad_vector_mod_3) => squad_vector_mod_3.iter().for_each(|g| {
                            let point = Point {
                                position_points: g.2.position_points,
                                total_points: g.2.total_points,
                                kill_points: g.2.kill_points,
                            };
                            list.push(((g.0).parse().unwrap(), (g.1).parse().unwrap(), point))
                        }),
                    },
                    Some(squad_vector_mod_2) => squad_vector_mod_2.iter().for_each(|f| {
                        match tournament.clone().squad_vector_mod_3 {
                            None => {}
                            Some(squad_vector_mod_3) => squad_vector_mod_3.iter().for_each(|g| {
                                let point = Point {
                                    position_points: (f.2.position_points + g.2.position_points)
                                        / 3,
                                    total_points: (f.2.total_points + g.2.total_points) / 3,
                                    kill_points: (f.2.kill_points + g.2.kill_points) / 3,
                                };
                                list.push(((f.0).parse().unwrap(), (f.1).parse().unwrap(), point))
                            }),
                        }
                    }),
                }
            }
            Some(squad_vector_mod_1) => squad_vector_mod_1.iter().for_each(|e| {
                match tournament.clone().squad_vector_mod_2 {
                    None => match tournament.clone().squad_vector_mod_3 {
                        None => {}
                        Some(squad_vector_mod_3) => squad_vector_mod_3.iter().for_each(|g| {
                            let point = Point {
                                position_points: (e.2.position_points + g.2.position_points) / 2,
                                total_points: (e.2.total_points + g.2.total_points) / 2,
                                kill_points: (e.2.kill_points + g.2.kill_points) / 2,
                            };
                            list.push(((e.0).parse().unwrap(), (e.1).parse().unwrap(), point))
                        }),
                    },
                    Some(squad_vector_mod_2) => squad_vector_mod_2.iter().for_each(|f| {
                        match tournament.clone().squad_vector_mod_3 {
                            None => {}
                            Some(squad_vector_mod_3) => squad_vector_mod_3.iter().for_each(|g| {
                                let point = Point {
                                    position_points: (e.2.position_points
                                        + f.2.position_points
                                        + g.2.position_points)
                                        / 3,
                                    total_points: (e.2.total_points
                                        + f.2.total_points
                                        + g.2.total_points)
                                        / 3,
                                    kill_points: (e.2.kill_points
                                        + f.2.kill_points
                                        + g.2.kill_points)
                                        / 3,
                                };
                                list.push(((e.0).parse().unwrap(), (e.1).parse().unwrap(), point))
                            }),
                        }
                    }),
                }
            }),
        }
        match list.is_empty() {
            true => false,
            false => {
                tournament.squad_points = Some(list);
                tournament_store.borrow_mut().insert(id, tournament);
                true
            }
        }
    })
}

#[update]
pub fn cleanse_all_solo_type_tournament_branching_tribunal_points(id: String) -> bool {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id.clone()).cloned().unwrap();
        let mut list: Vec<(String, String, Point)> = vec![];
        match tournament.clone().points_vector_mod_1 {
            None => match tournament.clone().points_vector_mod_2 {
                None => match tournament.clone().points_vector_mod_3 {
                    None => match list.clone().is_empty() {
                        true => {}
                        false => {
                            tournament.points = Some(list.clone());
                            tournament_store
                                .borrow_mut()
                                .insert(id.clone(), tournament.clone());
                        }
                    },
                    Some(points_vector_mod_3) => {
                        points_vector_mod_3.iter().for_each(|g| {
                            let point = Point {
                                position_points: g.2.position_points,
                                total_points: g.2.total_points,
                                kill_points: g.2.kill_points,
                            };
                            list.push(((g.0).parse().unwrap(), (g.1).parse().unwrap(), point))
                        });
                        match list.clone().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.clone());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.clone(), tournament.clone());
                            }
                        }
                    }
                },
                Some(points_vector_mod_2) => points_vector_mod_2.iter().for_each(|f| {
                    match tournament.clone().points_vector_mod_3 {
                        None => match list.clone().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.clone());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.clone(), tournament.clone());
                            }
                        },
                        Some(points_vector_mod_3) => {
                            points_vector_mod_3.iter().for_each(|g| {
                                let point = Point {
                                    position_points: (f.2.position_points + g.2.position_points)
                                        / 2,
                                    total_points: (f.2.total_points + g.2.total_points) / 2,
                                    kill_points: (f.2.kill_points + g.2.kill_points) / 2,
                                };
                                list.push(((f.0).parse().unwrap(), (f.1).parse().unwrap(), point))
                            });
                            match list.clone().is_empty() {
                                true => {}
                                false => {
                                    tournament.points = Some(list.clone());
                                    tournament_store
                                        .borrow_mut()
                                        .insert(id.clone(), tournament.clone());
                                }
                            }
                        }
                    }
                }),
            },
            Some(points_vector_mod_1) => points_vector_mod_1.iter().for_each(|e| match tournament
                .clone()
                .points_vector_mod_2
            {
                None => match tournament.clone().points_vector_mod_3 {
                    None => match list.clone().is_empty() {
                        true => {}
                        false => {
                            tournament.points = Some(list.clone());
                            tournament_store
                                .borrow_mut()
                                .insert(id.clone(), tournament.clone());
                        }
                    },
                    Some(points_vector_mod_3) => {
                        points_vector_mod_3.iter().for_each(|g| {
                            let point = Point {
                                position_points: (e.2.position_points + g.2.position_points) / 2,
                                total_points: (e.2.total_points + g.2.total_points) / 2,
                                kill_points: (e.2.kill_points + g.2.kill_points) / 2,
                            };
                            list.push(((e.0).parse().unwrap(), (e.1).parse().unwrap(), point))
                        });

                        match list.clone().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.clone());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.clone(), tournament.clone());
                            }
                        }
                    }
                },
                Some(points_vector_mod_2) => points_vector_mod_2.iter().for_each(|f| {
                    match tournament.clone().points_vector_mod_3 {
                        None => match list.clone().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.clone());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.clone(), tournament.clone());
                            }
                        },
                        Some(points_vector_mod_3) => {
                            points_vector_mod_3.iter().for_each(|g| {
                                let point = Point {
                                    position_points: (e.2.position_points
                                        + f.2.position_points
                                        + g.2.position_points)
                                        / 3,
                                    total_points: (e.2.total_points
                                        + f.2.total_points
                                        + g.2.total_points)
                                        / 3,
                                    kill_points: (e.2.kill_points
                                        + f.2.kill_points
                                        + g.2.kill_points)
                                        / 3,
                                };
                                list.push(((e.0).parse().unwrap(), (e.1).parse().unwrap(), point));
                            });
                            match list.clone().is_empty() {
                                true => {}
                                false => {
                                    tournament.points = Some(list.clone());
                                    tournament_store
                                        .borrow_mut()
                                        .insert(id.clone(), tournament.clone());
                                }
                            }
                        }
                    }
                }),
            }),
        }
        match list.clone().is_empty() {
            true => {
                tournament.points = tournament.points_vector_mod_1.clone();
                tournament_store.borrow_mut().insert(id, tournament.clone());
                false
            }
            false => {
                tournament.points = tournament.points_vector_mod_1.clone();
                tournament_store.borrow_mut().insert(id, tournament.clone());
                true
            }
        }
    })
}

#[query]
pub fn get_tournament(id: String) -> TournamentAccount {
    TOURNAMENT_STORE.with(|tournament_store| tournament_store.borrow().get(&id).cloned().unwrap())
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

//nominal entry fee and entry fee must be the same
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
            _ => TournamentStatus::GameInProgress,
        };
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn end_blitzkrieg_tournament(id: String, principal: Principal) -> bool {
    match get_profile_by_principal(principal).role {
        None => {
            println!("you're not admin");
            false
        }
        Some(role) => {
            match role {
                Role::Player => {
                    println!("you're not admin");
                    false
                }
                Role::Mod => {
                    TOURNAMENT_STORE.with(|tournament_store| {
                        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
                        tournament.status = match tournament.status {
                            TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
                            _ => TournamentStatus::GameCompleted,
                        };
                        match GameType::from_str(tournament.game_type.clone().as_str()) {
                            GameType::TeamvTeam => {}
                            GameType::Single => {
                                // winners.append(&mut winning_players);
                                let mut count = 0;
                                tournament
                                    .points
                                    .clone()
                                    .unwrap()
                                    .iter()
                                    .for_each(|id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.wins = profile.wins + 1;
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), profile);
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: ((id_mapping.2.clone().total_points as f64
                                                * (tournament.total_prize as f64
                                                    / tournament.no_of_participants as f64)
                                                    as f64)
                                                * 10_000_000_000.00)
                                                as u128,
                                            user_account: id_mapping.1.clone(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.clone());
                                        match tournament.winners.clone() {
                                            None => {
                                                tournament.winners = Some(vec![tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.clone();
                                                winner_list.push(tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    });
                                tournament
                                    .points
                                    .clone()
                                    .unwrap()
                                    .iter()
                                    .for_each(|id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.losses = match profile.losses {
                                                None => Some(1),
                                                Some(losses) => Some(losses + 1),
                                            };
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), profile);
                                        });
                                    });
                            }
                            GameType::Duo => {
                                let mut count = 0;
                                tournament.squad_points.clone().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.wins = match squad.wins {
                                                None => Some(1),
                                                Some(wins) => Some(wins + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), squad.clone());
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: ((id_mapping.2.clone().total_points as f64
                                                * (tournament.total_prize as f64
                                                    / tournament.no_of_participants as f64)
                                                    as f64)
                                                * 10_000_000_000.00)
                                                as u128,
                                            user_account: id_mapping.1.clone(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.clone());
                                        match tournament.winners.clone() {
                                            None => {
                                                tournament.winners = Some(vec![tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.clone();
                                                winner_list.push(tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    },
                                );
                                tournament.squad_points.clone().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.losses = match squad.losses {
                                                None => Some(1),
                                                Some(lossses) => Some(lossses + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), squad);
                                        });
                                    },
                                );
                            }
                            GameType::Squad => {
                                let mut count = 0;
                                tournament.squad_points.clone().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.wins = match squad.wins {
                                                None => Some(1),
                                                Some(wins) => Some(wins + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), squad.clone());
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: ((id_mapping.2.clone().total_points as f64
                                                * (tournament.total_prize as f64
                                                    / tournament.no_of_participants as f64)
                                                    as f64)
                                                * 10_000_000_000.00)
                                                as u128,
                                            user_account: id_mapping.1.clone(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament.winers.push((*id_mapping.1.clone()).to_owned());
                                        match tournament.winners.clone() {
                                            None => {
                                                tournament.winners = Some(vec![tournament_winner]);
                                            }
                                            Some(mut winners) => {
                                                winners.push(tournament_winner);
                                                tournament.winners = Some(winners);
                                            }
                                        }
                                    },
                                );
                                tournament.squad_points.clone().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.losses = match squad.losses {
                                                None => Some(1),
                                                Some(lossses) => Some(lossses + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), squad);
                                        });
                                    },
                                );
                            }
                        }

                        tournament_store.borrow_mut().insert(id, tournament.clone());
                        true
                    })
                }
                Role::TribunalMod(mod_tag) => {
                    println!("you're not admin");
                    false
                }
            }
        }
    }
}

#[update]
pub fn end_tournament(
    id: String,
    principal: Principal,
    number_of_winners: u8,
    winner: Vec<Winner>,
) -> bool {
    let old_tournament_winners = winner;
    match get_profile_by_principal(principal).role {
        None => {
            println!("you're not admin");
            false
        }
        Some(role) => {
            match role {
                Role::Player => {
                    println!("you're not admin");
                    false
                }
                Role::Mod => {
                    TOURNAMENT_STORE.with(|tournament_store| {
                        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
                        tournament.status = match tournament.status {
                            TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
                            _ => TournamentStatus::GameCompleted,
                        };
                        match GameType::from_str(tournament.game_type.clone().as_str()) {
                            GameType::TeamvTeam => {}
                            GameType::Single => {
                                // winners.append(&mut winning_players);
                                let mut count = 0;
                                tournament.clone().points.clone().unwrap()
                                    [..(number_of_winners as usize)]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.wins = profile.wins + 1;
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), profile);
                                        });
                                        let mut old_tournament_winner =
                                            old_tournament_winners[count].clone();
                                        old_tournament_winner.user_account = id_mapping.1.clone();
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.clone());
                                        match tournament.winners.clone() {
                                            None => {
                                                tournament.winners =
                                                    Some(vec![old_tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.clone();
                                                winner_list.push(old_tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    });
                                tournament.points.clone().unwrap()[(number_of_winners as usize)..]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.losses = match profile.losses {
                                                None => Some(1),
                                                Some(losses) => Some(losses + 1),
                                            };
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), profile);
                                        });
                                    });
                            }
                            GameType::Duo => {
                                let mut count = 0;
                                tournament.clone().squad_points.clone().unwrap()
                                    [..(number_of_winners as usize)]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.wins = match squad.wins {
                                                None => Some(1),
                                                Some(wins) => Some(wins + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), squad.clone());
                                        });
                                        let mut old_tournament_winner =
                                            old_tournament_winners[count].clone();
                                        old_tournament_winner.user_account = id_mapping.1.clone();
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.clone());
                                        match tournament.winners.clone() {
                                            None => {
                                                tournament.winners =
                                                    Some(vec![old_tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.clone();
                                                winner_list.push(old_tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    });
                                tournament.squad_points.clone().unwrap()
                                    [(number_of_winners as usize)..]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.losses = match squad.losses {
                                                None => Some(1),
                                                Some(lossses) => Some(lossses + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), squad);
                                        });
                                    });
                            }
                            GameType::Squad => {
                                let mut count = 0;
                                tournament.clone().squad_points.clone().unwrap()
                                    [..(number_of_winners as usize)]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.wins = match squad.wins {
                                                None => Some(1),
                                                Some(wins) => Some(wins + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store.borrow_mut().insert(
                                                (*id_mapping.1.clone()).to_owned(),
                                                squad.clone(),
                                            );
                                        });
                                        let mut old_tournament_winner =
                                            old_tournament_winners[count].clone();
                                        old_tournament_winner.user_account =
                                            (*id_mapping.1.clone()).to_owned();
                                        count = count + 1;
                                        tournament.winers.push((*id_mapping.1.clone()).to_owned());
                                        match tournament.winners.clone() {
                                            None => {
                                                tournament.winners =
                                                    Some(vec![old_tournament_winner]);
                                            }
                                            Some(mut winners) => {
                                                winners.push(old_tournament_winner);
                                                tournament.winners = Some(winners);
                                            }
                                        }
                                    });
                                tournament.squad_points.clone().unwrap()
                                    [(number_of_winners as usize)..]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.clone().as_str())
                                                .cloned()
                                                .unwrap();
                                            squad.losses = match squad.losses {
                                                None => Some(1),
                                                Some(lossses) => Some(lossses + 1),
                                            };
                                            squad.attendance = match squad.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            squad_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.clone(), squad);
                                        });
                                    });
                            }
                        }

                        tournament_store.borrow_mut().insert(id, tournament.clone());
                        true
                    })
                }
                Role::TribunalMod(mod_tag) => {
                    println!("you're not admin");
                    false
                }
            }
        }
    }
}

#[update]
pub fn archive_tournament(id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::GameInProgress => TournamentStatus::Archived,
            _ => TournamentStatus::Archived,
        };
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn test_end_tournament(id: String, principal: Principal, number_of_winners: u8) -> bool {
    // if get_profile_by_principal(principal).is_mod {
    // let mut winners = Vec::new();
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::GameInProgress => TournamentStatus::GameCompleted,
            _ => TournamentStatus::GameCompleted,
        };
        // let mut winner = Vec::with_capacity(3);
        // winner.
        // let mut winning_squad = Vec::from(vec![..tournament.squad_points.clone().unwrap()[..3]]);
        // let mut winning_players = Vec::from(vec![..tournament.squad_points.clone().unwrap()[..3]]);
        match GameType::from_str(tournament.game_type.clone().as_str()) {
            GameType::TeamvTeam => {}
            GameType::Single => {
                // winners.append(&mut winning_players);
                tournament.points.clone().unwrap()[0..(number_of_winners as usize)]
                    .iter()
                    .for_each(|id_mapping| tournament.winers.push(id_mapping.1.clone()));
            }
            GameType::Duo => {
                // winners.append(&mut winning_squad);
                tournament.squad_points.clone().unwrap()[0..(number_of_winners as usize)]
                    .iter()
                    .for_each(|id_mapping| tournament.winers.push(id_mapping.1.clone()));
            }
            GameType::Squad => {
                // winners.append(&mut winning_squad);
                tournament.squad_points.clone().unwrap()[0..(number_of_winners as usize)]
                    .iter()
                    .for_each(|id_mapping| tournament.winers.push(id_mapping.1.clone()));
            }
        }

        tournament_store.borrow_mut().insert(id, tournament.clone());
        // &tournament.squad_points.clone().unwrap()[..3]
        true
    })
    // winners
    // } else {
    //     println!("you're not admin");
    //     false
    //     // Vec::new()
    // }
}

#[update]
pub fn join_tournament(name: String, id: String, ign: (String, String, String)) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.no_of_participants_at_bump {
            None => {
                append_player_to_participants(name, ign, &mut tournament);
            }
            Some(no_of_participants_at_bump) => {
                if tournament.user.clone().len() != 0
                    && tournament.user.clone().len() % (no_of_participants_at_bump as usize) == 0
                {
                    match tournament.to_owned().tournament_variation {
                        None => {
                            append_player_to_participants(name, ign, &mut tournament);
                        }
                        Some(variation) => match variation {
                            Variation::Capped => {
                                append_player_to_participants(name, ign, &mut tournament);
                            }
                            Variation::Infinite => {
                                tournament.entry_fee = Some(
                                    tournament.entry_fee.unwrap()
                                        + tournament.entry_fee_bump.unwrap(),
                                );
                                match GameType::from_str(tournament.game_type.clone().as_str()) {
                                    GameType::Single => {
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
                                    }
                                    _ => {}
                                }
                            }
                        },
                    }
                } else {
                    append_player_to_participants(name, ign, &mut tournament);
                }
            }
        }
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn join_tournament_with_squad(
    squad_id: String,
    id: String,
    ign: Vec<(String, String, String)>,
    new_member_ign: Option<Vec<(String, String, String)>>,
) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament: TournamentAccount =
            tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.no_of_participants_at_bump {
            None => {
                append_squad_to_tournament(
                    &squad_id.to_owned(),
                    ign,
                    &new_member_ign,
                    &mut tournament,
                );
            }
            Some(no_of_participants_at_bump) => {
                if tournament.squad.clone().len() != 0
                    && tournament.squad.clone().len() % (no_of_participants_at_bump as usize) == 0
                {
                    match tournament.to_owned().tournament_variation {
                        None => {
                            append_squad_to_tournament(
                                &squad_id.to_owned(),
                                ign,
                                &new_member_ign,
                                &mut tournament,
                            );
                        }
                        Some(variation) => match variation {
                            Variation::Capped => {
                                append_squad_to_tournament(
                                    &squad_id.to_owned(),
                                    ign,
                                    &new_member_ign,
                                    &mut tournament,
                                );
                            }
                            Variation::Infinite => {
                                tournament.entry_fee = Some(
                                    tournament.entry_fee.unwrap()
                                        + tournament.entry_fee_bump.unwrap(),
                                );
                                SQUAD_STORE.with(|squad_store| {
                                    let mut squad =
                                        squad_store.borrow().get(&squad_id).cloned().unwrap();
                                    if new_member_ign.is_some() {
                                        let count = new_member_ign.clone().unwrap().len();
                                        if count > 0 {
                                            PROFILE_STORE.with(|profile_store| {
                                                loop {
                                                    if count == 0 {
                                                        break;
                                                    }
                                                    let mut user = profile_store
                                                        .borrow()
                                                        .get(
                                                            &new_member_ign.clone().unwrap()
                                                                [count - 1]
                                                                .0,
                                                        )
                                                        .cloned()
                                                        .unwrap();
                                                    let missing: Member = Member {
                                                        name: user.clone().username,
                                                        principal_id: new_member_ign
                                                            .clone()
                                                            .unwrap()[count - 1]
                                                            .0
                                                            .to_owned(),
                                                    };
                                                    squad.members.push(missing);
                                                    user.squad_badge = squad.id_hash.clone();
                                                    profile_store.borrow_mut().insert(
                                                        new_member_ign.clone().unwrap()[count - 1]
                                                            .0
                                                            .to_owned(),
                                                        user,
                                                    );
                                                }
                                                squad_store
                                                    .borrow_mut()
                                                    .insert(squad_id, squad.clone());
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
                            }
                        },
                    }
                } else {
                    append_squad_to_tournament(
                        &squad_id.to_owned(),
                        ign,
                        &new_member_ign,
                        &mut tournament,
                    );
                }
            }
        }
        tournament_store.borrow_mut().insert(id, tournament.clone());
    });
}

#[update]
pub fn update_tournament_details(id: String, tournament_rules: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.tournament_rules = tournament_rules;
        tournament_store.borrow_mut().insert(id, tournament);
    })
}

#[update]
pub fn update_tournament_pool_price(id: String, price: u128) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.total_prize = price;
        tournament_store.borrow_mut().insert(id, tournament);
    })
}

#[update]
pub fn update_tournament_type_to_blitzkrieg(id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.tournament_type = match tournament.tournament_type {
            TournamentType::Crowdfunded => TournamentType::Blitzkrieg,
            _ => TournamentType::Blitzkrieg,
        };
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

#[update]
pub fn postpone_tournament(id: String, starting_date: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        tournament.starting_date = starting_date;
        tournament_store.borrow_mut().insert(id, tournament);
    });
}

pub fn get_all_user() -> Vec<UserProfile> {
    PROFILE_STORE.with(|profile_store| {
        let mut all_users = Vec::new();
        profile_store
            .borrow()
            .iter()
            .for_each(|user| all_users.push((*user.1).clone().try_into().unwrap()));
        all_users
    })
}

#[update]
pub fn update_tournament_past_leaderboard() {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut losers: Vec<String> = vec![];
        tournament_store.borrow().iter().for_each(|tournament| {
            losers = tournament.1.clone().user;
            for x in tournament.1.user.iter() {
                update_attendance(x.into());
            }
            for y in tournament.1.winers.iter() {
                let index = losers.iter().position(|x| x == y).unwrap();
                losers.remove(index);
                update_winners(y.into());
            }
            for z in losers.iter() {
                update_losers(z.into());
            }
        });
    });
}

pub fn update_winners(id: String) {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store.borrow().get(&id).cloned().unwrap();
        profile.wins = profile.wins + 1;
        profile_store.borrow_mut().insert(id, profile);
    })
}

pub fn update_attendance(id: String) {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store.borrow().get(&id).cloned().unwrap();
        match profile.attendance {
            None => {
                profile.attendance = Some(1);
            }
            Some(attendance) => {
                profile.attendance = Some(attendance + 1);
            }
        }
        profile_store.borrow_mut().insert(id, profile);
    })
}

pub fn update_losers(id: String) {
    PROFILE_STORE.with(|profile_store| {
        let mut profile = profile_store.borrow().get(&id).cloned().unwrap();
        match profile.losses {
            None => {
                profile.losses = Some(1);
            }
            Some(attendance) => {
                profile.losses = Some(attendance + 1);
            }
        }
        profile_store.borrow_mut().insert(id, profile);
    })
}
