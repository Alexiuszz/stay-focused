import { SettingsState } from "@/redux/slices/settings-slice";
import ls from "localstorage-slim";
import { secondsLeftToday } from "../helpers/utils";
import { DataState } from "@/redux/slices/data-slice";

const today = new Date();
today.setHours(0, 0, 0);

const todayKey = "FocusedData(" + today.toDateString() + ")";
export const latestData: string = "FocusedData(latestData)";
export const tempLatest: string = "FocusedData(TempLatest)";
export const storeUserSettings = (
  newSettings: SettingsState
): void => {
  ls.set("Focused(settings)", newSettings);
};

export const getUserSettings = () => {
  if (typeof window !== "undefined") {
    const storedSettings = ls.get("Focused(settings)");
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

interface StorageDataType {
  totalTime: number;
  sessions: number;
  currStreak: number;
  bestStreak: number;
  key?: string;
}

interface StorageDataReturnType {
  totalTime: number;
  sessions: number;
  currStreak: number;
  bestStreak: number;
  key: string;
}
// const initialData: DataState = {
//   currTime: 0,
//   totalTime: 0,
//   paused: false,
//   sessions: 0,
//   currStreak: 0,
//   bestStreak: 0,
// };
export const initStorageData = {
  totalTime: 0,
  sessions: 0,
  currStreak: 0,
  key: "",
  bestStreak: 0,
};
export const storeTodayData = (
  data: StorageDataType,
  storeLatest: boolean = true
): void => {
  const newData = {
    ...data,
    key: today.toDateString(),
    expiry: new Date(
      today.getTime() + 3600 * 24 * 7 * 1000
    ).toDateString(),
  };
  ls.set(todayKey, newData, { ttl: 3600 * 24 * 7 });
  storeLatest && ls.set(latestData, newData);
};

export const storeLatest = (): void => {
  const data = ls.get(tempLatest);
  if (!data) {
    ls.set(tempLatest, ls.get(latestData), {
      ttl: secondsLeftToday() + 24 * 3600,
    });
  }
};

export const getTodayData = (): DataState => {
  if (typeof window !== "undefined") {
    const data: StorageDataReturnType =
      ls.get(todayKey) || initStorageData;
    if (ls.get(todayKey))
      return { ...data, paused: false, currTime: 0 };
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
export const latestUserData = (): StorageDataReturnType => {
  const data: StorageDataReturnType =
    (typeof window !== "undefined" && ls.get(latestData)) ||
    initStorageData;
  return data;
};
export const GetLatestTempData = (): StorageDataReturnType => {
  const data: StorageDataReturnType =
    (typeof window !== "undefined" && ls.get(tempLatest)) ||
    initStorageData;
  return data;
};

/* Todo */
export const last7Data = (): number[] => {
  let timeData: number[] = [];
  if (typeof window !== "undefined")
    for (let i = 1; i < 7; i++) {
      const day = new Date(today.getTime() - i * 24 * 3600 * 1000);
      console.log(day.toDateString());
      const data: StorageDataReturnType =
        ls.get(`FocusedData(${day.toDateString()})`) ||
        initStorageData;
      timeData = [data.totalTime/60, ...timeData];
    }
  console.log(timeData);
  return timeData;
};
