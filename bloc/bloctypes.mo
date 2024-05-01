import Principal "mo:base/Principal";
module {

    public type UserTrack = {
        user : Principal;
        tournaments_created : Nat;
        tournaments_joined : Nat;
        tournaments_won : Nat;
        messages_sent : Nat;
        feedbacks_sent : Nat;
        total_point : Nat
    };

    public type UserProfile = {
        id_hash : Text;
        age : Nat8;
        date : Text;
        status : Status;
        wins : Nat8;
        tournaments_created : Nat8;
        username : Text;
        is_mod : Bool;
        role : Role;
        principal_id : Text;
        account_id : Text;
        canister_id : Text;
        squad_badge : Text;
        points : ?Nat;
        // role : Text
        // ico_balance : Nat64;
    };

    public type Feedback = {
        id : Nat;
        title : Text;
        user : Principal;
        content : Text;
        time : Text;
        read : Bool
    };

    public type Squad = {
        id_hash : Text;
        captain : Text;
        status : SquadType;
        name : Text;
        tag : Text;
        members : [Member];
        requests : [Text];
        points : ?Nat;
    };

    public type Role = {
        #Player;
        #Mod;
    };

    public type SquadType = {
        #Open;
        #Closed
    };

    public type TournamentType = {
        #Crowdfunded;
        #Prepaid
    };

    public type TournamentStatus = {
        #AcceptingPlayers;
        #GameInProgress;
        #Archived;
        #GameCompleted
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
        // mods : [Text];
        game : Text;
        squad : [Squad];
        squad_points : ?[(Text, Nat)];
        squad_in_game_names : ?[[(Text, Text)]];
        messages : ?[Chat];
        user : [Text];
        winers : [Text];
        total_prize : Nat;
        entry_prize : Nat8;
        no_of_winners : Nat8;
        no_of_participants : Nat;
        game_type : GameType;
        end_date : Text;
        title : Text;
        in_game_names : ?[(Text, Text)];
        points : ?[(Text, Nat)];
        lobbies : ?[LobbyAccount]
    };


    public type LobbyAccount = {
        status : TournamentStatus;
        lobby_status : LobbyStatus;
        idx : Nat8;
        starting_date : ?Text;
        lobby_rules : Text;
        tournament_type : TournamentType;
        game : Text;
        squads : [Squad];
        messages : ?[Chat];
        participants : [Text];
        winers : [Text];
        no_of_winners : ?Nat8;
        no_of_participants : Nat;
        game_type : GameType;
        name : ?Text
    };

    public type LobbyStatus = {
        #GameInProgress;
        #readyToStart;
        #GameCompleted
    };

    public type GameType = {
        #TeamvTeam;
        #Single;
        #Duo;
        #Squad
    };

    public type Chat = { name : Text; id : Text; time : Text; message : Text };

    public type Result = { #Ok : Nat8; #Err : Nat8 };

    public type Status = { #Online; #Offline };

    public type Member = {
        name : Text;
        principal_id : Text
    }
}
