import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Types "../types";
import Profiles "../profiles";
import Notifications "../notifications";

module {
    public actor class Referrals() {
        private stable var ReferralEntries : [(Principal, ReferralData)] = [];
        private var ReferralHashMap : HashMap.HashMap<Principal, ReferralData> = HashMap.fromIter<Principal, ReferralData>(ReferralEntries.vals(), 10, Principal.equal, Principal.hash);
        
        // private let profiles = Profiles.Profiles();
        private let notifications = Notifications.Notifications();

        type ReferralData = {
            referrer: Principal;
            referrals: [Principal];
            total_rewards: Nat;
            referral_code: Text;
            created_at: Text;
        };

        // Create a referral code for a user
        public shared ({ caller }) func create_referral_code() : async Result.Result<Text, Text> {
            switch (ReferralHashMap.get(caller)) {
                case (?existing_data) { #err("Referral code already exists") };
                case (null) {
                    let referral_code = generateReferralCode(caller);
                    let referral_data : ReferralData = {
                        referrer = caller;
                        referrals = [];
                        total_rewards = 0;
                        referral_code = referral_code;
                        created_at = Int.toText(Time.now());
                    };
                    
                    ReferralHashMap.put(caller, referral_data);
                    #ok("Referral code created: " # referral_code)
                }
            }
        };

        // Use a referral code
        public shared ({ caller }) func use_referral_code(code: Text) : async Result.Result<Text, Text> {
            // Find referrer by code
            let referrer = findReferrerByCode(code);
            let profiles = await Profiles.Profiles();
            switch (referrer) {
                case (null) { #err("Invalid referral code") };
                case (?referrer_principal) {
                    if (referrer_principal == caller) {
                        #err("Cannot use your own referral code")
                    } else {
                        switch (ReferralHashMap.get(referrer_principal)) {
                            case (null) { #err("Referrer data not found") };
                            case (?referral_data) {
                                if (Array.find<Principal>(referral_data.referrals, func(p) { p == caller }) != null) {
                                    #err("You have already used this referral code")
                                } else {
                                    let updated_data : ReferralData = {
                                        referrer = referral_data.referrer;
                                        referrals = Array.append(referral_data.referrals, [caller]);
                                        total_rewards = referral_data.total_rewards;
                                        referral_code = referral_data.referral_code;
                                        created_at = referral_data.created_at;
                                    };
                                    
                                    ReferralHashMap.put(referrer_principal, updated_data);
                                    
                                    // Notify referrer
                                    ignore await notifications.notify(
                                        "New Referral",
                                        "Someone used your referral code!",
                                        referrer_principal,
                                        Int.toText(Time.now()),
                                        await notifications.get_notification_id(referrer_principal),
                                        await profiles.get_username(referrer_principal)
                                    );
                                    
                                    #ok("Referral code applied successfully")
                                }
                            }
                        }
                    }
                }
            }
        };

        // Get referral data for a user
        public query func get_referral_data(user: Principal) : async ?ReferralData {
            ReferralHashMap.get(user)
        };

        // Get all referrals for a user
        public query func get_user_referrals(user: Principal) : async [Principal] {
            switch (ReferralHashMap.get(user)) {
                case (null) { [] };
                case (?data) { data.referrals }
            }
        };

        // Add rewards for referrals
        public shared ({ caller }) func add_referral_rewards(user: Principal, amount: Nat) : async Result.Result<Text, Text> {
            let profiles = await Profiles.Profiles();
            switch (ReferralHashMap.get(user)) {
                case (null) { #err("User has no referral data") };
                case (?data) {
                    let updated_data : ReferralData = {
                        referrer = data.referrer;
                        referrals = data.referrals;
                        total_rewards = data.total_rewards + amount;
                        referral_code = data.referral_code;
                        created_at = data.created_at;
                    };
                    
                    ReferralHashMap.put(user, updated_data);
                    
                    // Notify user about rewards
                    ignore await notifications.notify(
                        "Referral Rewards",
                        "You received " # Nat.toText(amount) # " rewards for your referrals!",
                        user,
                        Int.toText(Time.now()),
                        await notifications.get_notification_id(user),
                        await profiles.get_username(user)
                    );
                    
                    #ok("Rewards added successfully")
                }
            }
        };

        // Helper function to generate unique referral code
        private func generateReferralCode(user: Principal) : Text {
            let timestamp = Int.toText(Time.now());
            let user_text = Principal.toText(user);
            "REF" # timestamp # "_" # user_text
        };

        // Helper function to find referrer by code
        private func findReferrerByCode(code: Text) : ?Principal {
            for ((user, data) in ReferralHashMap.entries()) {
                if (data.referral_code == code) {
                    return ?user
                }
            };
            null
        };

        // System upgrade functions
        system func preupgrade() {
            ReferralEntries := Iter.toArray(ReferralHashMap.entries());
        };

        system func postupgrade() {
            ReferralHashMap := HashMap.fromIter<Principal, ReferralData>(ReferralEntries.vals(), 10, Principal.equal, Principal.hash);
            ReferralEntries := [];
        };
    }
} 