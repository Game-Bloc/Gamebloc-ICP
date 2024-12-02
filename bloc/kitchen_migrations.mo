import HashMap "mo:base/HashMap";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Bloctypes "types/bloctypes";

import DeprecatedKitchen "canister:kitchen";

shared ({ caller }) actor class Kitchen() {

    private stable var userCanisterId : Principal = caller;

    /// Backup for the Gamebloc backend in the kitchen canister
    private stable var ProfileEntries : [(Principal, Bloctypes.UserProfile)] = [];
    private stable var TournamentEntries : [(Principal, Bloctypes.TournamentAccount)] = [];
    private stable var IDEntries : [(Text, Text)] = [];
    private stable var FeedbackEntries : [(Nat, Bloctypes.Feedback)] = [];
    private stable var SquadEntries : [(Text, Bloctypes.Squad)] = [];
    private stable var UserTrackEntries : [(Principal, Bloctypes.UserTrack)] = [];
    private stable var feedback_id : Nat = 0;
    private stable var volume : Nat64 = 0;
    private stable var SupportedGames : [Text] = [];
    private stable var PasswordEntries : [(Principal, Bloctypes.Access)] = [];
    private stable var NotificationEntries : [(Principal, Bloctypes.Notifications)] = [];
    private stable var PayEntries : [(Nat, Bloctypes.Pay)] = [];
    private stable var BalanceEntries : [(Principal, Bloctypes.UserBalance)] = [];

    var TournamentHashMap : HashMap.HashMap<Principal, Bloctypes.TournamentAccount> = HashMap.fromIter<Principal, Bloctypes.TournamentAccount>(TournamentEntries.vals(), 10, Principal.equal, Principal.hash);
    var PayHashMap : HashMap.HashMap<Nat, Bloctypes.Pay> = HashMap.fromIter<Nat, Bloctypes.Pay>(PayEntries.vals(), 10, Nat.equal, Hash.hash);
    var ProfileHashMap : HashMap.HashMap<Principal, Bloctypes.UserProfile> = HashMap.fromIter<Principal, Bloctypes.UserProfile>(ProfileEntries.vals(), 10, Principal.equal, Principal.hash);
    var NOTIFICATION_STORE : HashMap.HashMap<Principal, Bloctypes.Notifications> = HashMap.fromIter<Principal, Bloctypes.Notifications>(NotificationEntries.vals(), 10, Principal.equal, Principal.hash);
    var BalanceHashMap : HashMap.HashMap<Principal, Bloctypes.UserBalance> = HashMap.fromIter<Principal, Bloctypes.UserBalance>(BalanceEntries.vals(), 10, Principal.equal, Principal.hash);

    var ID_STORE = TrieMap.TrieMap<Text, Text>(Text.equal, Text.hash);
    var PASSWORD_STORE = TrieMap.TrieMap<Principal, Bloctypes.Access>(Principal.equal, Principal.hash);
    var FEED_BACK_STORE = TrieMap.TrieMap<Nat, Bloctypes.Feedback>(Nat.equal, Hash.hash);
    var SQUAD_STORE = TrieMap.TrieMap<Text, Bloctypes.Squad>(Text.equal, Text.hash);
    var USER_TRACK_STORE = TrieMap.TrieMap<Principal, Bloctypes.UserTrack>(Principal.equal, Principal.hash);

    // public shared ({ caller }) func migrate_tournament() : async () {
    //     var tournaments = await DeprecatedKitchen.get_all_tournaments();
    //     for (tournament in tournaments.vals()) {
    //         TournamentHashMap.put(tournament.key, tournament.val);
    //     }
    // };

    // public shared(msg) func importTournamentData(serialized: Blob) : async () {
    //     let deserializedEntries = Blob.fromBytes(serialized);  // Deserialize based on your data structure
    //     for (entry in deserializedEntries.vals()) {
    //         TournamentHashMap.put(entry.key, entry.val);
    //     }
    // }

}