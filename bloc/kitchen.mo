import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
// import DateTime "mo:datetime/DateTime";
import AccountIdentifierMops "mo:account-identifier";
// import Account "mo:account";

import { now } = "mo:base/Time";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Time "mo:base/Time";
import Float "mo:base/Float";

import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Nat64 "mo:base/Nat64";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import List "mo:base/List";
import Random "mo:base/Random";
import Nat32 "mo:base/Nat32";
import Char "mo:base/Char";
import Int64 "mo:base/Int64";
import JSON "mo:json";
import SHA256 "utils/SHA256";

import AccountIdentifier "utils/utils";
// import AccountID "mo:principal/blob/AccountIdentifier";

import ICPLedger "canister:icp_ledger";
import ICPIndex "canister:icp_index";
import RustBloc "canister:game_bloc_backend";
// import Env ""
// import
// import ICRC1 "canister:icrc1_ledger";

import IndexTypes "types/indextypes";
import Bloctypes "types/bloctypes";
import LedgerTypes "types/ledgertypes";
import CKTypes "types/ck_types";

import Utils "utils/utils";
import HTTP "utils/http";
import Hex "utils/Hex";
// import CycleMonitor "utils/CycleMonitor";

shared ({ caller }) actor class Kitchen() = this {

    private stable var userCanisterId : Principal = caller;

    /// Backuo for the Gamebloc backend in the kitchen canister
    private stable var ProfileEntries : [(Principal, Bloctypes.UserProfile)] = [];
    private stable var TournamentEntries : [(Principal, Bloctypes.TournamentAccount)] = [];
    private stable var IDEntries : [(Text, Text)] = [];
    private stable var FeedbackEntries : [(Nat, Bloctypes.Feedback)] = [];
    private stable var SquadEntries : [(Text, Bloctypes.Squad)] = [];
    private stable var UserTrackEntries : [(Principal, Bloctypes.UserTrack)] = [];
    private stable var feedback_id : Nat = 0;
    private stable let day : Nat = 86_400 * 1_000_000_000;
    private stable let e8s : Nat = 100_000_000;

    // * Local params
      let gbc_admin : Principal = Principal.fromText("22gut-hqv7w-7ejrz-kidig-w6gs5-hddhp-nxfje-iwfzq-wmu6s-6gr5s-tae"); // * Demo here
    // ! Production params @Deonorla
    // let gbc_admin : Principal = Principal.fromText("mspyp-nemw2-mm543-dmcmw-b22ma-xe4jd-siecq-4awtq-ni6zj-lekqg-cqe");
    let ic : HTTP.IC = actor ("aaaaa-aa");
    private stable var volume : Nat64 = 0;
    private stable var SupportedGames : [Text] = [];
    private stable var PasswordEntries : [(Principal, Bloctypes.Access)] = [];
    private stable var NotificationEntries : [(Principal, Bloctypes.Notifications)] = [];
    private stable var PayEntries : [(Nat, Bloctypes.Pay)] = [];
    private stable var BalanceEntries : [(Principal, Bloctypes.UserBalance)] = [];
    private stable var DailyRewardEntries : [(Principal, Bloctypes.DailyClaim)] = [];
    private stable var LockedAssetsEntries : [(Principal, Bloctypes.LockedAsset)] = [];
    private stable var UpdatedUsersEntries : [(Principal, User)] = [];
    private stable var messageID : Nat = 0;
    private stable var messageEntries : [(Nat, MessageEntry)] = [];
    private stable var ReferralMapEntries : [(Principal, Text)] = [];
    private stable var CodeToPrincipalMapEntries : [(Text, Principal)] = [];
    private stable var ReferrerMapEntries : [(Principal, Principal)] = [];
    private stable var ReferralsMapEntries : [(Principal, [Principal])] = [];

    // private stable var RewardsMap

    var ReferralsMap : HashMap.HashMap<Principal, [Principal]> = HashMap.fromIter<Principal, [Principal]>(ReferralsMapEntries.vals(), 10, Principal.equal, Principal.hash);
    var ReferrerMap : HashMap.HashMap<Principal, Principal> = HashMap.fromIter<Principal, Principal>(ReferrerMapEntries.vals(), 10, Principal.equal, Principal.hash);
    var ReferralMap : HashMap.HashMap<Principal, Text> = HashMap.fromIter<Principal, Text>(ReferralMapEntries.vals(), 10, Principal.equal, Principal.hash);
    var CodeToPrincipalMap : HashMap.HashMap<Text, Principal> = HashMap.fromIter<Text, Principal>(CodeToPrincipalMapEntries.vals(), 10, Text.equal, Text.hash);
    var MessageHashMap : HashMap.HashMap<Nat, MessageEntry> = HashMap.fromIter<Nat, MessageEntry>(messageEntries.vals(), 10, Nat.equal, Hash.hash);
    var TournamentHashMap : HashMap.HashMap<Principal, Bloctypes.TournamentAccount> = HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
    var PayHashMap : HashMap.HashMap<Nat, Bloctypes.Pay> = HashMap.fromIter<Nat, Bloctypes.Pay>(PayEntries.vals(), 10, Nat.equal, Hash.hash);
    var ProfileHashMap : HashMap.HashMap<Principal, Bloctypes.UserProfile> = HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
    var NOTIFICATION_STORE : HashMap.HashMap<Principal, Bloctypes.Notifications> = HashMap.fromIter<Principal, Bloctypes.Notifications>(NotificationEntries.vals(), 10, Principal.equal, Principal.hash);
    var BalanceHashMap : HashMap.HashMap<Principal, Bloctypes.UserBalance> = HashMap.fromIter<Principal, Bloctypes.UserBalance>(BalanceEntries.vals(), 10, Principal.equal, Principal.hash);
    var DailyRewardHashMap : HashMap.HashMap<Principal, Bloctypes.DailyClaim> = HashMap.fromIter<Principal, Bloctypes.DailyClaim>(DailyRewardEntries.vals(), 10, Principal.equal, Principal.hash);
    var LockedAssetsHashMap : HashMap.HashMap<Principal, Bloctypes.LockedAsset> = HashMap.fromIter<Principal, Bloctypes.LockedAsset>(LockedAssetsEntries.vals(), 10, Principal.equal, Principal.hash);
    var UpdatedUsersHashMap : HashMap.HashMap<Principal, User> = HashMap.fromIter<Principal, User>(UpdatedUsersEntries.vals(), 10, Principal.equal, Principal.hash);

    private let accountIdentifiers = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);
    private let emails = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);

    var ID_STORE = TrieMap.TrieMap<Text, Text>(Text.equal, Text.hash);
    var PASSWORD_STORE = TrieMap.TrieMap<Principal, Bloctypes.Access>(Principal.equal, Principal.hash);
    var FEED_BACK_STORE = TrieMap.TrieMap<Nat, Bloctypes.Feedback>(Nat.equal, Hash.hash);
    var SQUAD_STORE = TrieMap.TrieMap<Text, Bloctypes.Squad>(Text.equal, Text.hash);
    var USER_TRACK_STORE = TrieMap.TrieMap<Principal, Bloctypes.UserTrack>(Principal.equal, Principal.hash);

    // var PAY_STORE = Buffer.Buffer<Bloctypes.PayrollHistory>(0);
    private var logData = Buffer.Buffer<Text>(0);
    private var accountData = Buffer.Buffer<AccountIdentifier>(0);
    // var NOTIFICATION_STOREs = Buffer.Buffer<Bloctypes.Notifications>(0);

    /// stabilizing the motoko backup
    system func preupgrade() {
        ProfileEntries := Iter.toArray(ProfileHashMap.entries());
        TournamentEntries := Iter.toArray(TournamentHashMap.entries());
        IDEntries := Iter.toArray(ID_STORE.entries());
        UserTrackEntries := Iter.toArray(USER_TRACK_STORE.entries());
        SquadEntries := Iter.toArray(SQUAD_STORE.entries());
        FeedbackEntries := Iter.toArray(FEED_BACK_STORE.entries());
        NotificationEntries := Iter.toArray(NOTIFICATION_STORE.entries());
        DailyRewardEntries := Iter.toArray(DailyRewardHashMap.entries());
        LockedAssetsEntries := Iter.toArray(LockedAssetsHashMap.entries());
        UpdatedUsersEntries := Iter.toArray(UpdatedUsersHashMap.entries());

        messageEntries := Iter.toArray(MessageHashMap.entries());
        BalanceEntries := Iter.toArray(BalanceHashMap.entries());

        // Passwords
        PasswordEntries := Iter.toArray(PASSWORD_STORE.entries());

        ReferralMapEntries := Iter.toArray(ReferralMap.entries());
        CodeToPrincipalMapEntries := Iter.toArray(CodeToPrincipalMap.entries());
        ReferrerMapEntries := Iter.toArray(ReferrerMap.entries());
        ReferralsMapEntries := Iter.toArray(ReferralsMap.entries());
    };

    // private stable var latestTransactionIndex : Nat = 0;

    system func postupgrade() {
        TournamentHashMap := HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
        ProfileHashMap := HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
        MessageHashMap := HashMap.fromIter<Nat, MessageEntry>(messageEntries.vals(), 10, Nat.equal, Hash.hash);
        BalanceHashMap := HashMap.fromIter<Principal, Bloctypes.UserBalance>(BalanceEntries.vals(), 10, Principal.equal, Principal.hash);
        NOTIFICATION_STORE := HashMap.fromIter<Principal, Bloctypes.Notifications>(NotificationEntries.vals(), 10, Principal.equal, Principal.hash);
        DailyRewardHashMap := HashMap.fromIter<Principal, Bloctypes.DailyClaim>(DailyRewardEntries.vals(), 10, Principal.equal, Principal.hash);
        LockedAssetsHashMap := HashMap.fromIter<Principal, Bloctypes.LockedAsset>(LockedAssetsEntries.vals(), 10, Principal.equal, Principal.hash);
        UpdatedUsersHashMap := HashMap.fromIter<Principal, User>(UpdatedUsersEntries.vals(), 10, Principal.equal, Principal.hash);

        ID_STORE := TrieMap.fromEntries<Text, Text>(IDEntries.vals(), Text.equal, Text.hash);
        SQUAD_STORE := TrieMap.fromEntries<Text, Bloctypes.Squad>(SquadEntries.vals(), Text.equal, Text.hash);
        USER_TRACK_STORE := TrieMap.fromEntries<Principal, Bloctypes.UserTrack>(UserTrackEntries.vals(), Principal.equal, Principal.hash);
        FEED_BACK_STORE := TrieMap.fromEntries<Nat, Bloctypes.Feedback>(FeedbackEntries.vals(), Nat.equal, Hash.hash);
        PASSWORD_STORE := TrieMap.fromEntries<Principal, Bloctypes.Access>(PasswordEntries.vals(), Principal.equal, Principal.hash);

        ReferralMap := HashMap.fromIter<Principal, Text>(ReferralMapEntries.vals(), 10, Principal.equal, Principal.hash);
        CodeToPrincipalMap := HashMap.fromIter<Text, Principal>(CodeToPrincipalMapEntries.vals(), 10, Text.equal, Text.hash);
        ReferrerMap := HashMap.fromIter<Principal, Principal>(ReferrerMapEntries.vals(), 10, Principal.equal, Principal.hash);
        ReferralsMap := HashMap.fromIter<Principal, [Principal]>(ReferralsMapEntries.vals(), 10, Principal.equal, Principal.hash);

        // clear the states
        ProfileEntries := [];
        UserTrackEntries := [];
        TournamentEntries := [];
        IDEntries := [];
        SquadEntries := [];
        FeedbackEntries := [];
        PasswordEntries := [];
        messageEntries := [];
        NotificationEntries := [];
        UpdatedUsersEntries := [];
        DailyRewardEntries := [];
        ReferralMapEntries := [];
        CodeToPrincipalMapEntries := [];
        ReferrerMapEntries := [];
        ReferralsMapEntries := [];  

    };

                                                  ////////////////////////////
                                                 /// Notification Feature ///
                                                ////////////////////////////
                                                
    type User = {
        email : Text;
        username : Text;
        principal : Principal
    };

    func makeNotification(id : Nat, body : Text, title : Text, user : Principal, username : Text, date : Text, read : Bool) : Bloctypes.Notification {
        { id; title; body; user; username; date; read }
    };

    func create_notification_panel(caller : Principal, _username : Text, _date : Text) : async () {
        let notification : Bloctypes.Notification = {
            id = 0;
            title = "Welcome to Game Bloc";
            body = "Hi " # _username # ", you have successfully created an account with Game Bloc!";
            user = caller;
            username = _username;
            date = _date;
            read = false
        };
        let notifications : Bloctypes.Notifications = {
            notifications = [notification];
            user = caller
        };
        NOTIFICATION_STORE.put(
            caller,
            notifications,
        )
    };

    public shared ({ caller }) func read_notification(caller : Principal, id : Nat) : async ?() {
        var notification = NOTIFICATION_STORE.get(caller);
        var updatedNotifications = Buffer.Buffer<Bloctypes.Notification>(0);
        switch (notification) {
            case (null) { null };
            case (?notfication) {
                // var newNotification = makeNotification(1, body, caller, "user", date, false);
                do ? {
                    var array = notfication.notifications;
                    for (_notification in Iter.fromArray(array)) {
                        if (_notification.id == id) {
                            let updatedNotif = {
                                id = _notification.id;
                                title = _notification.title;
                                body = _notification.body;
                                user = _notification.user;
                                username = _notification.username;
                                date = _notification.date;
                                read = true
                            };
                            updatedNotifications.add(updatedNotif)
                        };
                        if (_notification.id != id) {
                            updatedNotifications.add(_notification)
                        }
                    };
                    var _notifications : Bloctypes.Notifications = {
                        notifications = updatedNotifications.toArray();
                        user = caller
                    };
                    var updateNotification = NOTIFICATION_STORE.replace(caller, _notifications)
                }
            }
        }
        // switch(notfication)
    };

    public query func get_unread_notifications(caller : Principal) : async [Bloctypes.Notification] {
        var notifications = Buffer.Buffer<Bloctypes.Notification>(0);
        var unread_notifications = Buffer.Buffer<Bloctypes.Notification>(0);
        for ((principal, notification) in NOTIFICATION_STORE.entries()) {
            if (principal == caller) {
                var _notifications : [Bloctypes.Notification] = notification.notifications;
                // notifications.add(notification.notifications);
                for (notification in Iter.fromArray(_notifications)) {
                    if (notification.read == false) {
                        unread_notifications.add(notification)
                    }
                }
            }
        };
        return unread_notifications.toArray()
    };

    public query func get_read_notifications(caller : Principal) : async [Bloctypes.Notification] {
        var notifications = Buffer.Buffer<Bloctypes.Notification>(0);
        var read_notifications = Buffer.Buffer<Bloctypes.Notification>(0);
        for ((principal, notification) in NOTIFICATION_STORE.entries()) {
            if (principal == caller) {
                var _notifications : [Bloctypes.Notification] = notification.notifications;
                // notifications.add(notification.notifications);
                for (notification in Iter.fromArray(_notifications)) {
                    if (notification.read == true) {
                        read_notifications.add(notification)
                    }
                }
            }
        };
        return read_notifications.toArray()
    };


    public query func get_my_notifications(caller : Principal) : async [Bloctypes.Notifications] {
        var notifications = Buffer.Buffer<Bloctypes.Notifications>(0);
        for ((principal, notification) in NOTIFICATION_STORE.entries()) {
            if (principal == caller) {
                notifications.add(notification)
            }
        };
        notifications.toArray()
    };

    public query func get_notification_id(caller : Principal) : async Nat {
        var notification = NOTIFICATION_STORE.get(caller);
        var length = 0;
        switch (notification) {
            case (null) { 0 };
            case (?notification) {
                var array = notification.notifications;
                length := Array.size(array);
                return length
            }
        }
    };

    public func notify(title : Text, body : Text, caller : Principal, date : Text, id : Nat, user : Text) : async ?() {
        var notification = NOTIFICATION_STORE.get(caller);
        switch (notification) {
            case (null) { null };
            case (?notfication) {
                var id = await get_notification_id(caller);
                var newNotification = makeNotification(id + 1, title, body, caller, user, date, false);
                do ? {
                    var array = notfication.notifications;
                    var _notifications : Bloctypes.Notifications = {
                        notifications = Array.append(array, [newNotification]);
                        user = caller
                    };
                    var temp = NOTIFICATION_STORE.replace(caller, _notifications)
                }
            }
        }
    };

    // Function to register a new user with their email
    // * This function is used to register a new user with their email
    // * @param email The email of the user
    // * @return The principal of the user
    public shared ({ caller }) func updateUser(email : Text) : async Result.Result<(), Text> {
        switch (emails.get(email)) {
            case (?existingPrincipal) {
                return #err("Email is already in use \n If your email was stolen you can reach out to the admins or tribunal to resolve disputes")
            };
            case (null) {
                // * Email is probably unique
                switch (UpdatedUsersHashMap.get(caller)) {
                    case (?profile) {
                        return #err("Your profile is already up to date")
                    };
                    case (null) {
                        let user : User = {
                            email = email;
                            username = await get_username(caller);
                            principal = caller
                        };
                        // let subaccount = AccountIdentifierMops.defaultSubaccount();
                        // let accountIdentifier = AccountIdentifierMops.accountIdentifier(caller, subaccount);
                        emails.put(email, caller);
                        accountIdentifiers.put(
                            AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null)),
                            caller,
                        );
                        UpdatedUsersHashMap.put(caller, user);
                        return #ok(())
                    }
                }
            }
        }
    };

    // Function to get user's mail
    // * This function is used to get the email of a user
    // * @param userPrincipal The principal of the user
    // * @return The email of the user
    public query func getUserEmail(userPrincipal : Principal) : async ?Text {
        let user = UpdatedUsersHashMap.get(userPrincipal);
        switch (user) {
            case (?u) { ?u.email };
            case (null) { null }
        }
    };

    // Function to get user's mail
    // * This function is used to get the email of a user
    // * @param userPrincipal The principal of the user
    // * @return The email of the user
    public query func getUserMail(_caller : Principal) : async ?User {
        return UpdatedUsersHashMap.get(_caller)
    };

    // Function to get user's mail
    // * This function is used to get the email of a user
    // * @param userPrincipal The principal of the user
    // * @return The email of the user
    public query func isEmailRegistered(email : Text) : async Bool {
        switch (emails.get(email)) {
            case (?principal) { true };
            case (null) { false }
        }
    };

    // Function to get user's mail
    // * This function is used to get the email of a user
    // * @param userPrincipal The principal of the user
    // * @return The email of the user
    public query ({ caller }) func isUserUpdated() : async Bool {
        switch (UpdatedUsersHashMap.get(caller)) {
            case (?user) true;
            case (null) false
        }
    };


                                                  ////////////////////////////
                                                 ///     DEPOSIT ICP      ///
                                                ////////////////////////////

    type DepositDetails = {
        accountNumber : Text;
        bankName : Text;
        currency : Text;
        amount : Nat;
        narration : Text;
        notice : Text
    };

    public query ({ caller }) func iWantToDeposit(_amount : Nat) : async DepositDetails {
        return {
            accountNumber = "0494721886";
            bankName = "GTBank";
            currency = "Naira";
            amount = _amount;
            narration = Principal.toText(caller);
            notice = "Please, make sure that the details are as writen above. Especially the narration or reference. Please copy and paste the right narration"
        }
    };

    public shared ({ caller }) func confirmDeposit(amount : Nat, time : Text) : async Text {
        await sendNotification(
            "New ICP Deposit Confirmation",
            "User with Principal: " # Principal.toText(caller) # " has initiated a deposit of " # Nat.toText(amount) # " Naira.\nPlease verify the payment and fund their wallet.\n\nTimestamp: " # time,
            "successaje7@gmail.com",
        );

        return "Deposit confirmation sent to admin. Please await deposit"
    };

    public shared ({ caller }) func confirmDepositViaVariables(amount : Nat, time : Text) : async Text {
        let subject : Text = "New ICP Deposit Confirmation";
        let body : Text = "User with Principal: " # Principal.toText(caller) #
        " has initiated a deposit of " # Nat.toText(amount) #
        " Naira.\nPlease verify the payment and fund their wallet.\n\nTimestamp: " # time;
        let receiver_email : Text = "successaje7@gmail.com";
        await sendNotification(
            subject,
            body,
            receiver_email,
        );

        return "Deposit confirmation sent to admin. Please await deposit"
    };


    public shared ({ caller }) func confirmDepositViaParams(_subject : Text, _body : Text, _receiver_email : Text) : async () {
        try {
            await sendNotification(
                _subject,
                _body,
                _receiver_email,
            )
        } catch err {
            throw (err)
        }
    };

    public query func getAllUsers() : async [(Principal, User)] {
        Iter.toArray(UpdatedUsersHashMap.entries())
    };

    //
    // Ledger Canister
    //

    // Check 2
    public shared ({ caller }) func disbursePayment(id : Text, icp_price : Nat) : async () {
        // Tournamnet Id
        // var mod = await is_mod(caller);
        var tournament = await get_tournament(id);

        // * Required variables for the switch cases
        var winners = tournament.winners;
        var ended = tournament.ended;

        Debug.print(debug_show ("Checking tournamnet Status...."));

        // * Check if tournamnet has ended
        switch (ended) {
            case (null) {};
            case (?(ended)) {
                if (ended == false) {
                    throw Error.reject("Warning! Tournament has to end before the payment can be initiated!")
                }
            }
        };

        Debug.print(debug_show ("Tournament Status checked...."));

        // func fail() : async () {
        //     Debug.trap("Something is happening here");
        // };

        // ? OR should i use the transfer_From feature.
        // * That would probably require series of approvals, mendokseee
        // TODO: Test this function's automated feat
        try {
            if (await is_mod(caller)) {

                switch (winners) {
                    case (null) {
                        throw Error.reject("You cannot initiate payment to winners that has not been set!")
                    };
                    case (?(winners)) {
                        for (winner in Iter.fromArray(winners)) {

                            // ? var account = tournament.winners.
                            Debug.print(debug_show ("Starting the transfer...."));
                            // var _account = pay.account;
                            var block = await ICPLedger.icrc2_transfer_from({
                                to = {
                                    owner = Principal.fromText(winner.user_account);
                                    subaccount = null
                                };
                                fee = null;
                                spender_subaccount = null;
                                from = {
                                    owner = gbc_admin;
                                    subaccount = null
                                };
                                memo = null;
                                created_at_time = ?Nat64.fromIntWrap(Time.now());
                                amount = (winner.amount * 10_000_000_000) / icp_price
                            });
                            Debug.print(debug_show (block));
                            Debug.print(debug_show ("Ending the transfer...."))
                        }
                    }
                }
            }
        } catch err {
            throw (err)
        }
    };

    

    // Using the caller
    public shared ({ caller }) func getLedgerBalance() : async Result.Result<Nat, Text> {
        try {
            let balance : Nat = await ICPLedger.icrc1_balance_of({
                owner = caller;
                subaccount = null
            });
            return #ok(balance)
        } catch (err) {
            return #err(Error.message(err))
        }
    };

    // using the canister
    public func getCanisterLedgerBalance() : async Result.Result<Nat, Text> {
        try {
            let balance : Nat = await ICPLedger.icrc1_balance_of({
                owner = userCanisterId;
                subaccount = null
            });
            return #ok(balance)
        } catch (err) {
            return #err(Error.message(err))
        }
    };

    type ICP = {
        e8s : Nat64
    };

    public shared ({ caller }) func icp_balance() : async ICP {
        await ICPLedger.account_balance_dfx({
            account = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null))
        })
    };

    public shared ({ caller }) func getKitchenBalance() : async ICP {
        await ICPLedger.account_balance_dfx({
            account = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(Principal.fromActor(this), null))
        })
    };

    // Required to be parsed as an argument
    public func getAccountLedgerBalance(user : Text) : async Result.Result<Nat, Text> {
        try {
            let balance : Nat = await ICPLedger.icrc1_balance_of({
                owner = Principal.fromText(user);
                subaccount = null
            });
            return #ok(balance)
        } catch (err) {
            return #err(Error.message(err))
        }
    };


      
///-------      -------     -------     -------     -------     -------     -------     -------     -------///



                                                  ////////////////////////////
                                                 ///    Profile Feature   ///
                                                ////////////////////////////


    func createOneProfile(id_hash : Text, age : Nat8, username : Text, attendance : ?Nat8, losses : ?Nat8, referral_id : ?Text, caller : Principal, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role) {
        // let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
        ProfileHashMap.put(caller, makeProfile(id_hash, age, Int.toText(Time.now()), 0, attendance, referral_id, losses, 0, false, #Online, username, Principal.toText(caller), AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null)), Principal.toText(userCanisterId), "", points, role))
    };

    public shared ({ caller }) func createprofile(id_hash : Text, age : Nat8, username : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role, referral_id : ?Text) : async Result.Result<Text, Text> {
        // call the balnce function to get and set the balance of newly registered users
        let balance = 10;
        let checkUsername = usernameChecker(username);

        if (checkUsername == false) {
            #err("This username exist! Please enter another")
        } else {
            createOneProfile(id_hash, age, username, ?0, ?0, referral_id, caller, points, role);
            #ok("You have successfully created an account")
        }
    };

    func createProfile(id_hash : Text, age : Nat8, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role, referral_id : ?Text) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, ?0, referral_id, ?0, 0, false, status, username, principal_id, account_id, canister_id, squad_badge, points, role);
        await RustBloc.create_profile(profile, caller)
    };

    public shared ({ caller }) func createUserProfile(id_hash : Text, age : Nat8, username : Text, time : Text, squad_badge : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role, referral_id : ?Text, email : Text) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, time, 0, ?0, referral_id, ?0, 0, false, #Online, username, Principal.toText(caller), await getAccountIdentifier(caller), Principal.toText(userCanisterId), squad_badge, points, role);
        try {
            await create_usertrack(caller);
            await create_notification_panel(caller, username, time);
            ProfileHashMap.put(caller, profile);
            // Call sendNotification function after successful profile creation

            let subject : Text = "Welcome to GameBloc!";
            let body : Text = "Hello " # username # ",\n\nYour GameBloc profile has been successfully created. Enjoy your gaming journey!";

            // await sendNotification(subject, body, email);
            let user : User = {
                email = email;
                username = await get_username(caller);
                principal = caller
            };
            ignore await updateReferralCode(caller);
            UpdatedUsersHashMap.put(caller, user);


            return await RustBloc.create_profile(profile, caller)
        } catch err {
            throw (err)
        }
    };

    func usernameChecker(username : Text) : Bool {
        var unique = true;
        for ((i, j) in ProfileHashMap.entries()) {
            if (j.username == username) {
                unique := false
            }
        };
        unique
    };



    public func logIn(caller : Principal) : async Bool {
        var result = ProfileHashMap.get(caller);
        switch (result) {
            case null {
                return false
            };
            case (?(_)) {
                return true
            }
        }
    };

    public shared ({ caller }) func createUser(user : Principal) : async Principal {
        assert (caller == userCanisterId);
        userCanisterId := user;
        await getOwner()
    };

    func makeProfile(id_hash : Text, age : Nat8, date : Text, wins : Nat8, attendance : ?Nat8, referral_id : ?Text, losses : ?Nat8, tournaments_created : Nat8, is_mod : Bool, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role) : Bloctypes.UserProfile {
        {
            id_hash;
            age;
            date;
            status;
            wins;
            attendance;
            losses;
            tournaments_created;
            username;
            is_mod;
            role;
            principal_id;
            account_id;
            canister_id;
            squad_badge;
            points;
            referral_id
        }
    };

    public func getUser(caller : Principal) : async ?Bloctypes.UserProfile {
        ProfileHashMap.get(caller)
    };

    public query func get_username(caller : Principal) : async Text {
        let profile = ProfileHashMap.get(caller);
        switch (profile) {
            case (null) {
                return "Anonymous user"
            };
            case (?profile) {
                return profile.username
            }
        }
    };

    type TournamentAccount = Bloctypes.TournamentAccount;

    // private let ic : IC.Self = actor "aaaaa-aa";

    public query func getOwnerCanister() : async Principal {
        userCanisterId
    };

    public query ({ caller }) func getOwner() : async Principal {
        caller
    };

    // Notify icp deposits
    // public shared ({ caller }) func newTransactions(_length : Nat64) : async () {
    //     let newTransactions = await ICPLedger.query_blocks({
    //         start = lastCheckedBlock;
    //         length = _length;
    //     });

    // };

    stable var lastCheckedBlock : Nat64 = 0;

    // Conversions

    public func convert() : async Principal {
        Principal.fromText("rnyh2-lbh6y-upwtx-3wazz-vafac-2hkqs-bxz2t-bo45m-nio7n-wsqy7-dqe")
    };

    public query ({ caller }) func convertAID() : async Text {
        AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null))
    };

    public query ({ caller }) func getMyAccountIdentifier() : async Text {
        AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null))
    };

    public func getAccountIdentifier(caller : Principal) : async Text {
        return AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null))
    };

    public func getCanisterAccountIdentifier() : async Text {
        return AccountIdentifier.toText(AccountIdentifier.fromPrincipal(userCanisterId, null))
    };

    public type AccountIdentifier = [Nat8];

    public func getRealAccountIdentifier(caller : Text) : async Result.Result<AccountIdentifier, Text> {
        AccountIdentifier.fromText(caller)
    };


///-------      -------     -------     -------     -------     -------     -------     -------     -------///


                                                  /////////////////////////////
                                                 ///   Messaging Feature   ///
                                                /////////////////////////////

    public type MessageEntry = {
        f_id : Text;
        id : Nat;
        sender : Principal;
        username : Text;
        body : Text;
        time : Text
    };

    type Message = {
        f_id : Text;
        id : ?Nat;
        sender : Principal;
        username : Text;
        body : Text;
        time : Text
    };

    var messages : [Message] = [];

    public shared ({ caller }) func sendMessage2(body : Text, time : Text, username : Text, f_id : Text) : async MessageEntry {
        var sent : Bool = false;
        var newMessage : MessageEntry = createMessage(messageID, f_id, username, caller, body, time);
        MessageHashMap.put(messageID, newMessage);
        messageID := messageID + 1;
        await update_messages_sent(caller);

        sent := true;
        return newMessage
    };

    public shared ({ caller }) func sendMessage(body : Text, time : Text, username : Text, f_id : Text) : async () {
        var sent : Bool = false;
        var newMessage : MessageEntry = createMessage(messageID, f_id, username, caller, body, time);
        MessageHashMap.put(messageID, newMessage);
        messageID := messageID + 1;
        await update_messages_sent(caller);

        sent := true;
        return ()
    };

    func createMessage(id : Nat, f_id : Text, username : Text, sender : Principal, body : Text, time : Text) : MessageEntry {
        {
            id;
            f_id;
            username;
            sender;
            body;
            time
        }
    };

    public query func getMessage(id : Nat) : async ?MessageEntry {
        MessageHashMap.get(id)
    };

    public query func getMessages(from : Nat, to : Nat) : async [MessageEntry] {
        // var checkForConnection = await checkConnection(account, caller);
        //  if (checkForConnection == true) {
        var msgs = Buffer.Buffer<MessageEntry>(0);
        for ((i, j) in MessageHashMap.entries()) {
            if ((j.id >= from) and (j.id <= to)) {
                msgs.add(j)
            }
        };
        msgs.toArray();
        //  }
    };

    public query func getAllMessages() : async [(Nat, MessageEntry)] {
        Iter.toArray(MessageHashMap.entries())
    };

    public query func getUpdatedMessages(check : Nat) : async [MessageEntry] {
        // var checkForConnection = await checkConnection(account, caller);
        //  if (checkForConnection == true) {
        var msgs = Buffer.Buffer<MessageEntry>(0);
        var len = MessageHashMap.size();
        var pip : Int = len - check;
        if (pip < 0) {
            var msgs = Buffer.Buffer<MessageEntry>(0);
            for ((i, j) in MessageHashMap.entries()) {
                msgs.add(j)
            };
            return msgs.toArray()
        } else {
            for ((i, j) in MessageHashMap.entries()) {
                if ((j.id >= pip) and (j.id <= len)) {
                    msgs.add(j)
                }
            };
            return msgs.toArray()
        }
    };


///-------      -------     -------     -------     -------     -------     -------     -------     -------///


                                                  /////////////////////////////
                                                 ///   Helper functions    ///
                                                /////////////////////////////

     public query func transform(raw : HTTP.TransformArgs) : async HTTP.CanisterHttpResponsePayload {
        let transformed : HTTP.CanisterHttpResponsePayload = {
            status = raw.response.status;
            body = raw.response.body;
            headers = [
                {
                    name = "Content-Security-Policy";
                    value = "default-src 'self'"
                },
                { name = "Referrer-Policy"; value = "strict-origin" },
                { name = "Permissions-Policy"; value = "geolocation=(self)" },
                {
                    name = "Strict-Transport-Security";
                    value = "max-age=63072000"
                },
                { name = "X-Frame-Options"; value = "DENY" },
                { name = "X-Content-Type-Options"; value = "nosniff" },
            ]
        };
        transformed
    };

    func cleaner(text : Text) : Text {
        let replacements = [
            ("\\", "\\\\"),
            ("\"", "\\\""),
            ("\n", "\\n"),
            ("\t", "\\t"),
            ("\r", "\\r"),
        ];
        var result = text;
        for ((search, replace) in replacements.vals()) {
            result := Text.replace(result, #text search, replace)
        };
        return result
    };

    func merge(left : [(Principal, Nat, Text)], right : [(Principal, Nat, Text)]) : [(Principal, Nat, Text)] {
        var result : [(Principal, Nat, Text)] = [];
        var i = 0;
        var j = 0;
        while (i < left.size() and j < right.size()) {
            if (left[i].1 >= right[j].1) {
                result := Array.append(result, [left[i]]);
                i += 1
            } else {
                result := Array.append(result, [right[j]]);
                j += 1
            }
        };
        while (i < left.size()) {
            result := Array.append(result, [left[i]]);
            i += 1
        };
        while (j < right.size()) {
            result := Array.append(result, [right[j]]);
            j += 1
        };
        result
    };

    func mergeSort(arr : [(Principal, Nat, Text)]) : [(Principal, Nat, Text)] {
        if (arr.size() <= 1) return arr;
        let mid = arr.size() / 2;
        let left = mergeSort(Array.subArray(arr, 0, mid));
        let right = mergeSort(Array.subArray(arr, mid, arr.size() - mid));
        merge(left, right)
    };



                                                  /////////////////////////////
                                                 ///     HTTP OUTCALLS     ///
                                                /////////////////////////////

   

    let external_url = "https://notifier-4l85.onrender.com/send-email";

    // function to get User data from Clash Royale
    public func getUserFromClashRoyale(ingameUserName : Text) : async Result.Result<Text, Text> {

        let requestBodyJson : Text = "{ \"ingameUserName\": \"" # ingameUserName # "\"}";
        let requestBodyAsBlob : Blob = Text.encodeUtf8(requestBodyJson);
        let requestBodyAsNat8 : [Nat8] = Blob.toArray(requestBodyAsBlob);

        let transform_context : HTTP.TransformContext = {
            function = transform;
            context = Blob.fromArray([])
        };

        let http_request = {
            url = "https://notifier-4l85.onrender.com/players/" # ingameUserName;
            max_response_bytes = null;
            headers = [
                { name = "Content-Type"; value = "application/json" },
            ];
            body = null; //requestBodyAsNat8;
            method = #get;
            transform = ?transform_context
        };

        Cycles.add(1_703_096_680);

        let httpResponse : HTTP.HttpResponsePayload = await ic.http_request(http_request);

        let decoded_text : Text = switch (Text.decodeUtf8(Blob.fromArray(httpResponse.body))) {
            case (null) { "No value returned" };
            case (?y) { y }
        };
        let json = switch (JSON.parse(decoded_text)) {
            case (#ok(parsed)) { parsed };
            case (#err(_)) { throw Error.reject("Error parsing JSON: ") }
        };

        return #ok(JSON.stringify(json, null))
    };

    // function to get User data from Clash Royale
    public func getPlayerUpcomingChests(playerTag : Text) : async Result.Result<Text, Text> {

        let transform_context : HTTP.TransformContext = {
            function = transform;
            context = Blob.fromArray([])
        };

        let http_request = {
            url = "https://api.clashroyale.com/v1/players/" # playerTag # "/upcomingchests";
            headers = [{ name = "Content-Type"; value = "application/json" }];
            max_response_bytes = null;
            body = null;
            method = #get;
            transform = ?transform_context
        };

        Cycles.add(80_000_000);

        let httpResponse : HTTP.HttpResponsePayload = await ic.http_request(http_request);

        let decoded_text : Text = switch (Text.decodeUtf8(Blob.fromArray(httpResponse.body))) {
            case (null) { "No value returned" };
            case (?y) { y }
        };

        let json = switch (JSON.parse(decoded_text)) {
            case (#ok(parsed)) { parsed };
            case (#err(_)) { throw Error.reject("Error parsing JSON: ") }
        };

        return #ok(JSON.stringify(json, null));

    };

    // function to get User tournaments from Clash Royale
    public func searchForClashRoyaleTournaments(name : ?Text, limit : ?Nat, after : ?Text, before : ?Text) : async Result.Result<Text, Text> {

        var requestBodyJson : Text = "{";
        switch (name) {
            case (null) {};
            case (?name) {
                requestBodyJson := requestBodyJson # "\"name\": \"" # name # "\","
            }
        };
        switch (limit) {
            case (null) {};
            case (?limit) {
                requestBodyJson := requestBodyJson # "\"limit\": " # Nat.toText(limit) # ","
            }
        };
        switch (after) {
            case (null) {};
            case (?after) {
                requestBodyJson := requestBodyJson # "\"after\": \"" # after # "\","
            }
        };
        switch (before) {
            case (null) {};
            case (?before) {
                requestBodyJson := requestBodyJson # "\"before\": \"" # before # "\","
            }
        };
        requestBodyJson := requestBodyJson # "}";
        let requestBodyAsBlob : Blob = Text.encodeUtf8(requestBodyJson);
        let requestBodyAsNat8 : [Nat8] = Blob.toArray(requestBodyAsBlob);

        let http_request = {
            url = "https://notifier-4l85.onrender.com/tournaments";
            headers = [{ name = "Content-Type"; value = "application/json" }];
            body = ?requestBodyAsNat8;
            max_response_bytes = ?Nat64.fromNat(10000);
            method = #get;
            transform = ?{
                function = transform;
                context = Blob.fromArray([])
            }
        };

        Cycles.add(80_000_000);

        let httpResponse : HTTP.HttpResponsePayload = await ic.http_request(http_request);

        let decoded_text : Text = switch (Text.decodeUtf8(Blob.fromArray(httpResponse.body))) {
            case (null) { "No value returned" };
            case (?y) { y }
        };

        let json = switch (JSON.parse(decoded_text)) {
            case (#ok(parsed)) { parsed };
            case (#err(_)) { throw Error.reject("Error parsing JSON: ") }
        };

        return #ok(JSON.stringify(json, null))
    };

    // function to send email notifications
    public func sendNotification(subject : Text, body : Text, receiver_email : Text) : async () {
        let ic : HTTP.IC = actor ("aaaaa-aa");

        let cleanSubject = cleaner(subject);
        let cleanBody = cleaner(body);
        let cleanEmail = cleaner(receiver_email);

        let requestBodyJson : Text = "{ \"to\": \"" # cleanEmail # "\", \"subject\": \"" # cleanSubject # "\", \"body\": \"" # cleanBody # "\"}";
        let requestBodyAsBlob : Blob = Text.encodeUtf8(requestBodyJson);
        let requestBodyAsNat8 : [Nat8] = Blob.toArray(requestBodyAsBlob);

        let transform_context : HTTP.TransformContext = {
            function = transform;
            context = Blob.fromArray([])
        };

        // Setup request
        let httpRequest : HTTP.HttpRequestArgs = {
            url = "https://notifier-4l85.onrender.com/send-email";
            max_response_bytes = ?Nat64.fromNat(1000);
            headers = [
                { name = "Content-Type"; value = "application/json" },
            ];
            body = ?requestBodyAsNat8;
            method = #post;
            transform = ?transform_context
        };

        Cycles.add(80_000_000);

        // Send the request
        let httpResponse : HTTP.HttpResponsePayload = await ic.http_request(httpRequest);

        // Check the response
        if (httpResponse.status > 299) {
            let response_body : Blob = Blob.fromArray(httpResponse.body);
            let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
                case (null) { "No value returned" };
                case (?y) { y }
            };
            throw Error.reject("Error sending notification: " # decoded_text)
        } else {
            Debug.print("Notification sent")
        }
    };
    

    public func testNotification() : async () {
        await sendNotification("Local Testing", "This is just local testing \n Lets see how this is shown or displayed \n \n \n \n Yours", "successaje7@gmail.com")
    };

///-------      -------     -------     -------     -------     -------     -------     -------     -------///



    public func whoami() : async Principal {
        Principal.fromActor(this)
    };


                                                  /////////////////////////////
                                                 ///    REWARD FEATURES    ///
                                                /////////////////////////////
    

    private func activateDailyClaims(caller : Principal) : async () {
        let initialPoint = 1;
        DailyRewardHashMap.put(
            caller,
            {
                user = caller;
                streakTime = Int.abs(Time.now());
                streakCount = 1;
                highestStreak = 1;
                pointBalance = initialPoint
            },
        );
        let tracker = USER_TRACK_STORE.get(caller);
        if (tracker == null) {
            await create_usertrack(caller)
        };
        await update_point(caller, initialPoint)
    };

    public shared ({ caller }) func claimToday() : async () {
        var today = DailyRewardHashMap.get(caller);
        switch (today) {
            case (null) {
                // await create_usertrack(caller);
                await activateDailyClaims(caller)
            };
            case (?today) {
                // Checks if countdown is complete
                if (((today.streakTime + day) <= Int.abs(Time.now())) and (Int.abs(Time.now()) < (today.streakTime + (2 * day)))) {
                    var point = today.streakCount + 1;
                    var claimed = {
                        user = today.user;
                        streakTime = Int.abs(Time.now());
                        streakCount = point;
                        highestStreak = if (point > today.highestStreak) {
                            point
                        } else { today.highestStreak };
                        pointBalance = today.pointBalance + point
                    };
                    ignore DailyRewardHashMap.replace(caller, claimed);
                    Debug.print("Updating point..");
                    await update_point(caller, point);
                    Debug.print(debug_show ("Updated point.."))
                } else if (Int.abs(Time.now()) >= (today.streakTime + (2 * day))) {
                    await resetClaims(caller);
                    Debug.print(debug_show ("Lost streak, streak count resetted"))
                } else {
                    Debug.print("Claim already made today. Try again tomorrow!");
                    throw Error.reject("You have already claimed today, try again later")
                }
            }
        }
    };

    func resetClaims(caller : Principal) : async () {
        var today = DailyRewardHashMap.get(caller);
        switch (today) {
            case (null) {};
            case (?today) {
                var claimed = {
                    user = today.user;
                    streakTime = Int.abs(Time.now());
                    streakCount = 1;
                    highestStreak = today.highestStreak;
                    pointBalance = today.pointBalance + 1; // Add 1 point for the day after reset
                };
                await update_point(caller, 1);
                ignore DailyRewardHashMap.replace(caller, claimed)
            }
        }
    };

    private func update_point(caller : Principal, point : Nat) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {
                USER_TRACK_STORE.put(
                    caller,
                    {
                        user = caller;
                        tournaments_created = 0;
                        wager_participated = 0;
                        tournaments_joined = 0;
                        tournaments_won = 0;
                        messages_sent = 0;
                        feedbacks_sent = 0;
                        total_point = point
                    },
                )
            };
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    wager_participated = tracker.wager_participated;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.total_point + point
                };
                ignore USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public shared ({ caller }) func getMyPoints() : async Nat {
        var activity = DailyRewardHashMap.get(caller);
        switch (activity) {
            case (null) {
                return 0
            };
            case (?activity) {
                return activity.pointBalance
            }
        }
    };

    public shared ({ caller }) func getStreakTime() : async Nat {
        var activity = DailyRewardHashMap.get(caller);
        switch (activity) {
            case (null) {
                return 0
            };
            case (?activity) {
                return activity.streakTime; // In epoch time
            }
        }
    };

    public shared ({ caller }) func getMyStreakCount() : async Nat {
        var activity = DailyRewardHashMap.get(caller);
        switch (activity) {
            case (null) {
                return 0
            };
            case (?activity) {
                return activity.streakCount
            }
        }
    };

    func create_usertrack(caller : Principal) : async () {
        USER_TRACK_STORE.put(
            caller,
            {
                user = caller;
                tournaments_created = 0;
                wager_participated = 0;
                tournaments_joined = 0;
                tournaments_won = 0;
                messages_sent = 0;
                feedbacks_sent = 0;
                total_point = 1
            },
        )
    };

    private func update_tournaments_created(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created + 10;
                    wager_participated = tracker.wager_participated;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.total_point + 10
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public func update_wagers_participated(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    wager_participated = tracker.wager_participated + 10;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.total_point + 10
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    private func update_tournaments_joined(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined + 2;
                    wager_participated = tracker.wager_participated;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.total_point + 2
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    private func update_feedbacks_sent(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined;
                    wager_participated = tracker.wager_participated;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent + 1;
                    total_point = tracker.total_point + 1
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    private func update_tournaments_won(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined;
                    wager_participated = tracker.wager_participated;
                    tournaments_won = tracker.tournaments_won + 2;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.total_point + 2
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    private func update_messages_sent(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined;
                    wager_participated = tracker.wager_participated;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent + 1;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.total_point + 1
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public query func get_point_track(caller : Principal) : async Nat {
        var tracker = USER_TRACK_STORE.get(caller);
        var temporary_point = 0;
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                temporary_point := tracker.total_point
            }
        };
        return temporary_point
    };

    public shared ({ caller }) func allocatePoint(recipient : Principal, _point : Nat) : async () {
        if (await is_mod(caller)) {
            var tracker = USER_TRACK_STORE.get(recipient);
            switch (tracker) {
                case (null) {};
                case (?tracker) {
                    var update = {
                        user = tracker.user;
                        tournaments_created = tracker.tournaments_created;
                        tournaments_joined = tracker.tournaments_joined;
                        wager_participated = tracker.wager_participated;
                        tournaments_won = tracker.tournaments_won;
                        messages_sent = tracker.messages_sent;
                        feedbacks_sent = tracker.feedbacks_sent;
                        total_point = tracker.total_point + _point
                    };
                    var updated = USER_TRACK_STORE.replace(recipient, update)
                }
            }
        } else {
            throw Error.reject(
                "You are not authorised to make this action!\n
            You imposter, you dissappoint me! tueh!"
            )
        }
    };

    private func reset_point_tracker(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined;
                    wager_participated = tracker.wager_participated;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = 0
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public func allocateUserPoint(caller : Principal, point : Nat) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    wager_participated = tracker.wager_participated;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.total_point + point
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public func burn_user_point(caller : Principal, _point : Nat, access : Text) : async () {

        if (access == "operator may trap for inferred type") {
            var tracker = USER_TRACK_STORE.get(caller);
            switch (tracker) {
                case (null) {};
                case (?tracker) {
                    if (tracker.total_point > _point) {
                        var update = {
                            user = tracker.user;
                            tournaments_created = tracker.tournaments_created;
                            tournaments_joined = tracker.tournaments_joined;
                            wager_participated = tracker.wager_participated;
                            tournaments_won = tracker.tournaments_won;
                            messages_sent = tracker.messages_sent;
                            feedbacks_sent = tracker.feedbacks_sent;
                            total_point = tracker.total_point - _point
                        };
                        var updated = USER_TRACK_STORE.replace(caller, update)
                    } else {
                        throw Error.reject("Not enough balance to perform action!")
                    }
                }
            }
        } else {
            throw Error.reject("You are not allowed to perform this operation")
        }
    };

    public query func get_user_point(caller : Principal) : async Nat {
        var tracker = USER_TRACK_STORE.get(caller);
        var point = 0;
        for ((i, j) in USER_TRACK_STORE.entries()) {
            if (i == caller) {
                point := j.total_point
            }
        };
        return point
    };

///-------      -------     -------     -------     -------     -------     -------     -------     -------///



                                                  /////////////////////////////
                                                 ///     LEADERBOARDS      ///
                                                /////////////////////////////


    public func get_point_leadersboard() : async [(Principal, Nat, Text)] {
        var leaderboard : [(Principal, Nat, Text)] = []; //Array.init<[(Principal, Nat)]>();
        for ((key, value) in USER_TRACK_STORE.entries()) {
            leaderboard := Array.append(leaderboard, [(key, value.total_point, await getUsername(key))])
        };
        return mergeSort(leaderboard)
    };

    public query func get_point_leadersboard_fast() : async [(Principal, Nat, Text)] {
        var leaderboard : [(Principal, Nat, Text)] = []; //Array.init<[(Principal, Nat)]>();
        for ((key, value) in USER_TRACK_STORE.entries()) {
            var profile = ProfileHashMap.get(key);
            switch (profile) {
                case (null) {
                    leaderboard := Array.append(leaderboard, [(key, value.total_point, "Anonymous User GBC")])
                };
                case (?profile) {
                    leaderboard := Array.append(leaderboard, [(key, value.total_point, profile.username)])
                }
            }
        };
        return mergeSort(leaderboard)
    };


///-------      -------     -------     -------     -------     -------     -------     -------     -------///

    

                                                  /////////////////////////////
                                                 ///    FEEDBACK FEATURES  ///
                                                /////////////////////////////

    

    public shared ({ caller }) func send_feedback(content : Text, title : Text, time : Text) : async () {
        await update_feedbacks_sent(caller);
        FEED_BACK_STORE.put(
            feedback_id,
            {
                id = feedback_id;
                title = title;
                user = caller;
                content = content;
                time = time;
                read = false
            },
        );
        feedback_id := feedback_id + 1
    };

    public query func get_feedback(id : Nat) : async ?Bloctypes.Feedback {
        FEED_BACK_STORE.get(id)
    };

    public query func get_unread_feedbacks() : async ?[Bloctypes.Feedback] {
        do ? {
            var buffer = Buffer.Buffer<Bloctypes.Feedback>(0);
            for ((i, j) in FEED_BACK_STORE.entries()) {
                if (j.read == true) {
                    buffer.add(j)
                }
            };
            buffer.toArray()
        }
    };

    public query func get_all_feedback() : async [Bloctypes.Feedback] {
        var buffer = Buffer.Buffer<Bloctypes.Feedback>(0);
        for ((i, j) in FEED_BACK_STORE.entries()) {
            buffer.add(j)
        };
        buffer.toArray()
    };


                                                  //////////////////////////////////
                                                 ///    TOURNAMENT MANAGEMENT    ///
                                                ///////////////////////////////////

    // public type Subaccount = [Nat8];
    // public type Account = { owner : Principal; subaccount : ?Subaccount };

    public shared ({ caller }) func create_tournament(tournamentAccount : Bloctypes.TournamentAccount, icp_price : Nat) : async Bloctypes.Result {
        if (icp_price == 0) {
            throw Error.reject("Cannnot fetch ICP price at the moment, please check app later....")
        } else {
            try {

                await update_tournaments_created(caller);
                TournamentHashMap.put(caller, tournamentAccount);
                var fromPrincipal = await getUserPrincipal(tournamentAccount.creator);

                var toAccount : LedgerTypes.Account = {
                    owner = gbc_admin;
                    subaccount = null
                };

                var fromAccount : LedgerTypes.Account = {
                    owner = fromPrincipal;
                    subaccount = null
                };

                var multiplier = 1;
                var _amount = 0;

                if (Text.toUppercase(tournamentAccount.game_type) == "SQUAD") {
                    multiplier := 4
                } else if (Text.toUppercase(tournamentAccount.game_type) == "DUO") {
                    multiplier := 2
                };

                if (tournamentAccount.tournament_type == #Crowdfunded) {

                    var entry = tournamentAccount.entry_fee;

                    switch (entry) {
                        case (null) {
                            throw Error.reject("The entry fee for a Crowdfunding tournament cannot be empty!")
                        };
                        case (?entry) {
                            try {
                                // var actual_price = amount / icp_price;
                                var result = await ICPLedger.icrc2_transfer_from({
                                    to = {
                                        owner = gbc_admin;
                                        subaccount = null
                                    };
                                    fee = null;
                                    spender_subaccount = null;
                                    from = {
                                        owner = fromPrincipal;
                                        subaccount = null
                                    };
                                    memo = null;
                                    created_at_time = ?Nat64.fromIntWrap(Time.now());
                                    // * since the price is in hundreds to bypass the datatype restrictions
                                    amount = (entry * multiplier * 10_000_000_000) / (icp_price); //In USD
                                });
                                // await notify("Tournament created successfully", "Your crowdfunded tournament has been successfully created", caller, Nat64.toText(Nat64.fromIntWrap(Time.now())), await get_notification_id(caller), tournamentAccount.creator);
                                _amount := (entry * multiplier * 10_000_000_000) / (icp_price);

                            } catch (err) {
                                throw Error.reject("There is an issue wih the transfer")
                            }
                        }
                    }
                } else {
                    //Should be #prepaid
                    var result = await ICPLedger.icrc2_transfer_from({
                        to = {
                            owner = gbc_admin;
                            subaccount = null
                        };
                        fee = null;
                        spender_subaccount = null;
                        from = {
                            owner = fromPrincipal;
                            subaccount = null
                        };
                        memo = null;
                        created_at_time = ?Nat64.fromIntWrap(Time.now());
                        // * since the price is in hundreds to bypass the datatype restrictions
                        amount = ((tournamentAccount.total_prize * 10_000_000_000) / icp_price)
                    });
                    _amount := ((tournamentAccount.total_prize * 10_000_000_000) / icp_price)
                };

                var result = await RustBloc.create_tournament(tournamentAccount);
                // TODO: Notify the users, fix date, notify deposit and withdrawals
                // ? Is approval notifications really necessary though
                // await notify("ICP Withdrawal Request Processed", "Dear " # tournamentAccount.creator # ",\n
                //     Your request to withdraw "# Nat.toText(_amount) # " ICP from your Gamebloc account has been successfully processed. The funds should now be available in the destination wallet.\n
                //     If you encounter any issues or have any questions, please contact our support team.\n
                //     Thank you for using Gamebloc, and we look forward to seeing you in future tournaments!\n
                //     Best regards,\n
                //     Gamebloc Team", caller, Nat64.toText(Nat64.fromIntWrap(Time.now())), await get_notification_id(caller), tournamentAccount.creator);
                // let depositNotification = await notify("Successful ICP Deposit to Your Gamebloc Account");
                let tournamentNotification = await notify("🎉 Tournament Created Successfully! 🎉", "Congratulations, " # tournamentAccount.creator # "! Your tournament " # tournamentAccount.title # " has been successfully created. 🎮🎯", caller, Nat64.toText(Nat64.fromIntWrap(Time.now())), await get_notification_id(caller), tournamentAccount.creator);
                result;

                // return result
            } catch err {
                throw (err)
            }
        }
    };

    public func count_all_squad() : async Nat {
        await RustBloc.count_all_squad()
    };

    public func count_all_users() : async Nat {
        await RustBloc.count_all_users()
    };

    public shared ({ caller }) func end_tournament(id : Text, no_of_winners : Nat8, winner : [Bloctypes.Winner]) : async Bool {
        try {
            // Checks the role and other conditions before actually ending the tournament
            await RustBloc.end_tournament(id, caller, no_of_winners, winner)
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func get_all_tournament() : async [Bloctypes.TournamentAccount] {
        // assert(caller == userCanisterId);
        try {
            return let result = await RustBloc.get_all_tournament()
        } catch err {
            throw (err)
        }
    };

    public func get_all_user() : async [Bloctypes.UserProfile] {
        // assert(caller == userCanisterId);
        try {
            return let result = await RustBloc.get_all_user()
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func get_profile(name : Text) : async Bloctypes.UserProfile {
        // assert(caller == userCanisterId);
        try {
            return let result = await RustBloc.get_profile(name)
        } catch err {
            throw (err)
        }
    };

    public shared func getUserPrincipal(name : Text) : async Principal {
        var result = await RustBloc.get_profile(name);
        return Principal.fromText(result.principal_id)
    };

    public func getUsername(caller : Principal) : async Text {
        var result = await RustBloc.get_profile_by_principal(caller);
        return result.username
    };

    public func get_tournament(id : Text) : async Bloctypes.TournamentAccount {
        try {
            await RustBloc.get_tournament(id)
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func create_squad(squad : Bloctypes.Squad) : async Bloctypes.Result {
        try {
            SQUAD_STORE.put(Principal.toText(caller), squad);
            return await RustBloc.create_squad(squad, caller)
        } catch err {
            throw (err)
        }
    };

    // *
    public shared ({ caller }) func add_to_squad(member : Bloctypes.Member, id : Text) : async () {
        try {
            return await RustBloc.add_to_squad(member, caller, id)
        } catch err {
            throw (err)
        }
    };

    // *
    public shared ({ caller }) func close_squad(names : [Text], id : Text) : async () {
        try {
            return await RustBloc.close_squad(id, caller)
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func open_squad(names : [Text], id : Text) : async () {
        try {
            return await RustBloc.open_squad(id, caller)
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func join_squad(member : Bloctypes.Member, id : Text) : async () {
        try {
            return await RustBloc.join_squad(member, caller, id)
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func join_tournament_with_squad(squad_id : Text, id : Text, ign : [(Text, Text, Text)], new_member_ign : ?[(Text, Text, Text)], icp_price : Nat) : async () {
        if (icp_price == 0) {
            throw Error.reject("Cannnot fetch ICP price at the moment, please check app later....")
        } else {
            try {

                var _to : LedgerTypes.Account = {
                    owner = gbc_admin;
                    subaccount = null
                };

                var _from : LedgerTypes.Account = {
                    owner = caller;
                    subaccount = null
                };

                var tournament = await get_tournament(id);

                // Checks for squad
                if (Text.toUppercase(tournament.game_type) == "SQUAD") {

                    if (tournament.tournament_type != #Prepaid) {

                        var entry = tournament.entry_fee;

                        switch (entry) {
                            case (null) {
                                throw Error.reject("The entry fee for a Crowdfunding tournament cannot be empty!")
                            };
                            case (?entry) {
                                try {
                                    // var actual_price = amount / icp_price;
                                    var result = await ICPLedger.icrc2_transfer_from({
                                        to = {
                                            owner = gbc_admin;
                                            subaccount = null
                                        };
                                        fee = null;
                                        spender_subaccount = null;
                                        from = {
                                            owner = caller;
                                            subaccount = null
                                        };
                                        memo = null;
                                        created_at_time = ?Nat64.fromIntWrap(Time.now());
                                        // * since the price is in hundreds to bypass the datatype restrictions
                                        amount = (entry * 40_000_000_000) / (icp_price); //In USD
                                    });

                                } catch (err) {
                                    throw Error.reject("There is an issue wih the transfer")
                                }
                            }
                        }
                    }
                } else {
                    // Duo Squad

                    if (tournament.tournament_type != #Prepaid) {

                        var entry = tournament.entry_fee;

                        switch (entry) {
                            case (null) {
                                throw Error.reject("The entry fee for a Crowdfunding tournament cannot be empty!")
                            };
                            case (?entry) {
                                try {
                                    // var actual_price = amount / icp_price;
                                    var result = await ICPLedger.icrc2_transfer_from({
                                        to = {
                                            owner = gbc_admin;
                                            subaccount = null
                                        };
                                        fee = null;
                                        spender_subaccount = null;
                                        from = {
                                            owner = caller;
                                            subaccount = null
                                        };
                                        memo = null;
                                        created_at_time = ?Nat64.fromIntWrap(Time.now());
                                        // * since the price is in hundreds to bypass the datatype restrictions
                                        amount = (entry * 20_000_000_000) / (icp_price); //In USD
                                    })
                                } catch (err) {
                                    throw Error.reject("There is an issue wih the transfer, please check your balance , try again or contact admin")
                                }

                            }
                        }
                    }
                };

                await update_tournaments_joined(caller);
                return await RustBloc.join_tournament_with_squad(squad_id, id, ign, new_member_ign)
            } catch err {
                throw (err)
            }
        }
    };

    public shared ({ caller }) func join_tournament(name : Text, id : Text, ign : (Text, Text, Text), icp_price : Nat) : async () {
        if (icp_price == 0) {
            throw Error.reject("Cannnot fetch ICP price at the moment, please check app later....")
        } else {
            try {
                var tournamentAccount = await get_tournament(id);

                var _to : LedgerTypes.Account = {
                    owner = gbc_admin;
                    subaccount = null
                };

                var _from : LedgerTypes.Account = {
                    owner = caller;
                    subaccount = null
                };

                // * Supports Blitzkreig and Crowdfunded

                if (tournamentAccount.tournament_type != #Prepaid) {

                    var entry = tournamentAccount.entry_fee;
                    switch (entry) {
                        case (null) {
                            throw Error.reject("The entry fee for a Crowdfunding tournament cannot be empty!")
                        };
                        case (?entry) {

                            try {
                                // var actual_price = amount / icp_price;
                                var result = await ICPLedger.icrc2_transfer_from({
                                    to = {
                                        owner = gbc_admin;
                                        subaccount = null
                                    };
                                    fee = null;
                                    spender_subaccount = null;
                                    from = {
                                        owner = caller;
                                        subaccount = null
                                    };
                                    memo = null;
                                    created_at_time = ?Nat64.fromIntWrap(Time.now());
                                    amount = (entry * 10_000_000_000) / (icp_price); //In USD
                                })
                            } catch (err) {
                                throw Error.reject("There is an issue wih the transfer, please check your balance , try again or contact admin")
                            }
                        }
                    }

                };

                await update_tournaments_joined(caller);
                // var _caller : Text = caller.toText();
                // await notify("🎉 Tournament Joined Successfully! 🎉", "Congratulations, " # getUsername(caller) # "! You have successfully joined the tournament " # tournamentAccount.title #  ". 🎮🎯", caller, Nat64.toText(Nat64.fromIntWrap(Time.now())), await get_notification_id(caller), getUsername(caller));
                return await RustBloc.join_tournament(name, id, ign)
            } catch err {
                throw (err)
            }
        }
    };

    public func get_all_squad() : async [Bloctypes.Squad] {
        try {
            return await RustBloc.get_all_squad()
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func leave_or_remove_squad_member(id : Text) : async () {
        try {
            return await RustBloc.leave_or_remove_squad_member(caller, id)
        } catch err {
            throw (err)
        }
    };

    public func get_squad(id : Text) : async Bloctypes.Squad {
        try {
            return await RustBloc.get_squad(id)
        } catch err {
            throw (err)
        }
    };

    public func is_mod(identity : Principal) : async Bool {
        try {
            return let result = await RustBloc.is_mod(identity)
        } catch err {
            throw (err)
        }

    };

    public func set_mod(identity : Principal) : async () {
        try {
            return await RustBloc.set_mod(identity)
        } catch err {
            throw (err)
        }
    };

    public func assign_squad_points(tournament_id : Text, squad_id_and_points : [(Text, Text, Bloctypes.Point)], principal : Principal) : async Bool {
        try {
            return await RustBloc.assign_squad_points(tournament_id, squad_id_and_points, principal)
        } catch err {
            throw (err)
        }
    };

    public func assign_solo_points(tournament_id : Text, user_id_and_points : [(Text, Text, Bloctypes.Point)], principal : Principal) : async Bool {
        try {
            return await RustBloc.assign_squad_points(tournament_id, user_id_and_points, principal)
        } catch err {
            throw (err)
        }
    };



    public query func get_number_of_squads() : async Nat {
        ID_STORE.size()
    };

    public query func get_number_of_unique_users() : async Nat {
        ProfileHashMap.size()
    };

    public query func get_total_number_of_tournament() : async Nat {
        TournamentHashMap.size()
    };

    public query func get_total_number_of_squads() : async Nat {
        SQUAD_STORE.size()
    };

    // Mod Consensus

    // * Rustbloc will handle that.

    // Password for Wallet

                                                  /////////////////////////////
                                                 ///      VETKD SYSTEM     ///
                                                /////////////////////////////

    type VETKD_SYSTEM_API = actor {
        vetkd_public_key : ({
            canister_id : ?Principal;
            derivation_path : [Blob];
            key_id : { curve : { #bls12_381 }; name : Text }
        }) -> async ({ public_key : Blob });
        vetkd_encrypted_key : ({
            public_key_derivation_path : [Blob];
            derivation_id : Blob;
            key_id : { curve : { #bls12_381 }; name : Text };
            encryption_public_key : Blob
        }) -> async ({ encrypted_key : Blob })
    };

    let vetkd_system_api : VETKD_SYSTEM_API = actor ("s55qq-oqaaa-aaaaa-aaakq-cai");

    public shared ({ caller }) func app_vetkd_public_key(derivation_path : [Blob]) : async Text {
        let { public_key } = await vetkd_system_api.vetkd_public_key({
            canister_id = null;
            derivation_path;
            key_id = { curve = #bls12_381; name = "test_key_1" }
        });
        Hex.encode(Blob.toArray(public_key))
    };

    public shared ({ caller }) func symmetric_key_verification_key() : async Text {
        let { public_key } = await vetkd_system_api.vetkd_public_key({
            canister_id = null;
            derivation_path = Array.make(Text.encodeUtf8("vault_symmetric_key"));
            key_id = { curve = #bls12_381; name = "test_key_1" }
        });
        Hex.encode(Blob.toArray(public_key))
    };

    public shared ({ caller }) func encrypted_symmetric_key_for_vault(encryption_public_key : Blob) : async Text {
        Debug.print("encrypted_symmetric_key_for_caller: caller: " # debug_show (caller));
        let _caller = Principal.toText(caller);

        let (?payload) = PASSWORD_STORE.get(caller) else Debug.trap("payload not found");

        assert (payload._user == caller);

        let encoded_payload = Text.encodeUtf8(_caller # payload._password # Int.toText(payload._updatedTime));
        let { encrypted_key } = await vetkd_system_api.vetkd_encrypted_key({
            derivation_id = encoded_payload;
            public_key_derivation_path = Array.make(Text.encodeUtf8("vault_symmetric_key"));
            key_id = { curve = #bls12_381; name = "test_key_1" };
            encryption_public_key
        });
        Hex.encode(Blob.toArray(encrypted_key))
    };

    // Converts a nat to a fixed-size big-endian byte (Nat8) array
    func natToBigEndianByteArray(len : Nat, n : Nat) : [Nat8] {
        let ith_byte = func(i : Nat) : Nat8 {
            assert (i < len);
            let shift : Nat = 8 * (len - 1 - i);
            Nat8.fromIntWrap(n / 2 ** shift)
        };
        Array.tabulate<Nat8>(len, ith_byte)
    };

    public shared ({ caller }) func ibe_encryption_key() : async Text {
        let { public_key } = await vetkd_system_api.vetkd_public_key({
            canister_id = null;
            derivation_path = Array.make(Text.encodeUtf8("ibe_encryption"));
            key_id = { curve = #bls12_381; name = "test_key_1" }
        });
        Hex.encode(Blob.toArray(public_key))
    };

    public shared ({ caller }) func encrypted_ibe_decryption_key_for_caller(encryption_public_key : Blob) : async Text {
        Debug.print("encrypted_ibe_decryption_key_for_caller: caller: " # debug_show (caller));

        let _caller = Principal.toText(caller);

        let (?payload) = PASSWORD_STORE.get(caller) else Debug.trap("payload not found");

        let encoded_payload = Text.encodeUtf8(_caller # payload._password # Int.toText(payload._updatedTime));

        let { encrypted_key } = await vetkd_system_api.vetkd_encrypted_key({
            derivation_id = encoded_payload;
            public_key_derivation_path = Array.make(Text.encodeUtf8("ibe_encryption"));
            key_id = { curve = #bls12_381; name = "test_key_1" };
            encryption_public_key
        });
        Hex.encode(Blob.toArray(encrypted_key))
    };


                                                  /////////////////////////////
                                                 ///     WEBSOCKET IMPL    ///
                                                /////////////////////////////

    let connected_clients = Buffer.Buffer<IcWebSocketCdk.ClientPrincipal>(0);

    type GroupChatMessage = {
        // name : Text;
        // message : Text;
        message : Message;
        isTyping : Bool
    };

    type AppMessage = {
        #GroupMessage : GroupChatMessage;
        #JoinedChat : Text
    };

    /// A custom function to send the message to the client
    public func send_app_message(client_principal : IcWebSocketCdk.ClientPrincipal, msg : AppMessage) : async () {
        switch (msg) {
            case (#JoinedChat(_message)) {
                Debug.print("Sending message: " # debug_show (_message));

                // here we call the send from the CDK!!
                switch (await IcWebSocketCdk.send(ws_state, client_principal, to_candid (msg))) {
                    case (#Err(err)) {
                        Debug.print("Could not send message:" # debug_show (#Err(err)))
                    };
                    case (_) {}
                }
            };
            case (#GroupMessage(groupMessage)) {
                switch (await IcWebSocketCdk.send(ws_state, client_principal, to_candid (msg))) {
                    case (#Err(err)) {
                        Debug.print("Could not send message:" # debug_show (#Err(err)))
                    };
                    case (_) {
                        // Resolving the duplicate issue
                        Debug.print("message body:" # debug_show (groupMessage.message.body));
                        // await sendMessage(groupMessage.message.body, groupMessage.message.time, groupMessage.message.username, groupMessage.message.f_id)

                    }
                }
            }
        }
    };

    func on_open(args : IcWebSocketCdk.OnOpenCallbackArgs) : async () {
        connected_clients.add(args.client_principal)
    };

    func on_message(args : IcWebSocketCdk.OnMessageCallbackArgs) : async () {
        let app_msg : ?AppMessage = from_candid (args.message);
        switch (app_msg) {
            case (?msg) {
                switch (msg) {
                    case (#JoinedChat(message)) {
                        let clients_to_send = Buffer.toArray<IcWebSocketCdk.ClientPrincipal>(connected_clients);

                        for (client in clients_to_send.vals()) {
                            await send_app_message(client, #JoinedChat(message))
                        }
                    };
                    case (#GroupMessage(message)) {
                        let clients_to_send = Buffer.toArray<IcWebSocketCdk.ClientPrincipal>(connected_clients);

                        for (client in clients_to_send.vals()) {
                            await send_app_message(client, #GroupMessage(message));
                            // await sendMessage(message.message.body, message.message.time, message.message.username, message.message.f_id)
                        }
                    }
                };

            };
            case (null) {
                Debug.print("Could not deserialize message");
                return
            }
        }
    };

    func on_close(args : IcWebSocketCdk.OnCloseCallbackArgs) : async () {
        Debug.print("Client " # debug_show (args.client_principal) # " disconnected");

        /// On close event we remove the client from the list of client
        let index = Buffer.indexOf<IcWebSocketCdk.ClientPrincipal>(args.client_principal, connected_clients, Principal.equal);
        switch (index) {
            case (null) {
                // Do nothing
            };
            case (?index) {
                // remove the client at the given even
                ignore connected_clients.remove(index)
            }
        }
    };

    // Returns an array of the the clients connect to the canister
    public shared query func getAllConnectedClients() : async [IcWebSocketCdk.ClientPrincipal] {
        return Buffer.toArray<IcWebSocketCdk.ClientPrincipal>(connected_clients)
    };

    let params = IcWebSocketCdkTypes.WsInitParams(null, null);
    let ws_state = IcWebSocketCdkState.IcWebSocketState(params);

    let handlers = IcWebSocketCdkTypes.WsHandlers(
        ?on_open,
        ?on_message,
        ?on_close,
    );

    let ws = IcWebSocketCdk.IcWebSocket(ws_state, params, handlers);

    // method called by the WS Gateway after receiving FirstMessage from the client
    public shared ({ caller }) func ws_open(args : IcWebSocketCdk.CanisterWsOpenArguments) : async IcWebSocketCdk.CanisterWsOpenResult {
        await ws.ws_open(caller, args)
    };

    // method called by the Ws Gateway when closing the IcWebSocket connection
    public shared ({ caller }) func ws_close(args : IcWebSocketCdk.CanisterWsCloseArguments) : async IcWebSocketCdk.CanisterWsCloseResult {
        await ws.ws_close(caller, args)
    };

    // method called by the frontend SDK to send a message to the canister
    public shared ({ caller }) func ws_message(args : IcWebSocketCdk.CanisterWsMessageArguments, msg_type : ?AppMessage) : async IcWebSocketCdk.CanisterWsMessageResult {
        await ws.ws_message(caller, args, msg_type)
    };

    // method called by the WS Gateway to get messages for all the clients it serves
    public shared query ({ caller }) func ws_get_messages(args : IcWebSocketCdk.CanisterWsGetMessagesArguments) : async IcWebSocketCdk.CanisterWsGetMessagesResult {
        ws.ws_get_messages(caller, args)
    };

    // TODO: Calculate the total vol
    // public query func getAccountTransactions(accountId: Text) : async [Transaction] {
    //     // Fetches the list of transactions for the given account.
    //     // You would typically store these in a canister.
    // }

    public shared ({ caller }) func activateLock() : async () {
        var lockable : Bloctypes.Lockable = {
            amount = 0;
            timestamp = Int.abs(Time.now());
            user = caller
        };
        LockedAssetsHashMap.put(
            caller,
            {
                icpBalance = 0;
                user = caller;
                assets = [lockable]
            },
        )
    };

    type Result_22 = {
        #Ok : Any;
        #Err : Any
    };

    public shared ({ caller }) func lockICP(_amount : Nat, icp_price : Nat) : async () {
        var vault = LockedAssetsHashMap.get(caller);
        switch (vault) {
            case null {};
            case (?(vault)) {
                var transfer = await ICPLedger.icrc2_transfer_from({
                    to = {
                        owner = Principal.fromActor(this);
                        subaccount = null
                    };
                    fee = null;
                    spender_subaccount = null;
                    from = {
                        owner = caller;
                        subaccount = null
                    };
                    memo = null;
                    created_at_time = ?Nat64.fromIntWrap(Time.now());
                    amount = (_amount * e8s) / icp_price
                });
                // if(Result.isOk(transfer)){
                //     var lockedAsset = {
                //         amount = 0;
                //         timestamp = Int.abs(Time.now());
                //         user = caller;
                //     };

                // };
            }
        }
    };

                                                ///////////////////////////////////
                                                 ///    REFERRAL MANAGEMENT    ///
                                                ///////////////////////////////////


    let chars = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
        'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'O', 'S', 'T', 
        'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'
    ];

     // Store the current state of the random number generator
    var state: Nat = Int.abs(Time.now()) % (2**32 - 1);
    var reseedCounter = 0;

    func nextRand() : Nat {
        state := (a * state + c) % m;
        reseedCounter += 1;
        
        // Reseed every 1M numbers to avoid cycles
        if (reseedCounter > 1_000_000) {
            state := (state + Int.abs(Time.now())) % m;
            reseedCounter := 0;
        };
        return state;
    };

    public shared query func generateDeterministicCode(principal: Principal, nonce: Nat) : async Text {
        let input = Principal.toText(principal) # Nat.toText(nonce);
        let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
        
        // Convert hash to code format
        var code = "";
        for (i in Iter.range(0, 4)) {
            let byte = hash[i % hash.size()];
            let index : Nat = Nat8.toNat(byte) % chars.size();
            code #= Char.toText(chars[index]);
        };
        return code;
    };


    let a: Nat = 1664525;  // multiplier
    let c: Nat = 1013904223;  // increment
    let m: Nat = 2**32;  // modulus

    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // func nextRand() : Nat {
    //     state := (a * state + c) % m;
    //     return state;
    // };

    func getRandomChar() : Char {
        let rand = nextRand();
        let index = rand % chars.size();
        return chars[index];
    };

    public query func generateCode() : async Text {
        var code : [Char] = [];
        for (_ in Iter.range(0, 4)) {
            code := Array.append<Char>(code, [getRandomChar()]);
        };
        return Text.fromIter(Array.vals(code));
    };

    let MAX_DETERMINISTIC_ATTEMPTS = 10_000; 
    let MAX_FALLBACK_ATTEMPTS = 20;

    public func check_codeToPrincipal_size() : async Nat {    
        return CodeToPrincipalMap.size();
    };

    public func check_referralMap_size() : async Nat {
        return ReferralMap.size();
    };

    // Update the state and generate a new random number
    public query func generateRandomNumber() : async Nat {
        // A simple LCG formula: state = (a * state + c) % m
        state := (a * state + c) % m;
        return state;
    };

    // public query func get_r



    // Generate a random number within a given range (min, max)
    public func generateRandomInRange(min: Nat, max: Nat) :  async Nat {
        let randomNum = await generateRandomNumber();
        return min + (randomNum % (max - min + 1));
    };

    public type ReferralStats = {
        totalReferrals : Nat;
        activeReferrals : Nat;
        totalRewards : Nat;
    };


    // func setCode(caller : Principal) : async () {
    //     var code = await updateReferralCode(caller)    
    // };

    // Get referral code for a given principal
    // This function is probably weird and I know it. I will come check it later
    // But for now, its necessary for production and you have no idea how much other functions Ive written and chose to go with this for now
    // Trust me, you have no idea.
    public func updateReferralCode(principal : Principal) : async ?Text {
        if (ReferralMap.get(principal) == null) {
            var nonce = 1;

            let input = Principal.toText(principal) # Nat.toText(nonce);
            let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
            
            var code = "";
            for (i in Iter.range(0, 4)) {
                let byte = hash[i % hash.size()];
                let index : Nat = Nat8.toNat(byte) % chars.size();
                code #= Char.toText(chars[index]);
            };


            // var code = await generateDeterministicCode(principal, 0);
            if (CodeToPrincipalMap.get(code) != null) {
                let input = Principal.toText(principal) # Nat.toText(nonce);
                let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
                
                code #= "";
                for (i in Iter.range(0, 4)) {
                    let byte = hash[i % hash.size()];
                    let index : Nat = Nat8.toNat(byte) % chars.size();
                    code #= Char.toText(chars[index]);
                };

                // code := await generateDeterministicCode(principal, nonce);
                nonce += 1;
                while (CodeToPrincipalMap.get(code) != null) {

                    let input = Principal.toText(principal) # Nat.toText(nonce);
                    let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
                    
                    code #= "";
                    for (i in Iter.range(0, 4)) {
                        let byte = hash[i % hash.size()];
                        let index : Nat = Nat8.toNat(byte) % chars.size();
                        code #= Char.toText(chars[index]);
                    };
                    // code := await generateDeterministicCode(principal, nonce);
                    nonce += 1;
                };
            };
            ReferralMap.put(principal, code);
            CodeToPrincipalMap.put(code, principal);
        };
        ReferralMap.get(principal)
    };

    public func generate_code_for_all_users() : async () {
        var principals : [Principal] = await RustBloc.get_all_principals();
        for (principal in principals.vals()) {
            if (ReferralMap.get(principal) == null) {
                ignore await updateReferralCode(principal);
            };
        };
    };

    public query func getReferralCode1(principal : Principal) : async ?Text {
        if (ReferralMap.get(principal) == null) {
            var nonce = 1;

            // Initial code generation
            let input = Principal.toText(principal) # Nat.toText(nonce);
            let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
            
            var code = "";
            for (i in Iter.range(0, 4)) {
                let byte = hash[i % hash.size()];
                let index : Nat = Nat8.toNat(byte) % chars.size();
                code #= Char.toText(chars[index]);
            };

            // Check for collision and regenerate if needed
            if (CodeToPrincipalMap.get(code) != null) {
                var foundUnique = false;
                while (not foundUnique) {
                    nonce += 1;
                    let newInput = Principal.toText(principal) # Nat.toText(nonce);
                    let newHash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(newInput)));
                    
                    code := ""; // Reset the code
                    for (i in Iter.range(0, 4)) {
                        let byte = newHash[i % newHash.size()];
                        let index : Nat = Nat8.toNat(byte) % chars.size();
                        code #= Char.toText(chars[index]);
                    };

                    foundUnique := CodeToPrincipalMap.get(code) == null;
                };
            };
            
            // Update both maps
            ReferralMap.put(principal, code);
            CodeToPrincipalMap.put(code, principal);
        };
        ReferralMap.get(principal)
    };


    public query func do_i_have_referral_code(caller : Principal) : async Bool {
        let code = ReferralMap.get(caller);
        switch (code) {
            case null {
                return false;
            };
            case (?code) {
                return true;
            }
        }
    };


    // Lookup principal by referral code
    public shared query func getPrincipalByCode(code : Text) : async ?Principal {
        CodeToPrincipalMap.get(code)
    };

    public shared query func get_AccountIdentifier_by_code(code : Text) : async ?Text {
        let principal = CodeToPrincipalMap.get(code);
        switch (principal) {
            case null {
                return null;
            };
            case (?principal) {
                return ?AccountIdentifier.toText(AccountIdentifier.fromPrincipal(principal, null));
            }
        }
    };

    public query func get_my_referrals(caller : Principal) : async [Principal] {
        let referrals = ReferralsMap.get(caller);
        switch (referrals) {
            case null {
                return [];
            };
            case (?referrals) {
                return referrals;
            }
        }
    };

    public func add_referral(caller : Principal, referral : Principal) : async () {
        let referrals = ReferralsMap.get(referral);
        switch (referrals) {
            case null {
                ReferralsMap.put(referral, [caller]);
            };
            case (?referrals) {
                ReferralsMap.put(referral, Array.append<Principal>(referrals, [caller]));
            }
        }
    };

    public query func getReferralCode(principal : Principal) : async ?Text {
        ReferralMap.get(principal);  
    };


    /// * @dev This function checks if an array contains a specific item using a custom equality function.
    private func arrayContains<T>(array : [T], item : T, equal : (T, T) -> Bool) : Bool {
        for (x in array.vals()) {
            if (equal(x, item)) {
                return true;
            }
        };
        false
    };


    let CODE_LENGTH = 5;

    //  public shared query func validateReferralCode(code : Text) : async Bool {
    //     if (code.size() != CODE_LENGTH) return false;
    //     for (c in code.chars()) {
    //         if (not arrayContains<Char>(chars, c, Char.equal)) {
    //             return false;
    //         }
    //     };
    //     CodeToPrincipalMap.get(code) != null
    // };

    // Content
    // var posts = HashMap.HashMap<Nat, Post>(0, Nat.equal, Hash.hash);
    // var comments = HashMap.HashMap<Nat, [Comment]>(0, Nat.equal, Hash.hash);
    // var reactions = HashMap.HashMap<Nat, ReactionStats>(0, Nat.equal, Hash.hash);
    // var views = HashMap.HashMap<Nat, Nat>(0, Nat.equal, Hash.hash);

    var profiles = HashMap.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);
    
    type Profile = {
        username: Text;
        bio: ?Text;
        avatar: ?Blob;
    };

    // Social Graph
    var followers = HashMap.HashMap<Principal, [Principal]>(0, Principal.equal, Principal.hash);
    var following = HashMap.HashMap<Principal, [Principal]>(0, Principal.equal, Principal.hash);

    var posters = HashMap.HashMap<Nat, Post>(0, Nat.equal, Hash.hash);
    var comments = HashMap.HashMap<Nat, [Comment]>(0, Nat.equal, Hash.hash);
    var reactions = HashMap.HashMap<Nat, ReactionStats>(0, Nat.equal, Hash.hash);
    var views = HashMap.HashMap<Nat, Nat>(0, Nat.equal, Hash.hash);

    type Post = {
        author: Principal;
        content: Text;
        media: ?Blob;
        timestamp: Int;
    };

    type Comment = {
        author: Principal;
        text: Text;
        timestamp: Int;
    };

    type ReactionStats = {
        likes: Nat;
        dislikes: Nat;
        reactors: [Principal]; // Track who reacted
    };

        // Follow a user
    public shared({ caller }) func follow(target: Principal) : async () {
        assert(caller != target);
        
        // Update follower list
        let currentFollowers = followers.get(target); 
        //orelse [];
        switch(currentFollowers){
            case(null){
                followers.put(target, Array.append([], [caller]));
        
            // Update following list
            let currentFollowing = following.get(caller); // orelse [];
            following.put(caller, Array.append([], [target]));
            }; case (?currentFollowers) {
                followers.put(target, Array.append(currentFollowers, [caller]));
        
                // Update following list
                let currentFollowing = following.get(caller); // orelse [];
                switch(currentFollowing){
                    case(null) {
                        following.put(caller, Array.append([], [target]));
                    }; case (?currentFollowing) {
                        following.put(caller, Array.append(currentFollowing, [target]));
                    };
                }
                // following.put(caller, Array.append(currentFollowing, [target]))
            }
        }
    };

    // Unfollow 
    public shared({ caller }) func unfollow(target: Principal) : async () {
        let removePrincipal = func (p: Principal) : Bool { p != target };
        var _target = followers.get(target);
        var _caller = followers.get(caller);
        switch(_target){
            case(?_target){
                followers.put(target, Array.filter(_target , removePrincipal));
            }; case _ {};
        };
        switch(_caller){
            case(?_caller){
                followers.put(caller, Array.filter(_caller, removePrincipal));
            }; case _ {};
        };
    };

    stable var nextPostId : Nat = 0;

    public shared({ caller }) func createPost(content: Text, media: ?Blob) : async Nat {
        let postId = nextPostId;
        posters.put(postId, {
            author = caller;
            content;
            media;
            timestamp = Time.now();
        });
        nextPostId += 1;
        postId
    };

    public query func getPost(postId: Nat) : async ?Post {
        posters.get(postId)
    };

    public shared({ caller }) func addComment(postId: Nat, text: Text) : async () {
        let newComment = {
            author = caller;
            text;
            timestamp = Time.now();
        };
        var _comment = comments.get(postId);
        switch(_comment){
            case(?_comment){
                comments.put(postId, 
                    Array.append(_comment, [newComment])
                );
            }; case _ {};
        }  
    };

    public shared({ caller }) func react(postId: Nat, isLike: Bool) : async () {
        // let _stats = reactions.get(postId);

        let stats = reactions.get(postId); //orelse { likes = 0; dislikes = 0; reactors = [] };
        switch(stats){
            case(?stats){
                if (Array.find(stats.reactors, func (p: Principal) : Bool { p == caller }) != null) return;
                
                reactions.put(postId, {
                    likes = if isLike stats.likes + 1 else stats.likes;
                    dislikes = if (isLike==false) {stats.dislikes + 1} else {stats.dislikes};
                    reactors = Array.append(stats.reactors, [caller]);
                });
            }; case _ {
                
            }
        }
        // Prevent duplicate reactions   
    };

    public shared({ caller }) func trackView(postId: Nat) : async () {
        let _view = views.get(postId);
        switch(_view){
            case(?_view){
                if (posters.get(postId) != null) {
                    views.put(postId, (_view) + 1);
                };
            }; case(null){
                if (posters.get(postId) != null) {
                    views.put(postId, (0) + 1);
                };
            }
        } 
    };

    public query func getFollowers(user: Principal) : async ?[Principal] {
        followers.get(user);
    };

    public query func getFollowing(user: Principal) : async ?[Principal] {
        following.get(user)
    };

    public query func getPostReactions(postId: Nat) : async ReactionStats {
        let _reaction = reactions.get(postId);
        switch(_reaction){
            case(?_reaction){
                return _reaction;
            }; case _ {
                return {
                    likes = 0; dislikes = 0; reactors = []
                }
            }
        }
    };

}
