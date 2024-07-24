import Types "../types/ledgertypes";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";

// import Array "mo:base-0.7.3/Array";
import Array_ "mo:array/Array";
import Binary "../vessel/encoding/Binary";
// import Blob "mo:base-0.7.3/Blob";
import CRC32 "mo:hash/CRC32";
import Hash "mo:base-0.7.3/Hash";
import Hex "../vessel/encoding/Hex";
// import Principal "mo:base-0.7.3/Principal";
import Result "mo:base-0.7.3/Result";
import SHA224 "../vessel/crypto/SHA/SHA224";

module {

    // Represents an account identifier that was dirived from a principal.
    // NOTE: does NOT include the hash, unlike in the textual representation.
    public type AccountIdentifier = [Nat8]; // Size 28
    public type SubAccount        = [Nat8]; // Size 4

    // Checks whether two account identifiers are equal.
    public func equal(a : AccountIdentifier, b : AccountIdentifier) : Bool {
        a == b;
    };

    // Creates a CRC-32 hash of the given account identifier.
    public func hash(accountId : AccountIdentifier) : Hash.Hash {
        CRC32.checksum(accountId);
    };

    public func addHash(accountId : AccountIdentifier) : [Nat8] {
        let h = Binary.BigEndian.fromNat32(hash(accountId));
        Array.tabulate<Nat8>(
            4 + accountId.size(),
            func (i : Nat) : Nat8 {
                if (i < 4) return h[i];
                accountId[i - 4];
            }
        );
    };

    // Hex string of length 64. The first 8 characters are the CRC-32 encoded
    // hash of the following 56 characters of hex.
    public func toText(accountId : AccountIdentifier) : Text {
        Hex.encode(addHash(accountId));
    };

    // Decodes the given hex encoded account identifier.
    // NOTE: does not validate if the hash/account identifier.
    public func fromText(accountId : Text) : Result.Result<AccountIdentifier, Text> {
        switch (Hex.decode(accountId)) {
            case (#err(e)) { #err(e); };
            case (#ok(bs)) {
                // Remove the hash prefix.
                #ok(Array_.drop<Nat8>(bs, 4));
            };
        };
    };

    private let prefix : [Nat8] = [10, 97, 99, 99, 111, 117, 110, 116, 45, 105, 100];

    // Creates an account identifier based on the given principal and subaccount.
    public func fromPrincipal(p : Principal, subAccount : ?SubAccount) : AccountIdentifier {
        fromBlob(Principal.toBlob(p), subAccount);
    };

    public func fromBlob(data : Blob, subAccount : ?SubAccount) : AccountIdentifier {
        fromArray(Blob.toArray(data), subAccount);
    };

    public func fromArray(data : [Nat8], subAccount : ?SubAccount) : AccountIdentifier {
        let account : [Nat8] = switch (subAccount) {
            case (null) { Array.freeze(Array.init<Nat8>(32, 0)); };
            case (?sa)  { sa; };
        };
        SHA224.sum(Array.flatten<Nat8>([prefix, data, account]));
    };

    /// Convert Principal to ICRC1.Subaccount
    // from https://github.com/research-ag/motoko-lib/blob/2772d029c1c5087c2f57b022c84882f2ac16b79d/src/TokenHandler.mo#L51
    // public func toSubaccount(p : Principal) : Types.Subaccount {
    //     // p blob size can vary, but 29 bytes as most. We preserve it'subaccount size in result blob
    //     // and it'subaccount data itself so it can be deserialized back to p
    //     let bytes = Blob.toArray(Principal.toBlob(p));
    //     let size = bytes.size();

    //     assert size <= 29;

    //     let a = Array.tabulate<Nat8>(
    //         32,
    //         func(i : Nat) : Nat8 {
    //             if (i + size < 31) {
    //                 0
    //             } else if (i + size == 31) {
    //                 Nat8.fromNat(size)
    //             } else {
    //                 bytes[i + size - 32]
    //             }
    //         },
    //     );
    //     Blob.fromArray(a)
    // };

    // public func toAccount({ caller : Principal; canister : Principal }) : Types.Account {
    //     {
    //         owner = canister;
    //         subaccount = ?toSubaccount(caller)
    //     }
    // };

    public func createInvoice(to : Types.Account, amount : Nat) : Types.Invoice {
        {
            to;
            amount
        }
    }
}
