import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ArticlePage from "./pages/ArticlePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import PopularArticlesPage from "./pages/PopularArticlesPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerificationPage";
import LoginPage from "./pages/LoginPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import ProfilePictureUpload from "./components/ProfilePictureUpload";
import MyBlogsPage from "./pages/MyBlogsPage";
import FavoritesPage from "./pages/FavoritesPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogFilter from "./components/BlogFilter";
import BlogSort from "./components/BlogSort";
import Footer from "./components/Footer";
import CheckLogin from "./pages/CheckLogin";
import TestProfile from "./pages/TestProfile";
import SearchResults from "./pages/SearchResults";
// import VerificationPage from "./pages/VerifyPage";
import VerificationPage from "./pages/VerificationPage";

function App() {
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Fetch all articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  // Fetch all blogs on component mount
  useEffect(() => {
    fetch("/api/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<LandingPage articles={articles} blogs={blogs} />}
        />
        <Route
          path="/articles/:id"
          element={<ArticlePage articles={articles} />}
        />
        <Route path="/articles/popular" element={<PopularArticlesPage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/checklogin" element={<CheckLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<TestProfile />} />
        <Route path="/updateprofile" element={<ProfilePage />} />
        <Route
          path="/profile-picture-upload"
          element={<ProfilePictureUpload />}
        />
        <Route path="/myblogs" element={<MyBlogsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage blogs={blogs} />} />
        {/* <Route path="/verification/:token" element={<VerifyPage />} /> */}
        <Route path="/verification/:token" element={<VerificationPage />} />
        {/* <Route path="/verification/:token" component={VerificationPage} /> */}
      </Routes>
      {/* <BlogFilter blogs={blogs} setBlogs={setBlogs} />
      <BlogSort blogs={blogs} setBlogs={setBlogs} /> */}
      <Footer />
    </ChakraProvider>
  );
}

export default App;
