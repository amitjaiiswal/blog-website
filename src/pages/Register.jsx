import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import joinNow from "../assets/joinnow.svg";
import Snackbar from "../snakeBar/Snackbar";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Name, email and password cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/posts/register",
        {
          name,
          email,
          password,
        }
      );
      setSuccessMessage(response.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-14">
      {/* Left Side - Register Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 md:w-1/2 max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Join Us Today
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <img
          src={joinNow}
          alt="joinNow illustration"
          className="max-w-full max-h-screen object-contain w-2/4"
        />
      </div>

      {/* Snackbars */}
      {errorMessage && (
        <Snackbar
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage("")}
        />
      )}
      {successMessage && (
        <Snackbar
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage("")}
        />
      )}
    </div>
  );
};

export default Register;
