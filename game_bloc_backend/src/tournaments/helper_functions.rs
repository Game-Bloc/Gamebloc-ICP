use crate::model::{GameType, Member, TournamentAccount, UserProfile};
use crate::{ID_STORE, PROFILE_STORE, SQUAD_STORE};
use std::cmp::Ordering;

pub fn append_squad_to_tournament(
    squad_id: &String,
    ign: Vec<(String, String, String)>,
    new_member_ign: &Option<Vec<(String, String, String)>>,
    mut tournament: &mut TournamentAccount,
) {
    match tournament
        .clone()
        .no_of_participants
        .cmp(&(tournament.clone().user.len() as u128))
    {
        Ordering::Greater => {
            SQUAD_STORE.with(|squad_store| {
                let mut squad = squad_store
                    .borrow()
                    .get(&squad_id.to_owned())
                    .cloned()
                    .unwrap();
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
                                    .get(&new_member_ign.clone().unwrap()[count - 1].0)
                                    .cloned()
                                    .unwrap();
                                let missing: Member = Member {
                                    name: user.clone().username,
                                    principal_id: new_member_ign.clone().unwrap()[count - 1]
                                        .0
                                        .to_owned(),
                                };
                                squad.members.push(missing);
                                user.squad_badge = squad.id_hash.clone();
                                profile_store.borrow_mut().insert(
                                    new_member_ign.clone().unwrap()[count - 1].0.to_owned(),
                                    user,
                                );
                            }
                            squad_store
                                .borrow_mut()
                                .insert(squad_id.to_owned(), squad.clone());
                        });
                    }
                    let mut mutable_new_member_ign = new_member_ign.to_owned().unwrap();
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
        _ => {}
    }
}

pub fn get_profile(name: String) -> UserProfile {
    ID_STORE.with(|id_store| {
        PROFILE_STORE.with(|profile_store| {
            id_store
                .borrow()
                .get(&name)
                .and_then(|id| profile_store.borrow().get(id).cloned())
                .unwrap()
        })
    })
}

pub fn append_player_to_participants(
    name: String,
    ign: (String, String, String),
    mut tournament: &mut TournamentAccount,
) {
    match GameType::from_str(tournament.game_type.clone().as_str()) {
        GameType::Single => {
            match tournament
                .clone()
                .no_of_participants
                .cmp(&(tournament.clone().user.len() as u128))
            {
                Ordering::Greater => {
                    tournament.user.push(name.to_owned());
                    match tournament.clone().in_game_names {
                        None => {
                            tournament.in_game_names = Some(vec![ign.clone()]);
                        }
                        Some(mut previous_igns) => {
                            previous_igns.push(ign);
                            tournament.in_game_names = Some(previous_igns);
                        }
                    }
                    let user_details = get_profile(name);
                    match tournament.user_details.to_owned() {
                        None => {
                            tournament.user_details = Some(vec![user_details]);
                        }
                        Some( mut previous_user_details) => {
                            previous_user_details.push(user_details);
                            tournament.user_details = Some(previous_user_details);
                        }
                    }
                }
                _ => {}
            }
        }
        _ => {}
    }
}
