import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the articles from the articlesData
    setArticles(articlesData);
  }, []);

  useEffect(() => {
    // Filter articles based on category and author
    let filtered = articles;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (article) => article.category === categoryFilter
      );
    }

    if (authorFilter) {
      filtered = filtered.filter((article) =>
        article.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, categoryFilter, authorFilter]);

  useEffect(() => {
    // Sort articles based on sortBy option
    const sorted = [...filteredArticles];

    if (sortBy === "createdAt") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "updatedAt") {
      sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    setFilteredArticles(sorted);
  }, [filteredArticles, sortBy]);

  const handleToggleFavorite = (articleId) => {
    // Implement your toggle favorite logic here
    toast({
      title: "Favorite toggled successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSearch = () => {
    // Filter articles based on search query
    const searched = articles.filter((article) => {
      const titleMatch = article.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const authorMatch = article.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return titleMatch || authorMatch;
    });

    setFilteredArticles(searched);
  };

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
            size="sm"
            variant="solid"
            colorScheme="teal"
            mr={2}
            onClick={() => navigate("/create-article")}
          >
            Create Article
          </Button>
          <Button as={Link} to="/profile" size="sm" variant="outline" mr={2}>
            Profile
          </Button>
          <Button
            size="sm"
            variant="outline"
            mr={2}
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </Button>
          <Button
            size="sm"
            variant="outline"
            mr={2}
            onClick={() => navigate("/reset-password")}
          >
            Reset Password
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/verify")}
          >
            Verify
          </Button>
          <Avatar name="User" src="path/to/profile-picture" size="md" ml={2} />
        </Box>
      </Box>

      <Box mb={4}>
        <InputGroup>
          <Input
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button ml={2} size="md" variant="outline" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </Box>

      <Box mb={4}>
        <FormControl id="category-filter" mb={2}>
          <FormLabel>Filter by Category</FormLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="entertainment">Entertainment</option>
          </Select>
        </FormControl>

        <FormControl id="author-filter">
          <FormLabel>Filter by Author</FormLabel>
          <Input
            placeholder="Enter author name"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          />
        </FormControl>
      </Box>

      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4} mb={4}>
        {filteredArticles?.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={false}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default withAuth(MyBlogPage);
