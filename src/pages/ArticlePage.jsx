import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  useToast,
  InputRightElement,
} from "@chakra-ui/react";
import articlesData from "../data/articles";

function ArticlePage() {
  const { articleId } = useParams();
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

  const article = articlesData.find((article) => article.id === articleId);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //PAKE USE EFFECT INI
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!isAuthenticated);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      toast({
        title: `Searching for articles with "${searchQuery}"`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      setSearchQuery("");
    }
  };

  const filteredArticles = articlesData.filter((article) => {
    if (filterBy === "all" || article.category === filterBy) {
      if (searchQuery.trim() === "") {
        return true;
      } else {
        return (
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    } else {
      return false;
    }
  });

  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <Box px={6} py={4}>
      <Box mb={6}>
        <Heading as="h1" size="xl">
          {article.title}
        </Heading>
        <Text fontSize="lg" color="gray.500" mb={2}>
          By {article.author} on {new Date(article.date).toLocaleDateString()}
        </Text>
        <Image src={article.image} alt={article.title} mb={4} />
        <Text fontSize="xl" mb={6}>
          {article.content}
        </Text>
        {article.videos?.map((video) => (
          <Box key={video} mb={4}>
            <iframe
              width="100%"
              height="400"
              src={video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        ))}
      </Box>
      <Box mb={6}>
        <Heading as="h2" size="lg" mb={2}>
          Related Articles
        </Heading>
        <Flex wrap="wrap">
          {sortedArticles?.map((article) => (
            <Box
              key={article.id}
              width={{ base: "100%", md: "50%", lg: "33.33%" }}
              mb={4}
            >
              <Image src={article.image} alt={article.title} mb={2} />
              <Heading as="h3" size="md" mb={2}>
                {article.title}
              </Heading>
              <Text fontSize="sm" color="gray.500" mb={2}>
                By {article.author} on{" "}
                {new Date(article.date).toLocaleDateString()}
              </Text>
              <Button
                as="a"
                href={`/articles/${article.id}`}
                size="sm"
                variant="outline"
                mb={2}
              >
                Read More
              </Button>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box mb={6}>
        <Heading as="h2" size="lg" mb={2}>
          Filter and Sort Articles
        </Heading>
        <Flex wrap="wrap">
          <Box
            width={{ base: "100%", md: "50%" }}
            mr={{ md: 4 }}
            mb={{ base: 4, md: 0 }}
          >
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<i className="fas fa-search"></i>}
              />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <InputRightElement>
                <Button size="sm" onClick={handleSearchSubmit}>
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box width={{ base: "100%", md: "50%" }}>
            <Select
              size="md"
              value={sortBy}
              onChange={handleSortChange}
              mb={{ base: 4, md: 0 }}
              mr={{ md: 4 }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </Select>
            <Select size="md" value={filterBy} onChange={handleFilterChange}>
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="sports">Sports</option>
              <option value="politics">Politics</option>
              <option value="entertainment">Entertainment</option>
            </Select>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default ArticlePage;
