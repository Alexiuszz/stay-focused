import { SettingsState } from "@/redux/slices/settings-slice";

export const storeUserSettings = (
  newSettings: SettingsState
): void => {
  window.localStorage.setItem(
    "settings",
    JSON.stringify(newSettings)
  );
};
export const getUserSettings = () => {
  let settings =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("settings")) ||
    JSON.stringify("");
  return JSON.parse(settings) as SettingsState;
};
