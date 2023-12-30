import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./slice/userProfileSlice"
import categoryReducer from "./slice/gameCategorySlice"
import tournamentReducer from "./slice/tournamentDataSlice"
import authReducer from "./slice/authClient"

export const store = configureStore({
  reducer: {
    userProfile: profileReducer,
    tournamentData: tournamentReducer,
    gameCategory: categoryReducer,
    authenticationClient: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore all non-serializable action payloads
        ignoredActionPaths: ["payload"],
        // Ignore all non-serializable fields in the state
        ignoredPaths: ["authenticationClient.auth.whoamiActor"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
