import ChartBoard from "@/components/chartBoard";
import Layout from "@/components/layout";
import NavBar from "@/components/nav";
import Progress from "@/components/progress";
import SidePanel from "@/components/side-panel";
import TimerBoard from "@/components/timer";
import Todo from "@/components/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { useStopwatch } from "react-timer-hook";

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
            start={start}
            pause={pause}
            reset={reset}
          />
          <Progress />
        </div>
        <div className="flex justify-between w-full max-w-4xl h-fit gap-4">
          <Todo />
          <ChartBoard />
        </div>
      </section>
    </Layout>
  );
}
