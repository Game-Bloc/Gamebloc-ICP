import ExperimentalCycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

module {

  /// Measures cycles used by a **sync** function `f`.
  /// Returns `(result, cyclesUsed)`.
  public func measure<T>(f : () -> T, name : Text) : (T, Nat) {
    let start = ExperimentalCycles.balance();
    let result = f();
    let cyclesUsed = start - ExperimentalCycles.balance();
    Debug.print("[CycleMonitor] " # name # " used " # Nat.toText(cyclesUsed) # " cycles");
    (result, cyclesUsed)
  };

  /// Measures cycles used by an **async** function `f`.
  /// Note: Must be called from an async context 
  public func measureAsync<Text>(f : () -> async Text, name : Text) : async (Text, Nat) {
    let start = ExperimentalCycles.balance();
    let result = await f();
    let cyclesUsed = start - ExperimentalCycles.balance();
    Debug.print("[CycleMonitor] " # name # " used " # Nat.toText(cyclesUsed) # " cycles");
    (result, cyclesUsed);
  };

  /// Measures cycles for async functions returning shared types
  public func measureAsyncReturn(f : () -> async (), name : Text) : async  () {
    let start = ExperimentalCycles.balance();
    await f();
    let cyclesUsed = start - ExperimentalCycles.balance();
    Debug.print("[CycleMonitor] " # name # " used " # Nat.toText(cyclesUsed) # " cycles");
  };


  /// Warns if cycles exceed threshold (for debugging).
  public func warnIfOver(cyclesUsed : Nat, threshold : Nat, name : Text) {
    if (cyclesUsed > threshold) {
      Debug.print("[CycleMonitor] WARNING: " # name # " exceeded threshold (" 
        # Nat.toText(cyclesUsed) # " > " # Nat.toText(threshold) # ")");
    }
  };
};