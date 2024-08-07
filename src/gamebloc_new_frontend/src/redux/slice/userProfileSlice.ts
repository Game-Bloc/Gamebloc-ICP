import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserProfileState {
  age: number | null
  canister_id: string | null
  date: string | null
  id_hash: string | null
  is_mod: boolean
  points: [number] | null
  role: any | null
  account_id: string | null
  principal_id: string | null
  squad_badge: string | null
  status: any | null
  tournaments_created: number
  username: string | null
  wins: number | undefined
  losses: number | undefined
  attendance: number | undefined
  initializeState: boolean
}

const initialState: UserProfileState = {
  age: 0,
  canister_id: "",
  date: "",
  id_hash: "",
  is_mod: false,
  account_id: "",
  principal_id: "",
  points: [0],
  role: { Player: null },
  squad_badge: "",
  status: { Online: null },
  tournaments_created: 0,
  username: "",
  wins: 0,
  losses: 0,
  attendance: 0,
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
      state.account_id = payload.account_id
      state.principal_id = payload.principal_id
      state.squad_badge = payload.squad_badge
      state.status = payload.status
      state.role = payload.role
      state.tournaments_created = payload.tournaments_created
      state.username = payload.username
      state.wins = payload.wins
      state.points = payload.points
      state.losses = payload.losses
      state.attendance = payload.attendance
      state.initializeState = payload.initializeState
    },
  },
})

export const { updateUserProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
