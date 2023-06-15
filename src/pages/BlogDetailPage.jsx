import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, useToast } from "@chakra-ui/react";

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

function BlogDetailPage({ match }) {
  const [article, setArticle] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the article and set the initial state
    const articleId = parseInt(match.params.id);
    setArticle({
      id: articleId,
      title: `My Article ${articleId}`,
      content: `This is the content of my article ${articleId}.`,
      author: "John Doe",
      createdAt: "2022-01-01T00:00:00Z",
      updatedAt: "2022-01-01T00:00:00Z",
    });

    // Fetch the favorite status
    setIsFavorite(false);
  }, [match.params.id]);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: `Article ${article.id} ${
        isFavorite ? "unfavorited" : "favorited"
      } successfully!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (!article) {
    return (
      <Box px={6} py={4}>
        <Heading as="h1" size="xl" mb={4}>
          Loading...
        </Heading>
      </Box>
    );
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        {article.title}
      </Heading>
      <Text mb={4}>
        By {article.author} on{" "}
        {new Date(article.createdAt).toLocaleDateString()}
      </Text>
      <Box dangerouslySetInnerHTML={{ __html: article.content }} mb={4} />
      <Button size="sm" variant="outline" onClick={handleToggleFavorite}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </Button>
    </Box>
  );
}

export default withAuth(BlogDetailPage);
