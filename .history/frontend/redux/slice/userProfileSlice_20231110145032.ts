import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserProfileState {
  age: number | undefined
  id_hash: string | undefined
  status: any | undefined
  username: string
  date: string | undefined
  wins: number | undefined
  is_mod: boolean
  tournaments_created: number
  initializeState: boolean
}

const initialState: UserProfileState = {
  age: 0,
  id_hash: "",
  status: "",
  username: "",
  date: "",
  wins: 0,
  is_mod: false,
  tournaments_created: 0,
  initializeState: false,
}

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (
      state: UserProfileState,
      { payload }: PayloadAction<UserProfileState>,
    ) => {
      state.age = payload.age
      state.id_hash = payload.id_hash
      state.status = payload.status
      state.username = payload.username
      state.date = payload.date
      state.wins = state.wins
      state.is_mod = payload.is_mod
      state.tournaments_created = payload.tournaments_created
      state.initializeState = payload.initializeState
    },
  },
})

export const { updateUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
