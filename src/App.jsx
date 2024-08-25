import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBlog from "./pages/AddBlog";
import MyBlog from "./pages/Blog";

const isLoggedIn = () => {
  return localStorage.getItem("authToken") !== null;
};
  
const PrivateRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 main-div">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-blog" element={<PrivateRoute element={<AddBlog />} />} />
            <Route path="/my-blog" element={<PrivateRoute element={<MyBlog />} />} />
          </Routes>
        </div>
        <Footer className="footer" />
      </div>
    </Router>
  );
}

export default App;
