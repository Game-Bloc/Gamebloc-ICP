module {
    public type Point = {
        #Win;
        #Loss;
        #Draw;
    };

    public type Role = {
        #Admin;
        #Mod;
        #User;
    };

    public type Status = {
        #Online;
        #Offline;
        #Away;
    };

    public type ErrorMessage = {
        #NotAuthorized;
        #DoesNotExist;
        #Expired;
        #WrongCredentials;
        #NotAllowed;
        #NotEnoughBalance;
        #NotEligible;
    };

    public type Notification = {
        id: Nat;
        title: Text;
        body: Text;
        user: Principal;
        username: Text;
        date: Text;
        read: Bool;
    };

    public type Notifications = {
        notifications: [Notification];
        user: Principal;
    };

    public type UserMode = {
        #Base;
        #Creator;
        #Moderator;
    };

    public type TournamentId = Text;

    public type Points =  {
        #Win;
        #Loss;
        #Draw;
    };

    public type UserProfile = {
        id_hash: Text;
        age: Nat8;
        date: Text;
        status: Status;
        wins: Nat8;
        attendance: ?Nat8;
        losses: ?Nat8;
        tournaments_created: Nat8;
        username: Text;
        is_mod: Bool;
        role: ?Role;
        principal_id: Text;
        account_id: Text;
        canister_id: Text;
        squad_badge: Text;
        points: ?[(Text, Text, Point)];
        referral_id: ?Text;
        usermode : UserMode;
        earnings : Nat;
        tournaments : [TournamentId];
    };

    public type PayoutDistribution = {
        winner: Nat;  
        creator: Nat; 
        platform: Nat;
    };

    public type GameType = {
        #Board;       // e.g. Chess, Ludo
        #Card;        // e.g. Poker
        #Shooter;     // e.g. FPS games
        #MOBA;        // e.g. Dota, League
        #Sports;      // e.g. FIFA, efootball
        #Trivia;      // e.g. QuizUp
        #Arcade;
        #Custom : Text // Allow users to define their own
    };

    public type GameMode = {
        #OnevOne;
        #FreeForAll;
        #BracketElimination;
        #League;         // season/points
        #TimedScore;     // Best score in 5 min
        #LastManStanding;
        #GroupToFinals; // Champions league like
        #Custom : Text; 
    };

    public type TournamentAccount = {
        id: Text;
        title: Text;
        description: Text;
        game_type: GameType;

        ended: ?Bool;
        winners: ?[Winner];
        
        entry_fee: ?Nat;
        total_prize: Nat;
        creator: Text;
        creatorPrincipal : Principal;
        tournament_type: TournamentType;
        isPrivate : Bool; // defaults
        maxPlayers : ?Nat; // defaults
        moderators : [Principal];
        payoutDistribution : ?PayoutDistribution;
        externalLink : ?Text; 

        players : [Principal];
        tournamentStatus : TournamentStatus;
        metadata : TournamentMeta;

        isTeamBased : Bool;
        teamSize : TeamType;
        teams : [Team];
        maxTeams : ?Nat;
        allowSoloPlayers : Bool;
        allowAutoMatch : Bool;
    };

    public type TeamType = {
        #Duo;
        #Squad;
        #Solo;
    };

    public type Team = {
        id: Text;
        name: Text;
        members: [Principal];   // Player Principals
        captain: Principal;
        createdAt: Time;
        metadata: ?Text; // Maybe team motto, avatar, etc.
    };

    public type Time = Text;

    public type TournamentMeta = {
        startTime: Time;
        endTime: ?Time;
        prizePool: Nat;
        winningPrize: Nat;      // Total payout
        streamUrl: ?Text;       // Twitch, Theta, youtube.
        description: Text;
        tournamentBanner: ?Text;
        tags: [Text];           // e.g. ["China", "Chess"]
    };

    public type TournamentStatus = {
        #Upcoming;
        #Ongoing;
        #Completed;
        #Cancelled;
        #Archived;
    };

    public type TournamentType = {
        #Prepaid;
        #Crowdfunded;
    };



    public type Winner = {
        user_account: Text;
        amount: Nat;
    };

    public type Squad = {
        id: Text;
        name: Text;
        members: [Member];
        created_at: Text;
        created_by: Principal;
    };

    public type Member = {
        username: Text;
        principal: Principal;
        role: Text;
    };

    public type Result = {
        #Ok: Text;
        #Err: Text;
    };
} 