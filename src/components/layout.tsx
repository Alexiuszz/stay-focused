import React, { ReactNode, useState } from "react";
import NavBar from "./nav";
import SidePanel from "./side-panel";
import Footer from "./footer";
import TimerSettings from "./timer-settings";

function Layout({
  children,
  isTimerSettingOpen,
  closeTimerSettings,
  page,
  onClick,
}: {
  children: ReactNode;
  isTimerSettingOpen: boolean;
  closeTimerSettings: () => void;
  page: string;
  onClick: () => void;
}) {
  const [openSidePanel, setOpenSidePanel] = useState<boolean>(false);
  return (
    <main
      onClick={() => {
        setOpenSidePanel(false);
        onClick();
      }}
      className="min-h-[100vh] overflow-x-hidden font-TT subpixel-antialiased text-sm bg-slate-100 dark:bg-slate-900  text-fa text-slate-900 dark:text-slate-300 flex flex-col justify-center items-end pr-0 md:pr-12 "
    >
      <style jsx global>{`
        body::-webkit-scrollbar {
          width: 12px;
        }
        body::-webkit-scrollbar-thumb {
          background-color: #475569;
          border: 3px solid #2c3b4f;
          border-radius: 10px;
        }
        body::-webkit-scrollbar-track {
          background: #4f667c;
        }
      `}</style>
      <NavBar />
      <SidePanel
        open={openSidePanel}
        setOpen={() => setOpenSidePanel((prevState) => !prevState)}
      />
      {page === "home" && (
        <TimerSettings
          isOpen={isTimerSettingOpen}
          closeModal={closeTimerSettings}
        />
      )}
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
