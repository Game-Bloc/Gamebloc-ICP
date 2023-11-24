export const idlFactory = ({ IDL }) => {
  const Status = IDL.Variant({ 'Online' : IDL.Null, 'Offline' : IDL.Null });
  const Result__1 = IDL.Variant({ 'Ok' : IDL.Nat8, 'Err' : IDL.Nat8 });
  const TournamentStatus = IDL.Variant({
    'AcceptingPlayers' : IDL.Null,
    'GameInProgress' : IDL.Null,
    'GameCompleted' : IDL.Null,
  });
  const TournamentType = IDL.Variant({
    'Prepaid' : IDL.Null,
    'Crowdfunded' : IDL.Null,
  });
  const TournamentAccount = IDL.Record({
    'idx' : IDL.Nat8,
    'id_hash' : IDL.Text,
    'status' : TournamentStatus,
    'creator' : IDL.Text,
    'game' : IDL.Text,
    'user' : IDL.Vec(IDL.Text),
    'winers' : IDL.Vec(IDL.Text),
    'total_prize' : IDL.Nat,
    'tournament_rules' : IDL.Text,
    'starting_date' : IDL.Text,
    'no_of_participants' : IDL.Nat,
    'no_of_winners' : IDL.Nat8,
    'tournament_type' : TournamentType,
    'entry_prize' : IDL.Nat8,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const UserProfile = IDL.Record({
    'age' : IDL.Nat8,
    'id_hash' : IDL.Text,
    'status' : Status,
    'username' : IDL.Text,
    'date' : IDL.Text,
    'canister_id' : IDL.Text,
    'wins' : IDL.Nat8,
    'is_mod' : IDL.Bool,
    'principal_id' : IDL.Text,
    'tournaments_created' : IDL.Nat8,
  });
  const Kitchen = IDL.Service({
    'createProfile' : IDL.Func(
        [IDL.Text, IDL.Nat8, Status, IDL.Text, IDL.Text, IDL.Text],
        [Result__1],
        [],
      ),
    'createUser' : IDL.Func([IDL.Principal], [IDL.Principal], []),
    'createUserProfile' : IDL.Func(
        [IDL.Text, IDL.Nat8, IDL.Text],
        [Result__1],
        [],
      ),
    'create_tournament' : IDL.Func([TournamentAccount], [Result__1], []),
    'createprofile' : IDL.Func([IDL.Text, IDL.Nat8, IDL.Text], [Result], []),
    'end_tournament' : IDL.Func([IDL.Text, IDL.Vec(IDL.Text)], [], ['oneway']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'getOwnerCanister' : IDL.Func([], [IDL.Principal], ['query']),
    'getSelf' : IDL.Func([], [UserProfile], []),
    'getUser' : IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], []),
    'get_all_tournament' : IDL.Func([], [IDL.Vec(TournamentAccount)], []),
    'get_all_user' : IDL.Func([], [IDL.Vec(UserProfile)], []),
    'get_profile' : IDL.Func([IDL.Text], [UserProfile], []),
    'get_tournament' : IDL.Func([IDL.Text], [TournamentAccount], []),
    'is_mod' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'join_tournament' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'logIn' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'set_mod' : IDL.Func([IDL.Text, IDL.Principal], [], []),
  });
  return Kitchen;
};
export const init = ({ IDL }) => { return []; };
