import React from "react";
import BoardContainer from "./boardContainer";
import RoundMeter from "./UI-components/meter";
import { useAppSelector } from "@/redux/hooks";
import { bestStreak, currStreak } from "@/redux/slices/data-slice";
import { sessions } from "../redux/slices/data-slice";
import { secondsToHrMins } from "@/helpers/utils";

function Progress({ totalTimeToday }: { totalTimeToday: number }) {
  const dailyGoal = useAppSelector(
    (state) => state.settings.dailyGoal
  );
  const currStreakValue = useAppSelector(currStreak);
  const bestStreakValue = useAppSelector(bestStreak);
  const sessionsValue = useAppSelector(sessions);
  return (
    <div className="w-11/12 md:2/5 h-80 md:h-full min-w-fit mx-auto">
      <BoardContainer>
        {/* {totalTimeToday} */}
        {totalTimeToday > dailyGoal ? (
          <p>Well done, you&apos;ve achieved your goal!</p>
        ) : (
          <p>Keep going, you&apos;re doing great!</p>
        )}
        <p>{`${secondsToHrMins(totalTimeToday).hrs}hr ${secondsToHrMins(totalTimeToday).mins}mins today`}</p>
        <div className="w-full h-4/5 flex justify-around items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-xs">Streak</p>
            <p className="text-2xl">{currStreakValue}</p>
            <p className="text-xs">days</p>
          </div>
          <div className="w-fit h-fit mx-4">
            <RoundMeter value={totalTimeToday} maxValue={dailyGoal} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xs">Sessions</p>
            <p className="text-2xl">{sessionsValue}</p>
          </div>
        </div>
        <p className="text-sm">
          Longest streak: {bestStreakValue} days
        </p>
      </BoardContainer>
    </div>
  );
}

export default Progress;
