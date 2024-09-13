import Principal "mo:base/Principal";
import Ledgertypes "ledgertypes";

// import Principal

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

    public type Access = {
        _user : Principal;
        _password : Text;
        _confirm_password : Text;
        _updatedTime : Int;
    };

    public type Winner = {
        user : Principal;
        position : ?Text;
        amount : Nat;
    };

    public type PoH = {
        user : Principal;
        account : Text;
        amount : Text;
        tournamentTitle : Text;
        tournament_id_hash : Text;
        date : Text;

    };

    public type UserBalance = {
        user : Principal;
        balance : Nat64;
    };

    public type Pay = {
        tournamentTitle : Text;
        tournament_id_hash : Text;
        user : Principal;
        account : Text;
        date : Text;
        amount : Ledgertypes.Tokens;

    };

    public type Notification = {
        id : Nat;
        title : Text;
        body : Text;
        user : Principal;
        username : Text;
        date : Text;
        read : Bool;
    };

    public type Notifications = {
        notifications : [Notification];
        user : Principal;
    };

    public type UserProfile = {
        account_id : Text;
        age : Nat8;
        attendance : ?Nat8;
        canister_id : Text;
        date : Text;
        id_hash : Text;
        is_mod : Bool;
        losses : ?Nat8;
        points : ?[(Text, Text, Point)];
        principal_id : Text;
        role : ?Role;
        squad_badge : Text;
        status : Status;
        tournaments_created : Nat8;
        username : Text;
        wins : Nat8
    };

    public type Point = {
        position_points : Nat;
        kill_points : Nat;
        total_points : Nat;
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
        wins : ?Nat8;
        losses : ?Nat8;
        attendance : ?Nat8;
        tag : Text;
        members : [Member];
        requests : [Text];
        points : ?[(Text, Text, Point)];
    };

    public type Contestant = {
        name : Text;
        point : Nat;
        wins : Nat8;
        losses : Nat8;
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
        #Prepaid;
        #Blitzkrieg;
    };

    public type TournamentStatus = {
        #AcceptingPlayers;
        #GameInProgress;
        #GameCompleted;
        #Archived;
    };

    public type TournamentAccount =  {
    creator : Text;
    creator_id : ?Text;
    end_date : Text;
    ended : ?Bool;
    entry_prize : Nat8;
    game : Text;
    game_type : Text;
    id_hash : Text;
    idx : Nat8;
    in_game_names : ?[(Text, Text, Text)];
    lobbies : ?[LobbyAccount];
    messages : ?[Chat];
    no_of_participants : Nat;
    no_of_winners : Nat8;
    points : ?[(Text, Text, Point)];
    points_vector_mod_1 : ?[(Text, Text, Point)];
    points_vector_mod_2 : ?[(Text, Text, Point)];
    points_vector_mod_3 : ?[(Text, Text, Point)];
    squad : [Squad];
    squad_in_game_names : ?[[(Text, Text, Text)]];
    squad_points : ?[(Text, Text, Point)];
    squad_vector_mod_1 : ?[(Text, Text, Point)];
    squad_vector_mod_2 : ?[(Text, Text, Point)];
    squad_vector_mod_3 : ?[(Text, Text, Point)];
    starting_date : Text;
    status : TournamentStatus;
    title : Text;
    total_prize : Nat;
    tournament_lobby_type : ?TournamentLobbyType;
    tournament_rules : Text;
    tournament_type : TournamentType;
    user : [Text];
    winers : [Text];
    winners : ?[Winner]
  };

    public type TournamentLobbyType = {
        #SingleLobby;
        #MultiLobby;
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
        #ReadyToStart;
        #GameInProgress;
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
    };

}
