import { useState } from "react";
import Modal from "./UI-components/modal";
import { ListMenu } from "./form-components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  breakDuration,
  dailyGoal,
  setBreakDuration,
  setDailyGoal,
  userName,
} from "@/redux/slices/settings-slice";
import { storeUserSettings } from "@/storage/settingsStorage";

const goalValues = [
  {
    time: 1 * 60 * 60,
    text: "1 hour",
  },
  {
    time: 2 * 60 * 60,
    text: "2 hours",
  },
  {
    time: 3 * 60 * 60,
    text: "3 hours",
  },
  {
    time: 4 * 60 * 60,
    text: "4 hours",
  },
  {
    time: 5 * 60 * 60,
    text: "5 hours",
  },
  {
    time: 6 * 60 * 60,
    text: "6 hours",
  },
  {
    time: 7 * 60 * 60,
    text: "7 hours",
  },
  {
    time: 8 * 60 * 60,
    text: "8 hours",
  },
];
const breakValues = [
  {
    time: 10 * 60,
    text: "10 minutes",
  },
  {
    time: 15 * 60,
    text: "15 minutes",
  },
  {
    time: 30 * 60,
    text: "30 minutes",
  },
  {
    time: 1 * 60 * 60,
    text: "1 hour",
  },
];

function TimerSettings({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const dispatch = useAppDispatch();
  const breakDurationVal = useAppSelector(breakDuration);
  const dailyGoalVal = useAppSelector(dailyGoal);
  const userNameVal = useAppSelector(userName);

  const [goalVal, setGoalVal] = useState(useAppSelector(dailyGoal));
  const [breakVal, setBreakVal] = useState(
    useAppSelector(breakDuration)
  );

  const syncModalDefaults = () => {
    setGoalVal(dailyGoalVal);
    setBreakVal(breakDurationVal);
  };
  const setGoal = (val: number) => {
    setGoalVal(val);
  };
  const setBreak = (val: number) => {
    setBreakVal(val);
  };

  const saveSettings = () => {
    closeModal();
    dispatch(setDailyGoal(goalVal));
    dispatch(setBreakDuration(breakVal));
    storeUserSettings({
      userName: userNameVal,
      dailyGoal: goalVal,
      breakDuration: breakVal,
      includeWeekend: true,
      offDays: [],
      skipBreaks: false,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={() => {
        closeModal();
        syncModalDefaults();
      }}
      title=""
    >
      <div className="mt-4">
        <ListMenu
          value={goalVal}
          onChange={setGoal}
          selectItems={goalValues}
          label="Set you daily goal: "
        />
      </div>
      <div className="mt-4">
        <ListMenu
          value={breakVal}
          onChange={setBreak}
          selectItems={breakValues}
          label="Set break duration:"
        />
      </div>

      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-slate-200 mt-4 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100 focus-visible:ring-offset-2 transition-colors duration-200"
        onClick={saveSettings}
      >
        save
      </button>
    </Modal>
  );
}

export default TimerSettings;
