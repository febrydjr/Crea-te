import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";

function MyBlogPage({ isAuthenticated, isVerified }) {
  const [createdArticles, setCreatedArticles] = useState([]);
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Implement your fetch created articles logic here
    setCreatedArticles([
      {
        id: 1,
        title: "My First Created Article",
        content: "This is the content of my first created article.",
        author: "John Doe",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z",
      },
      {
        id: 2,
        title: "My Second Created Article",
        content: "This is the content of my second created article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
    ]);
    // Implement your fetch favorite articles logic here
    setFavoriteArticles([
      {
        id: 3,
        title: "My First Favorite Article",
        content: "This is the content of my first favorite article.",
        author: "Jane Smith",
        createdAt: "2022-01-03T00:00:00Z",
        updatedAt: "2022-01-03T00:00:00Z",
      },
    ]);
  }, []);

  const handleToggleFavorite = (articleId) => {
    // Implement your toggle favorite logic here
    toast({
      title: "Favorite toggled successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (!isAuthenticated || !isVerified) {
    return <Navigate to="/login" />;
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        My Blog
      </Heading>
      <Box>
        <Heading as="h2" size="lg" mb={2}>
          Created Articles
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4} mb={4}>
          {createdArticles?.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={false}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Box>
        <Heading as="h2" size="lg" mb={2}>
          Favorite Articles
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          {favoriteArticles?.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={true}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default MyBlogPage;
