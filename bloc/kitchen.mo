import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
// import AccountIdentifier "mo:account-identifier";
// import AccountIdentifier "mo:account";

import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Time "mo:base/Time";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Nat64 "mo:base/Nat64";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Blob "mo:base/Blob";

import AccountIdentifier "utils";
// import AccountID "mo:principal/blob/AccountIdentifier";

import ICPLedger "canister:icp_ledger";
import ICPIndex "canister:icp_index";
import RustBloc "canister:game_bloc_backend";

import IndexTypes "indextypes";
import Bloctypes "bloctypes";
import LedgerTypes "ledgertypes";
import Utils "utils";
import Ledgertypes "ledgertypes";
import HTTP "http";

shared ({ caller }) actor class Kitchen() {

    private stable var userCanisterId : Principal = caller;

    /// Backuo for the Gamebloc backend in the kitchen canister
    private stable var ProfileEntries : [(Principal, Bloctypes.UserProfile)] = [];
    private stable var TournamentEntries : [(Principal, Bloctypes.TournamentAccount)] = [];
    private stable var IDEntries : [(Text, Text)] = [];
    private stable var FeedbackEntries : [(Nat, Bloctypes.Feedback)] = [];
    private stable var SquadEntries : [(Text, Bloctypes.Squad)] = [];
    private stable var UserTrackEntries : [(Principal, Bloctypes.UserTrack)] = [];
    private stable var feedback_id : Nat = 0;
    private stable var SupportedGames : [Text] = [];

    var TournamentHashMap : HashMap.HashMap<Principal, Bloctypes.TournamentAccount> = HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
    var ProfileHashMap : HashMap.HashMap<Principal, Bloctypes.UserProfile> = HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);

    var ID_STORE = TrieMap.TrieMap<Text, Text>(Text.equal, Text.hash);
    var FEED_BACK_STORE = TrieMap.TrieMap<Nat, Bloctypes.Feedback>(Nat.equal, Hash.hash);
    var SQUAD_STORE = TrieMap.TrieMap<Text, Bloctypes.Squad>(Text.equal, Text.hash);
    var USER_TRACK_STORE = TrieMap.TrieMap<Principal, Bloctypes.UserTrack>(Principal.equal, Principal.hash);

    /// stabilizing the motoko backup
    system func preupgrade() {
        ProfileEntries := Iter.toArray(ProfileHashMap.entries());
        TournamentEntries := Iter.toArray(TournamentHashMap.entries());
        IDEntries := Iter.toArray(ID_STORE.entries());
        UserTrackEntries := Iter.toArray(USER_TRACK_STORE.entries());
        SquadEntries := Iter.toArray(SQUAD_STORE.entries());
        FeedbackEntries := Iter.toArray(FEED_BACK_STORE.entries())
    };

    system func postupgrade() {
        TournamentHashMap := HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
        ProfileHashMap := HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);

        ID_STORE := TrieMap.fromEntries<Text, Text>(IDEntries.vals(), Text.equal, Text.hash);
        SQUAD_STORE := TrieMap.fromEntries<Text, Bloctypes.Squad>(SquadEntries.vals(), Text.equal, Text.hash);
        USER_TRACK_STORE := TrieMap.fromEntries<Principal, Bloctypes.UserTrack>(UserTrackEntries.vals(), Principal.equal, Principal.hash);
        FEED_BACK_STORE := TrieMap.fromEntries<Nat, Bloctypes.Feedback>(FeedbackEntries.vals(), Nat.equal, Hash.hash);

        // clear the states
        ProfileEntries := [];
        UserTrackEntries := [];
        TournamentEntries := [];
        IDEntries := [];
        SquadEntries := [];
        FeedbackEntries := []
    };

    func createOneProfile(id_hash : Text, age : Nat8, username : Text, caller : Principal, role : Bloctypes.Role) {
        // let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
        ProfileHashMap.put(caller, makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online, username, Principal.toText(caller), AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null)), Principal.toText(userCanisterId), "", ?0, role))
    };

    // public func update_users() : async () {

    //     let result = await RustBloc.get_all_user();
    //     var users : [(Principal, Bloctypes.UserProfile)] = [];
    //     for (i in Iter.fromArray(result)){
    //         users := Array.append(users, [(i.principal_id, i)]);
    //     };
    //      := [] := users;
    // };

    public shared ({ caller }) func createprofile(id_hash : Text, age : Nat8, username : Text, role : Bloctypes.Role) : async Result.Result<Text, Text> {
        // call the balnce function to get and set the balance of newly registered users
        let balance = 10;
        let checkUsername = usernameChecker(username);

        if (checkUsername == false) {
            #err("This username exist! Please enter another")
        } else {
            createOneProfile(id_hash, age, username, caller, role);
            #ok("You have successfully created an account")
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

    //
    // Ledger Canister
    //

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

    // get icp balance of user
    public shared ({ caller }) func icp_balance() : async ICP {
        await ICPLedger.account_balance_dfx({
            account = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null))
        })
    };

    public func icp_balance2(account : Principal) : async ICP {
        await ICPLedger.account_balance_dfx({
            account = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(account, null))
        })
    };

    public func icp_balance_icrc1(account : Principal) : async Nat {
        await ICPLedger.icrc1_balance_of({
            owner = account;
            subaccount = null
        })
    };

    //
    public shared ({ caller }) func get_icp_balance_icrc1() : async Nat {
        await ICPLedger.icrc1_balance_of({
            owner = caller;
            subaccount = null
        })
    };

    // Takes in the account id as an argument
    public func icrc1_balance_of(account : IndexTypes.Account) : async Nat64 {
        await ICPIndex.icrc1_balance_of(account)
    };

    // Transfers ICP from the caller to receipient
    public func transferICP(to : Text, amount : LedgerTypes.Tokens, created_at_time : LedgerTypes.TimeStamp) : async Nat64 {
        await ICPLedger.send_dfx({
            to = to;
            fee = { e8s = 10_000 }; //0.0001 ICP
            memo = 0;
            from_subaccount = null;
            created_at_time = ?{
                timestamp_nanos = Nat64.fromNat(Int.abs(Time.now()))
            };
            amount = amount
        })
    };

    // public shared ({caller}) func get_total_tournament() : async Nat {

    // }

    //  --------------------------
    // /                        /
    // /    Index Canister      /
    // /                        /
    // --------------------------

    // public func getAccountTransactions(caller : Principal, max_results : Nat64, start : ?Nat64) : async IndexTypes.GetAccountIdentifierTransactionsResult {
    //     return await ICPIndex.get_account_identifier_transactions({
    //         max_results = max_results;
    //         start = start;
    //         account = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null));
    //     });
    // };

    public func get_account_identifier_balance(aid : Text) : async Nat64 {
        await ICPIndex.get_account_identifier_balance(aid)
    };

    // public func get_account_identifier_transactions(args : IndexTypes.GetAccountIdentifierTransactionsArgs) : async IndexTypes.GetAccountIdentifierTransactionsResult {
    //     await ICPIndex.get_account_identifier_transactions(args);
    // };

    public func index_status() : async IndexTypes.Status {
        await ICPIndex.status()
    };

    public func ledger_id() : async Principal {
        await ICPIndex.ledger_id()
    };

    type ICP = {
        e8s : Nat64
    };

    type TimeStamp = { timestamp_nanos : Nat64 };

    type Memo = Nat64;

    // public func transferICP(recipient : Text, amount : ICP, fee : ICP,  memo : Memo, created_at : TimeStamp) : async LedgerTypes.Result_5 {
    //     // try {
    //     await ICPLedger.transfer({
    //             from_subaccount = null;
    //             to = AccountIdentifier.fromPrincipal(Principal.fromText(recipient), null);
    //             amount = amount;
    //             fee = fee;
    //             memo = memo;
    //             created_at_time = ?created_at;
    //         });
    //     //     switch(transferLog) {
    //     //         case(#Ok(transferLog)) {
    //     //             #ok(transferLog);
    //     //         };
    //     //         case(#Err(error)) {
    //     //             return #err("An error occured!");
    //     //         };
    //     //     };
    //     // } catch(err) {
    //     //     return #err(Error.message(err));
    //     // };
    // };

    public func transferWinnerReward(recipient : Text, amount : Nat) : async Result.Result<(), Text> {
        try {
            let transferLog = await ICPLedger.icrc1_transfer({
                from_subaccount = null;
                to = {
                    owner = Principal.fromText(recipient);
                    subaccount = null
                };
                amount = amount;
                fee = null;
                memo = null;
                created_at_time = null
            });
            switch (transferLog) {
                case (#Ok(trabsferLog)) {
                    #ok()
                };
                case (#Err(error)) {
                    return #err("An error occured!")
                }
            }
        } catch (err) {
            return #err(Error.message(err))
        }
    };

    // deprecated
    public func transferICP2(amount : Nat) : async Result.Result<(), Text> {
        let recipient = "rnyh2-lbh6y-upwtx-3wazz-vafac-2hkqs-bxz2t-bo45m-nio7n-wsqy7-dqe";
        try {
            let transferLog = await ICPLedger.icrc1_transfer({
                from_subaccount = null;
                to = {
                    owner = Principal.fromText(recipient);
                    subaccount = null
                };
                amount = amount;
                fee = null;
                memo = null;
                created_at_time = null
            });
            switch (transferLog) {
                case (#Ok(trabsferLog)) {
                    #ok()
                };
                case (#Err(error)) {
                    return #err("An error occured!")
                }
            }
        } catch (err) {
            return #err(Error.message(err))
        }
    };

    public func getPrincipal() : async Principal {
        Principal.fromText("rnyh2-lbh6y-upwtx-3wazz-vafac-2hkqs-bxz2t-bo45m-nio7n-wsqy7-dqe")
    };

    // public shared ({ caller }) func pay_to_join_tournament(name : Text, id : Text, fee : Nat) : async Result.Result<(), Text>{
    //     // let transfer = await transferICP(await getAccountIdentifier(caller), fee);
    //     switch(transfer) {
    //         case(#ok()){
    //             try {
    //                 return #ok(await RustBloc.join_tournament(name, id));
    //             } catch err {
    //                 throw (err);
    //             }
    //         }; case (_){
    //             return #err("An error occured! Kindly check your balance");
    //         }
    //     }
    // };

    // public shared ({ caller }) func prepaid_tournament(name : Text, id : Text, fee : Nat, tournamentAccount : Bloctypes.TournamentAccount) : async Result.Result<Bloctypes.Result, Text>{
    //     let payment : Nat = tournamentAccount.total_prize;
    //     let transfer = await transferICP(Principal.fromText"rnyh2-lbh6y-upwtx-3wazz-vafac-2hkqs-bxz2t-bo45m-nio7n-wsqy7-dqe", payment);
    //     switch(transfer){
    //         case(#ok){
    //             try {
    //                 return #ok(await RustBloc.create_tournament(tournamentAccount));
    //             } catch err {
    //                 throw (err);
    //             }
    //         };
    //         case(_){
    //             return #err("An error occured! Kindly check if you have enough balance to create this tournament ")
    //         }
    //     }

    // };

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

    public func getUser(caller : Principal) : async ?Bloctypes.UserProfile {
        ProfileHashMap.get(caller)
    };

    type TournamentAccount = Bloctypes.TournamentAccount;

    // private let ic : IC.Self = actor "aaaaa-aa";

    public query func getOwnerCanister() : async Principal {
        userCanisterId
    };

    public query ({ caller }) func getOwner() : async Principal {
        caller
    };

    // Trying to hard code the wallet id - possible solution is use a transfer_from func
    // Look into the icrc-2 documentation

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
        return AccountIdentifier.toText(AccountIdentifier.fromPrincipal(userCanisterId, null));
    };

    public type AccountIdentifier = [Nat8];

    public func getRealAccountIdentifier(caller : Text) : async Result.Result<AccountIdentifier, Text> {
        AccountIdentifier.fromText(caller)
    };

    public type MessageEntry = {
        f_id : Text;
        id : Nat;
        sender : Principal;
        username : Text;
        body : Text;
        time : Text
    };

    private stable var connectionID : Nat = 0;
    private stable var messageID : Nat = 0;

    // private stable var conversationEntries : [(Text, Conversation)] = [];
    private stable var messageEntries : [(Nat, MessageEntry)] = [];

    // var ConnectionHashMap : HashMap.HashMap<Nat, ConnectionEntry> = HashMap.fromIter<Nat, ConnectionEntry>(connectionEntries.vals(), 10, Nat.equal, Hash.hash);
    var MessageHashMap : HashMap.HashMap<Nat, MessageEntry> = HashMap.fromIter<Nat, MessageEntry>(messageEntries.vals(), 10, Nat.equal, Hash.hash);

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
        // switch(messageID){
        //     case (null) {
        //         // Do absolutely nothing
        //         // MessageHashMap.put(messageID, newMessage);
        //     };
        //     case (?messageID){
        //         MessageHashMap.put(messageID, newMessage);
        //         messageID := messageID + 1;
        //     }
        // };
        // MessageHashMap.put(messageID, newMessage);
        MessageHashMap.put(messageID, newMessage);
        messageID := messageID + 1;
        await update_messages_sent(caller);
        
        sent := true;
        return newMessage
    };

    public shared ({ caller }) func sendMessage(body : Text, time : Text, username : Text, f_id : Text) : async () {
        var sent : Bool = false;
        var newMessage : MessageEntry = createMessage(messageID, f_id, username, caller, body, time);
        // switch(messageID){
        //     case (null) {
        //         // Do absolutely nothing
        //         // MessageHashMap.put(messageID, newMessage);
        //     };
        //     case (?messageID){
        //         MessageHashMap.put(messageID, newMessage);
        //         messageID := messageID + 1;
        //     }
        // };
        // MessageHashMap.put(messageID, newMessage);
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

    public shared ({ caller }) func createUser(user : Principal) : async Principal {
        assert (caller == userCanisterId);
        userCanisterId := user;
        await getOwner()
    };

    func makeProfile(id_hash : Text,  age : Nat8, date : Text, wins : Nat8, tournaments_created : Nat8, is_mod : Bool, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text, points : ?Nat, role : Bloctypes.Role) : Bloctypes.UserProfile {
        {
            id_hash;
            age;
            date;
            status;
            wins;
            tournaments_created;
            username;
            is_mod;
            role;
            principal_id;
            account_id;
            canister_id;
            squad_badge;
            points
        }
    };

    public func createProfile(id_hash : Text, age : Nat8, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text, role : Bloctypes.Role) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, status, username, principal_id, account_id, canister_id, squad_badge, ?0, role);
        await RustBloc.create_profile(profile, caller)
    };

    public shared ({ caller }) func createUserProfile(id_hash : Text, age : Nat8, username : Text, time : Text, squad_badge : Text, role : Bloctypes.Role) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, time, 0, 0, false, #Online, username, Principal.toText(caller), await getAccountIdentifier(caller), Principal.toText(userCanisterId), squad_badge, ?0, role);
        try {
            await create_usertrack(caller);
            ProfileHashMap.put(caller, profile);
            return await RustBloc.create_profile(profile, caller)
        } catch err {
            throw (err)
        }
    };

    //
    // User activities
    //

    public func create_usertrack(caller : Principal) : async () {
        USER_TRACK_STORE.put(
            caller,
            {
                user = caller;
                tournaments_created = 0;
                tournaments_joined = 0;
                tournaments_won = 0;
                messages_sent = 0;
                feedbacks_sent = 0;
                total_point = 0
            },
        )
    };

    public func update_tournaments_created(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created + 1;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.tournaments_created + tracker.tournaments_joined + tracker.tournaments_won + tracker.messages_sent + tracker.feedbacks_sent
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public func update_tournaments_joined(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined + 1;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.tournaments_created + tracker.tournaments_joined + tracker.tournaments_won + tracker.messages_sent + tracker.feedbacks_sent
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public func update_tournaments_won(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won + 1;
                    messages_sent = tracker.messages_sent;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.tournaments_created + tracker.tournaments_joined + tracker.tournaments_won + tracker.messages_sent + tracker.feedbacks_sent
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    public func update_messages_sent(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent + 1;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.tournaments_created + tracker.tournaments_joined + tracker.tournaments_won + tracker.messages_sent + tracker.feedbacks_sent
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

    //
    // Feedbacks
    //

    public func update_feedbacks_sent(caller : Principal) : async () {
        var tracker = USER_TRACK_STORE.get(caller);
        switch (tracker) {
            case (null) {};
            case (?tracker) {
                var update = {
                    user = tracker.user;
                    tournaments_created = tracker.tournaments_created;
                    tournaments_joined = tracker.tournaments_joined;
                    tournaments_won = tracker.tournaments_won;
                    messages_sent = tracker.messages_sent + 1;
                    feedbacks_sent = tracker.feedbacks_sent;
                    total_point = tracker.tournaments_created + tracker.tournaments_joined + tracker.tournaments_won + tracker.messages_sent + tracker.feedbacks_sent
                };
                var updated = USER_TRACK_STORE.replace(caller, update)
            }
        }
    };

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

    // public func mark_feedback_read() : async Bool {

    // };

    public query func get_all_feedback() : async [Bloctypes.Feedback] {
        var buffer = Buffer.Buffer<Bloctypes.Feedback>(0);
        for ((i, j) in FEED_BACK_STORE.entries()) {
            buffer.add(j)
        };
        buffer.toArray()
    };

    //
    // Tournaments
    //

    public shared ({ caller }) func create_tournament(tournamentAccount : Bloctypes.TournamentAccount) : async Bloctypes.Result {
        try {
            await update_tournaments_created(caller);
            TournamentHashMap.put(caller, tournamentAccount);
            await RustBloc.create_tournament(tournamentAccount)
        } catch err {
            throw (err)
        }
    };

    public func count_all_squad() : async Nat {
        await RustBloc.count_all_squad()
    };

    public func count_all_users() : async Nat {
        await RustBloc.count_all_users()
    };

    public shared ({ caller }) func end_tournament(id : Text, name : [Text]) : () {
        try {
            await RustBloc.end_tournament(id, name, caller)
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func getSelf() : async Bloctypes.UserProfile {
        // assert(caller == userCanisterId);
        let result : Bloctypes.UserProfile = await RustBloc.getSelf(caller);
        result
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
            return await RustBloc.close_squad(id, names, caller)
        } catch err {
            throw (err)
        }
    };

    public shared ({ caller }) func open_squad(names : [Text], id : Text) : async () {
        try {
            return await RustBloc.open_squad(id, names, caller)
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

    public shared ({ caller }) func join_tournament_with_squad(squad_id : Text, id : Text, ign : [(Text, Text)], new_member_ign : [(Text, Text)]) : async () {
        try {
            await update_tournaments_joined(caller);
            return await RustBloc.join_tournament_with_squad(squad_id, id, ign)
        } catch err {
            throw (err)
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

    public shared ({ caller }) func join_tournament(name : Text, id : Text, ign : (Text, Text)) : async () {
        
        try {
            await update_tournaments_joined(caller);
            return await RustBloc.join_tournament(name, id, ign)
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

    //
    // HTTP outcalls
    //

    public query func transform(raw : HTTP.TransformArgs) : async HTTP.CanisterHttpResponsePayload {
        let transformed : HTTP.CanisterHttpResponsePayload = {
            status = raw.response.status;
            body = raw.response.body;
            headers = [
                {
                    name = "Content-Security-Policy";
                    value = "default-src 'self'"
                },
                {
                    name = "Referrer-Policy";
                    value = "strict-origin"
                },
                {
                    name = "Permissions-Policy";
                    value = "geolocation=(self)"
                },
                {
                    name = "Strict-Transport-Security";
                    value = "max-age=63072000"
                },
                {
                    name = "X-Frame-Options";
                    value = "DENY"
                },
                {
                    name = "X-Content-Type-Options";
                    value = "nosniff"
                },
            ]
        };
        transformed
    };


    public func send_http_get_request(url_ : Text, player_tag : Text) : async Text {

        let ic : HTTP.IC = actor ("aaaa-aa");

        // let host : Text = "";
        let url = "https://api.clashroyale.com/v1/players/" # player_tag;
        let api_key = "ey-xxx";

        let transform_context : HTTP.TransformContext = {
            function = transform;
            context = Blob.fromArray([])
        };

        // let idempotency_key: Text = generateUUID();
        let request_headers = [
            { name = "Authorization"; value = "Bearer " # api_key },
            { name = "User-Agent"; value = "gamebloc_canister" },
            { name = "Content-Type"; value = "application/json" },
            // { name = "x-api-key"; value = "" },
        ];
        Debug.print("Loading......." # url);

        let http_request : HTTP.HttpRequestArgs = {
            url = url;
            max_response_bytes = null; //optional for request
            headers = request_headers;
            body = null; //optional styll
            method = #get;
            transform = ?transform_context
        };

        Cycles.add(230_850_258_000);

        let http_response : HTTP.HttpResponsePayload = await ic.http_request(http_request);

        let response_body : Blob = Blob.fromArray(http_response.body);
        let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
            case (null) { "No value returned" };
            case (?y) { y }
        };

        //6. RETURN RESPONSE OF THE BODY
        let result : Text = decoded_text # ". See more info of the request sent at: " # url # "/inspect";
        return result
    };

    // automated payment and receiving
    // 

    // public func start_tournament(id : Text) : (){

    // };

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
                        await sendMessage(groupMessage.message.body, groupMessage.message.time, groupMessage.message.username, groupMessage.message.f_id)
                    }
                }
            }
        };
        // switch(msg) {
        //     case(#GroupMessage(message)){

        //     } case ()
        // };

        // var john = msg.
        // var actualMessage = msg.GroupMessage.Messagse;
        // var newMessage = sendMessage( msg.GroupChatMessage.Message.body, msg.GroupMessage.Message.time, msg.GroupMessage.Message.username, msg.GroupMessage.Message.f_id )
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
                            await send_app_message(client, #GroupMessage(message))
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

}
