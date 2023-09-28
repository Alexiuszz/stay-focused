import { SettingsState } from "@/redux/slices/settings-slice";
import ls from "localstorage-slim";


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
