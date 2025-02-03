// import Bloc "./bloc";
import IC "types";
import Bloctypes "bloctypes";
import Hex "utils/Hex";

import RustBloc "canister:game_bloc_backend";
import ICPLedger "canister:icp_ledger";
import Kitchen "kitchen";

import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Nat8 "mo:base/Nat8";
import Debug "mo:base/Debug";
import Result "mo:base/Result";


shared ({caller}) actor class BlocFactory() = this {

    private let ic : IC.Self = actor "aaaaa-aa";

    public query func getCanisterId() : async ?Principal {
      Debug.print("main balance: " # debug_show (Cycles.balance()));

      let canisterId = ?Principal.fromActor(this);

      canisterId;
    };

    private stable var canisterID : Principal = caller;

    public func getOwner() : async Principal {
        canisterID;
    };

    public shared ({caller}) func getCanisterID() : async ?Principal {
        ?caller;
    };

    public func get() : async Principal {
        Principal.fromActor(this);
    };

    public shared ({caller}) func getOwner2() : async Principal {
        canisterID;
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

    




    // deprecated
    public shared({caller}) func deprecated_create_profile(profile : Bloctypes.UserProfile) : async Principal {
        let userCanister : ?Principal = await getCanisterID();
        Cycles.add(10_000_000_000);
        switch (userCanister) {
            case(null){
                throw Error.reject("initialization error");
            }; case (?userCanister) {
                Cycles.add(10_000_000_000);
                let userHandler = await Kitchen.Kitchen();

                let userId = await userHandler.createUser(caller);
                // userHandler.createProfile(profile);

                let controllers : ?[Principal] : ?[Principal] = ?[caller, canisterID, Principal.fromActor(this)];

                let createResult = await ic.create_canister(({
                    settings = ?{
                        controllers = controllers;
                        freezing_threshold = null;
                        memory_allocation = null;
                        compute_allocation = null;

                    };
                }));
                await ic.install_code(({
                  arg = "";
                  wasm_module = "";
                  mode = #install;
                  canister_id = createResult.canister_id;

                }));
            return createResult.canister_id;
            };
        };

        // await RustBloc.create_profile(profile);
    };

    public shared({caller}) func create_provisional_profile(id_hash : Text, age : Nat8, username: Text) : async Principal {
        let userCanister : ?Principal = await getCanisterID();
        Cycles.add(10_000_000_000);
        switch (userCanister) {
            case(null){
                throw Error.reject("initialization error");
            }; case (?userCanister) {
                Cycles.add(10_000_000_000);
                // Installs the canister where the cooking takes place
                let userHandler = await Kitchen.Kitchen();

                let userId : Principal = await userHandler.createUser(caller);
                try {
                  // let cook = userHandler.createProfile(id_hash, age, #Online, username, Principal.toText(caller), Principal.toText(userCanister));
                } catch err {
                  throw (err)
                };
                let controllers : ?[Principal] : ?[Principal] = ?[caller, canisterID];

                let createResult = await ic.provisional_create_canister_with_cycles(({
                    // canister_id = userId;
                    settings = ?{
                        controllers = controllers;
                        freezing_threshold = null;
                        memory_allocation = null;
                        compute_allocation = null;

                    };
                    amount = ?1000000000;
                }));
            return ( createResult.canister_id);
            };
        };

        // await RustBloc.create_profile(profile);
    };

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

   public func create_tournament(tournamentAccount : Bloctypes.TournamentAccount) : async Bloctypes.Result {
        await RustBloc.create_tournament(tournamentAccount);
    };

    public shared ({caller}) func end_tournament(id : Text, name : [Text]) : (){
        await RustBloc.end_tournament(id, name, caller);
    };

    // public shared ({caller})  func getSelf() : async Types.UserProfile {
    //     let result : Types.UserProfile = await RustBloc.getSelf();
    //     result;
    // };

    public func get_all_tournament() : async [Bloctypes.TournamentAccount] {
      let userHandler = await Kitchen.Kitchen();
        try {
            return let result =  await userHandler.get_all_tournament();
        } catch err {
            throw (err);
        }
    };

    public shared ({ caller }) func get_all_user() : async [Bloctypes.UserProfile] {
      let userHandler = await Kitchen.Kitchen();
        try {
            return let result =  await userHandler.get_all_user();
        } catch err {
            throw (err);
        }
       
    };
    
    public  shared ({ caller }) func get_profile(name : Text) :  async Bloctypes.UserProfile {
      let userHandler = await Kitchen.Kitchen();
        try {
            return let result =  await userHandler.get_profile(name);
        } catch err {
            throw (err);
        }
    };

    public shared ({ caller }) func get_tournament(id : Text) : async Bloctypes.TournamentAccount {
      let userHandler = await Kitchen.Kitchen();
        try {
            return let result = await userHandler.get_tournament(id);
        } catch err {
            throw (err);
        }
        
    };

    public shared ({ caller })  func is_mod(name : Text) :  async Bool {
      let userHandler = await Kitchen.Kitchen();
        try {
            return let result = await userHandler.is_mod(name);
        } catch err {
            throw (err);
        }
        
    };

    public shared ({ caller }) func join_tournament(name : Text, id : Text) : async (){
      let userHandler = await Kitchen.Kitchen();
        try {
            return await userHandler.join_tournament(name, id);
        } catch err {
            throw (err);
        }   
    };

    public func set_mod(name : Text, identity : Principal) : async (){
      let userHandler = await Kitchen.Kitchen();
        try {
            return  await userHandler.set_mod(name, identity);
        } catch err {
            throw (err);
        }
    };

    public shared ({caller})  func getSelf() : async Bloctypes.UserProfile {
        let userHandler = await Kitchen.Kitchen();
        try {
            return  await userHandler.getSelf();
        } catch err {
            throw (err);
        }
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

  // public func createGreeter() : async (Principal) {
  //   let canisterId = Principal.fromActor(this);
  //   let newGreeter = await createGreeter(canisterId);
  //   return (newGreeter);
  // };

  // function to create a new Greeter canister
  // public shared ({ caller }) func createGreeterr(controller : Principal) : async Principal {

  //   let canister : ?Principal = await getCanisterId();
  //   Cycles.add(1_000_000_000_000);
  //   // canisterId := ?Principal.fromActor(b);
  //   switch (canister) {

  //     case null {
  //       throw Error.reject("init error");
  //     };
  //     case (?canister) {

  //       Cycles.add(1_000_000_000_000);
  //       let controllers : ?[Principal] : ?[Principal] = ?[caller, controller];

  //       let createResult = await ic.create_canister(({
  //           settings = ?{
  //               controllers = controllers;
  //               freezing_threshold = null;
  //               memory_allocation = null;
  //               compute_allocation = null;
  //           };
  //       }));
  //       return createResult.canister_id;
  //     };
  //   };

  // };
}