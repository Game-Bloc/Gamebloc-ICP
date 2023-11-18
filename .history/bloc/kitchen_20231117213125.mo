import Cycles "mo:base/ExperimentalCycles";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Int "mo:base/Int";

import RustBloc "canister:game_bloc_backend";



import Bloctypes "bloctypes";

shared ({caller}) actor class Kitchen() {

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



    public func createProfile(id_hash : Text, age : Nat8, status : Bloctypes.Status, username: Text, principal_id : Text, canister_id : Text) : async Principal {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, status,  username,  principal_id, canister_id);
        await RustBloc.create_profile(profile);
    };

    public shared ({caller}) func createUserProfile(id_hash : Text, age : Nat8, username: Text ) : async Principal {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
        try {
            return await RustBloc.create_profile(profile);
        } catch err {
            throw (err);
        }
    };

    public shared ({caller}) func createUserProfile_id(id_hash : Text, age : Nat8, username: Text ) : async Principal {
        let profile : Bloctypes.UserProfile = makeProfile(id_hash, age, Int.toText(Time.now()), 0, 0, false, #Online,  username,  Principal.toText(caller), Principal.toText(userCanisterId));
        try {
            return await RustBloc.create_profile_with_principal(profile, caller);
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

    public func end_tournament(id : Text, name : [Text]) : (){
        try {
            await RustBloc.end_tournament(id, name);
        } catch err {
            throw (err);
        }
        
    };

    public shared ({caller})  func getSelf() : async Bloctypes.UserProfile {
        // assert(caller == userCanisterId);
        let result : Bloctypes.UserProfile = await RustBloc.getSelf();
        result;
    };

    public shared ({caller})  func getSelfPrincipal() : async Bloctypes.UserProfile {
        // assert(caller == userCanisterId);
        let result : Bloctypes.UserProfile = await RustBloc.getSelfPrincipal();
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