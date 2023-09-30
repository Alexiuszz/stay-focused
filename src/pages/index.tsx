import ChartBoard from "@/components/chartBoard";
import Layout from "@/components/layout";
import TimerBoard from "@/components/timer";
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
  updateCurrTime,
  updateTotalTime,
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
import Head from "next/head";
import { currTime } from "../redux/slices/data-slice";

const Progress = dynamic(() => import("../components/progress"), {
  ssr: false,
});
const Todo = dynamic(() => import("../components/todo"), {
  ssr: false,
});

export default function Home() {
  const [openPrevTodos, setOpenPrevTodos] = useState<boolean>(false);
  const [openSidePanel, setOpenSidePanel] = useState<boolean>(false);
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

  const currTimeVal = useAppSelector(currTime);
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
    const temp = currTimeVal;
    dispatch(updateCurrTime(0));
    dispatch(updateTotalTime(temp));
    reset(new Date(0), false);
    storeTodayData({
      currTime: 0,
      totalTime: totalTime + currTimeVal,
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
      data.currStreak < tempData.currStreak &&
      data.bestStreak < tempData.bestStreak
    ) {
      diff <= 1 && dispatch(setCurrStreak(tempData.currStreak));
      dispatch(setBestStreak(tempData.bestStreak));
    }
  }, []);

  useEffect(() => {
    if (currTimeVal > 0) {
      const temp = currTimeVal;
      dispatch(updateCurrTime(0));
      dispatch(updateTotalTime(temp));
      storeTodayData({
        currTime: 0,
        totalTime: totalTime,
        sessions: sessions,
        currStreak: currStreakVal,
        bestStreak: bestStreakVal,
      });
    }
  }, []);

  useEffect(() => {
    const data = latestUserData();
    if (data.key !== new Date().toDateString()) {
      dispatch(setBestStreak(data.bestStreak));
      storeTodayData(initStorageData);
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      dispatch(updateCurrTime(totalSeconds));
      storeTodayData({
        currTime: totalSeconds,
        totalTime: totalTime,
        sessions: sessions,
        currStreak: currStreakVal,
        bestStreak: bestStreakVal,
      });
    }
  }, [seconds]);

  return (
    <>
      <Head>
        <title>Stay Focused</title>
        <link
          rel="canonical"
          href="https://stay-focused-nine.vercel.app/"
          key="canonical"
        />
        <meta
          name="description"
          content="Track time spent focused everyday"
          key="desc"
        />
        <meta property="og:title" content="Stay Focused" />
        <meta property="og:description" content="Track your work" />
        <meta
          property="og:image"
          content="https://stay-focused-nine.vercel.app/logo"
        />
      </Head>
      <Layout
        page="home"
        setOpenSidePanel={() =>
          setOpenSidePanel((prevState) => !prevState)
        }
        openSidePanel={openSidePanel}
        onClick={() => {
          setOpenSidePanel(false);
          setOpenPrevTodos(false);
        }}
      >
        <section className="X-main mx-auto md:mr-0 w-full md:w-11/12 lg:w-3/4 flex flex-col items-center gap-4">
          <div className="flex w-full h-fit mx-auto md:mx-0">
            <h1 className="text-xl mb-1 ml-4 md:ml-0 ">
              Get more done with Stay Focused
            </h1>
            {/* <FontAwesomeIcon icon={faStarOfLife} /> */}
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl h-fit md:h-80 gap-4">
            {/* {totalSeconds} */}
            <TimerBoard
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              isRunning={isRunning}
              startTimer={startTimer}
              pause={pause}
              resetTimer={resetTimer}
            />
            <Progress totalTimeToday={totalTime + currTimeVal} />
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl h-fit gap-4">
            <Todo
              setOpenPrevTodos={() =>
                setOpenPrevTodos((prevState) => !prevState)
              }
              openPrevTodos={openPrevTodos}
            />
            <ChartBoard totalTime={totalTime + currTimeVal} />
          </div>
        </section>
      </Layout>
    </>
  );
}
