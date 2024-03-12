import React from "react";
import { useNavigate } from "react-router-dom";

const Buttons = ({ href, title }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(href);
  };
  return (
    <div className="md:px-20 px-4 my-1 w-full">
      <button
        onClick={handleNavigation}
        className="bg-black uppercase tracking-wider text-white w-full p-2 rounded-md"
      >
        {title}
      </button>
    </div>
  );
};

export default Buttons;
