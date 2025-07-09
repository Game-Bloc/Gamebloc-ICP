import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface JunaState {
  junaAddress: string
  junaBalance: number
  ethAddress: string
}

const initialState: JunaState = {
  junaAddress: "",
  junaBalance: 0.0,
  ethAddress: "",
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
      { payload }: PayloadAction<number>,
    ) => {
      state.junaBalance = payload
    },
    updateEthAddress: (
      state: JunaState,
      { payload }: PayloadAction<string>,
    ) => {
      state.ethAddress = payload
    },
  },
})

export const { updateJunaAddress, updateJunaBalance, updateEthAddress } =
  junaSlice.actions
export default junaSlice.reducer
