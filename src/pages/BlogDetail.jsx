import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "../snakeBar/Snackbar";
import { jwtDecode } from "jwt-decode";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [blogComment, setBlogComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  const token = localStorage.getItem("authToken");
  const userId = token ? jwtDecode(token).id : null;

  const getComment = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://blogbackend-hre7.onrender.com/api/comment/getAllBlogsForUserForComment/${id}`
      );
      setPost(res.data.data);
      setComments(res.data.data[0].comments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const blog = post.length > 0 ? post[0] : null;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage("Please log in to add a comment.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    if (!blogComment.trim()) {
      setErrorMessage("Comment cannot be empty");
      return;
    }

    setLoadingComment(true);
    try {
      const response = await axios.post(
        `https://blogbackend-hre7.onrender.com/api/comment/createComments`,
        {
          comments: blogComment,
          userId,
          blogId: id,
        }
      );
      setBlogComment("");
      await getComment();
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    getComment();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
      <div className="px-4 py-6 sm:px-0">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">{blog?.title}</h1>
            <p className="text-gray-700 mt-4">{blog?.content}</p>
          </>
        )}

        {/* Comments section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
          {comments
            .filter((comment) => comment.userId !== null)
            .map((comment, index) => (
              <div key={index} className="mt-4">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <p className="text-gray-700">{comment?.comment}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    by {comment?.name}, {formatDate(comment?.created_at)}
                  </p>
                </div>
              </div>
            ))}
          <form className="mt-4" onSubmit={handleComment}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Add a comment..."
              value={blogComment}
              onChange={(e) => setBlogComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-3xl text-sm font-medium text-white flex items-center justify-center"
              disabled={loadingComment}
            >
              {loadingComment ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin mr-2"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
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

export default BlogDetail;
