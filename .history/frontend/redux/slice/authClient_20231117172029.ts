import { ActorSubclass } from "@dfinity/agent"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { _SERVICE } from "../../../.dfx/local/canisters/kitchen/service.did"

export interface AuthState {
  auth: ActorSubclass<_SERVICE> | undefined
}

const initialState: AuthState = {
  auth: undefined,
}

export const authSlice = createSlice({
  name: "authenticationClient",
  initialState,
  reducers: {
    updateAuth: (state, { payload }: PayloadAction<AuthState>) => {
      state.auth = payload.auth
    },
  },
})

export const { updateAuth } = authSlice.actions
export default authSlice.reducer
