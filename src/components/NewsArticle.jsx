import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  Avatar,
  Image,
  Input,
  Select,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const NewsArticle = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");

  const fetchData = async () => {
    try {
      const url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedCategory}&sort=${sortOrder}&page=1`;
      const response = await axios.get(url);
      console.log(response.data);
      setArticles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, sortOrder]);

  const handleNextPage = () => {
    const totalPages = Math.ceil(articles.length / 3);
    if (activePage < totalPages && activePage < 3)
      setActivePage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const renderArticleIndex = (index) => {
    return (
      <Button
        key={index}
        onClick={() => setActivePage(index)}
        colorScheme={activePage === index ? "facebook" : "gray"}
        ml={1}
        mr={1}
        size="md"
      >
        {index}
      </Button>
    );
  };

  const renderArticleIndexes = () => {
    const totalPages = Math.ceil(articles.length / 3);
    const indexes = [];
    for (let i = 1; i <= totalPages; i++) {
      indexes.push(renderArticleIndex(i));
    }
    return indexes;
  };

  const filteredArticles = articles.filter((article) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseTitle = article.title.toLowerCase();
    const lowerCaseAuthor = article.User.username.toLowerCase();
    const lowerCaseCategory = article.Category.name.toLowerCase();

    return (
      lowerCaseTitle.includes(lowerCaseSearchTerm) ||
      lowerCaseAuthor.includes(lowerCaseSearchTerm) ||
      lowerCaseCategory.includes(lowerCaseSearchTerm)
    );
  });

  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sortOrder === "ASC") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "DESC") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "createdAt_ASC") {
      return a.createdAt.localeCompare(b.createdAt);
    } else if (sortOrder === "createdAt_DESC") {
      return b.createdAt.localeCompare(a.createdAt);
    }
  });

  return (
    <Box bg={"#E8EDE7"} fontFamily="monospace" mt={2} mb={6}>
      <Box mb={6}>
        <Input
          bg={"white"}
          placeholder=" Search"
          value={searchTerm}
          onChange={handleSearch}
          size="md"
          borderRadius="md"
          border="2px solid gray"
          px={2}
          py={1}
          mr={2}
        />
        <Select
          bg={"white"}
          // placeholder="All Category"
          value={selectedCategory}
          onChange={handleCategoryFilter}
          size="md"
          borderRadius="md"
          border="2px solid gray"
          // px={1}
          py={0.5}
          mr={2}
        >
          <option value="">All Categories</option>
          <option value="1">Bisnis</option>
          <option value="2">Ekonomi</option>
          <option value="3">Teknologi</option>
          <option value="4">Olahraga</option>
          <option value="5">Kuliner</option>
          <option value="6">Internasional</option>
          <option value="7">Fiksi</option>
        </Select>
        <Select
          bg={"white"}
          // placeholder="Sort Order"
          value={sortOrder}
          onChange={handleSortOrder}
          border="2px solid gray"
          // ml={2}
        >
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
          <option value="createdAt_ASC">Oldest First</option>
          <option value="createdAt_DESC">Newest First</option>
        </Select>
      </Box>
      <Swiper spaceBetween={30} slidesPerView={3}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {sortedArticles
            .slice((activePage - 1) * 3, activePage * 3)
            .map((article) => (
              <SwiperSlide key={article.id}>
                <Box
                  p={4}
                  boxShadow="md"
                  borderRadius="md"
                  bg="white"
                  border="2px solid gray"
                  height="100%"
                >
                  <Link to={`/articles/${article.Blog_Keywords[0].BlogId}`}>
                    <Image
                      src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                      alt={article.id}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Heading
                        fontFamily="monospace"
                        as="h3"
                        fontSize="xl"
                        // my={4}
                        mt={4}
                      >
                        {article.title}
                      </Heading>
                      <Box display="flex" justifyContent="space-between">
                        <Text display="flex" alignItems="center">
                          Created At:{" "}
                          {new Date(article.createdAt).toLocaleDateString()}
                        </Text>
                        <Text display="flex" alignItems="center">
                          {article.User.username} &nbsp;
                          <Avatar
                            name={article.User.username}
                            src={article.User.imgProfile}
                            size="sm"
                            borderRadius="full"
                          />
                        </Text>
                      </Box>
                      <Text>Category: {article.Category.name}</Text>
                    </Box>
                    <Text noOfLines={4} fontSize="md" mt={4}>
                      {article.content}
                    </Text>
                    <Button
                      display="flex"
                      justifyContent="space-between"
                      fontFamily="monospace"
                      mt={4}
                      size="sm"
                      colorScheme="facebook"
                      rightIcon={<ArrowForwardIcon />}
                      variant="solid"
                    >
                      Read More
                    </Button>
                  </Link>
                </Box>
              </SwiperSlide>
            ))}
        </Grid>
      </Swiper>
      <Box display="flex" justifyContent="center" mt={8}>
        <Button
          mr={4}
          colorScheme="facebook"
          onClick={handlePrevPage}
          disabled={activePage === 1}
        >
          <ArrowBackIcon />
        </Button>
        {renderArticleIndexes()}
        <Button
          ml={4}
          colorScheme="facebook"
          onClick={handleNextPage}
          disabled={activePage === Math.ceil(sortedArticles.length / 3)}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default NewsArticle;
