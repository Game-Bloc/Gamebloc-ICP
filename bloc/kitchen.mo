import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";

import ICPLedger "canister:icp_ledger";
import RustBloc "canister:game_bloc_backend";



import Bloctypes "bloctypes";

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

        private func transferICP(recipient : Text, amount : Nat) : async Result.Result<(), Text> {
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

        public shared ({ caller }) func pay_to_join_tournament(name : Text, id : Text, fee : Nat) : async Result.Result<(), Text>{
            let transfer = await transferICP("ae7ff53c79e2abdeb8c6250c0e15a7eb4536541a06437028aeefb14d3aa78359", fee);
            switch(transfer) {
                case(#ok()){
                    try {
                        return #ok(await RustBloc.join_tournament(name, id));
                    } catch err {
                        throw (err);
                    }  
                }; case (_){
                    return #err("An error occured! Kindly check your balance");
                }
            }
        };

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

    public shared ({caller}) func createUserProfile(id_hash : Text, age : Nat8, username: Text ) : async Bloctypes.Result {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
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