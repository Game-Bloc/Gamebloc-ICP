import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";

import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Result "mo:base/Result";
import Types "../types";

module {
    public class Notifications() {
        private var messageID : Nat = 0;
        private var messageEntries : [(Nat, MessageEntry)] = [];
        private var NotificationEntries : [(Principal, Types.Notifications)] = [];
        private var MessageHashMap : HashMap.HashMap<Nat, MessageEntry> = HashMap.fromIter<Nat, MessageEntry>(messageEntries.vals(), 10, Nat.equal, Hash.hash);
         var NOTIFICATION_STORE : HashMap.HashMap<Principal, Types.Notifications> = HashMap.fromIter<Principal, Types.Notifications>(NotificationEntries.vals(), 10, Principal.equal, Principal.hash);

        public type MessageEntry = {
            f_id : Text;
            id : Nat;
            sender : Principal;
            username : Text;
            body : Text;
            time : Text
        };

        public func create_notification_panel(caller : Principal, _username : Text, _date : Text) : async () {
            let notification : Types.Notification = {
                id = 0;
                title = "Welcome to Game Bloc";
                body = "Hi " # _username # ", you have successfully created an account with Game Bloc!";
                user = caller;
                username = _username;
                date = _date;
                read = false
            };
            let notifications : Types.Notifications = {
                notifications = [notification];
                user = caller
            };
            NOTIFICATION_STORE.put(
                caller,
                notifications,
            )
        };

        public shared ({ caller }) func read_notification(caller : Principal, id : Nat) : async ?() {
            var notification = NOTIFICATION_STORE.get(caller);
            var updatedNotifications = Buffer.Buffer<Types.Notification>(0);
            switch (notification) {
                case (null) { null };
                case (?notfication) {
                    do ? {
                        var array = notfication.notifications;
                        for (_notification in Iter.fromArray(array)) {
                            if (_notification.id == id) {
                                let updatedNotif = {
                                    id = _notification.id;
                                    title = _notification.title;
                                    body = _notification.body;
                                    user = _notification.user;
                                    username = _notification.username;
                                    date = _notification.date;
                                    read = true
                                };
                                updatedNotifications.add(updatedNotif)
                            };
                            if (_notification.id != id) {
                                updatedNotifications.add(_notification)
                            }
                        };
                        var _notifications : Types.Notifications = {
                            notifications = updatedNotifications.toArray();
                            user = caller
                        };
                        var updateNotification = NOTIFICATION_STORE.replace(caller, _notifications)
                    }
                }
            }
        };

        public query func get_unread_notifications(caller : Principal) : async [Types.Notification] {
            var notifications = Buffer.Buffer<Types.Notification>(0);
            var unread_notifications = Buffer.Buffer<Types.Notification>(0);
            for ((principal, notification) in NOTIFICATION_STORE.entries()) {
                if (principal == caller) {
                    var _notifications : [Types.Notification] = notification.notifications;
                    for (notification in Iter.fromArray(_notifications)) {
                        if (notification.read == false) {
                            unread_notifications.add(notification)
                        }
                    }
                }
            };
            return unread_notifications.toArray()
        };

        public query func get_read_notifications(caller : Principal) : async [Types.Notification] {
            var notifications = Buffer.Buffer<Types.Notification>(0);
            var read_notifications = Buffer.Buffer<Types.Notification>(0);
            for ((principal, notification) in NOTIFICATION_STORE.entries()) {
                if (principal == caller) {
                    var _notifications : [Types.Notification] = notification.notifications;
                    for (notification in Iter.fromArray(_notifications)) {
                        if (notification.read == true) {
                            read_notifications.add(notification)
                        }
                    }
                }
            };
            return read_notifications.toArray()
        };

        public query func get_my_notifications(caller : Principal) : async [Types.Notifications] {
            var notifications = Buffer.Buffer<Types.Notifications>(0);
            for ((principal, notification) in NOTIFICATION_STORE.entries()) {
                if (principal == caller) {
                    notifications.add(notification)
                }
            };
            notifications.toArray()
        };

        public query func get_notification_id(caller : Principal) : async Nat {
            var notification = NOTIFICATION_STORE.get(caller);
            var length = 0;
            switch (notification) {
                case (null) { 0 };
                case (?notification) {
                    var array = notification.notifications;
                    length := Array.size(array);
                    return length
                }
            }
        };

        func makeNotification(id : Nat, body : Text, title : Text, user : Principal, username : Text, date : Text, read : Bool) : Types.Notification {
            { id; title; body; user; username; date; read }
        };

        public func notify(title : Text, body : Text, caller : Principal, date : Text, id : Nat, user : Text) : async ?() {
            var notification = NOTIFICATION_STORE.get(caller);
            switch (notification) {
                case (null) { null };
                case (?notfication) {
                    var id = await get_notification_id(caller);
                    var newNotification = makeNotification(id + 1, title, body, caller, user, date, false);
                    do ? {
                        var array = notfication.notifications;
                        var _notifications : Types.Notifications = {
                            notifications = Array.append(array, [newNotification]);
                            user = caller
                        };
                        var temp = NOTIFICATION_STORE.replace(caller, _notifications)
                    }
                }
            }
        };
    }
} 