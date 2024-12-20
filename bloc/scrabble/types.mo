module {

    public type PlayerState_1 = {
        username : Text;
        principal : Principal;
    };

    public type StartError = {
        #PlayerNotFound;
        #CannotPlayAlone
    }
} 