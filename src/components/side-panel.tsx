import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import {
  faChartPie,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IconLink } from "./UI-components/IconLink";

function SidePanel() {
  return (
    <div className="bg-slate-950 flex flex-col gap-4 w-1/6 h-screen fixed top-0 left-0 pt-12 shadow-lg shadow-black px-3 z-0">
      <IconLink href="/" icon={faStarOfLife} text={"Dashboard"} />
      <IconLink href="/stats" icon={faChartPie} text={"Statistics"} />
      <IconLink href="/settings" icon={faGears} text={"Settings"} />
    </div>
  );
}

export default SidePanel;
