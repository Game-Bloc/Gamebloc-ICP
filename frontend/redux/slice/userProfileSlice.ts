import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserProfileState {
  age: number | undefined
  canister_id: string | undefined
  date: string | undefined
  id_hash: string | undefined
  is_mod: boolean
  principal_id: string | undefined
  status: any | undefined
  tournaments_created: number
  username: string
  wins: number | undefined
  initializeState: boolean
}

const initialState: UserProfileState = {
  age: 0,
  canister_id: "",
  date: "",
  id_hash: "",
  is_mod: false,
  principal_id: "",
  status: {Online: null},
  tournaments_created: 0,
  username: "",
  wins: 0,
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
      state.canister_id = payload.canister_id
      state.date = payload.date
      state.id_hash = payload.id_hash
      state.is_mod = payload.is_mod
      state.principal_id = payload.principal_id
      state.status = payload.status
      state.tournaments_created = payload.tournaments_created
      state.username = payload.username
      state.wins = payload.wins
      state.initializeState = payload.initializeState
    },
  },
})

export const { updateUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
