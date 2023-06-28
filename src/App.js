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
import MyBlogsPage from "./pages/MyBlogsPage";
import FavoritesPage from "./pages/FavoritesPage";
import BlogFilter from "./components/BlogFilter";
import Footer from "./components/Footer";
import CheckLogin from "./pages/CheckLogin";
import TestProfile from "./pages/SidebarProfile";
import SearchResults from "./pages/SearchResults";
// import VerificationPage from "./pages/VerifyPage";
import VerificationPage from "./pages/VerificationPage";
import VerificationEmail from "./pages/VerificationEmail";
import SidebarProfile from "./pages/SidebarProfile";

function App() {
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);

  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<SidebarProfile />} />
        {/* <Route path="/updateprofile" element={<ProfilePage />} /> */}
        <Route path="/myblogs" element={<MyBlogsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route
          path="/verification-change-email/:token"
          element={<VerificationEmail />}
        />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
