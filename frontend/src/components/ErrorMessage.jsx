import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="p-2">
      <p className="p-2 bg-red-50 text-red-400 rounded-md capitalize">{error}</p>
    </div>
  );
};

export default ErrorMessage;
