import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserProfileState {
  authority: string;
  username: string | undefined;
  age: number | undefined;
  date: string | undefined;
  initializeState: boolean;
  tournamentsCreated: number;
}

const initialState: UserProfileState = {
  authority: "",
  username: "",
  age: 0,
  date: "",
  initializeState: false,
  tournamentsCreated: 0,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (
      state: UserProfileState,
      { payload }: PayloadAction<UserProfileState>
    ) => {
      state.authority = payload.authority;
      state.username = payload.username;
      state.age = payload.age;
      state.date = payload.date;
      state.initializeState = payload.initializeState;
      state.tournamentsCreated = payload.tournamentsCreated;
    },
  },
});

export const { updateUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
