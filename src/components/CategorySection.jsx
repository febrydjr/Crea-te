import { Box, Image, Heading, Text } from "@chakra-ui/react";

function CategorySection({ title, articles, category }) {
  const categoryArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <Box>
      <Heading as="h3" size="lg" mb={4}>
        {title}
      </Heading>
      {categoryArticles.map((article) => (
        <Box key={article.id} bg="gray.100" p={4} mb={4} borderRadius="md">
          <Image src={article.thumbnail} alt={article.title} mb={4} />

          <Heading as="h4" size="md" mb={2}>
            {article.title}
          </Heading>
          <Text color="gray.600" mb={2}>
            Author: {article.author}
          </Text>
          <Text>{article.content}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default CategorySection;
