import React, { useEffect } from "react";
import BoardContainer from "./boardContainer";
import { padZero } from "@/helpers/utils";
import { useTimer } from "react-timer-hook";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { takeBreak } from "@/redux/slices/data-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { breakDuration } from "../redux/slices/settings-slice";

interface TimerProps {
  minutes: number;
  hours: number;
  seconds: number;
  isRunning: boolean;
  startTimer: (paused?: boolean) => void;
  pause: () => void;
  resetTimer: () => void;
  OpenTimerSettings: () => void;
}

function TimerBoard({
  startTimer,
  pause,
  resetTimer,
  hours,
  minutes,
  seconds,
  isRunning,
  OpenTimerSettings,
}: TimerProps) {
  const dispatch = useAppDispatch();
  const paused = useAppSelector((state) => state.data.paused);
  const skipBreaks = useAppSelector(
    (state) => state.settings.skipBreaks
  );
  const breakDurationVal = useAppSelector(breakDuration);

  const time = new Date();
  time.setSeconds(time.getSeconds() + breakDurationVal);
  const timeout = useTimer({
    expiryTimestamp: time,
    onExpire: resetTimer,
    autoStart: false,
  });

  const pauseTimer = () => {
    dispatch(takeBreak(true));
    pause();
  };

  useEffect(() => {
    if (paused) {
      timeout.restart(time);
    }
    return () => {
      timeout.pause();
    };
  }, [paused]);

  return (
    <div className="w-11/12 md:3/5 h-80 md:h-full min-w-fit mx-auto">
      <BoardContainer>
        <div
          onClick={(e) => {
            OpenTimerSettings();
            e.stopPropagation();
          }}
          className="absolute top-4 right-2 w-fit h-6 p-1 flex justify-between cursor-pointer text-sm"
        >
          <FontAwesomeIcon icon={faPen} />
        </div>
        {!isRunning && !paused && (
          <h1>Keep track of work sessions with stay-focused</h1>
        )}
        <div className="flex flex-col items-center">
          <h2 className="text-lg">
            {paused ? "On a break!" : "Focus Time"}
          </h2>
          {paused && (
            <span>
              Sesson will end in {padZero(timeout.minutes)}:
              {padZero(timeout.seconds)}
            </span>
          )}
          <div className="flex flex-col justify-center items-center my-4 w-52 aspect-[3/1] bg-slate-600 rounded-lg border-b-2 border-b-white border-solid">
            <h3 className="text-4xl">
              {hours > 0 && padZero(hours) + "h "}
              {padZero(minutes) + "m"}
              {hours < 1 && " " + padZero(seconds) + "s"}
            </h3>
          </div>
          {isRunning && !skipBreaks && (
            <div
              onClick={() => pauseTimer()}
              className="flex justify-center items-center my-4 h-8 px-2  bg-slate-600 shadow-black shadow-sm rounded-lg cursor-pointer hover:bg-slate-700"
            >
              Take a break.
            </div>
          )}
          {!isRunning && (
            <div
              onClick={() => startTimer(paused)}
              className="flex justify-center items-center h-12 px-2  bg-slate-600 shadow-black shadow-sm rounded-lg cursor-pointer hover:bg-slate-700 transition-colors duration-200"
            >
              {paused ? "Resume" : "Start"} focus sesson
            </div>
          )}
          {isRunning || paused ? (
            <div
              onClick={() => {
                resetTimer();
              }}
              className="flex justify-center items-center my-4 w-16 aspect-square rounded-full bg-slate-600 shadow-black shadow-sm cursor-pointer hover:bg-slate-700"
            >
              End
            </div>
          ) : (
            ""
          )}
        </div>
      </BoardContainer>
    </div>
  );
}

export default TimerBoard;
