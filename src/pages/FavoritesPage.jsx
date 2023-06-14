import { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";

function FavoritesPage() {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Implement your fetch favorite articles logic here
    setFavoriteArticles([
      {
        id: 1,
        title: "My First Favorite Article",
        content: "This is the content of my first favorite article.",
        author: "John Doe",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z",
      },
      {
        id: 2,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 3,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 4,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 5,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 6,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 7,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 8,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 9,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
      },
      {
        id: 10,
        title: "My Second Favorite Article",
        content: "This is the content of my second favorite article.",
        author: "John Doe",
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
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

  return (
    <Box px={6} py={4}>
      <Heading
        borderRadius={"6px"}
        padding={3}
        background={"#DDE6ED"}
        as="h1"
        size="xl"
        mb={4}
      >
        Terbaru
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
  );
}

export default FavoritesPage;
