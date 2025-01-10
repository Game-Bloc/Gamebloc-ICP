import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
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

    public type ModTag = {
        #Mod1; #Mod2; #Mod3
    };

    public type Access = {
        _user : Principal;
        _password : Text;
        _confirm_password : Text;
        _updatedTime : Int;
    };

    public type Winner = {
        user_account : Text; // Principal instead of wallet address
        position : Text;
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
        balance : Nat;
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
        wins : Nat8;
        referral_id : ?Text
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
        #TribunalMod : ModTag
    };


    public type SquadType = {
        #Open;
        #Closed
    };

    public type TournamentType = {
        #Crowdfunded;
        #Prepaid;
        #Blitzkrieg
    };

    public type TournamentStatus = {
        #AcceptingPlayers;
        #GameInProgress;
        #GameCompleted;
        #Archived;
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
        squad_points : ?[(Text, Text, Point)];
        squad_in_game_names : ?[[(Text, Text, Text)]];
        messages : ?[Chat];
        user : [Text];
        winers : [Text];
        total_prize : Nat;
        entry_prize : Nat8;
        entry_fee : ?Nat;
        no_of_winners : Nat8;
        no_of_participants : Nat;
        game_type : Text;
        end_date : Text;
        title : Text;
        in_game_names : ?[(Text, Text, Text)];
        points : ?[(Text, Text, Point)];
        squad_vector_mod_1: ?[(Text,Text,Point)];
        points_vector_mod_1: ?[(Text,Text,Point)];
        squad_vector_mod_2: ?[(Text,Text,Point)];
        points_vector_mod_2: ?[(Text,Text,Point)];
        squad_vector_mod_3: ?[(Text,Text,Point)];
        points_vector_mod_3: ?[(Text,Text,Point)];
        tournament_lobby_type : ?TournamentLobbyType;
        lobbies : ?[LobbyAccount];
        winners : ?[Winner];
        ended : ?Bool;
        tournament_variation : ?Variation;
        entry_fee_bump : ?Nat;
        nominal_entry_fee : ?Nat
        // paid : Bool;
    };

    public type TournamentLobbyType = {
        #SingleLobby;
        #MultiLobby;
    };


    // public type Winner = {
    //     position : Text;
    //     amount : Nat;
    //     user_account : Text
    // };


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

    public type Variation = { #Capped; #Infinite };

    public type Member = {
        name : Text;
        principal_id : Text
    };

    public type Contenstant = {
        name : Text;
        point : Nat;
        wins : Nat8;
        losses : Nat8
    };

    public type DailyClaim = {
        user : Principal;
        streakTime : Nat; //  Type Time
        streakCount : Nat;
        highestStreak : Nat;
        pointBalance : Nat;
    };


}
