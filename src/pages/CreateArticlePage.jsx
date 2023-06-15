import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import articlesData from "../data/articles";
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

function CreateArticlePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("technology");
  const [content, setContent] = useState("");
  const [videos, setVideos] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const toast = useToast();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleVideoAdd = (event) => {
    event.preventDefault();
    setVideos([...videos, ""]);
  };

  const handleVideoChange = (event, index) => {
    const newVideos = [...videos];
    newVideos[index] = event.target.value;
    setVideos(newVideos);
  };

  const handleKeywordAdd = (event) => {
    event.preventDefault();
    setKeywords([...keywords, ""]);
  };

  const handleKeywordChange = (event, index) => {
    const newKeywords = [...keywords];
    newKeywords[index] = event.target.value;
    setKeywords(newKeywords);
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
      id: String(Date.now()),
      title,
      author,
      date,
      image,
      category,
      content,
      videos: videos.filter((video) => video.trim() !== ""),
      keywords: keywords.filter((keyword) => keyword.trim() !== ""),
    };
    articlesData.push(newArticle);
    setIsCreated(true);
    toast({
      title: "Article created!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/"); // Navigate to home page after creating the article
  };

  return (
    <Box w={"80%"} m={"auto"} mb={10} mt={10} px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Create Article
      </Heading>
      <form onSubmit={handleCreateSubmit}>
        <FormControl id="title" mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </FormControl>
        <FormControl id="author" mb={4}>
          <FormLabel>Author</FormLabel>
          <Input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </FormControl>
        <FormControl id="date" mb={4}>
          <FormLabel>Publication Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </FormControl>
        <FormControl id="image" mb={4}>
          <FormLabel>Picture URL</FormLabel>
          <Input
            type="url"
            value={image}
            onChange={handleImageChange}
            required
          />
        </FormControl>
        <FormControl id="category" mb={4}>
          <FormLabel>Category</FormLabel>
          <Select value={category} onChange={handleCategoryChange} required>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="entertainment">Entertainment</option>
          </Select>
        </FormControl>
        <FormControl id="content" mb={4}>
          <FormLabel>News Content</FormLabel>
          <Textarea value={content} onChange={handleContentChange} required />
        </FormControl>
        <FormControl id="videos" mb={4}>
          <FormLabel>Videos</FormLabel>
          {videos.map((video, index) => (
            <Box key={index} mb={2}>
              <Input
                type="url"
                value={video}
                onChange={(event) => handleVideoChange(event, index)}
                required
              />
            </Box>
          ))}
          <Button size="sm" variant="outline" onClick={handleVideoAdd}>
            Add Video
          </Button>
        </FormControl>
        <FormControl id="keywords" mb={4}>
          <FormLabel>Keywords</FormLabel>
          {keywords.map((keyword, index) => (
            <Box key={index} mb={2}>
              <Input
                type="text"
                value={keyword}
                onChange={(event) => handleKeywordChange(event, index)}
                required
              />
            </Box>
          ))}
          <Button size="sm" variant="outline" onClick={handleKeywordAdd}>
            Add Keyword
          </Button>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          size="md"
          variant="solid"
        >
          Create Article
        </Button>
      </form>
    </Box>
  );
}

export default withAuth(CreateArticlePage);
