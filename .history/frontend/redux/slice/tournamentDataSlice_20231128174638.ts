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
      state.push(payload)
    },
    updateActiveTournament: (
      state,
      { payload }: PayloadAction<TournamentState>,
    ) => {
      let newTournament = payload

      const existingTournament = state.find(
        (item) => item.id_hash === payload.id_hash,
      )
      state = existingTournament
        ? state.map((item) =>
            item.id_hash === existingTournament.id_hash ? newTournament : item,
          )
        : [...state, newTournament]
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
