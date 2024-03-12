import React from "react";

const Tabs = () => {
  const tabs = ["groups", "friends", "activity"];
  return (
    <div className="w-full fixed bottom-0">
      <div className="w-full flex justify-between align-middle absolute bottom-0">
        {tabs.map((tab, index) => (
          <a
            className="flex-1 pt-2 text-center p-0 m-0 rounded-none rounded-t-lg border-0 bg-black text-xl
             text-white h-12 capitalize"
            key={index}
            href={`/${tab}`}
          >
            {tab}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
