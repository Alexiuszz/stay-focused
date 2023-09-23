import ChartBoard from "@/components/chartBoard";
import Layout from "@/components/layout";
import TimerBoard from "@/components/timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { useStopwatch } from "react-timer-hook";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  bestStreak,
  currStreak,
  incrementCurrStreak,
  incrementSession,
  resetStreak,
  setBestStreak,
  setCurrStreak,
  takeBreak,
  totalTimeIncrement,
} from "@/redux/slices/data-slice";
import { useEffect, useState } from "react";
import {
  GetLatestTempData,
  latestUserData,
  storeLatest,
  storeTodayData,
} from "@/storage/dataStorage";

import dynamic from "next/dynamic";
import { differenceInDays, streakEnded } from "@/helpers/utils";
import { initStorageData } from "../storage/dataStorage";

const Progress = dynamic(() => import("../components/progress"), {
  ssr: false,
});
const Todo = dynamic(() => import("../components/todo"), {
  ssr: false,
});

export default function Home() {
  const [openPrevTodos, setOpenPrevTodos] = useState<boolean>(false);
  const { minutes, hours, seconds, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const totalTime = useAppSelector((state) => state.data.totalTime);
  const sessions = useAppSelector((state) => state.data.sessions);
  const currStreakVal = useAppSelector(currStreak);
  const bestStreakVal = useAppSelector(bestStreak);

  const dispatch = useAppDispatch();

  const startTimer = (paused: boolean = false) => {
    const data = latestUserData();
    if (data.key !== new Date().toDateString()) {
      window.location.reload();
      return;
    }
    !paused && dispatch(incrementSession());
    dispatch(takeBreak(false));
    start();
    if (sessions < 1) {
      dispatch(incrementCurrStreak());
    }
  };

  const resetTimer = () => {
    dispatch(takeBreak(false));
    reset(new Date(0), false);
    storeTodayData({
      totalTime: totalTime,
      sessions: sessions,
      currStreak: currStreakVal,
      bestStreak: bestStreakVal,
    });
  };

  //store latest in temp storage
  //set best streak from latest data
  useEffect(() => {
    const data = latestUserData();
    data && dispatch(setBestStreak(data.bestStreak));
    if (data.key !== new Date().toDateString()) {
      if (data.totalTime > 1) {
        streakEnded(new Date(data.key))
          ? dispatch(resetStreak())
          : dispatch(setCurrStreak(data.currStreak));
        storeLatest();
        return;
      }
    }
    const tempData = GetLatestTempData();
    const diff = differenceInDays(new Date(tempData.key), new Date());
    if (
      tempData.totalTime > 0 &&
      diff === 1 &&
      data.currStreak < tempData.currStreak
    ) {
      dispatch(setCurrStreak(tempData.currStreak));
    }
  }, []);

  useEffect(() => {
    const data = latestUserData();
    if (data.key !== new Date().toDateString()) {
      storeTodayData(initStorageData);
    }
  });

  useEffect(() => {
    if (isRunning) {
      dispatch(totalTimeIncrement());
      storeTodayData({
        totalTime: totalTime,
        sessions: sessions,
        currStreak: currStreakVal,
        bestStreak: bestStreakVal,
      });
    }
  }, [seconds]);

  return (
    <Layout page="home" onClick={() => setOpenPrevTodos(false)}>
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
          <Todo
            setOpenPrevTodos={() =>
              setOpenPrevTodos((prevState) => !prevState)
            }
            openPrevTodos={openPrevTodos}
          />
          <ChartBoard totalTime={totalTime} />
        </div>
      </section>
    </Layout>
  );
}
