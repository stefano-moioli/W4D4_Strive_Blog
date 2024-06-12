import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Error from "./views/error/Error";
import Me from "./views/me/Me";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/auth/login" element={<Login /> } />
        <Route path="/auth/register" element={<Register/> } />
        <Route path="/me" element={<Me />} />
        <Route path="*" element={<Error /> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
