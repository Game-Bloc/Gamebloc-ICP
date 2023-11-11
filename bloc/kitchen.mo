import Cycles "mo:base/ExperimentalCycles";

import RustBloc "canister:hello_world_backend";

import Types "bloctypes";

shared ({caller}) actor class Kitchen() {

    private stable var userCanisterId : Principal = caller;

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

    public func createProfile(profile : Types.UserProfile) : () {
        await RustBloc.create_profile(profile);
    };



}