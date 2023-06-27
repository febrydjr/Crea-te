import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
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
import ArticleCard from "../components/ArticleCard";
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
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        const { username: fetchedUsername, avatar: fetchedAvatar } =
          response.data;
        setUsername(fetchedUsername);
        setAvatar(fetchedAvatar);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
            {username}
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
            {username}
          </Text>
          <Link as={RouterLink} to="/profile">
            <Avatar
              name="User"
              src={avatar}
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
