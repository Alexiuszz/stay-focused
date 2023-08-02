import React, { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}
function BoardContainer({
  children,
}: ContainerProps) {
  return (
    <div className={`flex justify-center items-center gap-3 shrink-0 w-full h-full rounded-md shadow-md bg-slate-700`}>
      {children}
    </div>
  );
}

export default BoardContainer;
