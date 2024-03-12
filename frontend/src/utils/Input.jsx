import React from "react";

const Input = ({ placeholder, type, icon, handler, value }) => {
  return (
    <div className="px-4 relative space-y-1">
      {icon && (
        <i
          className={`bi ${icon} -z-10 bg-black/30 text-white rounded-l mt-1 p-2 h-fit absolute text-2xl`}
        ></i>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handler}
        className={`${
          icon ? `pl-11` : ``
        } border-[0.024rem] rounded-md p-[.6rem] bg-transparent border-black w-full text-lg placeholder:text-black placeholder:font-medium focus:outline-none text-black`}
      />
    </div>
  );
};

export default Input;
