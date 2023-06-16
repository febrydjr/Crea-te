import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import articlesData from "../data/articles";
// import { useNavigate } from "react-router-dom";

const BlogFilter = () => {
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

  const filteredArticles = articlesData
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
    <Box>
      <FormControl mb={4}>
        <FormLabel>Filter</FormLabel>
        <Input type="text" value={filter} onChange={handleFilterChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Category</FormLabel>
        <Select value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {Array.from(
            new Set(articlesData.map((article) => article.category))
          ).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
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
            key={article.id}
            border={"1px solid lightgray"}
            borderWidth="1px"
            p={4}
          >
            <Text mb={2} fontWeight="bold">
              {article.title}
            </Text>
            {/* <img src={article.thumbnail} alt={article.title} /> */}
            {/* <Box fontWeight="bold" mt={2}>
              {article.title}
            </Box> */}
            <Box>{article.category}</Box>
            <Box>{article.author}</Box>
            <Box>{article.date}</Box>
            <Box mt={2}>{article.content.slice(0, 200)}</Box>
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
