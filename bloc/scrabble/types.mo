module {

    public type PlayerId = Principal;
    public type PlayerUsername = Text;
    public type Score = Nat;

    public type PlayerState_1 = {
        username : Text;
        principal : Principal;
    };

    public type PlayerState_2 = {
        username : Text;
        principal : Principal
    };

    public type PlayerStat = {

    };

    public type WordResult = {
        #WordNotFound;
        #TurnSkipped;
        #Success : SuccessMessage
    };

    public type SuccessMessage = {
        #WordsPoint20Plus;
        #WordsPoint30Plus;
        #WordsPoint40Plus;
        #WordsPoint50Plus;
        #WordsPoint60Plus;

    };

    public type StartError = {
        #PlayerNotFound;
        #CannotPlayAlone;
        #GameNotFound;

    }
} 