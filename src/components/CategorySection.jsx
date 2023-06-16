import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import articlesData from "../data/articles";

function CategorySection({ title, articles, category }) {
  // const id = articlesData.id;
  const categoryArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <Box>
      <Heading as="h3" size="lg" mb={4}>
        {title}
      </Heading>
      {categoryArticles.map((article) => (
        <Box
          key={article.id}
          bg="gray.100"
          border="2px"
          borderColor="gray.900"
          p={4}
          // mb={4}
          borderRadius="md"
        >
          <Image src={article.thumbnail} alt={article.title} mb={4} />

          <Heading as="h4" size="md" mb={2}>
            {article.title}
          </Heading>
          <Text color="gray.600" mb={2}>
            Author: {article.author} <br />
            {article.date}
          </Text>
          <Text></Text>
          <Text>{article.content.slice(0, 200)}</Text>
          <Link style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to={`/articles/${article.id}`}>
              <Button
                mt={4}
                size={"sm"}
                colorScheme="facebook"
                rightIcon={<ArrowForwardIcon />}
                variant="solid"
              >
                Read More
              </Button>
            </Link>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default CategorySection;
