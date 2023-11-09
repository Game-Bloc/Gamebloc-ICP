import { createSlice } from "@reduxjs/toolkit";
import { TournamentData } from "../../data/Index";

const initialState = {
  TournamentData,
};

const gameCategorySlice = createSlice({
  name: "gameCategory",
  initialState: initialState,
  reducers: {},
});

export default gameCategorySlice.reducer;
