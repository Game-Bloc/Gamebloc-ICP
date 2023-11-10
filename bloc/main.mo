// import Bloc "./bloc";
import IC "types";

import RustBloc "canister:hello_world_backend";

import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Debug "mo:base/Debug";

actor class BlocFactory() = this {


 type UserProfile = {
    id_hash: Text;
    age: Nat;
    date: Text;
    status: Status;
    wins: Nat;
    tournaments_created :Nat;
    username : Text;
    is_mod : Bool;
};

type Status = {  
    #Online;
    #Offline;
};

    public func create_profile(username : Text) : () {
        await RustBloc.create_profile(username);
    };

  private stable var canisterId : ?Principal = null;
  private let ic : IC.Self = actor "aaaaa-aa";

  public query func getCanisterId() : async ?Principal {
    Debug.print("main balance: " # debug_show (Cycles.balance()));

    let canisterId = ?Principal.fromActor(this);

    canisterId;
  };

  // public shared ({ caller }) func init() : async (Principal) {
  //   Cycles.add(1_000_000_000_000);

  //   let b = await Bloc.Bloc();

  //   canisterId := ?Principal.fromActor(b);

  //   switch (canisterId) {

  //     case null {
  //       throw Error.reject("Bucket init error");
  //     };
  //     case (?canisterId) {
  //       // let self : Principal = Principal.fromActor(MainFactory);

  //       let controllers : ?[Principal] : ?[Principal] = ?[canisterId, caller];

  //       await ic.update_settings(({
  //         canister_id = canisterId;
  //         settings = {
  //           controllers = controllers;
  //           freezing_threshold = null;
  //           memory_allocation = null;
  //           compute_allocation = null;
  //         }
  //       }));

  //       return canisterId;
  //     };
  //   };

  // };

  public shared ({ caller }) func canisterStatus() : async IC.canister_status_response {
    let canister : ?Principal = await getCanisterId();
    switch (canister) {
      case (null) {
        throw Error.reject("canister doesnt exist");
      };
      case (?canister) {
        let result = await ic.canister_status(({ canister_id = canister }));
        return result;
      };
    };

  };

  public func mainbalance() : async Nat {
    let balance = Cycles.balance();
    Debug.print("Balance: " # debug_show (balance));
    return balance;
  };

  public func main() : async Nat {
    let available = Cycles.available();
    Debug.print("Available: " # debug_show (available));
    return available;
  };

  public func operation() : async Nat {
    let obtained = Cycles.accept(100_000_000_000);
    Debug.print("Obtained: " # debug_show (obtained)); // => 10_000_000
    return obtained;
  };

  public func createGreeter() : async (Principal) {
    let canisterId = Principal.fromActor(this);
    let newGreeter = await createGreeterr(canisterId);
    return (newGreeter);
  };

  // function to create a new Greeter canister
  public shared ({ caller }) func createGreeterr(controller : Principal) : async Principal {

    let canister : ?Principal = await getCanisterId();
    Cycles.add(1_000_000_000_000);
    // canisterId := ?Principal.fromActor(b);
    switch (canister) {

      case null {
        throw Error.reject("init error");
      };
      case (?canister) {

        Cycles.add(1_000_000_000_000);
        let controllers : ?[Principal] : ?[Principal] = ?[caller, controller];

        let createResult = await ic.create_canister(({
          settings = ?{
            controllers = controllers;
            freezing_threshold = null;
            memory_allocation = null;
            compute_allocation = null;
          };
        }));
        return createResult.canister_id;
      };
    };

  };

};
