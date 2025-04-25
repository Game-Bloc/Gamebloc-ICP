import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Types "../types";
import AccountIdentifier "../utils/utils";
import Blob "mo:base/Blob";
import Notifications "../notifications";
// import Hex "mo:encoding/Hex";

module {
    public actor class Profiles() {
        private stable var ProfileEntries : [(Principal, Types.UserProfile)] = [];
        private var ProfileHashMap : HashMap.HashMap<Principal, Types.UserProfile> = HashMap.fromIter<Principal, Types.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
        private var CreatorApplications : HashMap.HashMap<Principal, CreatorApplication> = HashMap.HashMap<Principal, CreatorApplication>(10, Principal.equal, Principal.hash);
        
        private let notifications = Notifications.Notifications();

        type UserMode = Types.UserMode;
        type TournamentId = Text;
        type Status = Types.Status;
        type Role = Types.Role;
        type Point = Types.Point;

        type CreatorApplication = {
            principal: Principal;
            username: Text;
            reason: Text;
            experience: Text;
            submittedAt: Text;
            status: ApplicationStatus;
            reviewedBy: ?Principal;
            reviewedAt: ?Text;
            feedback: ?Text;
        };

        type ApplicationStatus = {
            #Pending;
            #Approved;
            #Rejected;
        };

        // Create a new user profile
        public shared ({ caller }) func createprofile(
            id_hash: Text, 
            age: Nat8, 
            username: Text, 
            points: ?[(Text, Text, Point)], 
            role: ?Role, 
            referral_id: ?Text
        ) : async Result.Result<Text, Text> {
            let checkUsername = usernameChecker(username);

            if (checkUsername == false) {
                #err("This username already exists! Please enter another")
            } else {
                createOneProfile(id_hash, age, username, ?0, ?0, referral_id, caller, points, role);
                #ok("You have successfully created an account")
            }
        };

        // Create a profile with default values
        private func createOneProfile(
            id_hash: Text, 
            age: Nat8, 
            username: Text, 
            attendance: ?Nat8, 
            losses: ?Nat8, 
            referral_id: ?Text, 
            caller: Principal, 
            points: ?[(Text, Text, Point)], 
            role: ?Role
        ) {
            let accountIdText = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null));
            ProfileHashMap.put(
                caller, 
                makeProfile(
                    id_hash, 
                    age, 
                    Int.toText(Time.now()), 
                    0, 
                    attendance, 
                    referral_id, 
                    losses, 
                    0, 
                    false, 
                    #Online, 
                    username, 
                    Principal.toText(caller), 
                    accountIdText, 
                    "userCanisterId", 
                    "", 
                    points, 
                    role, 
                    #Base, 
                    0, 
                    []
                )
            );
        };

        // Create a profile object
        private func makeProfile(
            id_hash: Text, 
            age: Nat8, 
            date: Text, 
            wins: Nat8, 
            attendance: ?Nat8, 
            referral_id: ?Text, 
            losses: ?Nat8, 
            tournaments_created: Nat8, 
            is_mod: Bool, 
            status: Status, 
            username: Text, 
            principal_id: Text, 
            account_id: Text, 
            canister_id: Text, 
            squad_badge: Text, 
            points: ?[(Text, Text, Point)], 
            role: ?Role, 
            usermode: UserMode, 
            earnings: Nat, 
            tournaments: [TournamentId]
        ) : Types.UserProfile {
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
                referral_id;
                usermode;
                earnings;
                tournaments
            }
        };

        // Check if username is unique
        private func usernameChecker(username: Text) : Bool {
            var unique = true;
            for ((i, j) in ProfileHashMap.entries()) {
                if (j.username == username) {
                    unique := false
                }
            };
            unique
        };

        // Apply for creator mode
        public shared ({ caller }) func applyForCreatorMode(
            reason: Text,
            experience: Text
        ) : async Result.Result<Text, Text> {
            let profile = ProfileHashMap.get(caller);
            switch (profile) {
                case (null) { #err("Profile not found") };
                case (?profile) {
                    // Check if already applied
                    switch (CreatorApplications.get(caller)) {
                        case (?existing) { #err("You have already applied for creator mode") };
                        case (null) {
                            let application : CreatorApplication = {
                                principal = caller;
                                username = profile.username;
                                reason = reason;
                                experience = experience;
                                submittedAt = Int.toText(Time.now());
                                status = #Pending;
                                reviewedBy = null;
                                reviewedAt = null;
                                feedback = null;
                            };
                            
                            CreatorApplications.put(caller, application);
                            
                            // Notify admins (this would be handled by a separate admin notification system)
                            // For now, we'll just return success
                            
                            #ok("Your application for creator mode has been submitted successfully")
                        }
                    }
                }
            }
        };

        // Review creator application (admin only)
        public shared ({ caller }) func reviewCreatorApplication(
            applicant: Principal,
            approved: Bool,
            feedback: ?Text
        ) : async Result.Result<Text, Text> {
            // Check if caller is admin
            let callerProfile = ProfileHashMap.get(caller);
            switch (callerProfile) {
                case (null) { #err("Your profile not found") };
                case (?profile) {
                    if (profile.role != ?#Admin) {
                        #err("Only admins can review creator applications")
                    } else {
                        // Get the application
                        switch (CreatorApplications.get(applicant)) {
                            case (null) { #err("Application not found") };
                            case (?application) {
                                if (application.status != #Pending) {
                                    #err("This application has already been reviewed")
                                } else {
                                    // Update application status
                                    let updatedApplication : CreatorApplication = {
                                        principal = application.principal;
                                        username = application.username;
                                        reason = application.reason;
                                        experience = application.experience;
                                        submittedAt = application.submittedAt;
                                        status = if (approved) { #Approved } else { #Rejected };
                                        reviewedBy = ?caller;
                                        reviewedAt = ?Int.toText(Time.now());
                                        feedback = feedback;
                                    };
                                    
                                    CreatorApplications.put(applicant, updatedApplication);
                                    
                                    // If approved, update user mode
                                    if (approved) {
                                        let applicantProfile = ProfileHashMap.get(applicant);
                                        switch (applicantProfile) {
                                            case (null) { throw Error.reject("Applicant profile not found") };
                                            case (?profile) {
                                                let updatedProfile = {
                                                    id_hash = profile.id_hash;
                                                    age = profile.age;
                                                    date = profile.date;
                                                    status = profile.status;
                                                    wins = profile.wins;
                                                    attendance = profile.attendance;
                                                    losses = profile.losses;
                                                    tournaments_created = profile.tournaments_created;
                                                    username = profile.username;
                                                    is_mod = profile.is_mod;
                                                    role = profile.role;
                                                    principal_id = profile.principal_id;
                                                    account_id = profile.account_id;
                                                    canister_id = profile.canister_id;
                                                    squad_badge = profile.squad_badge;
                                                    points = profile.points;
                                                    referral_id = profile.referral_id;
                                                    usermode = #Creator;
                                                    earnings = profile.earnings;
                                                    tournaments = profile.tournaments;
                                                };
                                                
                                                ProfileHashMap.put(applicant, updatedProfile);
                                                
                                                // Notify applicant
                                                ignore await notifications.notify(
                                                    "Creator Mode Approved",
                                                    "Congratulations! Your application for creator mode has been approved.",
                                                    applicant,
                                                    Int.toText(Time.now()),
                                                    await notifications.get_notification_id(applicant),
                                                    profile.username
                                                );
                                            }
                                        }
                                    } else {
                                        // Notify applicant of rejection
                                        let applicantProfile = ProfileHashMap.get(applicant);
                                        switch (applicantProfile) {
                                            case (null) { throw Error.reject("Applicant profile not found") };
                                            case (?profile) {
                                                ignore await notifications.notify(
                                                    "Creator Mode Application Rejected",
                                                    "Your application for creator mode has been rejected. " # 
                                                    (switch (feedback) {
                                                        case (null) { "" };
                                                        case (?f) { "Feedback: " # f }
                                                    }),
                                                    applicant,
                                                    Int.toText(Time.now()),
                                                    await notifications.get_notification_id(applicant),
                                                    profile.username
                                                );
                                            };
                                        };
                                    };
                                    #ok("Application reviewed successfully")
                                }
                            }
                        }
                    }
                }
            }
        };

        // Get creator application status
        public query func getCreatorApplicationStatus(user: Principal) : async ?ApplicationStatus {
            switch (CreatorApplications.get(user)) {
                case (null) { null };
                case (?application) { ?application.status }
            }
        };

        // Get all pending creator applications (admin only)
        public shared ({ caller }) func getPendingCreatorApplications() : async Result.Result<[CreatorApplication], Text> {
            let callerProfile = ProfileHashMap.get(caller);
            switch (callerProfile) {
                case (null) { #err("Your profile not found") };
                case (?profile) {
                    if (profile.role != ?#Admin) {
                        #err("Only admins can view pending applications")
                    } else {
                        let pendingApplications = Buffer.Buffer<CreatorApplication>(0);
                        for ((principal, application) in CreatorApplications.entries()) {
                            if (application.status == #Pending) {
                                pendingApplications.add(application);
                            }
                        };
                        #ok(pendingApplications.toArray())
                    }
                }
            }
        };

        // Toggle user mode (for testing or admin purposes)
        public shared ({ caller }) func toggleUserMode(mode: UserMode) : async Result.Result<Text, Text> {
            let profile = ProfileHashMap.get(caller);
            switch (profile) {
                case (null) { #err("Profile not found") };
                case (?profile) {
                    let updatedProfile = {
                        id_hash = profile.id_hash;
                        age = profile.age;
                        date = profile.date;
                        status = profile.status;
                        wins = profile.wins;
                        attendance = profile.attendance;
                        losses = profile.losses;
                        tournaments_created = profile.tournaments_created;
                        username = profile.username;
                        is_mod = profile.is_mod;
                        role = profile.role;
                        principal_id = profile.principal_id;
                        account_id = profile.account_id;
                        canister_id = profile.canister_id;
                        squad_badge = profile.squad_badge;
                        points = profile.points;
                        referral_id = profile.referral_id;
                        usermode = mode;
                        earnings = profile.earnings;
                        tournaments = profile.tournaments;
                    };
                    
                    ProfileHashMap.put(caller, updatedProfile);
                    #ok("User mode updated to " # (switch (mode) {
                        case (#Base) { "Base" };
                        case (#Creator) { "Creator" };
                        case (#Moderator) { "Moderator" };
                    }))
                }
            }
        };

        // Get username by principal
        public query func get_username(caller: Principal) : async Text {
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

        // Get user profile by principal
        public query func getUser(caller: Principal) : async ?Types.UserProfile {
            ProfileHashMap.get(caller)
        };

        // Update user profile
        public shared ({ caller }) func updateProfile(
            username: ?Text,
            age: ?Nat8,
            status: ?Status
        ) : async Result.Result<Text, Text> {
            let profile = ProfileHashMap.get(caller);
            switch (profile) {
                case (null) { #err("Profile not found") };
                case (?profile) {

                    var deserialised_username = "";
                    var deserialised_status : Status = #Online;
                    var deserialised_age : Nat8= 0;

                    // Check if new username is unique if provided
                    if (username != null) {
                        let newUsername = username;
                        switch(newUsername){
                            case(null){};
                            case(?newUsername){
                                if (newUsername != profile.username and not usernameChecker(newUsername)) {
                                    return #err("This username already exists! Please enter another");
                                };
                            };
                        }
                    };

                    switch(username){
                        case(null){
                            deserialised_username := profile.username;
                        };
                        case(?username){
                            deserialised_username := username;
                        };
                    };

                    switch(status){
                        case(null){
                            deserialised_status := profile.status;
                        };
                        case(?status){
                            deserialised_status := status;
                        };
                    };
                    switch(age){
                        case(null){
                            deserialised_age := profile.age;
                        };
                        case(?age){
                            deserialised_age := age;
                        };
                    };
                    
                    let updatedProfile = {
                        id_hash = profile.id_hash;
                        age = if (age != null) { deserialised_age } else { profile.age };
                        date = profile.date;
                        status = if (status != null) { deserialised_status } else { profile.status };
                        wins = profile.wins;
                        attendance = profile.attendance;
                        losses = profile.losses;
                        tournaments_created = profile.tournaments_created;
                        username = if (username != null) { deserialised_username } else { profile.username };
                        is_mod = profile.is_mod;
                        role = profile.role;
                        principal_id = profile.principal_id;
                        account_id = profile.account_id;
                        canister_id = profile.canister_id;
                        squad_badge = profile.squad_badge;
                        points = profile.points;
                        referral_id = profile.referral_id;
                        usermode = profile.usermode;
                        earnings = profile.earnings;
                        tournaments = profile.tournaments;
                    };
                    
                    ProfileHashMap.put(caller, updatedProfile);
                    #ok("Profile updated successfully")
                }
            }
        };

        // Add tournament to user's tournaments
        public func addTournamentToUser(user: Principal, tournamentId: Text) : async Result.Result<Text, Text> {
            let profile = ProfileHashMap.get(user);
            switch (profile) {
                case (null) { #err("Profile not found") };
                case (?profile) {
                    // Check if tournament already in list
                    if (Array.find<Text>(profile.tournaments, func(t) { t == tournamentId }) != null) {
                        #err("Tournament already added to user's list")
                    } else {
                        let updatedTournaments = Array.append(profile.tournaments, [tournamentId]);
                        let updatedProfile = {
                            id_hash = profile.id_hash;
                            age = profile.age;
                            date = profile.date;
                            status = profile.status;
                            wins = profile.wins;
                            attendance = profile.attendance;
                            losses = profile.losses;
                            tournaments_created = profile.tournaments_created;
                            username = profile.username;
                            is_mod = profile.is_mod;
                            role = profile.role;
                            principal_id = profile.principal_id;
                            account_id = profile.account_id;
                            canister_id = profile.canister_id;
                            squad_badge = profile.squad_badge;
                            points = profile.points;
                            referral_id = profile.referral_id;
                            usermode = profile.usermode;
                            earnings = profile.earnings;
                            tournaments = updatedTournaments;
                        };
                        
                        ProfileHashMap.put(user, updatedProfile);
                        #ok("Tournament added to user's list")
                    }
                }
            }
        };

        // Increment tournaments created count
        public func incrementTournamentsCreated(user: Principal) : async Result.Result<Text, Text> {
            let profile = ProfileHashMap.get(user);
            switch (profile) {
                case (null) { #err("Profile not found") };
                case (?profile) {
                    let updatedProfile = {
                        id_hash = profile.id_hash;
                        age = profile.age;
                        date = profile.date;
                        status = profile.status;
                        wins = profile.wins;
                        attendance = profile.attendance;
                        losses = profile.losses;
                        tournaments_created = profile.tournaments_created + 1;
                        username = profile.username;
                        is_mod = profile.is_mod;
                        role = profile.role;
                        principal_id = profile.principal_id;
                        account_id = profile.account_id;
                        canister_id = profile.canister_id;
                        squad_badge = profile.squad_badge;
                        points = profile.points;
                        referral_id = profile.referral_id;
                        usermode = profile.usermode;
                        earnings = profile.earnings;
                        tournaments = profile.tournaments;
                    };
                    
                    ProfileHashMap.put(user, updatedProfile);
                    #ok("Tournaments created count incremented")
                }
            }
        };

        // Add earnings to user profile
        public func addEarnings(user: Principal, amount: Nat) : async Result.Result<Text, Text> {
            let profile = ProfileHashMap.get(user);
            switch (profile) {
                case (null) { #err("Profile not found") };
                case (?profile) {
                    let updatedProfile = {
                        id_hash = profile.id_hash;
                        age = profile.age;
                        date = profile.date;
                        status = profile.status;
                        wins = profile.wins;
                        attendance = profile.attendance;
                        losses = profile.losses;
                        tournaments_created = profile.tournaments_created;
                        username = profile.username;
                        is_mod = profile.is_mod;
                        role = profile.role;
                        principal_id = profile.principal_id;
                        account_id = profile.account_id;
                        canister_id = profile.canister_id;
                        squad_badge = profile.squad_badge;
                        points = profile.points;
                        referral_id = profile.referral_id;
                        usermode = profile.usermode;
                        earnings = profile.earnings + amount;
                        tournaments = profile.tournaments;
                    };
                    
                    ProfileHashMap.put(user, updatedProfile);
                    #ok("Earnings added successfully")
                }
            }
        };

        // System upgrade functions
        system func preupgrade() {
            ProfileEntries := Iter.toArray(ProfileHashMap.entries());
        };

        system func postupgrade() {
            ProfileHashMap := HashMap.fromIter<Principal, Types.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
            ProfileEntries := [];
        };
    }
} 