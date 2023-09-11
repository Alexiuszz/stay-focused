import { SettingsState } from "@/redux/slices/settings-slice";
import ls from "localstorage-slim";

var today = new Date();
today.setSeconds(0);
today.setHours(0);
today.setMinutes(0);
var todayKey: string = "FocusedData(" + today.toDateString() + ")";
export const latestData: string = "FocusedData(latestData)";

export const storeUserSettings = (
  newSettings: SettingsState
): void => {
  ls.set("settings", newSettings);
};

export const getUserSettings = () => {
  if (typeof window !== "undefined") {
    let storedSettings = ls.get("settings");
    if (storedSettings) return storedSettings;
    else {
      storeUserSettings({
        dailyGoal: 6 * 60 * 60,
        breakDuration: 5 * 60,
        userName: "User",
        includeWeekend: true,
        offDays: [],
        skipBreaks: false,
      });
      return {
        dailyGoal: 6 * 60 * 60,
        breakDuration: 5 * 60,
        userName: "User",
        includeWeekend: true,
        offDays: [],
        skipBreaks: false,
      };
    }
  }
  return {
    dailyGoal: 6 * 60 * 60,
    breakDuration: 5 * 60,
    userName: "User",
    includeWeekend: true,
    offDays: [],
    skipBreaks: false,
  };
};

interface DataState {
  totalTime: number;
  sessions: number;
  currStreak: number;
  bestStreak: number;
}

export const storeTodayData = (data: DataState): void => {
  let newData = {
    ...data,
    key: todayKey,
    expiry: new Date(
      today.getTime() + 3600 * 24 * 7 * 1000
    ).toDateString(),
  };
  ls.set(todayKey, newData, { ttl: 3600 * 24 * 7 });
  ls.set(latestData, newData);
};

export const getTodayData = () => {
  if (typeof window !== "undefined") {
    let data = ls.get(todayKey);
    if (data) return { ...data, paused: false, currTime: 0 };
  }
  return {
    currTime: 0,
    totalTime: 0,
    paused: false,
    sessions: 0,
    currStreak: 0,
    bestStreak: 0,
  };
};
export const latestUserData = () => {
  let data =
    (typeof window !== "undefined" && ls.get(latestData)) || {};
  return data;
};
