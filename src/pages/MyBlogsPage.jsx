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
  Text,
  Select,
} from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";
import articlesData from "../data/articles";
import FavoritesPage from "./FavoritesPage";
import BlogFilter from "../components/BlogFilter";
import BlogSort from "../components/BlogSort";
import loginData from "../data/loginData";
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
        <Heading fontFamily={"monospace"} size="xl">
          Hello{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#385898",
              fontStyle: "italic",
            }}
          >
            {loginData.username}
          </span>
          , let's
          <span>
            <Link>
              <Button
                fontFamily={"monospace"}
                fontSize={"2xl"}
                ml={4}
                mr={4}
                colorScheme="facebook"
                as={Link}
                to="/create-article"
              >
                CREATE!
              </Button>
            </Link>
          </span>
          a story!
        </Heading>

        <Box display="flex" alignItems="center" m={"left"}>
          {/* <Button
            size="md"
            variant="solid"
            colorScheme="facebook"
            mr={6}
            onClick={() => navigate("/create-article")}
          >
            Create Article
          </Button> */}
          {/* <Button as={Link} to="/profile" size="sm" variant="outline" mr={4}>
            Profile
          </Button> */}
          <Text fontFamily={"monospace"} fontSize={"2xl"} mr={4}>
            {loginData.username}{" "}
          </Text>
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
