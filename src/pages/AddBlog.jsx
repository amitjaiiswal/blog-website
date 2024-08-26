import React, { useState } from "react";
import axios from "axios";
import Snackbar from "../snakeBar/Snackbar";
import addPost from "../assets/addPost.svg";
import {jwtDecode} from "jwt-decode"; 

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");
  const userId = token ? jwtDecode(token).id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setErrorMessage("Title and content cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://blogbackend-hre7.onrender.com/api/blog/createPosts`,
        {
          title,
          content,
          userId,
        }
      );
      console.log(response);
      setSuccessMessage(response.data.message);
      setContent("");
      setTitle("");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        console.log(error);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 md:w-1/2 max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add New Blog Post
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading} // Disable input during loading
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                rows="6"
                disabled={loading}
              />
            </div>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading} 
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin mr-2"></div>
                ) : (
                  "Add blog"
                )}
              </button>
            {/* <button
              type="submit"
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
              }`}
              disabled={loading} 
            >
              {loading ? "Submitting..." : "Submit"}
            </button> */}
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <img
          src={addPost}
          alt="addPost illustration"
          className="max-w-full max-h-screen object-contain w-[500px]"
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

export default AddBlog;
