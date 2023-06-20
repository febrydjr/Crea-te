import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Text,
  useToast,
  Image,
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
      return null;
    }

    return <Component {...props} />;
  };
}

function CreateArticlePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("technology");
  const [content, setContent] = useState("");
  const [videos, setVideos] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
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

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      // Check if file size is within the limit (2MB)
      setThumbnail(file);
      setSelectedFileName(file.name);
      setThumbnailPreview(URL.createObjectURL(file)); // Create a preview URL for the thumbnail
    } else {
      // Handle file size exceeded error
      toast({
        title: "File size limit exceeded.",
        description: "Please upload a file up to 2MB in size.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleVideoAdd = (event) => {
    event.preventDefault();
    setVideos([...videos, ""]);
  };

  const handleVideoUpload = (event, index) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024 * 1024) {
      // Check if file size is within the limit (100MB)
      const newVideos = [...videos];
      newVideos[index] = URL.createObjectURL(file);
      setVideos(newVideos);
    } else {
      // Handle file size exceeded error
      toast({
        title: "File size limit exceeded.",
        description: "Please upload a file up to 100MB in size.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
      thumbnail: URL.createObjectURL(thumbnail),
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
    navigate("/");
  };

  return (
    <Box
      fontFamily={"monospace"}
      w={"80%"}
      m={"auto"}
      mb={10}
      mt={10}
      px={6}
      py={4}
    >
      <Heading fontFamily={"monospace"} as="h1" size="xl" mb={4}>
        Create Article
      </Heading>
      <form onSubmit={handleCreateSubmit}>
        <FormControl id="title" mb={4}>
          <FormLabel fontWeight={"bold"}>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </FormControl>
        <FormControl id="author" mb={4}>
          <FormLabel fontWeight={"bold"}>Author</FormLabel>
          <Input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </FormControl>
        <FormControl id="date" mb={4}>
          <FormLabel fontWeight={"bold"}>Publication Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </FormControl>
        <FormControl id="thumbnail" mb={4}>
          <FormLabel fontWeight="bold">Thumbnail</FormLabel>
          <Button
            as="label"
            htmlFor="thumbnailInput"
            size="sm"
            variant="outline"
            colorScheme="teal"
            cursor="pointer"
          >
            Upload
            <Input
              id="thumbnailInput"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleThumbnailChange}
              display="none"
              required
            />
          </Button>
          {thumbnailPreview && (
            <Box mt={2}>
              <Image src={thumbnailPreview} maxH="200px" />
            </Box>
          )}
        </FormControl>
        <FormControl id="category" mb={4}>
          <FormLabel fontWeight={"bold"}>Category</FormLabel>
          <Select value={category} onChange={handleCategoryChange} required>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="entertainment">Entertainment</option>
          </Select>
        </FormControl>
        <FormControl id="content" mb={4}>
          <FormLabel fontWeight={"bold"}>News Content</FormLabel>
          <div className="text-editor">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleContentChange}
              required
            />
          </div>
        </FormControl>
        <FormControl id="videos" mb={4}>
          <FormLabel fontWeight={"bold"}>Videos</FormLabel>
          {videos.map((video, index) => (
            <Box key={index} mb={2}>
              {video ? (
                <video src={video} controls width={300} height={200} />
              ) : (
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(event) => handleVideoUpload(event, index)}
                  required
                />
              )}
            </Box>
          ))}
          <Button size="sm" variant="outline" onClick={handleVideoAdd}>
            Add Video
          </Button>
        </FormControl>
        <FormControl id="keywords" mb={4}>
          <FormLabel fontWeight={"bold"}>Keywords</FormLabel>
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
