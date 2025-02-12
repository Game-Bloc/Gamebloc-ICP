use crate::models::model::{GameType, Member, TournamentAccount, UserProfile};
use crate::{ID_STORE, PROFILE_STORE, SQUAD_STORE};
use std::cmp::Ordering;

pub fn append_squad_to_tournament(
    squad_id: &String,
    ign: Vec<(String, String, String)>,
    new_member_ign: &Option<Vec<(String, String, String)>>,
    mut tournament: TournamentAccount,
) -> TournamentAccount {
    match tournament
        .to_owned()
        .no_of_participants
        .cmp(&(tournament.to_owned().user.len() as u128))
    {
        Ordering::Greater => {
            SQUAD_STORE.with(|squad_store| {
                let mut squad = squad_store
                    .borrow()
                    .get(&squad_id.to_owned())
                    .cloned()
                    .unwrap();
                if new_member_ign.is_some() {
                    let count = new_member_ign.to_owned().unwrap().len();
                    if count > 0 {
                        PROFILE_STORE.with(|profile_store| {
                            loop {
                                if count == 0 {
                                    break;
                                }
                                let mut user = profile_store
                                    .borrow()
                                    .get(&new_member_ign.to_owned().unwrap()[count - 1].0)
                                    .cloned()
                                    .unwrap();
                                let missing: Member = Member {
                                    name: user.to_owned().username,
                                    principal_id: new_member_ign.to_owned().unwrap()[count - 1]
                                        .0
                                        .to_owned(),
                                };
                                squad.members.push(missing);
                                user.squad_badge = squad.id_hash.to_owned();
                                profile_store.borrow_mut().insert(
                                    new_member_ign.to_owned().unwrap()[count - 1].0.to_owned(),
                                    user,
                                );
                            }
                            squad_store
                                .borrow_mut()
                                .insert(squad_id.to_owned(), squad.to_owned());
                        });
                    }
                    let mut mutable_new_member_ign = new_member_ign.to_owned().unwrap();
                    ign.to_owned().append(&mut mutable_new_member_ign);
                }
                tournament.squad.push(squad);
            });
            match tournament.to_owned().squad_in_game_names {
                None => {
                    tournament.squad_in_game_names = Some(vec![ign]);
                    tournament
                }
                Some(mut previous_igns) => {
                    previous_igns.push(ign);
                    tournament.squad_in_game_names = Some(previous_igns);
                    tournament
                }
            }
        }
        _ => {tournament}
    }
}

fn get_profile(name: String) -> UserProfile {
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
    mut tournament: TournamentAccount,
) -> TournamentAccount {
    match GameType::from_str(tournament.game_type.to_owned().as_str()) {
        GameType::Single => {
            match tournament
                .to_owned()
                .no_of_participants
                .cmp(&(tournament.to_owned().user.len() as u128))
            {
                Ordering::Greater => {
                    tournament.user.push(name.to_owned());
                    match tournament.to_owned().in_game_names {
                        None => {
                            tournament.in_game_names = Some(vec![ign.to_owned()]);
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
                            tournament
                        }
                        Some(mut previous_user_details) => {
                            previous_user_details.push(user_details);
                            tournament.user_details = Some(previous_user_details);
                            tournament
                        }
                    }
                }
                _ => {
                    tournament
                }
            }
        }
        _ => {
            tournament
        }
    }
}
