import React from "react";
import contactUs from '../assets/contact_us.svg'
import { Link, useLocation } from "react-router-dom";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    color="#ffffff"
    fill="none"
  >
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M17.5078 6.5L17.4988 6.5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    color="#ffffff"
    fill="none"
  >
    <path
      d="M7 10V17"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11 13V17M11 13C11 11.3431 12.3431 10 14 10C15.6569 10 17 11.3431 17 13V17M11 13V10"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.00801 7L6.99902 7"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
);

const Footer = () => {
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "border-indigo-500 text-white-900"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  };

  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
        <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-lg font-bold mb-2">Contact Us</h2>
            <p className="text-sm mb-1">Amit Jaiswal</p>
            <p className="text-sm mb-1">Bhilwara, Rajasthan, 311001</p>
            <p className="text-sm">Phone: (+91) 9887011098</p>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-lg font-bold mb-2">Links</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`inline-flex items-center text-sm font-medium ${getActiveClass(
                    "/"
                  )}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/my-blog"
                  className={`inline-flex items-center text-sm font-medium ${getActiveClass(
                    "/my-blog"
                  )}`}
                >
                  My Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/add-blog"
                  className={`inline-flex items-center text-sm font-medium ${getActiveClass(
                    "/add-blog"
                  )}`}
                >
                  Add Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`inline-flex items-center text-sm font-medium ${getActiveClass(
                    "/login"
                  )}`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`inline-flex items-center text-sm font-medium ${getActiveClass(
                    "/register"
                  )}`}
                >
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-lg font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4 items-center">
              <a
                href="https://www.instagram.com/themoodytone/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 flex items-center gap-1"
              >
                <InstagramIcon />
                <span className="text-gray-400 hover:text-gray-200">
                  Instagram
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/amitjaiswal2022/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 flex items-center gap-1"
              >
                <LinkedinIcon />
                <span className="text-gray-400 hover:text-gray-200">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2024 Blog | By Amit Jaiswal | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
