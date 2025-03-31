- Free creation and entry tournamnet to rack up points
- Inclusion of the deposit feature 
- User should be able max out withdrawal
<details><summary>details</summary>
    
    ```js
    {
        Gameblocs account : "Deon"
        Gameblocs bank : "GTBank"
        Amount : "entry field"
        Narration : principal
        Naira : 
        Current dollar rate : 
    }
    ```
    
</details>

Withdrawal 
<details><summary>details</summary>

    ```js
    {
        "Amount" : 
        "UserBank" : 
        "Amount" : 
        "Naira" : 
        "CurrentDollarRate" :
    }
    ```

</details>
Pending message - "Your withdrawal is currently being processed
(In the backend, the user gives the canister approval to spend their token and that amount of token is sent out of their account)

0.025 icp
0.025e8s

```

type Currency = {
    #Naira; #Cedis; #USD; 
}

type DepositDetails = {
        accountNumber : Text;
        bankName : Text;
        amount : Nat; // ! In chosen local currency
        currency : Text;
        narration : Text;
        rate : Text;
        notice : Text;
    };

public query func depositNairaDetails(_amount : Nat) : async DepositDetails {
    let detail : DepositDetails= {
        accountNumber = "0494721886";
        bankName = "GTBank";
        amount = _amount; // ! In chosen local currency
        currency = "Naira";
        narration = Principal.toText(caller);
        rate = "N/A";
        notice = "Please, make sure that the details are as writen above. Especially the narration or reference. Please copy and paste the right narration"
    }
    
}
```


### Proxy query calls reverts

- count_all_squads()
- count_all_users()
- get_all_tournament()
- get_all_user()
- get_profile(str)
- get_profile_by_principal(addr)
- get_tournament(str)
- get_all_squad()
- get_squad(str)
- is_mod(addr)
  


``` js
// system func timer(setGlobalTimer : Nat64 -> ()) : async () {
//     let next = Nat64.fromIntWrap(Time.now()) + 20_000_000_000; // 20 seconds
//     setGlobalTimer(next);
//     await check_notify(1);
//     // print("Tick");
// };

// public func t_create_accountidentifier(principal : Principal, )

// private func check_notify(_startblock : Nat) : async () {


//     var start : Nat = _startblock;
//     if (latestTransactionIndex > 0) {
//       start := latestTransactionIndex + 1;
//     };

//     var blockResponse = //try {
//          await ICPLedger.query_blocks({
//             start = Nat64.fromNat(start);
//             length = 10;
//         });
//     // } catch (e) {
//     //     throw(e)
//     // }; 

//     for (block in blockResponse.blocks.vals()){
//         switch(block.transaction.operation){
//             case(?operation){
//                 switch(operation){
//                     case(#Transfer(transfer)) {
//                         let destinationAccount = AccountIdentifier.toText(transfer.to);
//                         switch(accountIdentifiers.get((destinationAccount))) {
//                             case (?userPrincipal){
//                                 // notify user on-chain
//                                 ignore await notify(
//                                     "ICP Deposit Confirmed",
//                                     "You have successfully deposited "# Float.toText(Float.fromInt64(Int64.fromNat64(transfer.amount.e8s))/100_000_000) #" to your GameBloc wallet.",
//                                     userPrincipal, 
//                                     Int.toText(Time.now()),
//                                     await get_notification_id(userPrincipal),
//                                     await getUsername(userPrincipal)
//                                 );
//                                 switch(await getUserMail(userPrincipal)){
//                                     case(?user){ await sendNotification(
//                                         "GameBloc Alert: Deposit Successful",
//                                         "Dear " # user.username # ", \n \nA deposit of " # Float.toText(Float.fromInt64(Int64.fromNat64(transfer.amount.e8s))/100_000_000) # " ICP is now available your GameBloc wallet. \nLogin to check your balance - https://gamebloc.app. \n \nThanks for using Gamebloc! \n \nBest regards, \nGamebloc Team",
//                                         user.email
//                                     )}; case(null){};
//                                 };
//                                 Debug.print("Notification sent");
//                             }; case (null){};
//                         };
//                     };
//                     case _ {};
//                 };
//             };
//             case (null) {};
//         };
//     };
// };

// private func process_block(block : ICPLedger.Block) : async () {
//     switch (block.transaction.operation) {
//         case (?operation) {
//             switch (operation) {
//                 case (#Transfer(transfer)) {
//                     await process_transfer(transfer.to);
//                 };
//                 case _ {};
//             };
//         };
//         case (null) {};
//     };
// };


// private func process_transfer(transfer : AccountIdentifier) : async () {
//     let destinationAccount = AccountIdentifier.toText(transfer);
//     switch (accountIdentifiers.get(destinationAccount)) {
//         case (?userPrincipal) {
//             // Notify user on-chain
//             ignore await notify(
//                 "ICP Deposit Confirmed",
//                 "You have successfully deposited " # Float.toText(Float.fromInt64(Int64.fromNat64(transfer.amount.e8s)) / 100_000_000) # " to your GameBloc wallet.",
//                 userPrincipal,
//                 Int.toText(Time.now()),
//                 await get_notification_id(userPrincipal),
//                 await getUsername(userPrincipal)
//             );

//             // Notify user via email
//             switch (await getUserMail(userPrincipal)) {
//                 case (?user) {
//                     await sendNotification(
//                         "GameBloc Alert: Deposit Successful",
//                         "Dear " # user.username # ", \n \nA deposit of " # Float.toText(Float.fromInt64(Int64.fromNat64(transfer.amount.e8s)) / 100_000_000) # " ICP is now available in your GameBloc wallet. \nLogin to check your balance - https://gamebloc.app. \n \nThanks for using Gamebloc! \n \nBest regards, \nGamebloc Team",
//                         user.email
//                     );
//                 };
//                 case (null) {};
//             };
//             Debug.print("Notification sent");
//         };
//         case (null) {};
//     };
// };

// public shared ({ caller }) func confirmDepositViaVariablesTest(amount : Nat, time : Text) : async Text {
    //     let cyclesUsed = await CycleMonitor.measureAsync(async {
    //         let subject : Text = "New ICP Deposit Confirmation";
    //         let body : Text = "User with Principal: " # Principal.toText(caller) #
    //                 " has initiated a deposit of " # Nat.toText(amount) #
    //                 " Naira.\nPlease verify the payment and fund their wallet.\n\nTimestamp: " # time;
    //         let receiver_email : Text = "successaje7@gmail.com";

    //         await sendNotification(subject, body, receiver_email);
    //         "Deposit confirmation sent to admin. Please await deposit";
    //     }, "confirmDeposit");

    //     // Optional: Fail if too expensive
    //     if (cyclesUsed > 10_000_000) {
    //         Debug.print("⚠️ Warning: Expensive deposit confirmation!");
    //     };

    //     result
    // };

```


