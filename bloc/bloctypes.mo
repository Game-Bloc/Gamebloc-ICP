module {
    public type UserProfile = {
        id_hash: Text;
        age: Nat8;
        date: Text;
        status: Status;
        wins: Nat8;
        tournaments_created:Nat8;
        username: Text;
        is_mod: Bool;
        principal_id: Text;
        canister_id: Text;
    };

    public type TournamentAccount = {
        idx : Nat8;
        id_hash : Text;
        status : TournamentStatus;
        creator : Text;
        game : Text;
        user : [Text];
        winers : [Text];
        total_prize : Nat;
        tournament_rules : Text;
        starting_date : Text;
        tournament_type : TournamentType;
        entry_prize : Nat8;
        no_of_winners : Nat8;
        no_of_participants : Nat;
    };

    public type TournamentType = {
        #Prepaid;
        #Crowdfunded;
    };

    public type TournamentStatus = {
        #AcceptingPlayers;
        #GameInProgress;
        #GameCompleted;
    };

    public type Result =  { #Ok : Nat8; #Err: Nat8 };


    public type Status = { #Online; #Offline; };
}