import React from "react";
import Logout from "./Logout";

function Header() {
  return (
    <header className="bg-[#275284] min-w-[350px] w-full h-20 flex items-center justify-between px-2 sm:px-10">
      <img
        alt="site-logo"
        src="../src/assets/jst-logo-blue.webp"
        className="bg-white p-2 rounded-md w-20 sm:w-36"
      />

      <div className="flex gap-3">
        <a
          href="/list"
          className="bg-purple-200 w-12 grid items-center text-sm sm:w-28 sm:h-14 sm:text-lg h-auto p-1 sm:p-3 rounded-md hover:scale-90"
        >
          Show List
        </a>
        <a
          href="/"
          className="bg-purple-200 w-12 grid items-center text-sm sm:w-36 sm:h-14 sm:text-lg h-auto p-1  sm:p-3 rounded-md hover:scale-90"
        >
          Create Vendor
        </a>
        <div className="bg-purple-200 w-12 grid items-center text-sm sm:w-28 sm:h-14 sm:text-lg h-auto p-1  sm:p-3 rounded-md hover:scale-90">
          <Logout />
        </div>
      </div>
    </header>
  );
}

export default Header;
