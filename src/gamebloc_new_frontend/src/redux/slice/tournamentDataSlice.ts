import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

type solo_points = {
  principal: string
  points: {
    kill_points: number
    position_points: number
    total_points: number
  }
}
export interface TournamentState {
  creator: string
  creator_id: string[]
  messages: any[]
  end_date: string
  entry_prize: number
  game: string
  game_type: string
  id_hash: string
  idx: number
  no_of_participants: number
  no_of_winners: number
  squad: any[]
  starting_date: string
  status: any
  title: string
  total_prize: number
  tournament_rules: string
  tournament_type: any
  users: any[]
  winners: any[]
  squad_points: []
  squad_in_game_names: []
  in_game_names: []
  points: [solo_points]
  lobbies: []
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
      const existingTournamentIndex = state.findIndex(
        (t) => t.id_hash === payload.id_hash,
      )

      if (existingTournamentIndex !== -1) {
        state[existingTournamentIndex] = payload
      } else {
        state.push(payload)
      }
    },
    updateActiveTournament: (
      state,
      { payload }: PayloadAction<TournamentState>,
    ) => {
      const existingTournamentIndex = state.findIndex(
        (t) => t.id_hash === payload.id_hash,
      )

      if (existingTournamentIndex !== -1) {
        state[existingTournamentIndex] = payload
      } else {
        state.push(payload)
      }
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
