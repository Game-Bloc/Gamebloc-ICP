import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Blob "mo:base/Blob";
import Error "mo:base/Error";

import SHA256 "../utils/SHA256";
import Hex "../utils/Hex";


actor {

    type IC = actor {
        ecdsa_public_key : ({
            canister_id : ?Principal;
            derivation_path : [Blob];
            key_id : { curve: { #secp256k1; } ; name: Text };
        }) -> async ({ public_key : Blob; chain_code : Blob; });
        sign_with_ecdsa : ({
            message_hash : Blob;
            derivation_path : [Blob];
            key_id : { curve: { #secp256k1; } ; name: Text };
        }) -> async ({ signature : Blob });
    };

    let ic : IC = actor("aaaaa-aa");

    public shared (msg) func public_key() : async { #Ok : { public_key_hex: Text }; #Err : Text } {
        let caller = Principal.toBlob(msg.caller);
        try {
        let { public_key } = await ic.ecdsa_public_key({
            canister_id = null;
            derivation_path = [ caller ];
            key_id = { curve = #secp256k1; name = "dfx_test_key" };
        });
        #Ok({ public_key_hex = Hex.encode(Blob.toArray(public_key)) })
        } catch (err) {
        #Err(Error.message(err))
        }
    };

    public shared (msg) func sign(message: Text) : async { #Ok : { signature_hex: Text };  #Err : Text } {
        let caller = Principal.toBlob(msg.caller);
        try {
        let message_hash: Blob = Blob.fromArray(SHA256.sha256(Blob.toArray(Text.encodeUtf8(message))));
        Cycles.add(30_000_000_000);
        let { signature } = await ic.sign_with_ecdsa({
            message_hash;
            derivation_path = [ caller ];
            key_id = { curve = #secp256k1; name = "dfx_test_key" };
        });
        #Ok({ signature_hex = Hex.encode(Blob.toArray(signature))})
        } catch (err) {
        #Err(Error.message(err))
        }
    };

}