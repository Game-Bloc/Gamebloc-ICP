import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserProfileState {
  id_hash: string | undefined
  age: number | undefined
  username: string
  // status: any | undefined
  // date: string | undefined
  // wins: number | undefined
  // is_mod: boolean
  // tournaments_created: number
  initializeState: boolean
}

const initialState: UserProfileState = {
  id_hash: "",
  age: 0,
  username: "",
  initializeState: false,
  // status: "",
  // date: "",
  // wins: 0,
  // is_mod: false,
  // tournaments_created: 0,
}

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (
      state: UserProfileState,
      { payload }: PayloadAction<UserProfileState>,
    ) => {
      state.id_hash = payload.id_hash
      state.age = payload.age
      state.username = payload.username
      state.initializeState = payload.initializeState
    },
  },
})

export const { updateUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
