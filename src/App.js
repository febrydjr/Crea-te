import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ArticlePage from "./pages/ArticlePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import PopularArticlesPage from "./pages/PopularArticlesPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
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
        <Route path="/articles/popular" element={<PopularArticlesPage />} />
        <Route
          path="/articles/:id"
          element={<ArticlePage articles={articles} />}
        />
        <Route path="/create-article" element={<CreateArticlePage />} />

        <Route path="/checklogin" element={<CheckLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/profile-picture-upload"
          element={<ProfilePictureUpload />}
        />
        <Route path="/my-blogs" element={<MyBlogsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage blogs={blogs} />} />
      </Routes>
      {/* <BlogFilter blogs={blogs} setBlogs={setBlogs} />
      <BlogSort blogs={blogs} setBlogs={setBlogs} /> */}
      <Footer />
    </ChakraProvider>
  );
}

export default App;
