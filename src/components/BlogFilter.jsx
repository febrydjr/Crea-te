import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Image,
  Select,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import articlesData from "../data/articles";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const BlogFilter = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog"
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  // const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(filter.toLowerCase()) ||
        article.category.toLowerCase().includes(filter.toLowerCase()) ||
        article.author.toLowerCase().includes(filter.toLowerCase()) ||
        (article.keywords &&
          article.keywords.toLowerCase().includes(filter.toLowerCase()))
    )
    .filter(
      (article) =>
        category === "" ||
        article.category.toLowerCase() === category.toLowerCase()
    );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "title-az") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "title-za") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <Box fontFamily={"monospace"}>
      <FormControl mb={4}>
        <FormLabel>Search</FormLabel>
        <Input
          placeholder="Search title, author, keyowords, etc"
          type="text"
          value={filter}
          onChange={handleFilterChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Category</FormLabel>
        <Select value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {Array.from(new Set(articles.map((article) => article.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Sort By</FormLabel>
        <Select mb={4} value={sortBy} onChange={handleSortByChange}>
          <option value="">None</option>
          <option value="newest">Date Newest-Oldest</option>
          <option value="oldest">Date Oldest-Newest</option>
          <option value="title-az">Title A-Z</option>
          <option value="title-za">Title Z-A</option>
        </Select>
      </FormControl>
      <SimpleGrid mb={4} columns={[2, null, 3]} spacing={4}>
        {sortedArticles.map((article) => (
          <Box
            // bgImage={"https://picsum.photos/700/300?random" + article.id}
            bgImage={
              "https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg"
            }
            key={article.id}
            border={"1px solid lightgray"}
            borderWidth="1px"
            p={4}
          >
            <Text fontSize={"lg"} mb={2} fontWeight="bold">
              {article.title}
            </Text>
            <Image
              src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
              alt={article.title}
            />
            {/* <Box fontWeight="bold" mt={2}>
              {article.title}
            </Box> */}
            <Box>{article.category}</Box>
            <Box>{article.author}</Box>
            <Box>{article.date}</Box>
            <Box fontSize={"md"} mt={2}>
              {article.content.slice(0, 200)}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      {/* <Button
        size="sm"
        variant="solid"
        colorScheme="teal"
        mr={2}
        onClick={() => navigate("/create-article")}
      >
        Create Article
      </Button> */}
    </Box>
  );
};

export default BlogFilter;
