import ChartBoard from "@/components/chartBoard";
import NavBar from "@/components/nav";
import Progress from "@/components/progress";
import TimerBoard from "@/components/timer";
import Todo from "@/components/todo";

export default function Home() {
  return (
    <main className="font-sans text-sm bg-slate-100  dark:bg-slate-900  text-fa text-slate-900 dark:text-slate-300 flex justify-end items-end h-screen pr-12">
      <NavBar />
      <section className="X-main mr-0 w-5/6 flex flex-col items-center gap-6">
        <div className="flex w-full h-fit">
          <h1 className="text-2xl mb-3">Get more done with Stay Focused</h1>
        </div>
        <div className="flex justify-between w-full h-2/5 gap-4">
          <TimerBoard />
          <Progress />
        </div>
        <div className="flex justify-between w-full h-2/5 gap-4">
          <Todo />
          <ChartBoard />
        </div>
      </section>
    </main>
  );
}
