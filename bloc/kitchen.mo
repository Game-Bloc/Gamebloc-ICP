import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Nat64 "mo:base/Nat64";

import AccountIdentifier "mo:principal/AccountIdentifier";

import ICPLedger "canister:icp_ledger";
import ICPIndex "canister:icp_index";
import RustBloc "canister:game_bloc_backend";

import IndexTypes "indextypes";
import Bloctypes "bloctypes";
import LedgerTypes "ledgertypes";

shared ({caller}) actor class Kitchen() {

        var ProfileEntries : [(Principal, Bloctypes.UserProfile)] = [];

        var ProfileHashMap : HashMap.HashMap<Principal, Bloctypes.UserProfile> = HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);

        private func createOneProfile(id_hash : Text, age : Nat8, username: Text, caller : Principal) {
            // let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
            ProfileHashMap.put(caller, makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId)));
        };

        public shared ({caller}) func createprofile(id_hash : Text, age : Nat8, username: Text) : async Result.Result<Text, Text> {
            // call the balnce function to get and set the balance of newly registered users
            let balance = 10;
            let checkUsername = usernameChecker(username);
            if (checkUsername == false) {
                #err("This username exist! Please enter another")
            } else {
                createOneProfile(id_hash, age, username, caller);
                #ok("You have successfully created an account");
            };
        };

        private func usernameChecker(username : Text) : Bool {
            var unique = true;
            for ((i, j) in ProfileHashMap.entries()) {
                if (j.username == username) {
                    unique := false;
                };
            };
            unique;
        };

        // Using the caller
        public shared({caller}) func getLedgerBalance() : async Result.Result<Nat, Text> {
            try{
                let balance : Nat = await ICPLedger.icrc1_balance_of({
                owner = caller;
                subaccount = null;
                });
                return #ok(balance)
            } catch(err){
                return #err(Error.message(err));
            }
        };

        // using the canister
        public func getCanisterLedgerBalance() : async Result.Result<Nat, Text> {
            try{
                let balance : Nat = await ICPLedger.icrc1_balance_of({
                owner = userCanisterId;
                subaccount = null;
                });
                return #ok(balance)
            } catch(err){
                return #err(Error.message(err));
            }
        };

        // Required to be parsed as an argument
        public func getAccountLedgerBalance(user : Text) : async Result.Result<Nat, Text> {
            try{
                let balance : Nat = await ICPLedger.icrc1_balance_of({
                    owner = Principal.fromText(user);
                    subaccount = null;
                });
                return #ok(balance)
            } catch(err){
                return #err(Error.message(err));
            }
        };

        //  --------------------------
        // /                        /
        // /    Index Canister      /
        // /                        /
        // --------------------------

        public func getAccountTransactions() : () {
            
        };

        public func get_account_identifier_balance(aid : Text) : async Nat64 {
            await ICPIndex.get_account_identifier_balance(aid);
        };

        // public func get_account_identifier_transactions(args : IndexTypes.GetAccountIdentifierTransactionsArgs) : async IndexTypes.GetAccountIdentifierTransactionsResult {
        //     await ICPIndex.get_account_identifier_transactions(args);
        // };

        public shared ({ caller }) func icp_balance() : async ICP {
            await ICPLedger.account_balance({
                account = AccountIdentifier.fromPrincipal(caller, null);
            })
        };

         public func icp_balance2(account : Principal) : async ICP {
            await ICPLedger.account_balance({
                account = AccountIdentifier.fromPrincipal(account, null);
            })
        };

        public func icrc1_balance_of(account : IndexTypes.Account) : async Nat64 {
            await ICPIndex.icrc1_balance_of(account);
        };

        public func index_status() : async IndexTypes.Status {
            await ICPIndex.status();
        };

        public func ledger_id() :  async Principal {
            await ICPIndex.ledger_id();
        };

        type ICP = {
            e8s : Nat64;
        };

        type TimeStamp =  { timestamp_nanos : Nat64 };

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
                        subaccount = null;
                    };
                    amount = amount;
                    fee = null;
                    memo = null;
                    created_at_time = null;
                });
                switch(transferLog) {
                    case(#Ok(trabsferLog)) { 
                        #ok();
                    };
                    case(#Err(error)) { 
                        return #err("An error occured!");
                    };
                };
            } catch(err) {
                return #err(Error.message(err));
            };
        };

        public func transferICP2(amount : Nat) : async Result.Result<(), Text> {
            let recipient = "rnyh2-lbh6y-upwtx-3wazz-vafac-2hkqs-bxz2t-bo45m-nio7n-wsqy7-dqe";
            try {
                let transferLog = await ICPLedger.icrc1_transfer({
                    from_subaccount = null;
                    to = {
                        owner = Principal.fromText(recipient);
                        subaccount = null;
                    };
                    amount = amount;
                    fee = null;
                    memo = null;
                    created_at_time = null;
                });
                switch(transferLog) {
                    case(#Ok(trabsferLog)) { 
                        #ok();
                    };
                    case(#Err(error)) { 
                        return #err("An error occured!");
                    };
                };
            } catch(err) {
                return #err(Error.message(err));
            };
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
                    return false;
                };
                case (?(_)) {
                    return true;
                };
            };
        };


        public func getUser(caller : Principal) : async ?Bloctypes.UserProfile {
            ProfileHashMap.get(caller);
        };


    private stable var userCanisterId : Principal = caller;

    type TournamentAccount = Bloctypes.TournamentAccount;

    // private let ic : IC.Self = actor "aaaaa-aa";

    public query func getOwnerCanister() : async Principal {
        userCanisterId;
    };

    public query({caller}) func getOwner() : async Principal {
        caller;
    };

    // Trying to hard code the wallet id - possible solution is use a transfer_from func
    // Look into the icrc-2 documentation

    public func convert() : async Principal {
        Principal.fromText("rnyh2-lbh6y-upwtx-3wazz-vafac-2hkqs-bxz2t-bo45m-nio7n-wsqy7-dqe");
    };

    public query ({ caller }) func convertAID() : async Text {
        AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null));
    };

    public query ({ caller }) func getMyAccountIdentifier() : async Text {
        AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null));
    };

    public func getAccountIdentifier(caller : Principal) : async Text {
        AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null));
    };

    public type AccountIdentifier = [Nat8];

    public func getRealAccountIdentifier(caller : Text) : async Result.Result<AccountIdentifier, Text> {
        AccountIdentifier.fromText(caller);
    };

    public shared({caller}) func createUser(user : Principal) : async Principal {
        assert(caller == userCanisterId);
        userCanisterId := user;
        await getOwner();
    };


    func makeProfile(id_hash : Text, age: Nat8,date : Text,wins : Nat8, tournaments_created : Nat8, is_mod: Bool,  status: Bloctypes.Status, username : Text, principal_id : Text, canister_id : Text) : Bloctypes.UserProfile {
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
            canister_id;
        };
    };



    public func createProfile(id_hash : Text, age : Nat8, status : Bloctypes.Status, username: Text, principal_id : Text, canister_id : Text) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, status,  username,  principal_id, canister_id);
        await RustBloc.create_profile(profile, caller);
    };

    public shared ({caller}) func createUserProfile(id_hash : Text, age : Nat8, username: Text, time : Text ) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, time, 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
        try {
            return await RustBloc.create_profile(profile, caller);
        } catch err {
            throw (err);
        }
    };

    public func create_tournament(tournamentAccount : Bloctypes.TournamentAccount) : async Bloctypes.Result {
        try {
            await RustBloc.create_tournament(tournamentAccount);
        } catch err {
            throw (err);
        }
        
    };

    public shared ({caller}) func end_tournament(id : Text, name : [Text]) : (){
        try {
            await RustBloc.end_tournament(id, name, caller);
        } catch err {
            throw (err);
        }
        
    };

    public shared ({caller})  func getSelf() : async Bloctypes.UserProfile {
        // assert(caller == userCanisterId);
        let result : Bloctypes.UserProfile = await RustBloc.getSelf(caller);
        result;
    };

    public shared ({caller}) func get_all_tournament() : async [Bloctypes.TournamentAccount] {
        // assert(caller == userCanisterId);
        try {
            return let result = await RustBloc.get_all_tournament();
        } catch err {
            throw (err);
        }
    };

    public shared ({caller}) func get_all_user() : async [Bloctypes.UserProfile] {
        // assert(caller == userCanisterId);
        try {
            return let result =  await RustBloc.get_all_user();
        } catch err {
            throw (err);
        }
    };
    
    
    public shared({caller})  func get_profile(name : Text) :  async Bloctypes.UserProfile {
        // assert(caller == userCanisterId);
        try {
            return let result =  await RustBloc.get_profile(name);
        } catch err {
            throw (err);
        }
    };

    public func get_tournament(id : Text) : async Bloctypes.TournamentAccount {
        try {
            return let result = await RustBloc.get_tournament(id);
        } catch err {
            throw (err);
        }
    };

    public func is_mod(name : Text) :  async Bool {
        try {
            return let result = await RustBloc.is_mod(name);
        } catch err {
            throw (err);
        }
        
    };

    public func join_tournament(name : Text, id : Text) : async (){
        try {
            return await RustBloc.join_tournament(name, id);
        } catch err {
            throw (err);
        }   
    };

    public func set_mod(name : Text, identity : Principal) : async (){
        try {
            return  await RustBloc.set_mod(name, identity);
        } catch err {
            throw (err);
        }
    };

    // public func start_tournament(id : Text) : (){

    // };



}