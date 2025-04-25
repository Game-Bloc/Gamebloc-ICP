import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Char "mo:base/Char";
import Blob "mo:base/Blob";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Types "../types";
import Profiles "../profiles";
import Notifications "../notifications";
import SHA256 "../utils/SHA256";

module {
    public actor class Tournaments() {
        private stable var TournamentEntries : [(Text, Types.TournamentAccount)] = [];
        private var TournamentHashMap : HashMap.HashMap<Text, Types.TournamentAccount> = HashMap.fromIter<Text, Types.TournamentAccount>(TournamentEntries.vals(), 10, Text.equal, Text.hash);
        private var ParticipantHashMap : HashMap.HashMap<Text, [Principal]> = HashMap.HashMap<Text, [Principal]>(10, Text.equal, Text.hash);
        private var TournamentResults : HashMap.HashMap<Text, [Types.Winner]> = HashMap.HashMap<Text, [Types.Winner]>(10, Text.equal, Text.hash);
        private var TeamHashMap : HashMap.HashMap<Text, Types.Team> = HashMap.HashMap<Text, Types.Team>(10, Text.equal, Text.hash);
        private var TournamentTeams : HashMap.HashMap<Text, [Text]> = HashMap.HashMap<Text, [Text]>(10, Text.equal, Text.hash);
        
        // private let profiles = Profiles.Profiles();
        private let notifications = Notifications.Notifications();

        // Types
        type GameType = Types.GameType;
        type PayoutDistribution = Types.PayoutDistribution;
        type TournamentStatus = Types.TournamentStatus;
        type TournamentMeta = Types.TournamentMeta;
        type Team = Types.Team;
        type TeamType = Types.TeamType;
        type TournamentType = Types.TournamentType;
        type Winner = Types.Winner;

        // Create a new tournament
        // ! We should have cards for different games to make the creation somewhat cool
        public shared ({ caller }) func create_tournament(
            title : Text,
            description : Text,
            game_type : GameType,
            tournament_type : TournamentType,
            entry_fee : ?Nat,
            total_prize : Nat,
            _isPrivate : Bool,
            _maxPlayers : ?Nat,
            _payoutDistribution : ?PayoutDistribution,
            _externalLink : ?Text,
            _tournamentMeta : TournamentMeta,
            _isTeamBased  : Bool, // ?default
            _teamSize : TeamType, // ?default
            _maxTeams : ?Nat, // ?default
            _allowSoloPlayers : Bool, // ?default
            _allowAutoMatch : Bool // ? default
        ) : async Result.Result<Text, Text> {
            // Profiles Instance Init
            let profiles = await Profiles.Profiles();
            let username = await profiles.get_username(caller);
            let tournament_id = generateTournamentId(title);
            
            let tournament : Types.TournamentAccount = {
                id = tournament_id;
                title = title;
                description = description;
                game_type = game_type;
                tournament_type = tournament_type;
                entry_fee = entry_fee;
                total_prize = total_prize;
                creator = username;
                ended = ?false;
                winners = null;
                creatorPrincipal = caller;
                isPrivate = _isPrivate;
                maxPlayers = _maxPlayers;
                moderators = [];
                payoutDistribution = _payoutDistribution;
                externalLink = _externalLink;
                players = [];
                tournamentStatus = #Upcoming;
                metadata = _tournamentMeta;
                isTeamBased = _isTeamBased;
                teamSize = _teamSize;
                teams = [];
                maxTeams = _maxTeams;
                allowSoloPlayers = _allowSoloPlayers;
                allowAutoMatch = _allowAutoMatch;
            };

            TournamentHashMap.put(tournament_id, tournament);
            ParticipantHashMap.put(tournament_id, []);
            
            #ok("Tournament created successfully with ID: " # tournament_id)
        };

        // Join a tournament
        public shared ({ caller }) func join_tournament(tournament_id : Text) : async Result.Result<Text, Text> {
            switch (TournamentHashMap.get(tournament_id)) {
                case (null) { #err("Tournament not found") };
                case (?tournament) {
                    if (tournament.ended == ?true) {
                        #err("Tournament has already ended")
                    } else {
                        switch (ParticipantHashMap.get(tournament_id)) {
                            case (null) { #err("Tournament participants not found") };
                            case (?participants) {
                                if (Array.find<Principal>(participants, func(p) { p == caller }) != null) {
                                    #err("You are already registered for this tournament")
                                } else {
                                    let updated_participants = Array.append(participants, [caller]);
                                    ParticipantHashMap.put(tournament_id, updated_participants);
                                    #ok("Successfully joined the tournament")
                                }
                            }
                        }
                    }
                }
            }
        };

        // End tournament and declare winners
        public shared ({ caller }) func end_tournament(
            tournament_id : Text,
            winners : [Winner]
        ) : async Result.Result<Text, Text> {
            let profiles = await Profiles.Profiles();
            switch (TournamentHashMap.get(tournament_id)) {
                case (null) { #err("Tournament not found") };
                case (?tournament) {
                    if (tournament.creator != (await profiles.get_username(caller))) {
                        #err("Only tournament creator can end the tournament")
                    } else {
                        let updated_tournament = {
                            id = tournament.id;
                            title = tournament.title;
                            description = tournament.description;
                            game_type = tournament.game_type;
                            tournament_type = tournament.tournament_type;
                            entry_fee = tournament.entry_fee;
                            total_prize = tournament.total_prize;
                            creator = tournament.creator;
                            ended = ?true;
                            winners = ?winners;
                        };
                        
                        TournamentHashMap.put(tournament_id, updated_tournament);
                        TournamentResults.put(tournament_id, winners);
                        
                        // Notify winners
                        for (winner in winners.vals()) {
                            ignore await notifications.notify(
                                "Tournament Results",
                                "Congratulations! You won " # Nat.toText(winner.amount) # " in the tournament: " # tournament.title,
                                Principal.fromText(winner.user_account),
                                Int.toText(Time.now()),
                                await notifications.get_notification_id(Principal.fromText(winner.user_account)),
                                winner.user_account
                            );
                        };
                        
                        #ok("Tournament ended successfully")
                    }
                }
            }
        };

        // Get tournament details
        public composite query func get_tournament(tournament_id : Text) : async ?Types.TournamentAccount {
            TournamentHashMap.get(tournament_id)
        };

        // Get all tournaments
        public query func get_all_tournaments() : async [Types.TournamentAccount] {
            Iter.toArray(TournamentHashMap.vals())
        };

        // Get tournament participants
        public query func get_tournament_participants(tournament_id : Text) : async ?[Principal] {
            ParticipantHashMap.get(tournament_id)
        };

        // Get tournament results
        public query func get_tournament_results(tournament_id : Text) : async ?[Winner] {
            TournamentResults.get(tournament_id)
        };

        // Get active tournaments
        public query func get_active_tournaments() : async [Types.TournamentAccount] {
            let active_tournaments = Buffer.Buffer<Types.TournamentAccount>(0);
            for (tournament in TournamentHashMap.vals()) {
                if (tournament.ended == ?false) {
                    active_tournaments.add(tournament)
                }
            };
            active_tournaments.toArray()
        };

        // Get user's tournaments
        public query func get_user_tournaments(user : Principal) : async [Types.TournamentAccount] {
            let profiles = Profiles.Profiles();

            let user_tournaments = Buffer.Buffer<Types.TournamentAccount>(0);
            for (tournament in TournamentHashMap.vals()) {
                if (tournament.creator == (await profiles.get_username(user))) {
                    user_tournaments.add(tournament)
                }
            };
            user_tournaments.toArray()
        };

        let chars = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
            'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'O', 'S', 'T', 
            'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 
            'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
            'y', 'z'
        ];

        public query func generateTournamentIds(principal : Principal, name : Text) : async Text {
        
            var nonce = 1;

            let input = Principal.toText(principal) # Nat.toText(nonce) # name;
            let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
            
            var code = "T-" # name # "-";
            for (i in Iter.range(0, 3)) {
                let byte = hash[i % hash.size()];
                let index : Nat = Nat8.toNat(byte) % chars.size();
                code #= Char.toText(chars[index]);
            };

            // var code = await generateDeterministicCode(principal, 0);
            if (TournamentHashMap.get(code) != null) {
                let input = Principal.toText(principal) # Nat.toText(nonce) # name;
                let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
                
                code #= "";
                for (i in Iter.range(0, 3)) {
                    let byte = hash[i % hash.size()];
                    let index : Nat = Nat8.toNat(byte) % chars.size();
                    code #= Char.toText(chars[index]);
                };

                // code := await generateDeterministicCode(principal, nonce);
                nonce += 1;
                while (TournamentHashMap.get(code) != null) {

                    let input = Principal.toText(principal) # Nat.toText(nonce) # name;
                    let hash = SHA256.sha256(Blob.toArray(Text.encodeUtf8(input)));
                    
                    code #= "";
                    for (i in Iter.range(0, 3)) {
                        let byte = hash[i % hash.size()];
                        let index : Nat = Nat8.toNat(byte) % chars.size();
                        code #= Char.toText(chars[index]);
                    };
                    // code := await generateDeterministicCode(principal, nonce);
                    nonce += 1;
                };
            };
            return code;
        };

        // Helper function to generate unique tournament ID
        private func generateTournamentId(name : Text) : Text {
            let timestamp = Int.toText(Time.now());
            let random = Int.toText(Time.now() % 1000);
            "T-" # name # "-" # random # timestamp
        };

        // System upgrade functions
        system func preupgrade() {
            TournamentEntries := Iter.toArray(TournamentHashMap.entries());
        };

        system func postupgrade() {
            TournamentHashMap := HashMap.fromIter<Text, Types.TournamentAccount>(TournamentEntries.vals(), 10, Text.equal, Text.hash);
            TournamentEntries := [];
        };
    }
} 