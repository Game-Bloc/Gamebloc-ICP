import { ActorSubclass } from "@dfinity/agent"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
// import { _SERVICE } from "../../../../../.dfx/local/canisters/game_bloc_backend/service.did"

export interface AuthState {
  auth: false
}

const initialState: AuthState = {
  auth: undefined,
}

export const authSlice = createSlice({
  name: "authenticationClient",
  initialState,
  reducers: {
    updateAuth: (state, { payload }: PayloadAction<any>) => {
      state.auth = payload.auth
    },
  },
})

export const { updateAuth } = authSlice.actions
export default authSlice.reducer
