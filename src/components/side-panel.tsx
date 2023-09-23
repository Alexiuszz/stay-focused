import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import {
  // faChartPie,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IconLink } from "./UI-components/IconLink";

function SidePanel() {
  return (
    <div className="bg-slate-950 text-sm flex flex-col overflow-hidden justify-between lg:w-1/6 w-0 h-screen fixed top-0 left-0 pt-16 shadow-lg shadow-black pb-5 z-0">
      <IconLink href="/" icon={faStarOfLife} text={"Dashboard"} />
      {/* <IconLink href="/stats" icon={faChartPie} text={"Statistics"} /> */}
      <div className="flex flex-col justify-between items-center w-full h-20">
        <IconLink href="/settings" icon={faGears} text={"Settings"} />
        <button className="bg-slate-600 hover:bg-slate-800 justify-center items-center flex h-8 w-full rounded-lg text-sm">
          Login
        </button>
      </div>
    </div>
  );
}

export default SidePanel;
