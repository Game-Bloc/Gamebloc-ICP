import ICPLedger "types/indextypes";
import Principal "mo:base/Principal";

actor class LedgerClient(ledgerCanisterId : Principal) = this {
    
    
    public shared func get_account_transactions(account : ICPLedger.Account, start : ?Nat, max_results : Nat) : async ICPLedger.GetAccountIdentifierTransactionsResult {
        let ledger : actor {
            get_account_transactions : ICPLedger.GetAccountTransactionsArgs -> async ICPLedger.GetAccountIdentifierTransactionsResult;
        } = actor(Principal.toText(ledgerCanisterId));
        
        await ledger.get_account_transactions({
            account;
            start;
            max_results;
        });
    };



}

// todo: 
// - get all accountidentifiers
// - loop through the identifiers
// - for each, check the account transactions
// - have nonce for each user to determine the start, and max result.(To reduce cycles burnt and latency in calling the function in the future)
// - add the sum for a period.
// - Check for transfer() and transferFrom()