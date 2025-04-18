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