import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TournamentState {
  authority: any;
  username: string;
  entryPrize: number;
  gameName: string;
  tournamentId: number;
  date: string;
  status: string;
  poolPrize: any;
  tournamentRules: string;
  tournamentType: string;
  participants: any[];
  winners: any[];
}

const initialState: TournamentState[] = [];

const tournamentDataSlice = createSlice({
  name: "tournamentData",
  initialState,
  reducers: {
    addToActiveTournament: (
      state,
      { payload }: PayloadAction<TournamentState>
    ) => {
      state.push(payload);
    },
    clearTournaments: () => {
      return initialState;
    },
  },
});

export const { addToActiveTournament, clearTournaments } =
  tournamentDataSlice.actions;
export default tournamentDataSlice.reducer;
