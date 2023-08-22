import React, { ReactNode } from "react";
import NavBar from "./nav";
import SidePanel from "./side-panel";

function Layout({
  children,
  page,
}: {
  children: ReactNode;
  page: string;
}) {
  return (
    <main className=" overflow-hidden font-TT subpixel-antialiased text-sm bg-slate-100 dark:bg-slate-900  text-fa text-slate-900 dark:text-slate-300 flex justify-end items-end h-screen pr-12">
      <NavBar />
      <SidePanel />
      {children}
    </main>
  );
}

export default Layout;
