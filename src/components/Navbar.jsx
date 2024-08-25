import React from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "border-indigo-500 text-gray-900"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  };

  const token = localStorage.getItem("authToken");
  const userId = token ? jwtDecode(token).id : null;

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800 mt-4">Blog</h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${getActiveClass(
                  "/"
                )}`}
              >
                Home
              </Link>
              {userId ? (
                <>
                  <Link
                    to="/my-blog"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${getActiveClass(
                      "/my-blog"
                    )}`}
                  >
                    My Blog
                  </Link>
                  <Link
                    to="/add-blog"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${getActiveClass(
                      "/add-blog"
                    )}`}
                  >
                    Add Blog
                  </Link>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {!userId ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className={`loginbg border px-3 py-2 rounded-3xl text-sm font-medium ${getActiveClass(
                  "/login"
                )}`}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className={`joinbg  hover:text-white px-3 py-2 rounded-3xl text-sm font-medium text-white ${getActiveClass(
                  "/register"
                )}`}
              >
                Join Now
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSignOut}
                className={`joinbg hover:text-white px-3 py-2 rounded-3xl text-sm font-medium text-white`}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
