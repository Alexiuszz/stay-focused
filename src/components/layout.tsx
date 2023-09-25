import React, { ReactNode } from "react";
import NavBar from "./nav";
import SidePanel from "./side-panel";

function Layout({
  children,
  onClick,
}: {
  children: ReactNode;
  page?: string;
  onClick: () => void;
}) {
  return (
    <main onClick={onClick} className="main-container overflow-x-hidden font-TT subpixel-antialiased text-sm bg-slate-100 dark:bg-slate-900  text-fa text-slate-900 dark:text-slate-300 flex justify-end items-end h-screen pr-0 md:pr-12 ">
      <NavBar />
      <SidePanel />
      {children}
    </main>
  );
}

export default Layout;
