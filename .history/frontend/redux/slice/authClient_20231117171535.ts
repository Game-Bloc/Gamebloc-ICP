import { ActorSubclass } from "@dfinity/agent"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { _SERVICE } from "../../../.dfx/local/canisters/kitchen/service.did"

export interface CountState {
  auth: ActorSubclass<_SERVICE> | undefined
}

const initialState: CountState = {
  auth: undefined,
}

export const authSlice = createSlice({
  name: "authenticationClient",
  initialState,
  reducers: {
    updateAuth: (state, { payload }: PayloadAction<CountState>) => {
      state.auth = payload.auth
    },
  },
})

export const { updateAuth } = authSlice.actions
export default authSlice.reducer
