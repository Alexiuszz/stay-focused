import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import {
  faChartPie,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IconLink } from "./UI-components/IconLink";

function SidePanel() {
  return (
    <div className="bg-slate-700 flex flex-col gap-3 w-1/5 h-screen fixed top-0 left-0 pt-12 shadow-lg shadow-slate-600/50 px-3 z-0">
      <IconLink
        href="/"
        icon={faStarOfLife}
        text={"Dashboard"}
      ></IconLink>
      <IconLink
        href="/stats"
        icon={faChartPie}
        text={"Statistics"}
      ></IconLink>
      <IconLink
        href="/settings"
        icon={faGears}
        text={"Settings"}
      ></IconLink>
    </div>
  );
}

export default SidePanel;
