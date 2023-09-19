import React, { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}
function BoardContainer({
  children,
}: ContainerProps) {
  return (
    <div className={`flex flex-col justify-center items-center gap-3 shrink-0 w-full h-full rounded-md shadow-md shadow-black bg-slate-700 p-4 relative`}>
      {children}
    </div>
  );
}

export default BoardContainer;

