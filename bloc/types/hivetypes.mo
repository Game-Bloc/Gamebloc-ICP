module {

   public  type Game = {
        id: Text;
        name: Text;
        developer: Text;
        genre: Text;
        description: Text;
        image: Text;  // URL or base64-encoded string
        video: Text;  // URL for trailers or gameplay
        ratings: [Nat];  // Array of user ratings
        tournaments: [Text];  // List of tournament IDs associated with this game
        link : Text;
        social : [Text];
    };

}