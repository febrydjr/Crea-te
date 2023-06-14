import { useState, useEffect } from "react";
import { Box, Heading, Text, Button, useToast } from "@chakra-ui/react";

function BlogDetailPage({ match }) {
  const [article, setArticle] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Implement your fetch article logic here
    const articleId = parseInt(match.params.id);
    setArticle({
      id: articleId,
      title: `My Article ${articleId}`,
      content: `This is the content of my article ${articleId}.`,
      author: "John Doe",
      createdAt: "2022-01-01T00:00:00Z",
      updatedAt: "2022-01-01T00:00:00Z",
    });
    // Implement your fetch favorite status logic here
    setIsFavorite(false);
  }, [match.params.id]);

  const handleToggleFavorite = () => {
    // Implement your toggle favorite logic here
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

export default BlogDetailPage;
