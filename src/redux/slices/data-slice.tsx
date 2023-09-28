import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getTodayData } from "../../storage/dataStorage";

// Define a type for the slice state
// Times are in minutes
export interface DataState {
  currTime: number;
  totalTime: number;
  sessions: number;
  currStreak: number;
  bestStreak: number;
  paused: boolean;
}

// const
// Define the initial state using that type
const initialState: DataState = getTodayData() as DataState;

export const dataSlice = createSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCurrTime: (state, action: PayloadAction<number>) => {
      state.currTime = action.payload;
    },
    updateTotalTime: (state, action: PayloadAction<number>) => {
      state.totalTime += action.payload;
    },
    currTimeReset: (state) => {
      state.currTime = 0;
    },
    totalTimeReset: (state) => {
      state.totalTime = 0;
    },
    incrementSession: (state) => {
      state.sessions += 1;
    },
    resetSession: (state) => {
      state.sessions = 0;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    takeBreak: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    setCurrStreak: (state, action: PayloadAction<number>) => {
      state.currStreak = action.payload;
    },
    incrementCurrStreak: (state) => {
      state.currStreak += 1;
      state.bestStreak =
        state.currStreak > state.bestStreak
          ? state.currStreak
          : state.bestStreak;
    },
    resetStreak: (state) => {
      state.currStreak = 0;
    },
    setBestStreak: (state, action: PayloadAction<number>) => {
      state.bestStreak = action.payload;
    },
  },
});

export const {
  updateCurrTime,
  updateTotalTime,
  currTimeReset,
  totalTimeReset,
  incrementSession,
  resetSession,
  takeBreak,
  setCurrStreak,
  incrementCurrStreak,
  resetStreak,
  setBestStreak,
} = dataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currTime = (state: RootState) => state.data.currTime;
export const totalTime = (state: RootState) => state.data.totalTime;
export const sessions = (state: RootState) => state.data.sessions;
export const paused = (state: RootState) => state.data.paused;
export const currStreak = (state: RootState) => state.data.currStreak;
export const bestStreak = (state: RootState) => state.data.bestStreak;

export default dataSlice.reducer;
