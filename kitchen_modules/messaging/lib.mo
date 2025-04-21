import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Types "../types";
import Profiles "../profiles";

module {
    public actor class Messaging() {
        private stable var MessageEntries : [(Text, MessageThread)] = [];
        private var MessageHashMap : HashMap.HashMap<Text, MessageThread> = HashMap.fromIter<Text, MessageThread>(MessageEntries.vals(), 10, Text.equal, Text.hash);
        private var UserThreads : HashMap.HashMap<Principal, [Text]> = HashMap.HashMap<Principal, [Text]>(10, Principal.equal, Principal.hash);
        
        

        type MessageThread = {
            id: Text;
            participants: [Principal];
            messages: [Message];
            last_updated: Text;
        };

        type Message = {
            id: Nat;
            sender: Principal;
            content: Text;
            timestamp: Text;
            read: Bool;
        };

        // Create a new message thread
        public shared ({ caller }) func create_thread(participant: Principal) : async Result.Result<Text, Text> {
            let thread_id = generateThreadId(caller, participant);

            let profiles = await Profiles.Profiles();
            
            // Check if thread already exists
            switch (MessageHashMap.get(thread_id)) {
                case (?existing_thread) { #err("Thread already exists") };
                case (null) {
                    let new_thread : MessageThread = {
                        id = thread_id;
                        participants = [caller, participant];
                        messages = [];
                        last_updated = Int.toText(Time.now());
                    };
                    
                    MessageHashMap.put(thread_id, new_thread);
                    
                    // Update user threads
                    updateUserThreads(caller, thread_id);
                    updateUserThreads(participant, thread_id);
                    
                    #ok("Thread created successfully with ID: " # thread_id)
                }
            }
        };

        // Send a message in a thread
        public shared ({ caller }) func send_message(thread_id: Text, content: Text) : async Result.Result<Text, Text> {
            switch (MessageHashMap.get(thread_id)) {
                case (null) { #err("Thread not found") };
                case (?thread) {
                    if (not isParticipant(thread, caller)) {
                        #err("You are not a participant in this thread")
                    } else {
                        let message_id = Array.size(thread.messages);
                        let new_message : Message = {
                            id = message_id;
                            sender = caller;
                            content = content;
                            timestamp = Int.toText(Time.now());
                            read = false;
                        };
                        
                        let updated_thread : MessageThread = {
                            id = thread.id;
                            participants = thread.participants;
                            messages = Array.append(thread.messages, [new_message]);
                            last_updated = Int.toText(Time.now());
                        };
                        
                        MessageHashMap.put(thread_id, updated_thread);
                        #ok("Message sent successfully")
                    }
                }
            }
        };

        // Get all messages in a thread
        public query func get_thread_messages(thread_id: Text) : async ?[Message] {
            switch (MessageHashMap.get(thread_id)) {
                case (null) { null };
                case (?thread) { ?thread.messages }
            }
        };

        // Get all threads for a user
        public query func get_user_threads(user: Principal) : async [Text] {
            switch (UserThreads.get(user)) {
                case (null) { [] };
                case (?threads) { threads }
            }
        };

        // Mark messages as read
        public shared ({ caller }) func mark_messages_read(thread_id: Text) : async Result.Result<Text, Text> {
            switch (MessageHashMap.get(thread_id)) {
                case (null) { #err("Thread not found") };
                case (?thread) {
                    if (not isParticipant(thread, caller)) {
                        #err("You are not a participant in this thread")
                    } else {
                        let updated_messages = Array.map<Message, Message>(
                            thread.messages,
                            func(msg) {
                                if (msg.sender != caller and not msg.read) {
                                    { msg with read = true }
                                } else {
                                    msg
                                }
                            }
                        );
                        
                        let updated_thread : MessageThread = {
                            id = thread.id;
                            participants = thread.participants;
                            messages = updated_messages;
                            last_updated = thread.last_updated;
                        };
                        
                        MessageHashMap.put(thread_id, updated_thread);
                        #ok("Messages marked as read")
                    }
                }
            }
        };

        // Helper function to generate unique thread ID
        private func generateThreadId(user1: Principal, user2: Principal) : Text {
            let timestamp = Int.toText(Time.now());
            let user1_text = Principal.toText(user1);
            let user2_text = Principal.toText(user2);
            "T" # timestamp # "_" # user1_text # "_" # user2_text
        };

        // Helper function to update user threads
        private func updateUserThreads(user: Principal, thread_id: Text) {
            switch (UserThreads.get(user)) {
                case (null) {
                    UserThreads.put(user, [thread_id]);
                };
                case (?threads) {
                    if (Array.find<Text>(threads, func(t) { t == thread_id }) == null) {
                        UserThreads.put(user, Array.append(threads, [thread_id]));
                    }
                }
            }
        };

        // Helper function to check if a user is a participant in a thread
        private func isParticipant(thread: MessageThread, user: Principal) : Bool {
            Array.find<Principal>(thread.participants, func(p) { p == user }) != null
        };

        // System upgrade functions
        system func preupgrade() {
            MessageEntries := Iter.toArray(MessageHashMap.entries());
        };

        system func postupgrade() {
            MessageHashMap := HashMap.fromIter<Text, MessageThread>(MessageEntries.vals(), 10, Text.equal, Text.hash);
            MessageEntries := [];
        };
    }
} 