import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getUserSettings } from "@/storage/settingsStorage";

// Define a type for the slice state
// Times are in minutes
export interface SettingsState {
  dailyGoal: number;
  breakDuration: number;
  userName: string;
  includeWeekend: boolean;
  offDays: string[];
  skipBreaks: boolean;
}

const userSettings = getUserSettings();

// Define the initial state using that type
const initialState: SettingsState = userSettings as SettingsState;

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
    },
    setBreakDuration: (state, action: PayloadAction<number>) => {
      state.breakDuration = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setDailyGoal, setBreakDuration, setUserName } =
  settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const dailyGoal = (state: RootState) =>
  state.settings.dailyGoal;
export const breakDuration = (state: RootState) =>
  state.settings.breakDuration;
export const userName = (state: RootState) =>
  state.settings.userName;

export default settingsSlice.reducer;
