use crate::*;

pub(crate) fn squad_or_player_religator(
    mut tournament: &mut TournamentAccount,
    mut participant_queue: &mut Vec<String>,
    mut squad_queue: &mut Vec<Squad>,
) {
    match GameType::from_str(tournament.game_type.clone().as_str()) {
        GameType::TeamvTeam => {}
        GameType::Single => {
            tournament.clone().lobbies.unwrap().iter().for_each(|e| {
                let new_no_of_participant = e.participants.len() as f64 * 0.5;
                participant_queue.append(&mut Vec::from(
                    &e.participants[..(new_no_of_participant as usize)],
                ));
            });
        }
        GameType::Duo => {
            tournament.clone().lobbies.unwrap().iter().for_each(|e| {
                let new_no_of_squads = e.squads.len() as f64 * 0.5;
                squad_queue.append(&mut Vec::from(&e.squads[..(new_no_of_squads as usize)]));
            });
        }
        GameType::Squad => {
            tournament.clone().lobbies.unwrap().iter().for_each(|e| {
                let new_no_of_squads = e.squads.len() as f64 * 0.5;
                squad_queue.append(&mut Vec::from(&e.squads[..(new_no_of_squads as usize)]));
            });
        }
    }
}

pub(crate) fn squad_or_player_promoter(
    mut tournament: &mut TournamentAccount,
    mut participant_queue: Vec<String>,
    mut squad_queue: Vec<Squad>,
) {
    match GameType::from_str(tournament.game_type.clone().as_str()) {
        GameType::Single => {
            let mut count = participant_queue.len() / 100;
            loop {
                if participant_queue.len() < 100 {
                    tournament.clone().lobbies.unwrap().push(LobbyAccount {
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
                    });
                    break;
                }
                tournament.clone().lobbies.unwrap().push(LobbyAccount {
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
                });
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
                    tournament.clone().lobbies.unwrap().push(LobbyAccount {
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
                    });
                    break;
                }
                tournament.clone().lobbies.unwrap().push(LobbyAccount {
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
                });
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
                    tournament.clone().lobbies.unwrap().push(LobbyAccount {
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
                    });
                    break;
                }
                tournament.clone().lobbies.unwrap().push(LobbyAccount {
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
                });
                participant_queue.drain(..25);
                count = count - 1;
                if count < 1 {
                    break;
                }
            }
        }
        GameType::TeamvTeam => {}
    }
}
