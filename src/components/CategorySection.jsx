import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import articlesData from "../data/articles";

function CategorySection({ title, articles, category }) {
  const categoryArticle = articles.find(
    (article) => article.category === category
  );

  if (!categoryArticle) {
    return null; // No article found for the category
  }

  return (
    <Box>
      <Heading fontFamily={"monospace"} as="h3" size="lg" mb={4}>
        {title}
      </Heading>
      <Box
        key={categoryArticle.id}
        bg="gray.100"
        border="2px"
        borderColor="gray.900"
        p={4}
        borderRadius="md"
      >
        <Image
          src={categoryArticle.thumbnail}
          alt={categoryArticle.title}
          mb={4}
        />

        <Heading fontFamily={"monospace"} as="h4" size="md" mb={2}>
          {categoryArticle.title}
        </Heading>
        <Text fontFamily={"monospace"} color="gray.600" mb={2}>
          Author: {categoryArticle.author} <br />
          {categoryArticle.date}
        </Text>
        <Text fontFamily={"monospace"} fontSize={"md"}>
          {categoryArticle.content.slice(0, 200)}
        </Text>
        <Link
          style={{ display: "flex", justifyContent: "flex-end" }}
          to={`/articles/${categoryArticle.id}`}
        >
          <Button
            fontFamily={"monospace"}
            mt={4}
            size={"sm"}
            colorScheme="facebook"
            rightIcon={<ArrowForwardIcon />}
            variant="solid"
          >
            Read More
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default CategorySection;
