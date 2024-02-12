import Principal "mo:base/Principal";
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
        account_id : Text;
        canister_id: Text;
        squad_badge: Text;
        // ico_balance : Nat64;
    };

    public type Feedback = {
        id : Nat;
        title : Text;
        user : Principal;
        content : Text;
        time : Text;
        read : Bool;
    };

    public type Squad = {
        id_hash : Text;
        captain: Text;
        status: SquadType;
        name: Text;
        tag: Text;
        members: [Member];
        requests: [Text];
    };

    public type SquadType = {
        #Open; 
        #Closed;
    };

    public type TournamentType = {
        #Crowdfunded;
        #Prepaid;
    };

    public type TournamentStatus = {
        #AcceptingPlayers;
        #GameInProgress;
        #GameCompleted;
    };
    
    public type TournamentAccount = {
        id_hash : Text;
        creator : Text;
        creator_id : ?Text;
        status : TournamentStatus;
        idx : Nat8;
        starting_date : Text;
        tournament_rules : Text;
        tournament_type : TournamentType;
        game : Text;
        squad : [Squad];
        messages : ?[Chat];
        user : [Text];
        winers : [Text];
        total_prize : Nat;
        entry_prize : Nat8;
        no_of_winners : Nat8;
        no_of_participants : Nat;
        game_type: Text;
        end_date: Text;
        title: Text;
    };

    public type Chat = { name : Text; id : Text; time : Text; message : Text; };

    public type Result =  { #Ok : Nat8; #Err: Nat8 };


    public type Status = { #Online; #Offline; };

    public type Member = {
        name : Text;
        principal_id : Text;
    };
}