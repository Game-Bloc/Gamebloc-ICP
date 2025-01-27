use crate::*;

///Squad CRUD
#[query]
fn get_squad(id: String) -> Squad {
    SQUAD_STORE.with(|squad_store| squad_store.borrow().get(&id).cloned().unwrap())
}

#[query]
fn get_all_squad() -> Vec<Squad> {
    SQUAD_STORE.with(|squad_store| {
        let mut all_squads = Vec::new();
        squad_store
            .borrow()
            .iter()
            .for_each(|squad| all_squads.push((*squad.1).to_owned().try_into().unwrap()));
        all_squads
    })
}

#[query]
fn count_all_squad() -> u128 {
    SQUAD_STORE.with(|squad_store| {
        let mut all_squads: Vec<Squad> = Vec::new();
        squad_store
            .borrow()
            .iter()
            .for_each(|squad| all_squads.push((*squad.1).to_owned().try_into().unwrap()));
        all_squads.len()
    }) as u128
}

#[update]
fn create_squad(squad: Squad, principal: Principal) -> Result<u8, u8> {
    let id_hash = squad.to_owned().id_hash;

    SQUAD_STORE.with(|squad_store| {
        squad_store.borrow_mut().insert(id_hash, squad.to_owned());
        PROFILE_STORE.with(|profile_store| {
            let mut user = profile_store
                .borrow()
                .get(&principal.to_text())
                .cloned()
                .unwrap();
            user.squad_badge = squad.id_hash.to_owned();
            profile_store.borrow_mut().insert(principal.to_text(), user);
        })
    });
    Ok(1)
}

#[update]
fn add_to_squad(member: Member, principal: Principal, id: String) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        if squad.captain == principal.to_text() {
            squad.members.push(member);
            squad_store.borrow_mut().insert(id, squad.to_owned());
            PROFILE_STORE.with(|profile_store| {
                let mut user = profile_store
                    .borrow()
                    .get(&principal.to_text())
                    .cloned()
                    .unwrap();
                user.squad_badge = squad.id_hash.to_owned();
                profile_store.borrow_mut().insert(principal.to_text(), user);
            });
        } else {
            println!("you're not admin");
        }
    });
}

#[update]
fn close_squad(id: String, names: Vec<String>, principal: Principal) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        if squad.captain == principal.to_text() {
            squad.status = match squad.status {
                SquadType::Open => SquadType::Closed,
                _ => SquadType::Closed,
            };
            squad_store.borrow_mut().insert(id, squad);
        } else {
            println!("you're not admin");
        }
    });
}

#[update]
fn open_squad(id: String, names: Vec<String>, principal: Principal) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        if squad.captain == principal.to_text() {
            squad.status = match squad.status {
                SquadType::Closed => SquadType::Open,
                _ => SquadType::Open,
            };
            squad_store.borrow_mut().insert(id, squad);
        } else {
            println!("you're not admin");
        }
    });
}

#[update]
fn join_squad(member: Member, principal: Principal, id: String) {
    SQUAD_STORE.with(|squad_store| {
        let mut squad = squad_store.borrow().get(&id).cloned().unwrap();
        match squad.status {
            SquadType::Open => {
                squad.members.push(member.to_owned());
                let mut tournaments: Vec<TournamentAccount> = Vec::new();
                TOURNAMENT_STORE.with(|tournament_store| {
                    tournament_store.borrow().iter().for_each(|tournament| {
                        let mut tournament_joined = tournament.1.to_owned();
                        tournament.1.squad.iter().for_each(|squad| {
                            if squad.to_owned().id_hash == id {
                                let position = tournament
                                    .1
                                    .squad
                                    .iter()
                                    .position(|r| r.id_hash == id)
                                    .unwrap();
                                tournament_joined.squad[position]
                                    .members
                                    .push(member.to_owned());
                            }
                        });
                        tournaments.push(tournament_joined);
                    });
                    tournaments.iter().for_each(|tournament| {
                        tournament_store
                            .borrow_mut()
                            .insert(tournament.id_hash.to_owned(), tournament.to_owned());
                    });
                });
                squad_store.borrow_mut().insert(id, squad.to_owned());
                PROFILE_STORE.with(|profile_store| {
                    let mut user = profile_store
                        .borrow()
                        .get(&principal.to_text())
                        .cloned()
                        .unwrap();
                    user.squad_badge = squad.id_hash.to_owned();
                    profile_store.borrow_mut().insert(principal.to_text(), user);
                })
            }
            SquadType::Closed => println!("You can't join a closed squad"),
        }
    });
}

#[update]
fn update_squad_details(id: String) {
    TOURNAMENT_STORE.with(|tournament_store| {
        let mut tournament = tournament_store.borrow().get(&id).cloned().unwrap();
        SQUAD_STORE.with(|squad_store| {
            let mut squads: Vec<Squad> = Vec::new();
            squad_store
                .borrow()
                .iter()
                .for_each(|squad| squads.push((*squad.1).to_owned().try_into().unwrap()));
            tournament.squad = squads;
        });
        tournament_store.borrow_mut().insert(id, tournament);
    });
}
