use crate::tournaments::helper_functions::*;
use crate::*;

///Tournament crud

#[update]
pub fn cleanse_all_squad_type_tournament_branching_tribunal_points(id: String) -> bool {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        let mut list: Vec<(String, String, Point)> = vec![];
        match tournament.to_owned().squad_vector_mod_1 {
            None => {
                match tournament.to_owned().squad_vector_mod_2 {
                    None => match tournament.to_owned().squad_vector_mod_3 {
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
                        match tournament.to_owned().squad_vector_mod_3 {
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
                match tournament.to_owned().squad_vector_mod_2 {
                    None => match tournament.to_owned().squad_vector_mod_3 {
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
                        match tournament.to_owned().squad_vector_mod_3 {
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
        let mut tournament = tournament_store
            .borrow()
            .get(&id.to_owned())
            .cloned()
            .unwrap();
        let mut list: Vec<(String, String, Point)> = vec![];
        match tournament.to_owned().points_vector_mod_1 {
            None => match tournament.to_owned().points_vector_mod_2 {
                None => match tournament.to_owned().points_vector_mod_3 {
                    None => match list.to_owned().is_empty() {
                        true => {}
                        false => {
                            tournament.points = Some(list.to_owned());
                            tournament_store
                                .borrow_mut()
                                .insert(id.to_owned(), tournament.to_owned());
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
                        match list.to_owned().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.to_owned());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.to_owned(), tournament.to_owned());
                            }
                        }
                    }
                },
                Some(points_vector_mod_2) => points_vector_mod_2.iter().for_each(|f| {
                    match tournament.to_owned().points_vector_mod_3 {
                        None => match list.to_owned().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.to_owned());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.to_owned(), tournament.to_owned());
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
                            match list.to_owned().is_empty() {
                                true => {}
                                false => {
                                    tournament.points = Some(list.to_owned());
                                    tournament_store
                                        .borrow_mut()
                                        .insert(id.to_owned(), tournament.to_owned());
                                }
                            }
                        }
                    }
                }),
            },
            Some(points_vector_mod_1) => points_vector_mod_1.iter().for_each(|e| match tournament
                .to_owned()
                .points_vector_mod_2
            {
                None => match tournament.to_owned().points_vector_mod_3 {
                    None => match list.to_owned().is_empty() {
                        true => {}
                        false => {
                            tournament.points = Some(list.to_owned());
                            tournament_store
                                .borrow_mut()
                                .insert(id.to_owned(), tournament.to_owned());
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

                        match list.to_owned().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.to_owned());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.to_owned(), tournament.to_owned());
                            }
                        }
                    }
                },
                Some(points_vector_mod_2) => points_vector_mod_2.iter().for_each(|f| {
                    match tournament.to_owned().points_vector_mod_3 {
                        None => match list.to_owned().is_empty() {
                            true => {}
                            false => {
                                tournament.points = Some(list.to_owned());
                                tournament_store
                                    .borrow_mut()
                                    .insert(id.to_owned(), tournament.to_owned());
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
                            match list.to_owned().is_empty() {
                                true => {}
                                false => {
                                    tournament.points = Some(list.to_owned());
                                    tournament_store
                                        .borrow_mut()
                                        .insert(id.to_owned(), tournament.to_owned());
                                }
                            }
                        }
                    }
                }),
            }),
        }
        match list.to_owned().is_empty() {
            true => {
                tournament.points = tournament.points_vector_mod_1.to_owned();
                tournament_store
                    .borrow_mut()
                    .insert(id, tournament.to_owned());
                false
            }
            false => {
                tournament.points = tournament.points_vector_mod_1.to_owned();
                tournament_store
                    .borrow_mut()
                    .insert(id, tournament.to_owned());
                true
            }
        }
    })
}

//nominal entry fee and entry fee must be the same
#[update]
pub fn create_tournament(tournament: TournamentAccount) -> Result<u8, u8> {
    let id_hash = tournament.to_owned().id_hash;

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
                        match GameType::from_str(tournament.game_type.to_owned().as_str()) {
                            GameType::TeamvTeam => {
                                // winners.append(&mut winning_players);
                                let mut count = 0;
                                tournament.points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.wins = profile.wins + 1;
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: tournament.total_prize,
                                            user_account: id_mapping.1.to_owned(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.to_owned());
                                        match tournament.winners.to_owned() {
                                            None => {
                                                tournament.winners = Some(vec![tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.to_owned();
                                                winner_list.push(tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    },
                                );
                                tournament.points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                    },
                                );
                            }
                            GameType::Single => {
                                // winners.append(&mut winning_players);
                                let mut count = 0;
                                tournament.points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.wins = profile.wins + 1;
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: ((id_mapping.2.to_owned().total_points as f64
                                                * (tournament.total_prize as f64
                                                    / tournament.no_of_participants as f64)
                                                    as f64)
                                                * 10_000_000_000.00)
                                                as u128,
                                            user_account: id_mapping.1.to_owned(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.to_owned());
                                        match tournament.winners.to_owned() {
                                            None => {
                                                tournament.winners = Some(vec![tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.to_owned();
                                                winner_list.push(tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    },
                                );
                                tournament.points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                    },
                                );
                            }
                            GameType::Duo => {
                                let mut count = 0;
                                tournament.squad_points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), squad.to_owned());
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: ((id_mapping.2.to_owned().total_points as f64
                                                * (tournament.total_prize as f64
                                                    / tournament.no_of_participants as f64)
                                                    as f64)
                                                * 10_000_000_000.00)
                                                as u128,
                                            user_account: id_mapping.1.to_owned(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.to_owned());
                                        match tournament.winners.to_owned() {
                                            None => {
                                                tournament.winners = Some(vec![tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.to_owned();
                                                winner_list.push(tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    },
                                );
                                tournament.squad_points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), squad);
                                        });
                                    },
                                );
                            }
                            GameType::Squad => {
                                let mut count = 0;
                                tournament.squad_points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), squad.to_owned());
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: ((id_mapping.2.to_owned().total_points as f64
                                                * (tournament.total_prize as f64
                                                    / tournament.no_of_participants as f64)
                                                    as f64)
                                                * 10_000_000_000.00)
                                                as u128,
                                            user_account: id_mapping.1.to_owned(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament
                                            .winers
                                            .push((*id_mapping.1.to_owned()).to_owned());
                                        match tournament.winners.to_owned() {
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
                                tournament.squad_points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), squad);
                                        });
                                    },
                                );
                            }
                        }

                        tournament_store
                            .borrow_mut()
                            .insert(id, tournament.to_owned());
                        true
                    })
                }
                Role::TribunalMod(_mod_tag) => {
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
                        match GameType::from_str(tournament.game_type.to_owned().as_str()) {
                            GameType::TeamvTeam => {
                                // winners.append(&mut winning_players);
                                let mut count = 0;
                                tournament.points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.wins = profile.wins + 1;
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                        let tournament_winner = Winner {
                                            position: "".to_string(),
                                            amount: tournament.total_prize,
                                            user_account: id_mapping.1.to_owned(),
                                        };
                                        // tournament_winners.push(tournament_winner);
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.to_owned());
                                        match tournament.winners.to_owned() {
                                            None => {
                                                tournament.winners = Some(vec![tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.to_owned();
                                                winner_list.push(tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    },
                                );
                                tournament.points.to_owned().unwrap().iter().for_each(
                                    |id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                    },
                                );
                            }
                            GameType::Single => {
                                // winners.append(&mut winning_players);
                                let mut count = 0;
                                tournament.to_owned().points.to_owned().unwrap()
                                    [..(number_of_winners as usize)]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
                                                .cloned()
                                                .unwrap();
                                            profile.wins = profile.wins + 1;
                                            profile.attendance = match profile.attendance {
                                                None => Some(1),
                                                Some(attendance) => Some(attendance + 1),
                                            };
                                            profile_store
                                                .borrow_mut()
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                        let mut old_tournament_winner =
                                            old_tournament_winners[count].to_owned();
                                        old_tournament_winner.user_account =
                                            id_mapping.1.to_owned();
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.to_owned());
                                        match tournament.winners.to_owned() {
                                            None => {
                                                tournament.winners =
                                                    Some(vec![old_tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.to_owned();
                                                winner_list.push(old_tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    });
                                tournament.points.to_owned().unwrap()
                                    [(number_of_winners as usize)..]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        PROFILE_STORE.with(|profile_store| {
                                            let mut profile = profile_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), profile);
                                        });
                                    });
                            }
                            GameType::Duo => {
                                let mut count = 0;
                                tournament.to_owned().squad_points.to_owned().unwrap()
                                    [..(number_of_winners as usize)]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), squad.to_owned());
                                        });
                                        let mut old_tournament_winner =
                                            old_tournament_winners[count].to_owned();
                                        old_tournament_winner.user_account =
                                            id_mapping.1.to_owned();
                                        count = count + 1;
                                        tournament.winers.push(id_mapping.1.to_owned());
                                        match tournament.winners.to_owned() {
                                            None => {
                                                tournament.winners =
                                                    Some(vec![old_tournament_winner]);
                                            }
                                            Some(winners) => {
                                                let mut winner_list = winners.to_owned();
                                                winner_list.push(old_tournament_winner);
                                                tournament.winners = Some(winner_list);
                                            }
                                        }
                                    });
                                tournament.squad_points.to_owned().unwrap()
                                    [(number_of_winners as usize)..]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), squad);
                                        });
                                    });
                            }
                            GameType::Squad => {
                                let mut count = 0;
                                tournament.to_owned().squad_points.to_owned().unwrap()
                                    [..(number_of_winners as usize)]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                (*id_mapping.1.to_owned()).to_owned(),
                                                squad.to_owned(),
                                            );
                                        });
                                        let mut old_tournament_winner =
                                            old_tournament_winners[count].to_owned();
                                        old_tournament_winner.user_account =
                                            (*id_mapping.1.to_owned()).to_owned();
                                        count = count + 1;
                                        tournament
                                            .winers
                                            .push((*id_mapping.1.to_owned()).to_owned());
                                        match tournament.winners.to_owned() {
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
                                tournament.squad_points.to_owned().unwrap()
                                    [(number_of_winners as usize)..]
                                    .iter()
                                    .for_each(|id_mapping| {
                                        SQUAD_STORE.with(|squad_store| {
                                            let mut squad = squad_store
                                                .borrow()
                                                .get(id_mapping.1.to_owned().as_str())
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
                                                .insert(id_mapping.1.to_owned(), squad);
                                        });
                                    });
                            }
                        }

                        tournament_store
                            .borrow_mut()
                            .insert(id, tournament.to_owned());
                        true
                    })
                }
                Role::TribunalMod(_mod_tag) => {
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
pub fn join_tournament(name: String, id: String, ign: (String, String, String)) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        match tournament.to_owned().tournament_variation {
            None => {
                tournament =
                    append_player_to_participants(name, ign, tournament.to_owned());
            }
            Some(variation) => match variation {
                Variation::Capped => {
                    tournament = append_player_to_participants(
                        name,
                        ign,
                        tournament.to_owned(),
                    );
                }
                Variation::Infinite => {
                    tournament.entry_fee = Some(
                        tournament.entry_fee.unwrap()
                            + tournament.entry_fee_bump.unwrap(),
                    );
                    tournament = append_player_to_participants(
                        name,
                        ign,
                        tournament.to_owned(),
                    );
                }
            },
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
        match tournament.to_owned().tournament_variation {
            None => {
                tournament = append_squad_to_tournament(
                    &squad_id.to_owned(),
                    ign,
                    &new_member_ign,
                    tournament.to_owned(),
                );
            }
            Some(variation) => match variation {
                Variation::Capped => {
                    tournament = append_squad_to_tournament(
                        &squad_id.to_owned(),
                        ign,
                        &new_member_ign,
                        tournament.to_owned(),
                    );
                }
                Variation::Infinite => {
                    tournament.entry_fee = Some(
                        tournament.entry_fee.unwrap()
                            + tournament.entry_fee_bump.unwrap(),
                    );
                    tournament = append_squad_to_tournament(
                        &squad_id.to_owned(),
                        ign,
                        &new_member_ign,
                        tournament.to_owned(),
                    );
                }
            },
        }
        tournament_store
            .borrow_mut()
            .insert(id, tournament.to_owned());
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

#[update]
pub fn update_tournament_past_leaderboard() {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut losers: Vec<String> = vec![];
        tournament_store.borrow().iter().for_each(|tournament| {
            losers = tournament.1.to_owned().user;
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
