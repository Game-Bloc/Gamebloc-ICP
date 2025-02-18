import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface AdminProfileState {
  account_id: string | null
}

const initialState: AdminProfileState = {
  account_id: "",
}

export const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState,
  reducers: {
    updateAdminProfile: (
      state: AdminProfileState,
      { payload }: PayloadAction<AdminProfileState>,
    ) => {
      // console.log("id payload", payload)
      state.account_id = payload.account_id
    },
  },
})
export const { updateAdminProfile } = adminProfileSlice.actions
export default adminProfileSlice.reducer
