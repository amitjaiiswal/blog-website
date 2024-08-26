import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blog from "../assets/blog.svg";
import notFound from "../assets/notFound.svg";

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M7.50586 4.94531H16.0059C16.8343 4.94531 17.5059 5.61688 17.5059 6.44531V7.94531"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.0059 17.9453L14.1488 15.9453M14.1488 15.9453L12.5983 12.3277C12.4992 12.0962 12.2653 11.9453 12.0059 11.9453C11.7465 11.9453 11.5126 12.0962 11.4135 12.3277L9.863 15.9453M14.1488 15.9453H9.863M9.00586 17.9453L9.863 15.9453"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.497 2L6.30767 2.00002C5.81071 2.00002 5.30241 2.07294 4.9007 2.36782C3.62698 3.30279 2.64539 5.38801 4.62764 7.2706C5.18421 7.7992 5.96217 7.99082 6.72692 7.99082H18.2835C19.077 7.99082 20.5 8.10439 20.5 10.5273V17.9812C20.5 20.2007 18.7103 22 16.5026 22H7.47246C5.26886 22 3.66619 20.4426 3.53959 18.0713L3.5061 5.16638"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://blogbackend-hre7.onrender.com/api/blog/getAllPosts`)
      .then((res) => {
        setAllPosts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const filteredPosts = allPosts?.filter(
    (post) =>
      post?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      post?.created_by?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const postsToDisplay = searchTerm ? filteredPosts : allPosts;

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16 flex items-center justify-center">
        <div className=" flex-col mt-20">
          <h1 className="text-4xl font-extrabold text-gray-900 max-w-md mb-6">
            Discover Our Latest Blog Posts
          </h1>

          <Link
            to="/login"
            className={`joinbg hover:text-white px-4 py-3 rounded-3xl text-sm font-medium text-white }`}
          >
            Get Started
          </Link>
        </div>
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src={blog}
            alt="blog illustration"
            className="max-w-full max-h-screen object-contain w-3/4 mt-20"
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
        <div className="px-4 py-2 sm:px-0">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postsToDisplay?.length > 0 ? (
              postsToDisplay.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <div className="flex gap-1">
                    <FileIcon />
                    <h2 className="text-xl font-bold text-gray-900">
                      {post.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 mt-2">{post.content}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {post.created_by}, {formatDate(post.created_at)}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 mt-2 block"
                  >
                    Read more
                  </Link>
                </div>
              ))
            ) : (
              // <div className="flex items-center justify-center">
              //   <img
              //     src={notFound}
              //     alt="notFound illustration"
              //     className="max-w-full max-h-screen object-contain w-3/4"
              //   />
              // </div>
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
