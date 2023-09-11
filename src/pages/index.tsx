import ChartBoard from "@/components/chartBoard";
import Layout from "@/components/layout";
// import Progress from "@/components/progress";
import TimerBoard from "@/components/timer";
import Todo from "@/components/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { useStopwatch } from "react-timer-hook";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  incrementSession,
  takeBreak,
  totalTimeIncrement,
} from "@/redux/slices/data-slice";
import { useEffect } from "react";
import { storeTodayData } from "@/helpers/localStorage";

import dynamic from "next/dynamic";

const Progress = dynamic(() => import("../components/progress"), {
  ssr: false,
});
export default function Home() {
  const {
    totalSeconds,
    minutes,
    hours,
    seconds,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const totalTime = useAppSelector((state) => state.data.totalTime);
  const sessions = useAppSelector((state) => state.data.sessions);
  const dispatch = useAppDispatch();

  const startTimer = (paused: boolean = false) => {
    !paused && dispatch(incrementSession());
    dispatch(takeBreak(false));
    start();
  };

  const resetTimer = () => {
    dispatch(takeBreak(false));
    reset(new Date(0), false);
    storeTodayData({
      totalTime: totalTime,
      sessions: sessions,
      currStreak: 0,
      bestStreak: 0,
    });
  };

  useEffect(() => {
    if (isRunning) {
      dispatch(totalTimeIncrement());
      storeTodayData({
        totalTime: totalTime,
        sessions: sessions,
        currStreak: 0,
        bestStreak: 0,
      });
    }
  }, [seconds]);

  return (
    <Layout page="home">
      <section className="X-main mr-0 w-3/4 flex flex-col gap-4">
        <div className="flex w-full h-fit">
          <h1 className="text-xl mb-1">
            Get more done with Stay Focused
          </h1>
          <FontAwesomeIcon icon={faStarOfLife} />
        </div>
        <div className="flex justify-between w-full max-w-4xl h-80 gap-4">
          <TimerBoard
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            startTimer={startTimer}
            pause={pause}
            resetTimer={resetTimer}
          />
          <Progress totalTimeToday={totalTime} />
        </div>
        <div className="flex justify-between w-full max-w-4xl h-fit gap-4">
          <Todo />
          <ChartBoard />
        </div>
      </section>
    </Layout>
  );
}
