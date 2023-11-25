import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slice/userProfileSlice";
import categoryReducer from "./slice/gameCategorySlice";
import tournamentReducer from "./slice/tournamentDataSlice";
import countReducer from "./slice/countSlice";
export const store = configureStore({
  reducer: {
    userProfile: profileReducer,
    tournamentData: tournamentReducer,
    gameCategory: categoryReducer,
    tournamentCount: countReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
