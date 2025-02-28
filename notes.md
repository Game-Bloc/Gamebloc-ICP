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