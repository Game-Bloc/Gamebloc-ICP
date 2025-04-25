// import Nat "mo:base/Nat";

// module  {

//     // Store the current state of the random number generator
//     var state: Nat = 1;

//     // LCG parameters (these are arbitrary, you can tweak them)
//     let a: Nat = 1664525;  // multiplier
//     let c: Nat = 1013904223;  // increment
//     let m: Nat = 2**32;  // modulus

//     // Update the state and generate a new random number
//     public func generateRandomNumber() : Nat {
//         // LCG formula: state = (a * state + c) % m
//         state := (a * state + c) % m;
//         return state;
//     };

//     // Generate a random number within a given range (min, max)
//     public func generateRandomInRange(min: Nat, max: Nat) : Nat {
//         let randomNum = generateRandomNumber();
//         return min + (randomNum % (max - min + 1));
//     }
// }