import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigations = [
    "dashboard",
    "home",
    "account",
    localStorage.getItem("access_token") ? "Logout" : "",
    localStorage.getItem("access_token") ? "" : "signup",
    localStorage.getItem("access_token") ? "" : "signin",
  ];
  return (
    <div className="w-full relative">
      <nav className="bg-black py-6 p-4">
        <div className="mx-auto px-2">
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="flex-shrink-0 text-white text-xl tracking-wider"
            >
              DoneSplit
            </a>
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                {navigations.map((nav, index) => {
                  if (nav !== "") {
                    return (
                      <li key={index}>
                        <a
                          href={`/${nav}`}
                          className="text-white capitalize hover:text-gray-300"
                        >
                          {nav}
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="md:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden transition-all duration-1000 bg-black absolute top-full left-0 w-full`}
        >
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black z-90">
            {navigations.map((nav, index) => (
              <li key={index}>
                <a
                  href={`/${nav}`}
                  className="text-white block capitalize z-10 hover:bg-[#424343] px-3 py-2 rounded-md text-base font-medium"
                >
                  {nav}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
