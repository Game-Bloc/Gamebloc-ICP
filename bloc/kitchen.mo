import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
// import AccountIdentifier "mo:account-identifier";
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

import AccountIdentifier "utils/utils";
// import AccountID "mo:principal/blob/AccountIdentifier";

import ICPLedger "canister:icp_ledger";
import ICPIndex "canister:icp_index";
import RustBloc "canister:game_bloc_backend";
// import
// import
// import ICRC1 "canister:icrc1_ledger";

import IndexTypes "types/indextypes";
import Bloctypes "types/bloctypes";
import LedgerTypes "types/ledgertypes";
import CKTypes "types/ck_types";

import Utils "utils/utils";
import HTTP "utils/http";
import Hex "utils/Hex";

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
private stable var volume : Nat64 = 0;
private stable var SupportedGames : [Text] = [];
private stable var PasswordEntries : [(Principal, Bloctypes.Access)] = [];
private stable var NotificationEntries : [(Principal, Bloctypes.Notifications)] = [];
private stable var PayEntries : [(Nat, Bloctypes.Pay)] = [];
private stable var BalanceEntries : [(Principal, Bloctypes.UserBalance)] = [];

var TournamentHashMap : HashMap.HashMap<Principal, Bloctypes.TournamentAccount> = HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
var PayHashMap : HashMap.HashMap<Nat, Bloctypes.Pay> = HashMap.fromIter<Nat, Bloctypes.Pay>(PayEntries.vals(), 10, Nat.equal, Hash.hash);
var ProfileHashMap : HashMap.HashMap<Principal, Bloctypes.UserProfile> = HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
var NOTIFICATION_STORE : HashMap.HashMap<Principal, Bloctypes.Notifications> = HashMap.fromIter<Principal, Bloctypes.Notifications>(NotificationEntries.vals(), 10, Principal.equal, Principal.hash);
var BalanceHashMap : HashMap.HashMap<Principal, Bloctypes.UserBalance> = HashMap.fromIter<Principal, Bloctypes.UserBalance>(BalanceEntries.vals(), 10, Principal.equal, Principal.hash);

var ID_STORE = TrieMap.TrieMap<Text, Text>(Text.equal, Text.hash);
var PASSWORD_STORE = TrieMap.TrieMap<Principal, Bloctypes.Access>(Principal.equal, Principal.hash);
var FEED_BACK_STORE = TrieMap.TrieMap<Nat, Bloctypes.Feedback>(Nat.equal, Hash.hash);
var SQUAD_STORE = TrieMap.TrieMap<Text, Bloctypes.Squad>(Text.equal, Text.hash);
var USER_TRACK_STORE = TrieMap.TrieMap<Principal, Bloctypes.UserTrack>(Principal.equal, Principal.hash);

// var PAY_STORE = Buffer.Buffer<Bloctypes.PayrollHistory>(0);

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

    messageEntries := Iter.toArray(MessageHashMap.entries());
    BalanceEntries := Iter.toArray(BalanceHashMap.entries());

    // Passwords
    PasswordEntries := Iter.toArray(PASSWORD_STORE.entries())
};

system func postupgrade() {
    TournamentHashMap := HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
    ProfileHashMap := HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
    MessageHashMap := HashMap.fromIter<Nat, MessageEntry>(messageEntries.vals(), 10, Nat.equal, Hash.hash);
    BalanceHashMap := HashMap.fromIter<Principal, Bloctypes.UserBalance>(BalanceEntries.vals(), 10, Principal.equal, Principal.hash);
    NOTIFICATION_STORE := HashMap.fromIter<Principal, Bloctypes.Notifications>(NotificationEntries.vals(), 10, Principal.equal, Principal.hash);

    ID_STORE := TrieMap.fromEntries<Text, Text>(IDEntries.vals(), Text.equal, Text.hash);
    SQUAD_STORE := TrieMap.fromEntries<Text, Bloctypes.Squad>(SquadEntries.vals(), Text.equal, Text.hash);
    USER_TRACK_STORE := TrieMap.fromEntries<Principal, Bloctypes.UserTrack>(UserTrackEntries.vals(), Principal.equal, Principal.hash);
    FEED_BACK_STORE := TrieMap.fromEntries<Nat, Bloctypes.Feedback>(FeedbackEntries.vals(), Nat.equal, Hash.hash);

    PASSWORD_STORE := TrieMap.fromEntries<Principal, Bloctypes.Access>(PasswordEntries.vals(), Principal.equal, Principal.hash);

    // clear the states
    ProfileEntries := [];
    UserTrackEntries := [];
    TournamentEntries := [];
    IDEntries := [];
    SquadEntries := [];
    FeedbackEntries := [];
    PasswordEntries := [];
    messageEntries := [];
    NotificationEntries := []
};

//
// Ledger Canister
//


// TODO: Test functions

func floatNum(num : Float) : Float {
    num * 2
};

func floatNum2(num : Float) : Int {
    let result = num * 2;
    return Float.toInt(result)
};

func natNum(num : Nat) : Text {
    Nat.toText(num)
};

func natNumText(num : Text) : ?Nat {
    Nat.fromText(num)
};

// ! ENd of the todo.

// * @param pays The parameter for this method

public shared ({ caller }) func payUsers(pays : [Bloctypes.Pay]) : async () {
    // var mod = await is_mod(caller);
    try {
        if (await is_mod(caller)) {
            for (pay in Iter.fromArray(pays)) {
                // var _account = pay.account;
                var block = await ICPLedger.send_dfx({
                    // might have ton use transfer_From()
                    to = pay.account;
                    fee = { e8s = 10_000 }; //0.0001 ICP
                    memo = 0;
                    from_subaccount = null;
                    created_at_time = ?{
                        timestamp_nanos = Nat64.fromNat(Int.abs(Time.now()))
                    };
                    amount = pay.amount
                })
            }
        }
    } catch err {
        throw (err)
    }
};

// Check 2
public shared ({ caller }) func disbursePayment(id : Text, icp_price : Nat) : async () {
    // Tournamnet Id
    var mod = await is_mod(caller);
    var tournament = await get_tournament(id);

    // * Required variables for the switch cases
    var winners = tournament.winners;
    var ended = tournament.ended;

    // * Check if tournamnet has ended

    switch (ended) {
        case (null) {};
        case (?(ended)) {
            if (ended == false) {
                throw Error.reject("Warning! Tournamnet has to end before the payment can be initiated!")
            }
        }
    };

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
                            created_at_time = null;
                            amount = (winner.amount * 10_000_000_000)/icp_price;
                        });
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

// public func transferICPFrom(_from : AccountIdentifier, _to : AccountIdentifier, _amount : Nat) : async LedgerTypes.Result_2 {
//     try {
//         let transfer = await ICPLedger.icrc2_transfer_from({
//             to = _to;
//             fee = null;
//             spender_subaccount = null;
//             from = _from;
//             memo = null;
//             created_at_time = Nat64.fromIntWrap(Time.now());
//             amount = _amount;
//         });
//         return #ok(transfer);
//     } catch (err) {
//         retrun #err(Error.nessage(err));
//     }
// };

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
// public func icrc1_balance_of(account : IndexTypes.Account) : async Nat64 {
//     await ICPIndex.icrc1_balance_of(account)
// };

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

// public func transferICPFrom(_from : LedgerTypes.Account, _to : LedgerTypes.Account, _amount : Nat, ) : async LedgerTypes.Result_2 {
//     await ICPLedger.icrc2_transfer_from({
//         to = _to;
//         fee = null;
//         spender_subaccount = null;
//         from = _from;
//         memo = null;
//         created_at_time = null;
//         amount = _amount;

//     });
// };

/// Ledger Canister Ends

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

// ! Deprecated function

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

// * Transfer tests
public func transferFrom(_from : Principal, _to : Principal, _amount : Nat) : async LedgerTypes.Result_2 {
    await ICPLedger.icrc2_transfer_from({
        to = {
            owner = _to;
            subaccount = null
        };
        fee = null;
        spender_subaccount = null;
        from = {
            owner = _from;
            subaccount = null
        };
        memo = null;
        created_at_time = null;
        amount = _amount
    })
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

/// Index Canister Ends

/// Profile

func createOneProfile(id_hash : Text, age : Nat8, username : Text, attendance : ?Nat8, losses : ?Nat8, caller : Principal, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role) {
    // let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
    ProfileHashMap.put(caller, makeProfile(id_hash, age, Int.toText(Time.now()), 0, attendance, losses, 0, false, #Online, username, Principal.toText(caller), AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null)), Principal.toText(userCanisterId), "", points, role))
};

// public func update_users() : async () {

//     let result = await RustBloc.get_all_user();
//     var users : [(Principal, Bloctypes.UserProfile)] = [];
//     for (i in Iter.fromArray(result)){
//         users := Array.append(users, [(i.principal_id, i)]);
//     };
//      := [] := users;

// };

// public func updatePays(payment : Bloctypes.PoH) : () {
//     PAY_STORE.add(payment);
// };

// public func getPays() : async [Bloctypes.PoH] {
//     PAY_STORE.toArray();
// };

public shared ({ caller }) func createprofile(id_hash : Text, age : Nat8, username : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role) : async Result.Result<Text, Text> {
    // call the balnce function to get and set the balance of newly registered users
    let balance = 10;
    let checkUsername = usernameChecker(username);

    if (checkUsername == false) {
        #err("This username exist! Please enter another")
    } else {
        createOneProfile(id_hash, age, username, ?0, ?0, caller, points, role);
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

// public shared ({ caller }) func initBalance(me : Principal) : async () {
//     var token = await icp_balance2(caller);

//     BalanceHashMap.put(caller, {
//         user = caller;
//         balance = token.e8s;
//     });
// };

public shared ({ caller }) func updateBalance(_amount : Nat, deposit : Bool) : async Bool {
    var _balance = BalanceHashMap.get(caller);
    if (deposit) {
        switch (_balance) {
            case null {
                return false
            };
            case (?(_balance)) {
                var newBalance : Bloctypes.UserBalance = {
                    user = _balance.user;
                    balance = _balance.balance + _amount
                };
                var updated = BalanceHashMap.replace(caller, newBalance);
                return true
            }
        }
    } else {
        switch (_balance) {
            case null {
                return false
            };
            case (?(_balance)) {
                var newBalance : Bloctypes.UserBalance = {
                    user = _balance.user;
                    balance = _balance.balance - _amount
                };
                var updated = BalanceHashMap.replace(caller, newBalance);
                return true
            }
        }
    }

};

public shared ({ caller }) func checkLastBalance() : async Nat {
    var _balance = BalanceHashMap.get(caller);
    switch (_balance) {
        case null {
            return 0
        };
        case (?(_balance)) {
            return _balance.balance
        }
    }
    // return _balance.balance;
};

func checkUserLastBalance(caller : Principal) : async Nat {
    var _balance = BalanceHashMap.get(caller);
    var icp_balance = await ICPLedger.icrc1_balance_of({
        owner = caller; subaccount = null
    });
    
    switch (_balance) {
        case null {
            return 0
        };
        case (?(_balance)) {
            if (_balance.balance == icp_balance){
                
            };
            return _balance.balance
        }
    }
    // return _balance.balance;
};

// public shared ({ caller }) func checkStatus() : async Bool {
//     var balance = checkUserLastBalance(caller);
//     var token = await icp_balance2(caller);
//     if (balance != token.e8s){
//         if (balance < token.e8s) {
//             await notify("Deposit Successful", "You have successfully deposited " # Nat64.toText(token.e8s - balance) # "ICP into your account.", caller, Time.now(), 1, AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller)))
//         }
//         return true;
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

public shared ({ caller }) func createUser(user : Principal) : async Principal {
    assert (caller == userCanisterId);
    userCanisterId := user;
    await getOwner()
};

func makeProfile(id_hash : Text, age : Nat8, date : Text, wins : Nat8, attendance : ?Nat8, losses : ?Nat8, tournaments_created : Nat8, is_mod : Bool, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role) : Bloctypes.UserProfile {
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
        points
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

// * For testing purposes

public func testNat(entry : Nat, icp_price : Nat) : async Nat {
    (entry * 10_000_000_000) / (icp_price)
};

public func testNat2(entry : Nat, icp_price : Nat) : async Nat {
    (entry * 100) / (icp_price)
};

public func testNat3() : async Nat {
    10_000_000_000
};

public func ApproveThisCanister1() : async LedgerTypes.Account {
    return {
        owner = userCanisterId;
        subaccount = null
    }
};

public func ApproveThisCanister2() : async LedgerTypes.Account {
    return {
        owner = caller;
        subaccount = null
    }
};

// public func ApproveThisCanister3() : async LedgerTypes.Account {
//     return {
//         owner = caller;
//         subaccount = null;
//     }
// };

// * End of Test

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

public func passwordChecker(_password : Text) : async () {

};

/// Messaging Feature

public type MessageEntry = {
    f_id : Text;
    id : Nat;
    sender : Principal;
    username : Text;
    body : Text;
    time : Text
};

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

// public func getSortedMessages() : async [MessageEntry] {
//     let entries = Iter.toArray(MessageHashMap.entries());
//     let sortedEntries: [(Key, Value)] = Array.sort(entries, func(a: (Key, Value), b: (Key, Value)) -> Bool {
//         a.0 < b.0
//     });
// };

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

/// Notifications Panel

func makeNotification(id : Nat, body : Text, title : Text, user : Principal, username : Text, date : Text, read : Bool) : Bloctypes.Notification {
    {
        id;
        title;
        body;
        user;
        username;
        date;
        read
    }
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
            var newNotification = makeNotification(id +1, title, body, caller, user, date, false);
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

/// Notfications Panel Ends

public shared ({ caller }) func createPassword(_password : Text, _confirm_password : Text) : async Result.Result<Text, Text> {
    var time : Int = Time.now();
    if (_password == _confirm_password) {
        PASSWORD_STORE.put(
            caller,
            {
                _user = caller;
                _password;
                _confirm_password;
                _updatedTime = time
            },
        );
        return #ok("You have successfully set password")
    } else {
        return #err("Password must be the same")
    }

};

public shared ({ caller }) func updatePassword() : () {

};

public shared ({ caller }) func recoveryPassword() : () {

};

public shared ({ caller }) func checkPassword(_password : Text) : async Bool {
    return true
};

func createProfile(id_hash : Text, age : Nat8, status : Bloctypes.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role) : async Bloctypes.Result {
    let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, ?0, ?0, 0, false, status, username, principal_id, account_id, canister_id, squad_badge, points, role);
    await RustBloc.create_profile(profile, caller)
};

public shared ({ caller }) func createUserProfile(id_hash : Text, age : Nat8, username : Text, time : Text, squad_badge : Text, points : ?[(Text, Text, Bloctypes.Point)], role : ?Bloctypes.Role) : async Bloctypes.Result {
    let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, time, 0, ?0, ?0, 0, false, #Online, username, Principal.toText(caller), await getAccountIdentifier(caller), Principal.toText(userCanisterId), squad_badge, points, role);
    try {
        await create_usertrack(caller);
        await create_notification_panel(caller, username, time);
        ProfileHashMap.put(caller, profile);
        return await RustBloc.create_profile(profile, caller)
    } catch err {
        throw (err)
    }
};

//
// User activities
//

func create_usertrack(caller : Principal) : async () {
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

    let gbc_admin : Principal = Principal.fromText("f7fh6-taomf-eww4k-dvwbw-byv7g-s4uy7-yzlvr-nxjbm-rnwla-efxrc-rae"); //Deon here

//
// * Tournaments Features
//

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

            if (Text.toUppercase(tournamentAccount.game_type) == "SQUAD"){
                multiplier := 4;
            } else if (Text.toUppercase(tournamentAccount.game_type) == "DUO"){
                multiplier := 2;
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
            let withdrawalNotification = await notify("ICP Withdrawal Request Processed", "Dear " # tournamentAccount.creator # ",\n 
                Your request to withdraw "# Nat.toText(_amount) # " ICP from your Gamebloc account has been successfully processed. The funds should now be available in the destination wallet.\n
                If you encounter any issues or have any questions, please contact our support team.\n
                Thank you for using Gamebloc, and we look forward to seeing you in future tournaments!\n
                Best regards,\n
                Gamebloc Team", caller, Nat64.toText(Nat64.fromIntWrap(Time.now())), await get_notification_id(caller), tournamentAccount.creator);
            // let depositNotification = await notify("Successful ICP Deposit to Your Gamebloc Account");
            let tournamentNotification = await notify("🎉 Tournament Created Successfully! 🎉", "Congratulations, " # tournamentAccount.creator # "! Your tournament " # tournamentAccount.title #  " has been successfully created. 🎮🎯", caller, Nat64.toText(Nat64.fromIntWrap(Time.now())), await get_notification_id(caller), tournamentAccount.creator);
            result;

            // return result
        } catch err {
            throw (err)
        }
    }
};

// ! Deprecated func

// public shared ({ caller }) func create_tournament2(tournamentAccount : Bloctypes.TournamentAccount, icp_price : Nat) : async Bloctypes.Result {
//     if (icp_price == 0){
//         Debug.print(debug_show(icp_price));
//         throw Error.reject("Cannnot fetch ICP price at the moment, please check app later....")
//     } else {
//         try {

//             await update_tournaments_created(caller);
//             TournamentHashMap.put(caller, tournamentAccount);
//             var fromPrincipal = await getUserPrincipal(tournamentAccount.creator);

//             Debug.print(debug_show(fromPrincipal));

//             var toAccount : LedgerTypes.Account = {
//                 owner = gbc_admin;
//                 subaccount = null;
//             };

//             Debug.print(debug_show(toAccount));

//             var fromAccount : LedgerTypes.Account = {
//                 owner = fromPrincipal;
//                 subaccount = null;
//             };

//             Debug.print(debug_show(fromAccount));

//             Debug.print(debug_show(tournamentAccount.tournament_type));

//             if (tournamentAccount.tournament_type == #Crowdfunded) {

//                 try {
//                     // var actual_price = amount / icp_price;
//                     var result = await ICPLedger.icrc2_transfer_from({
//                         to = toAccount;
//                         // ! Deprecated
//                         // {
//                         //     owner = gbc_admin;
//                         //     subaccount = null;
//                         // };
//                         fee = null;
//                         spender_subaccount = null;
//                         from = fromAccount;
//                         // ! Deprecated
//                         // {
//                         //     owner = fromPrincipal;
//                         //     subaccount = null;
//                         // };
//                         memo = null;
//                         created_at_time = null;
//                         amount = Nat8.toNat(tournamentAccount.entry_prize)/icp_price; //In USD
//                     });
//                 } catch (err) {
//                     throw Error.reject("There is an issue wih the transfer");
//                 }

//             } else { //Should be #prepaid
//                 var result = await ICPLedger.icrc2_transfer_from({
//                     to = {
//                 owner = gbc_admin;
//                 subaccount = null;
//             };
//                     fee = null;
//                     spender_subaccount = null;
//                     from = {
//                 owner = fromPrincipal;
//                 subaccount = null;
//             };
//                     memo = null;
//                     created_at_time = null;
//                     amount = tournamentAccount.total_prize/icp_price;
//                 });
//             };

//             await RustBloc.create_tournament(tournamentAccount);

//             // return result
//         } catch err {
//             throw (err)
//         }
//     }
// };

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

public shared ({ caller }) func test_end_tournament(id : Text, no_of_winners : Nat8) : async Bool {
    try {
        await RustBloc.test_end_tournament(id, caller, no_of_winners)
    } catch err {
        throw (err)
    }
};

// public shared ({ caller }) func archive_tournament(id : Text) {
//     try {
//         await RustBloc.archive_tournament(id)
//     } catch err {
//         throw (err)
//     }
// };

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

public shared func getUserPrincipal(name : Text) : async Principal {
    var result = await RustBloc.get_profile(name);
    return Principal.fromText(result.principal_id)
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

public shared ({ caller }) func join_tournament_with_squad(squad_id : Text, id : Text, ign : [(Text, Text, Text)], new_member_ign : ?[(Text, Text, Text)], icp_price : Nat) : async () {if (icp_price == 0) {
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
                };
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

    //
    //  * HTTP outcalls
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

    // Mod Consensus

    // * Rustbloc will handle that.

    // Password for Wallet

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

    /// *  Websockets

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

    // Call this method to check the balance.
    // public query func checkBalance(accountId: Text): async Nat {
    //     // Use the ICP ledger to query the account balance.
    //     return Ledger.get_balance(accountId);
    // }

    // public shared func recordTransaction(accountId: Text, amount: Nat, txType: Text) : async () {
    //     let transaction = {
    //         accountId = accountId;
    //         amount = amount;
    //         txType = txType;
    //         timestamp = Time.now();
    //     };
    //     transactionHistory := transactionHistory # [transaction];  // Append to history
    // }

}
