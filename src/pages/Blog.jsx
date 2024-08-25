import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M13 4L20 11"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M14 22L22 22"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      d="M4.47461 6.10018L5.31543 18.1768C5.40886 19.3365 6.28178 21.5536 8.51889 21.8022C10.756 22.0507 15.2503 21.9951 16.0699 21.9951C16.8895 21.9951 19.0128 21.4136 19.0128 19.0059C19.0128 16.5756 16.9833 15.9419 15.7077 15.9635H12.0554M12.0554 15.9635C12.0607 15.7494 12.1515 15.5372 12.3278 15.3828L14.487 13.4924M12.0554 15.9635C12.0497 16.1919 12.1412 16.4224 12.33 16.5864L14.487 18.4609M19.4701 5.82422L19.0023 13.4792"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 5.49561H21M16.0555 5.49561L15.3729 4.08911C14.9194 3.15481 14.6926 2.68766 14.3015 2.39631C14.2148 2.33168 14.1229 2.2742 14.0268 2.22442C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23383C9.89791 2.28565 9.80479 2.34547 9.7171 2.41265C9.32145 2.7158 9.10044 3.20004 8.65842 4.16854L8.05273 5.49561"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

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
      d="M7.5 4.94531H16C16.8284 4.94531 17.5 5.61688 17.5 6.44531V7.94531"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15 12.9453H9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 16.9453H9"
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

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("authToken");
  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/blog/getAllPostsForUser/${userId}`)
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:8080/api/blog/deletePosts/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (postId) => {
    setEditPost(postId);
    const post = posts.find((p) => p.id === postId);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/blog/updatePosts/${editPost}`, {
        title,
        content,
      })
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post.id === editPost ? { ...post, title, content } : post
          )
        );
        setEditPost(null);
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Quick Blog Edits & Controls
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <div className="px-4 py-2 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <div className="flex gap-1">
                <FileIcon />
                <h2 className="text-xl font-bold text-gray-900">
                  {post.title}
                </h2>
              </div>
              <p className="text-gray-700 mt-2">{post?.content}</p>
              <p className="text-gray-500 text-sm mt-4">{post.date}</p>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button onClick={() => handleUpdate(post.id)}>
                  <EditIcon className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => handleDelete(post.id)}>
                  <DeleteIcon className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editPost && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-xl font-bold mb-4">Update Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
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
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="mt-2 bg-indigo-500 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-3xl text-sm font-medium text-white"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditPost(null)}
                  className="mt-2 border-2 border-indigo-500/100 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-3xl text-sm font-medium text-current"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
