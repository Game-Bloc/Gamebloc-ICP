import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./slice/userProfileSlice"
import categoryReducer from "./slice/gameCategorySlice"
import tournamentReducer from "./slice/tournamentDataSlice"
import authReducer from "./slice/authSlice"
export const store = configureStore({
  reducer: {
    userProfile: profileReducer,
    tournamentData: tournamentReducer,
    gameCategory: categoryReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
