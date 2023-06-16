import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  SimpleGrid,
  useToast,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Select,
} from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";
import articlesData from "../data/articles";
import FavoritesPage from "./FavoritesPage";
import BlogFilter from "../components/BlogFilter";
import BlogSort from "../components/BlogSort";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null; // or any other placeholder while checking authentication
    }

    return <Component {...props} />;
  };
}

function MyBlogPage() {
  const navigate = useNavigate();

  return (
    <Box px={6} py={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Heading as="h1" size="xl">
          My Blog
        </Heading>
        <Box display="flex" alignItems="center">
          <Button
            size="md"
            variant="solid"
            colorScheme="facebook"
            mr={6}
            onClick={() => navigate("/create-article")}
          >
            Create Article
          </Button>
          {/* <Button as={Link} to="/profile" size="sm" variant="outline" mr={4}>
            Profile
          </Button> */}
          <Link as={RouterLink} to="/profile">
            <Avatar
              name="User"
              src="path/to/profile-picture"
              size="lg"
              // mb={2}
            />
          </Link>
        </Box>
      </Box>
      <BlogFilter />
    </Box>
  );
}

export default withAuth(MyBlogPage);
