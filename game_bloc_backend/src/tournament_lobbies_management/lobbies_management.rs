use crate::*;
use crate::tournament_lobbies_management::helper_functions::*;

///Lobby (or sub tournament) CRUD
#[query]
pub fn get_lobby_from_tournament(tournament_id: String, lobby_id: u8) -> LobbyAccount {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.clone().lobbies.unwrap()[lobby_id as usize].clone()
    })
}

#[update]
pub fn assign_squad_points(tournament_id: String,  squad_id_and_points: Vec<(String, Point)>, principal: Principal) -> bool {
    // if get_self(principal).is_mod {
        TOURNAMENT_STORE.with(|tournament_store| {
           let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
            let mut sorted_squad_id_and_points = squad_id_and_points;
            sorted_squad_id_and_points.sort_by_key(|k| k.1.total_points);
            tournament.squad_points = Some(sorted_squad_id_and_points);

            tournament_store.borrow_mut().insert(tournament_id, tournament);
            true
        })
    // } else {
    //     println!("you're not admin");
    //     false
    // }
}

#[update]
pub fn assign_solo_points(tournament_id: String,  user_id_and_points: Vec<(String, Point)>, principal: Principal,) -> bool {
    // if get_self(principal).is_mod {
        TOURNAMENT_STORE.with(|tournament_store| {
            let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
            let mut sorted_user_id_and_points  = user_id_and_points;
            sorted_user_id_and_points.sort_by_key(|k| k.1.total_points);
            tournament.points = Some(sorted_user_id_and_points);
            tournament_store.borrow_mut().insert(tournament_id, tournament);
            true
        })
    // } else {
    //     println!("you're not admin");
    //     false
    // }
}

#[query]
pub fn get_all_tournament_lobbies(tournament_id: String) -> Vec<LobbyAccount> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_lobbies: Vec<LobbyAccount> = Vec::new();
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.clone().lobbies.unwrap().iter().for_each(|lobby| {
            all_lobbies.push(lobby.clone())
        });
        all_lobbies
    })
}

#[query]
pub fn count_tournament_lobbies(tournament_id: String) -> u128 {
    let mut all_lobbies: Vec<LobbyAccount> = Vec::new();
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut all_lobbies: Vec<LobbyAccount> = Vec::new();
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.clone().lobbies.unwrap().iter().for_each(|lobby| {
            all_lobbies.push(lobby.clone())
        });
        all_lobbies.len()
    }) as u128
}

#[update]
pub fn structure_tournament_into_lobbies(tournament_id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };

        // Matching arms for
        // structuring the tournament into lobbies
        match GameType::from_str(tournament.game_type.clone().as_str()) {
            GameType::Single => {
                let mut count = tournament.user.len() / 100;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: Vec::new(),
                            messages: Some(Vec::new()),
                            participants: tournament.user[..=100].to_owned(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::Duo => {
                let mut count = tournament.squad.len() / 50;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=50].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::Squad => {
                let mut count = tournament.squad.len() / 25;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=25].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::TeamvTeam => {
                tournament.clone().lobbies.unwrap().push(
                    LobbyAccount {
                        status: TournamentStatus::GameInProgress.clone(),
                        lobby_status: LobbyStatus::ReadyToStart.clone(),
                        idx: 0,
                        starting_date: None,
                        lobby_rules: tournament.tournament_rules.clone(),
                        tournament_type: tournament.tournament_type.clone(),
                        game: tournament.game.clone(),
                        squads: tournament.squad.clone(),
                        messages: Some(Vec::new()),
                        participants: Vec::new(),
                        winers: Vec::new(),
                        no_of_winners: None,
                        no_of_participants: tournament.no_of_participants.clone(),
                        game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                        name: Some(tournament.title.clone()),
                    })
            }
        }
        tournament_store.borrow_mut().insert(tournament_id, tournament.clone());
    });
}

// #[update]
// pub fn structure_tournament_into_duo_lobbies(name: String, id: String) {
//     TOURNAMENT_STORE.with(|tournament_store| {
//         let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
//         tournament.user.push(name);
//         tournament_store.borrow_mut().insert(id, tournament);
//     });
// }
//
// #[update]
// pub fn structure_tournament_into_squad_lobbies(squad_id: String, id: String) {
//     TOURNAMENT_STORE.with(|tournament_store| {
//         let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
//         SQUAD_STORE.with(|squad_store| {
//             let squad = squad_store.borrow().get(&squad_id).cloned().unwrap();
//             tournament.squad.push(squad);
//         });
//         tournament_store.borrow_mut().insert(id, tournament);
//     });
// }

///Tournament lobbies restructuring function
#[update]
pub fn create_new_lobbies_from_winners(tournament_id: String) -> Result<u8, u8> {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };

        let mut is_even: bool = tournament.clone().lobbies.unwrap().len() % 2 == 0;

        if (is_even) {
            tournament.clone().lobbies.unwrap().iter().for_each(
                |e| {
                    e.no_of_participants as f64 * 0.5;
                }
            );
        }

        // Matching arms for
        // structuring the tournament into lobbies
        match GameType::from_str(tournament.game_type.clone().as_str()) {
            GameType::Single => {
                let mut count = tournament.user.len() / 100;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: Vec::new(),
                            messages: Some(Vec::new()),
                            participants: tournament.user[..=100].to_owned(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::Duo => {
                let mut count = tournament.squad.len() / 50;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=50].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::Squad => {
                let mut count = tournament.squad.len() / 25;
                loop {
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: tournament.squad[..=25].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::TeamvTeam => {
                tournament.clone().lobbies.unwrap().push(
                    LobbyAccount {
                        status: TournamentStatus::GameInProgress,
                        lobby_status: LobbyStatus::ReadyToStart,
                        idx: 0,
                        starting_date: None,
                        lobby_rules: tournament.tournament_rules.clone(),
                        tournament_type: tournament.tournament_type.clone(),
                        game: tournament.game.clone(),
                        squads: tournament.squad.clone(),
                        messages: Some(Vec::new()),
                        participants: Vec::new(),
                        winers: Vec::new(),
                        no_of_winners: None,
                        no_of_participants: tournament.no_of_participants.clone(),
                        game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                        name: Some(tournament.title.clone()),
                    })
            }
        }
        tournament_store.borrow_mut().insert(tournament_id, tournament.to_owned());
    });
    Ok(1)
}

//delete lobbies
#[update]
pub fn lobbies_exterminator(tournament_id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.clone().lobbies = Some([].to_vec());
        tournament_store.borrow_mut().insert(tournament_id, tournament.to_owned());
    });
}

//merge three lobbies
#[update]
pub fn three_lobbies_merge(tournament_id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };

        //let mut is_even: bool = tournament.clone().lobbies.unwrap().len() % 2 == 0;
        let mut participant_queue: Vec<String> = Vec::new();
        let mut squad_queue: Vec<Squad> = Vec::new();

        /// Matching arms for
        /// eliminating players
        match GameType::from_str(tournament.game_type.clone().as_str()) {
            GameType::TeamvTeam => {}
            GameType::Single => {
                tournament.clone().lobbies.unwrap().iter().for_each(
                    |e| {
                        let new_no_of_participant = e.participants.len() as f64 * 0.333333333;
                        participant_queue.append(&mut Vec::from(&e.participants[..(new_no_of_participant as usize)]));
                    }
                );
            }
            GameType::Duo => {
                tournament.clone().lobbies.unwrap().iter().for_each(
                    |e| {
                        let new_no_of_squads = e.squads.len() as f64 * 0.333_333_333;
                        squad_queue.append(&mut Vec::from(&e.squads[..(new_no_of_squads as usize)]));
                    }
                );
            }
            GameType::Squad => {
                tournament.clone().lobbies.unwrap().iter().for_each(
                    |e| {
                        let new_no_of_squads = e.squads.len() as f64 * 0.333_333_333;
                        squad_queue.append(&mut Vec::from(&e.squads[..(new_no_of_squads as usize)]));
                    }
                );
            }
        }

        lobbies_exterminator(tournament_id.clone());

        /// Matching arms for
        /// structuring the tournament into lobbies
        match GameType::from_str(tournament.game_type.clone().as_str()) {
            GameType::Single => {
                let mut count = participant_queue.len() / 100;
                loop {
                    if participant_queue.len() < 100 {
                        tournament.clone().lobbies.unwrap().push(
                            LobbyAccount {
                                status: TournamentStatus::GameInProgress,
                                lobby_status: LobbyStatus::ReadyToStart,
                                idx: count as u8,
                                starting_date: None,
                                lobby_rules: tournament.tournament_rules.clone(),
                                tournament_type: tournament.tournament_type.clone(),
                                game: tournament.game.clone(),
                                squads: Vec::new(),
                                messages: Some(Vec::new()),
                                participants: participant_queue.to_owned(),
                                winers: Vec::new(),
                                no_of_winners: None,
                                no_of_participants: tournament.no_of_participants,
                                game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                                name: Some(tournament.title.clone()),
                            }
                        );
                        break;
                    }
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: Vec::new(),
                            messages: Some(Vec::new()),
                            participants: participant_queue[..100].to_owned(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    participant_queue.drain(..100);
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::Duo => {
                let mut count = squad_queue.len() / 50;
                loop {
                    if squad_queue.len() < 50 {
                        tournament.clone().lobbies.unwrap().push(
                            LobbyAccount {
                                status: TournamentStatus::GameInProgress,
                                lobby_status: LobbyStatus::ReadyToStart,
                                idx: count as u8,
                                starting_date: None,
                                lobby_rules: tournament.tournament_rules.clone(),
                                tournament_type: tournament.tournament_type.clone(),
                                game: tournament.game.clone(),
                                squads: squad_queue.to_owned(),
                                messages: Some(Vec::new()),
                                participants: Vec::new(),
                                winers: Vec::new(),
                                no_of_winners: None,
                                no_of_participants: tournament.no_of_participants,
                                game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                                name: Some(tournament.title.clone()),
                            }
                        );
                        break;
                    }
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: squad_queue[..50].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    participant_queue.drain(..50);
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::Squad => {
                let mut count = squad_queue.len() / 25;
                loop {
                    if squad_queue.len() < 25 {
                        tournament.clone().lobbies.unwrap().push(
                            LobbyAccount {
                                status: TournamentStatus::GameInProgress,
                                lobby_status: LobbyStatus::ReadyToStart,
                                idx: count as u8,
                                starting_date: None,
                                lobby_rules: tournament.tournament_rules.clone(),
                                tournament_type: tournament.tournament_type.clone(),
                                game: tournament.game.clone(),
                                squads: squad_queue.to_owned(),
                                messages: Some(Vec::new()),
                                participants: Vec::new(),
                                winers: Vec::new(),
                                no_of_winners: None,
                                no_of_participants: tournament.no_of_participants,
                                game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                                name: Some(tournament.title.clone()),
                            }
                        );
                        break;
                    }
                    tournament.clone().lobbies.unwrap().push(
                        LobbyAccount {
                            status: TournamentStatus::GameInProgress,
                            lobby_status: LobbyStatus::ReadyToStart,
                            idx: count as u8,
                            starting_date: None,
                            lobby_rules: tournament.tournament_rules.clone(),
                            tournament_type: tournament.tournament_type.clone(),
                            game: tournament.game.clone(),
                            squads: squad_queue[..25].to_owned(),
                            messages: Some(Vec::new()),
                            participants: Vec::new(),
                            winers: Vec::new(),
                            no_of_winners: None,
                            no_of_participants: tournament.no_of_participants,
                            game_type: GameType::from_str(tournament.game_type.clone().as_str()),
                            name: Some(tournament.title.clone()),
                        }
                    );
                    participant_queue.drain(..25);
                    count = count - 1;
                    if count < 1 {
                        break;
                    }
                }
            }
            GameType::TeamvTeam => {}
        }
        tournament_store.borrow_mut().insert(tournament_id, tournament.to_owned());
    });
}

//merge two lobbies members
#[update]
pub fn two_lobbies_merge(name: String, tournament_id: String, ign: (String, String)) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&tournament_id).cloned().unwrap();
        tournament.status = match tournament.status {
            TournamentStatus::AcceptingPlayers => TournamentStatus::GameInProgress,
            _ => {
                TournamentStatus::GameInProgress
            }
        };

        //let mut is_even: bool = tournament.clone().lobbies.unwrap().len() % 2 == 0;
        let mut participant_queue: Vec<String> = Vec::new();
        let mut squad_queue: Vec<Squad> = Vec::new();

        squad_or_player_religator(&mut tournament, &mut participant_queue, &mut squad_queue);

        lobbies_exterminator(tournament_id.clone());


        /// Matching arms for
        /// structuring the tournament into lobbies
        squad_or_player_promoter(&mut tournament, participant_queue, squad_queue);
        tournament_store.borrow_mut().insert(tournament_id, tournament.to_owned());
    });
}

//extradict lobbies members
#[update]
pub fn lobbies_extraditor(name: String, id: String, ign: (String, String)) {}