import React from "react";
import Image from "next/image";

function NavBar() {
  return (
    <div className="flex items-end fixed top-0 right-0 h-12 w-screen px-4 z-50">
      <div className="flex w-24 justify-between items-end">
        {/* <FontAwesomeIcon icon={faStarOfLife} />  */}
        <Image src={"./logo.svg"} width={26} height={26} alt="Logo" />
        <span className="hidden lg:inline">Focused</span>
      </div>
    </div>
  );
}

export default NavBar;
