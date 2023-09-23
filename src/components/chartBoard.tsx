import React from "react";
import BoardContainer from "./boardContainer";
import { StreakChart } from "./UI-components/StreakChart";

function ChartBoard({ totalTime }: { totalTime: number }) {
  return (
    <div className="w-1/2 min-w-fit h-fit font-thin">
      <BoardContainer>
        <StreakChart todayTime={totalTime} />
      </BoardContainer>
    </div>
  );
}

export default ChartBoard;
