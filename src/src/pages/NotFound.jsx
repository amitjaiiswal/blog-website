import React from "react";
import noPage from '../assets/noPage.svg'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <img
        src={noPage}
        alt="404 - Page Not Found"
        className="max-w-xs mx-auto"
      />
    </div>
  );
};

export default NotFound;
