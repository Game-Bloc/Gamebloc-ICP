import Types "./types";
import Notifications "./notifications";
import Profiles "./profiles";
import Tournaments "./tournaments";
import Messaging "./messaging";
import Referrals "./referrals";
// import Social "./social";
// import VETKD "./vetkd";
// import WebSocket "./websocket";
// import Utils "./utils";

shared ({ caller }) actor class Kitchen() = this {
    // Import all the modules
    private let notifications = Notifications.Notifications();
    private let profiles = Profiles.Profiles();
    private let tournaments = Tournaments.Tournaments();
    private let messaging = Messaging.Messaging();
    private let referrals = Referrals.Referrals();
    private let social = Social.Social();
    private let vetkd = VETKD.VETKD();
    private let websocket = WebSocket.WebSocket();
    private let utils = Utils.Utils();

    // Re-export all public functions from modules
    public shared ({ caller }) func createprofile(id_hash : Text, age : Nat8, username : Text, points : ?[(Text, Text, Types.Point)], role : ?Types.Role, referral_id : ?Text) : async Result.Result<Text, Text> {
        await profiles.createprofile(id_hash, age, username, points, role, referral_id, caller);
    };

    // Add more function exports as needed
}; 