import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface SquadState {
  id_hash: string
  captain: string
  status: any
  name: string
  tag: string
  members: string[]
  requests: string[]
}

const initialState: SquadState[] = []

const squadSlice = createSlice({
  name: "squad",
  initialState,
  reducers: {
    addSquad: (state, { payload }: PayloadAction<SquadState>) => {
      state.push(payload)
    },
  },
})

export const { addSquad } = squadSlice.actions
export default squadSlice.reducer
