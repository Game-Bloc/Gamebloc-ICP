import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface JunaState {
  junaAddress: string
  junaBalance: string
  ethAddress: string
  ethBalance: string
}

const initialState: JunaState = {
  junaAddress: "",
  junaBalance: "",
  ethAddress: "",
  ethBalance: "",
}

export const junaSlice = createSlice({
  name: "Juna",
  initialState,
  reducers: {
    updateJunaAddress: (
      state: JunaState,
      { payload }: PayloadAction<string>,
    ) => {
      state.junaAddress = payload
    },
    updateJunaBalance: (
      state: JunaState,
      { payload }: PayloadAction<string>,
    ) => {
      state.junaBalance = payload
    },
    updateEthAddress: (
      state: JunaState,
      { payload }: PayloadAction<string>,
    ) => {
      state.ethAddress = payload
    },
    updateEthBalance: (
      state: JunaState,
      { payload }: PayloadAction<string>,
    ) => {
      state.ethBalance = payload
    },
  },
})

export const {
  updateJunaAddress,
  updateJunaBalance,
  updateEthAddress,
  updateEthBalance,
} = junaSlice.actions
export default junaSlice.reducer
