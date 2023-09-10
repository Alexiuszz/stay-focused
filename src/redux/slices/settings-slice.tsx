import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getUserSettings } from "@/helpers/localStorage";

// Define a type for the slice state
// Times are in minutes
export interface SettingsState {
  dailyGoal: number;
  breakDuration: number;
  numberOfBreaks: number;
  userName: string | null;
  includeWeekend: boolean;
  offDays: string[];
  skipBreaks: boolean;
}

// Define the initial state using that type
const initialState: SettingsState =
  getUserSettings() === JSON.parse(JSON.stringify(""))
    ? {
        dailyGoal: 60,
        breakDuration: 60,
        numberOfBreaks: 1,
        userName: null,
        includeWeekend: false,
        offDays: [],
        skipBreaks: false,
      }
    : getUserSettings();

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //     increment: (state) => {
    //       state.value += 1;
    //     },
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

export default settingsSlice.reducer;
