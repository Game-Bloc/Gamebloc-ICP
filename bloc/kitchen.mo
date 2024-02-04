import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
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

import AccountIdentifier "mo:principal/AccountIdentifier";
import AccountID "mo:principal/blob/AccountIdentifier";

import ICPLedger "canister:icp_ledger";
import ICPIndex "canister:icp_index";
import RustBloc "canister:game_bloc_backend";

import IndexTypes "indextypes";
import Bloctypes "bloctypes";
import LedgerTypes "ledgertypes";
import Utils "utils";
import Ledgertypes "ledgertypes";

shared ({ caller }) actor class Kitchen() {

    private stable var userCanisterId : Principal = caller;

    /// Backuo for the Gamebloc backend in the kitchen canister
    stable var ProfileEntries : [(Principal, Bloctypes.UserProfile)] = [];
    stable var TournamentEntries : [(Principal, Bloctypes.TournamentAccount)] = [];
    stable var IDEntries : [(Text, Text)] = [];
    stable var SquadEntries : [(Text, Bloctypes.Squad)] = [];

    var TournamentHashMap : HashMap.HashMap<Principal, Bloctypes.TournamentAccount> = HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
    var ProfileHashMap : HashMap.HashMap<Principal, Bloctypes.UserProfile> = HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);

    var ID_STORE = TrieMap.TrieMap<Text, Text>(Text.equal, Text.hash);
    var SQUAD_STORE = TrieMap.TrieMap<Text, Bloctypes.Squad>(Text.equal, Text.hash);

    /// stabilizing the motoko backup
    system func preupgrade() {
        ProfileEntries := Iter.toArray(ProfileHashMap.entries());
        TournamentEntries := Iter.toArray(TournamentHashMap.entries());
        IDEntries := Iter.toArray(ID_STORE.entries());
        SquadEntries := Iter.toArray(SQUAD_STORE.entries());
    };

    system func postupgrade() {
        TournamentHashMap := HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
        ProfileHashMap := HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);

        ID_STORE := TrieMap.fromEntries<Text, Text>(IDEntries.vals() ,Text.equal, Text.hash);
        SQUAD_STORE := TrieMap.fromEntries<Text, Bloctypes.Squad>(SquadEntries.vals(), Text.equal, Text.hash);

        // clear the states
        ProfileEntries := [];
        TournamentEntries:= [];
        IDEntries:= [];
        SquadEntries:= [];
    };

    func createOneProfile(id_hash : Text, age : Nat8, username : Text, caller : Principal) {
        // let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
        ProfileHashMap.put(caller, makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online, username, Principal.toText(caller), AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null)), Principal.toText(userCanisterId), ""))
    };

    // public func update_users() : async () {

    //     let result = await RustBloc.get_all_user();
    //     var users : [(Principal, Bloctypes.UserProfile)] = [];
    //     for (i in Iter.fromArray(result)){
    //         users := Array.append(users, [(i.principal_id, i)]);
    //     };
    //      := [] := users;
    // };

    public shared ({ caller }) func createprofile(id_hash : Text, age : Nat8, username : Text) : async Result.Result<Text, Text> {
        // call the balnce function to get and set the balance of newly registered users
        let balance = 10;
        let checkUsername = usernameChecker(username);
        if (checkUsername == false) {
            #err("This username exist! Please enter another")
        } else {
            createOneProfile(id_hash, age, username, caller);
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
            created_at_time = ?created_at_time;
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

    public type AccountIdentifier = [Nat8];

    public func getRealAccountIdentifier(caller : Text) : async Result.Result<AccountIdentifier, Text> {
        AccountIdentifier.fromText(caller)
    };

    public type MessageEntry = {
        id : Nat;
        connectionId : Nat;
        sender : Principal;
        body : Text;
        createdAt : Int
    };

    public type ConnectionEntry = {
        id : Nat;
        account1 : Principal;
        account2 : Principal;
        createdAt : Int
    };

    private stable var connectionID : Nat = 0;
    private stable var messageID : Nat = 0;

    private stable var conversationEntries : [(Text, Conversation)] = [];
    private stable var connectionEntries : [(Nat, ConnectionEntry)] = [];
    private stable var messageEntries : [(Nat, MessageEntry)] = [];

    var ConnectionHashMap : HashMap.HashMap<Nat, ConnectionEntry> = HashMap.fromIter<Nat, ConnectionEntry>(connectionEntries.vals(), 10, Nat.equal, Hash.hash);
    var MessageHashMap_ : HashMap.HashMap<Nat, MessageEntry> = HashMap.fromIter<Nat, MessageEntry>(messageEntries.vals(), 10, Nat.equal, Hash.hash);

    type Message = {
        id : Nat;
        customer : Principal;
        body : Text;
        company : Principal;
        time : Int
    };

    type Conversation = {
        conversationID : ?Text;
        messages : [Message]
    };

    var messages : [Message] = [];

    public shared ({ caller }) func sendMessage(account : Principal, body : Text) : async ?() {
        var sent : Bool = false;
        do ? {
            var size = ConnectionHashMap.size();
            Debug.print(debug_show (size));
            if (size == 0) {
                var newConnection : ConnectionEntry = createConnection(connectionID, account, caller, Time.now());
                ConnectionHashMap.put(connectionID, newConnection);
                connectionID := connectionID + 1;
                //create message with the connection Id
                var newMessage = createMessage(messageID, newConnection.id, caller, body, Time.now());
                MessageHashMap_.put(messageID, newMessage);
                messageID := messageID + 1;
                sent := true
            } else {
                for ((i, j) in ConnectionHashMap.entries()) {
                    if (((j.account1 == caller) and (j.account2 == account)) or ((j.account1 == account) and (j.account2 == caller))) {
                        // THERE IS A CONNCETION PAIRING THIER CONVERSATION ALREADY
                        var newMessage = createMessage(messageID, j.id, caller, body, Time.now());
                        MessageHashMap_.put(messageID, newMessage);
                        messageID := messageID + 1;
                        sent := true;

                    }
                }
            };
            if (sent == false) {
                // NO CONNECTION; NEW USER
                //create a new connetion
                var newConnection : ConnectionEntry = createConnection(connectionID, account, caller, Time.now());
                ConnectionHashMap.put(connectionID, newConnection);
                connectionID := connectionID + 1;
                //create message with the connection Id
                var newMessage = createMessage(messageID, newConnection.id, caller, body, Time.now());
                MessageHashMap_.put(messageID, newMessage);
                messageID := messageID + 1;

            }
        }
    };

    func createConnection(id : Nat, account1 : Principal, account2 : Principal, createdAt : Int) : ConnectionEntry {
        {
            id;
            account1;
            account2;
            createdAt
        }
    };

    func createMessage(id : Nat, connectionId : Nat, sender : Principal, body : Text, createdAt : Int) : MessageEntry {
        {
            id;
            connectionId;
            sender;
            body;
            createdAt
        }
    };

    public func getMessage(id : Nat) : async ?MessageEntry {
        MessageHashMap_.get(id)
    };

    public shared query ({ caller }) func getMessages(account : Principal) : async [MessageEntry] {
        // var checkForConnection = await checkConnection(account, caller);
        //  if (checkForConnection == true) {
        var msgs = Buffer.Buffer<MessageEntry>(0);
        for ((i, j) in ConnectionHashMap.entries()) {
            if (((j.account1 == caller) and (j.account2 == account)) or ((j.account1 == account) and (j.account2 == caller))) {
                for ((k, l) in MessageHashMap_.entries()) {
                    if (l.connectionId == j.id) {
                        msgs.add(l)
                    }
                }
            }
        };
        msgs.toArray();
        //  }
    };

    public shared ({ caller }) func createUser(user : Principal) : async Principal {
        assert (caller == userCanisterId);
        userCanisterId := user;
        await getOwner()
    };

    func makeProfile(id_hash : Text, age : Nat8, date : Text, wins : Nat8, tournaments_created : Nat8, is_mod : Bool, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text) : Bloctypes.UserProfile {
        {
            id_hash;
            age;
            date;
            status;
            wins;
            tournaments_created;
            username;
            is_mod;
            principal_id;
            account_id;
            canister_id;
            squad_badge
        }
    };

    public func createProfile(id_hash : Text, age : Nat8, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, status, username, principal_id, account_id, canister_id, squad_badge);
        await RustBloc.create_profile(profile, caller)
    };

    public shared ({ caller }) func createUserProfile(id_hash : Text, age : Nat8, username : Text, time : Text, squad_badge : Text) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, time, 0, 0, false, #Online, username, Principal.toText(caller), await getAccountIdentifier(caller), Principal.toText(userCanisterId), squad_badge);
        try {
            ProfileHashMap.put(caller, profile);
            return await RustBloc.create_profile(profile, caller)
        } catch err {
            throw (err)
        }
    };

    public func create_tournament(tournamentAccount : Bloctypes.TournamentAccount) : async Bloctypes.Result {
        try {
            TournamentHashMap.put(caller, tournamentAccount);
            await RustBloc.create_tournament(tournamentAccount)
        } catch err {
            throw (err)
        }

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

    public func join_tournament_with_squad(squad_id : Text, id : Text) : async () {
        try {
            return await RustBloc.join_tournament_with_squad(squad_id, id)
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

    public func is_mod(name : Text) : async Bool {
        try {
            return let result = await RustBloc.is_mod(name)
        } catch err {
            throw (err)
        }

    };

    public func join_tournament(name : Text, id : Text) : async () {
        try {
            return await RustBloc.join_tournament(name, id)
        } catch err {
            throw (err)
        }
    };

    public func set_mod(name : Text, identity : Principal) : async () {
        try {
            return await RustBloc.set_mod(name, identity)
        } catch err {
            throw (err)
        }
    };

    // public func start_tournament(id : Text) : (){

    // };

    public func get_number_of_squads() : async Nat {
        ID_STORE.size()
    };

    public func get_number_of_unique_users() : async Nat {
        ProfileHashMap.size()
    };

    public func get_total_number_of_tournament() : async Nat {
        TournamentHashMap.size()
    };

    public func get_total_number_of_squads() : async Nat {
        SQUAD_STORE.size()
    }



}
