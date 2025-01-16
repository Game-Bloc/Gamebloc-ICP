import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
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
        username : PlayerUsername;
        score : Score;
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

    };

    public type PlayerMap = HashMap.HashMap<PlayerId, PlayerUsername>;

    public type Status = {
        #Active;
        #Ended;
        #Expired;
        #Retired;
    };

    public type GameState = {
        player1 : PlayerId;
        player2 : PlayerId;
        score1 : Score;
        score2 : Score;
        duration : Nat;
        status : Status;
    };

    public type Matches = Buffer.Buffer<GameState>;
} 