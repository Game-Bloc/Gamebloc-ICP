module {
    public type UserProfile = {
        age : Nat8;
        id_hash : Text;
        status : Status;
        username : Text;
        date : Text;
        wins : Nat8;
        is_mod : Bool;
        tournaments_created : Nat8;
        canister_id : Text;
        principal : Text;
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


    public type Status = {  
        #Online;
        #Offline;
    };
}