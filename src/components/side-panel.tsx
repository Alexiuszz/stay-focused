import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import {
  // faChartPie,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IconLink } from "./UI-components/IconLink";

function SidePanel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) {
  return (
    <div
      className={`sidePanel bg-slate-950 text-sm flex flex-col overflow-hidden justify-between ${
        open ? "open" : ""
      } h-screen fixed top-0 left-0 pt-16 shadow-lg shadow-black pb-5 z-10`}
    >
      <div
        onClick={(e) => {
          setOpen();
          e.stopPropagation();
        }}
        className={`menu cursor-pointer bg-slate-950 z-40 w-8 h-8 text-white text-xl justify-center items-center flex lg:hidden fixed ${
          open ? "menu-open" : "0"
        } top-16`}
      >
        <p>{">"}</p>
      </div>
      <IconLink href="/" icon={faStarOfLife} text={"Dashboard"} />
      {/* <IconLink href="/stats" icon={faChartPie} text={"Statistics"} /> */}
      <div className="flex flex-col justify-between items-center w-full h-20">
        <IconLink href="/settings" icon={faGears} text={"Settings"} />
        <button className="bg-slate-600 hover:bg-slate-800 justify-center items-center flex h-8 w-full rounded-lg text-sm shadow-black shadow-sm transition-colors duration-200">
          Login
        </button>
      </div>
    </div>
  );
}

export default SidePanel;
