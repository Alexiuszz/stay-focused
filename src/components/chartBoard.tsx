import React from "react";
import BoardContainer from "./boardContainer";
import { StreakChart } from "./UI-components/StreakChart";

function ChartBoard({ totalTime }: { totalTime: number }) {
  return (
    <div className="w-11/12 md:w-1/2 h-80 md:h-fit min-w-fit mx-auto font-thin">
      <BoardContainer>
        <StreakChart todayTime={totalTime} />
      </BoardContainer>
    </div>
  );
}

export default ChartBoard;
