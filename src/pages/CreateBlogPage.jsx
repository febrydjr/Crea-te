import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

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
function CreateBlogPage({ isAuthenticated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCreateBlogSubmit = (event) => {
    event.preventDefault();
    // Implement your create blog logic here
    setIsSuccess(true);
    toast({
      title: "Blog created successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isSuccess) {
    return (
      <Box px={6} py={4}>
        <Heading as="h1" size="xl" mb={4}>
          Blog Created Successfully!
        </Heading>
        <p>Your blog has been created successfully.</p>
      </Box>
    );
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Create Blog
      </Heading>
      <Box as="form" onSubmit={handleCreateBlogSubmit}>
        <FormControl id="title" mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </FormControl>
        <FormControl id="content" mb={4}>
          <FormLabel>Content</FormLabel>
          <Text value={content} onChange={handleContentChange} required />
        </FormControl>
        <Button type="submit" size="sm" variant="outline">
          Create Blog
        </Button>
      </Box>
    </Box>
  );
}

export default CreateBlogPage;
