import React from "react";
import homebg from "../assets/homebg.png";
import Buttons from "../utils/Buttons";
import bgtext from "../assets/bgtext.mp4";
const Home = () => {
  const getSignUpAndsign = () => {
    if (
      localStorage.getItem("access_token") === null ||
      localStorage.getItem("access_token") === undefined
    ) {
      return (
        <div className="flex w-full flex-col md:flex-row">
          <Buttons href={"/signup"} title={"signup"} />
          <Buttons href={"/signin"} title={"signin"} />
        </div>
      );
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-center align-middle pt-10 flex-col">
        <div className="md:px-20 flex flex-col lg:flex-row w-full">
          <div className="relative -z-10 border-none">
            <div className="w-full border-none border-white overflow-hidden bg-white flex justify-center flex-col align-middle">
              <video
                className="w-full border-none bg-white"
                autoPlay={true}
                muted={true}
                loop={true}
              >
                <source src={bgtext} type="video/mp4" />
              </video>
              <div className="bg-white h-full w-full flex flex-col justify-center align-middle absolute mix-blend-screen text-black -space-y-10">
                <h2 className="md:text-[8rem] text-[20vw] font-extrabold uppercase font-sans ">
                  expenses
                </h2>
                <h2 className="mx-auto md:m-0 md:text-[8rem] text-[16vw] font-bold text-black uppercase font-sans">
                  simplified
                </h2>
              </div>
            </div>
          </div>
          {localStorage.getItem("access_token") !== undefined &&
            localStorage.getItem("access_token") !== null &&
            localStorage.getItem("access_token") !== "" && (
              <div className="flex justify-center px-6 mb-20 lg:mb-0 space-x-2 w-full">
                <div className="w-full flex flex-col justify-center">
                  <img src={homebg} alt="" />
                  <div>
                    <a
                      href="/add-expense"
                      className="bg-black uppercase flex justify-center mx-auto text-white rounded-md p-2"
                    >
                      Add Expenses
                    </a>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center">
                  <img src={homebg} alt="" />
                  <a
                    href="/add-groups"
                    className="bg-white uppercase w-full text-center border-[0.023rem] border-black text-black rounded-md p-2"
                  >
                    New Group
                  </a>
                </div>
              </div>
            )}
        </div>
        {getSignUpAndsign()}
      </div>
    </div>
  );
};

export default Home;
