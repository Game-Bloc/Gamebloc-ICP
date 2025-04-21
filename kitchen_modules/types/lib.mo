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

    public type TournamentType = {
        #Prepaid;
        #Crowdfunded;
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
    };

    public type TournamentAccount = {
        id: Text;
        title: Text;
        description: Text;
        game_type: Text;
        tournament_type: TournamentType;
        entry_fee: ?Nat;
        total_prize: Nat;
        creator: Text;
        ended: ?Bool;
        winners: ?[Winner];
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