import React from "react";
import BoardContainer from "./boardContainer";
import RoundMeter from "./UI-components/meter";
import { useAppSelector } from "@/redux/hooks";

function Progress({ totalTimeToday }: { totalTimeToday: number }) {
  const dailyGoal = useAppSelector(
    (state) => state.settings.dailyGoal
  );
  return (
    <div className="w-2/5 min-w-fit h-full">
      <BoardContainer>
        <RoundMeter value={totalTimeToday} maxValue={dailyGoal} />
      </BoardContainer>
    </div>
  );
}

export default Progress;
