import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

function SidePanel() {
  return (
    <div>
      <Link href="/">
        <FontAwesomeIcon icon={faStarOfLife} />
        <span>Dashboard</span>
      </Link>
      <Link href="/stats">
        <FontAwesomeIcon icon={faChartPie} />
        <span>Statistics</span>
      </Link>
      <Link href="/settings">
        <FontAwesomeIcon icon={faGears} />
        <span>Settings</span>
      </Link>
    </div>
  );
}

export default SidePanel;
