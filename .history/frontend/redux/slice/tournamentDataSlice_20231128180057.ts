import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface TournamentState {
  creator: string
  entry_prize: number
  game: string
  id_hash: string
  idx: number
  no_of_participants: number
  no_of_winners: number
  starting_date: string
  status: any
  total_prize: number
  tournament_rules: string
  tournament_type: any
  users: any[]
  winners: any[]
}

const initialState: TournamentState[] = []

const tournamentDataSlice = createSlice({
  name: "tournamentData",
  initialState,
  reducers: {
    addToActiveTournament: (
      state,
      { payload }: PayloadAction<TournamentState>,
    ) => {
      const tournament = payload

      const existingTournamentIndex = state.findIndex(
        (item) => item.id_hash === payload.id_hash,
      )

      if (existingTournamentIndex !== -1) {
        state[existingTournamentIndex] = tournament
      } else {
        state.push(tournament)
      }
    },
    updateActiveTournament: (
      state,
      { payload }: PayloadAction<TournamentState>,
    ) => {
      const newTournament = payload

      const existingTournamentIndex = state.findIndex(
        (item) => item.id_hash === payload.id_hash,
      )

      if (existingTournamentIndex !== -1) {
        state[existingTournamentIndex] = newTournament
      } else {
        state.push(newTournament)
      }

      console.log("State", state)
    },
    clearTournaments: () => {
      return initialState
    },
  },
})

export const {
  addToActiveTournament,
  updateActiveTournament,
  clearTournaments,
} = tournamentDataSlice.actions
export default tournamentDataSlice.reducer
