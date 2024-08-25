import React, { useEffect, useState } from "react";

const Snackbar = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Show Snackbar
    const alertTime = setTimeout(() => {
      setIsVisible(false); // Hide Snackbar after 2 seconds
      setTimeout(onClose, 300); // Delay calling onClose to allow fade-out
    }, 2000);

    return () => {
      clearTimeout(alertTime);
    };
  }, [onClose]);

  const getSnackbarStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#ffffff"
            fill="none"
          >
            <path
              d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 12.5L10.5 15L16 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#ffffff"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M11.992 15H12.001"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12L12 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg flex items-center ${getSnackbarStyles()} ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      } transition-all duration-300`}
      role="alert"
    >
      <div className="flex items-center">
        <div className="mr-3">{getIcon()}</div>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-opacity-50 hover:bg-opacity-75"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
