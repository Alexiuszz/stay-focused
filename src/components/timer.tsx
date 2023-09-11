import React, { useEffect, useState } from "react";
import BoardContainer from "./boardContainer";
import { padZero } from "@/helpers/utils";
import { useTimer } from "react-timer-hook";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { takeBreak } from "@/redux/slices/data-slice";

interface TimerProps {
  minutes: number;
  hours: number;
  seconds: number;
  isRunning: boolean;
  startTimer: () => void;
  pause: () => void;
  resetTimer: () => void;
}
function TimerBoard({
  startTimer,
  pause,
  resetTimer,
  hours,
  minutes,
  seconds,
  isRunning,
}: TimerProps) {
  const paused = useAppSelector((state) => state.data.paused);
  const skipBreaks = useAppSelector(
    (state) => state.settings.skipBreaks
  );
  const dispatch = useAppDispatch();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const timeout = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log(time.toString()),
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
    <div className="w-3/5 h-full">
      <BoardContainer>
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
              {padZero(minutes)}
              {hours < 1 && "m " + padZero(seconds) + "s"}
            </h3>
          </div>
          {isRunning && !skipBreaks && (
            <div
              onClick={() => pauseTimer()}
              className="flex justify-center items-center my-4 h-8 px-2  bg-slate-600 shadow-black shadow-sm rounded-lg cursor-pointer"
            >
              Take a break.
            </div>
          )}
          {!isRunning && (
            <div
              onClick={() => startTimer()}
              className="flex justify-center items-center h-12 px-2  bg-slate-600 shadow-black shadow-sm rounded-lg cursor-pointer"
            >
              {paused ? "Resume" : "Start"} focus sesson
            </div>
          )}
          {isRunning || paused ? (
            <div
              onClick={() => {
                resetTimer();
              }}
              className="flex justify-center items-center my-4 w-16 aspect-square rounded-full bg-slate-600 shadow-black shadow-sm cursor-pointer"
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
