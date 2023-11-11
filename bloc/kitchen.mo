import Cycles "mo:base/ExperimentalCycles";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Int "mo:base/Int";

import RustBloc "canister:hello_world_backend";

import Types "bloctypes";

shared ({caller}) actor class Kitchen() {

    private stable var userCanisterId : Principal = caller;

    type Userprofile  = Types.UserProfile;

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

    func makeProfile(age: Nat8,date : Text,wins : Nat8, tournaments_created : Nat8, is_mod: Bool, id_hash : Text, status: Types.Status, username : Text, principal : Text, canister_id : Text) : Types.UserProfile {
        {
            id_hash;
            age;
            date;
            status;
            wins;
            tournaments_created;
            username;
            is_mod;
            principal;
            canister_id;
        };
    };



    public func createProfile(id_hash : Text, age : Nat8, status : Types.Status, username: Text, principal : Text, canister_id : Text) : () {
        let profile = makeProfile(age, Int.toText(Time.now()), 0, 0, false, id_hash, status,  username,  principal, canister_id);
        await RustBloc.create_profile(profile);
    };



    public func create_tournament(tournamentAccount : Types.TournamentAccount) : (){
        await RustBloc.create_tournament(tournamentAccount);
    };

    public func end_tournament(id : Text, name : [Text]) : (){
        await RustBloc.end_tournament(id, name);
    };

    // public shared ({caller})  func getSelf() : async Types.UserProfile {
    //     let result : Types.UserProfile = await RustBloc.getSelf();
    //     result;
    // };

    // public query func get_all_tournament() : async [Types.TournamentAccount] {

    // };
    // public query func get_all_user() : async [Types.UserProfile] {

    // };
    // public query func get_profile(name : Text) :  async Types.UserProfile {

    // };
    // public query func get_tournament(id : Text) : async Types.TournamentAccount {

    // };
    // public func is_mod(id : Text) :  async Bool {

    // };
    // public func join_tournament(name : Text, id : Text) : (){

    // };
    // public func set_mod(name : Text, principal : Principal) : (){

    // };
    // public func start_tournament(id : Text) : (){

    // };



}