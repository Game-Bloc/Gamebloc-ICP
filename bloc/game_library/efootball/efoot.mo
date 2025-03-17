import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";


persistent actor class Efootball() {

    public query func transform(raw : Types.TransformArgs) : async Types.CanisterHttpResponsePayload {
      let transformed : Types.CanisterHttpResponsePayload = {
          status = raw.response.status;
          body = raw.response.body;
          headers = [
              {
                  name = "Content-Security-Policy";
                  value = "default-src 'self'";
              },
              { name = "Referrer-Policy"; value = "strict-origin" },
              { name = "Permissions-Policy"; value = "geolocation=(self)" },
              {
                  name = "Strict-Transport-Security";
                  value = "max-age=63072000";
              },
              { name = "X-Frame-Options"; value = "DENY" },
              { name = "X-Content-Type-Options"; value = "nosniff" },
          ];
      };
      transformed;
  };


//   public func get_tournament() : async Text {
//     let ic =- actor ("aaaaa-aa");
    
//     let disciplines : Text = "pes_mobile";
//     // let statuses : Text = 
//     // let scheduled_before : Text = 
//     // let scheduled_after : Text = 
//     // let countries : Text = 
//     // let platforms : Text = 
//     // let is_online : Int = 
//     // let archived : Int = 
//     // let user_ids : [] = 
//     // let team_ids : [] = 
//     // let custom_user_identifiers : [] = 
//     // let tournament_id : [] = 
//     // let circuit_ids : [] = 
//     // let circuit_season_ids : [] = 
//     // let circuit_season_names : [] = 
//     // let circuit_region_ids : [] =
//     // let circuit_region_names : [] =
//     // let circuit_tier_ids : [] =
//     // let circuit_tier_names : [] =
//     // let sort : Text =    
//   } https://discord.gg/

    public func create_tournament(t_platform : Text, t_description : Text, t_rules : Text, t_name : Text, t_scheduled_date_start : Text, t_scheduled_date_end : Text, t_prize : Text) : async Text {

        let ic = actor ("aaaaa-aa");

        let host = "https://api.toornament.com/"; 
        let url = "https://api.toornament.com/organizer/v2/tournaments";

        let idempotency_key : Text = generateUUID();
        let request_headers = [
            {name = "Host", value = host # ":443"},
            {name = "User-Agent", value = ""},
            {name = "Content-Type", value = "application/json"},
            {name = "Idempontency-Key", value = idempotency_key}
        ];

        // let request_body_json = "{ \"name\" : \"Grogu\", \"force_sensitive\" : \"true\" }"
        let request_body_json = "{
            \"discipline\": \"counterstrike_go\",
            \"name\": \"My Weekly Tournament\",
            \"participant_type\": \"single\",
            \"size\": 16,
            \"timezone\": \"America\/Sao_Paulo\",
            \"platforms\": [
                \"mobile\"
            ],
            \"full_name\": \"My Weekly Tournament - Long title\",
            \"scheduled_date_start\": \"2015-09-06\",
            \"scheduled_date_end\": \"2015-09-07\",
            \"public\": true,
            \"online\": true,
            \"location\": \"Lagos\",
            \"country\": \"Nigeria\",
            \"registration_enabled\": true,
            \"registration_opening_datetime\": \"1999-01-01T00:00:00+00:00\",
            \"registration_closing_datetime\": \"1999-01-01T00:00:00+00:00\",
            \"organization\": \"Gamebloc\",
            \"contact\": \"contact@toornament.com\",
            \"discord\": \"https:\/\/discord.gg\/dbD9TbPg\",
            \"website\": \"http:\/\/gamebloc.app\",
            \"description\": \"My description \n on multiple lines\",
            \"rules\": \"My rules \n on multiple lines\",
            \"prize\": \"1 - 10,000$ \n 2 - 5,000$\",
            \"match_report_enabled\": false,
            \"registration_auto_accept_enabled\": false,
            \"check_in_enabled\": true,
            \"check_in_participant_enabled\": true,
            \"check_in_participant_start_datetime\": \"1999-01-01T00:00:00+00:00\",
            \"check_in_participant_end_datetime\": \"1999-01-01T00:00:00+00:00\",
            \"archived\": false,
            \"registration_notification_enabled\": true,
            \"registration_participant_email_enabled\": true,
            \"registration_request_message\": \"For more info, go there -> []\",
            \"registration_acceptance_message\": \"You must now follow the next steps -> []\",
            \"registration_refusal_message\": \"Sorry, your registration has been refused.\",
            \"registration_terms_enabled\": true,
            \"registration_terms_url\": \"http:\/\/download.my\/terms.pdf\",
            \"registration_permanent_team_mandatory\": false,
            \"logo\": {
                \"id\": \"7074908991469559808\"
            },
            \"background\": {
                \"id\": \"7074898466316419073\"
            },
            \"team_min_size\": 2,
            \"team_max_size\": 5
        }";
        let request_body_as_Blob: Blob = Text.encodeUtf8(request_body_json);
        let request_body_as_nat8: [Nat8] = Blob.toArray(request_body_as_Blob);

        // * Transforming the content
        let transform_context : Types.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        // Next, you make the POST request
        let http_request : Types.HttpRequestArgs = {
            url = url;
            max_response_bytes = null; //optional for request
            headers = request_headers;
            //note: type of `body` is ?[Nat8] so you pass it here as "?request_body_as_nat8" instead of "request_body_as_nat8"
            body = ?request_body_as_nat8;
            method = #post;
            transform = ?transform_context;
        };



    }

    func generateUUID() : Text {
        "UUID-123456789";
    }

}