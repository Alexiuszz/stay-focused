import React from "react";
import Image from "next/image";

function NavBar() {
  return (
    <div className="flex items-center fixed top-0 right-0 h-12 w-screen px-4 z-10">
      <div className="flex w-24 justify-between items-end">
        {/* <FontAwesomeIcon icon={faStarOfLife} />  */}
        <Image src={"./logo.svg"} width={30} height={30} alt="Logo" />
        <span>Focused</span>
      </div>
    </div>
  );
}

export default NavBar;
