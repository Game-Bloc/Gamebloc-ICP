import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat8 "mo:base/Nat8";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Types "../types";
import AccountIdentifier "../utils/utils";
import Blob "mo:base/Blob";
// import Hex "mo:encoding/Hex";

module {
    public actor class Profiles() {
        private stable var ProfileEntries : [(Principal, Types.UserProfile)] = [];
        private var ProfileHashMap : HashMap.HashMap<Principal, Types.UserProfile> = HashMap.fromIter<Principal, Types.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);

        public shared ({ caller }) func createprofile(id_hash : Text, age : Nat8, username : Text, points : ?[(Text, Text, Types.Point)], role : ?Types.Role, referral_id : ?Text) : async Result.Result<Text, Text> {
            let balance = 10;
            let checkUsername = usernameChecker(username);

            if (checkUsername == false) {
                #err("This username exist! Please enter another")
            } else {
                createOneProfile(id_hash, age, username, ?0, ?0, referral_id, caller, points, role);
                #ok("You have successfully created an account")
            }
        };

        private func createOneProfile(id_hash : Text, age : Nat8, username : Text, attendance : ?Nat8, losses : ?Nat8, referral_id : ?Text, caller : Principal, points : ?[(Text, Text, Types.Point)], role : ?Types.Role) {
            // let accountId = AccountIdentifier.fromPrincipal(caller, null);
            let accountIdText = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null));
            ProfileHashMap.put(caller, makeProfile(id_hash, age, Int.toText(Time.now()), 0, attendance, referral_id, losses, 0, false, #Online, username, Principal.toText(caller), accountIdText, "userCanisterId", "", points, role))
        };


        private func makeProfile(id_hash : Text, age : Nat8, date : Text, wins : Nat8, attendance : ?Nat8, referral_id : ?Text, losses : ?Nat8, tournaments_created : Nat8, is_mod : Bool, status : Types.Status, username : Text, principal_id : Text, account_id : Text, canister_id : Text, squad_badge : Text, points : ?[(Text, Text, Types.Point)], role : ?Types.Role) : Types.UserProfile {
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
                points;
                referral_id
            }
        };

        private func usernameChecker(username : Text) : Bool {
            var unique = true;
            for ((i, j) in ProfileHashMap.entries()) {
                if (j.username == username) {
                    unique := false
                }
            };
            unique
        };

        public query func get_username(caller : Principal) : async Text {
            let profile = ProfileHashMap.get(caller);
            switch (profile) {
                case (null) {
                    return "Anonymous user"
                };
                case (?profile) {
                    return profile.username
                }
            }
        };

        public query func getUser(caller : Principal) : async ?Types.UserProfile {
            ProfileHashMap.get(caller)
        };

         //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//
        // ----------Settings------------//
       //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//

        public func update(caller : Principal, _username : Text, age : Nat8) : async () {
            var profile = ProfileHashMap.get(caller);
            switch(profile){
                case(null){};
                case(?profile){
                    
                }
            }
        };

        system func preupgrade() {
            ProfileEntries := Iter.toArray(ProfileHashMap.entries());
        };

        system func postupgrade() {
            ProfileHashMap := HashMap.fromIter<Principal, Types.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
            ProfileEntries := [];
        };
    }
} 