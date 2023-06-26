import { Box, Image, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./NewsArticle";

function CategorySection({ title, category, categoryId }) {
  const [article, setArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async (page) => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        {
          params: {
            id_cat: categoryId,
            sort: "ASC",
            page,
            limit: 1, // Limit to one article per category
          },
        }
      );
      const { result, total_pages: totalPages } = response.data;
      setTotalPages(totalPages);
      if (result.length > 0) {
        setArticle(result[0]);
      } else {
        setArticle(null);
      }
    } catch (error) {
      console.error("Error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [categoryId, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Box>
      <Heading fontFamily="monospace" as="h3" size="lg" mb={4}>
        {title}
      </Heading>
      {article && (
        <Box
          key={article.id}
          bg="gray.100"
          border="2px"
          borderColor="gray.900"
          p={4}
          borderRadius="md"
        >
          <Image src={article.imageURL} alt={article.title} mb={4} />

          <Heading
            color="black"
            fontFamily="monospace"
            as="h4"
            size="md"
            mb={2}
          >
            {article.title}
          </Heading>
          <Text fontFamily="monospace" color="gray.600" mb={2}>
            Author: {article.User.username} <br />
            {article.createdAt}
          </Text>
          <Text color="black" fontFamily="monospace" fontSize="md">
            {article.content.slice(0, 200)}
          </Text>
          <Link
            style={{ display: "flex", justifyContent: "flex-end" }}
            to={`/articles/${article.Blog_Keywords[0].BlogId}`}
          >
            <Button
              fontFamily="monospace"
              mt={4}
              size="sm"
              colorScheme="facebook"
              rightIcon={<ArrowForwardIcon />}
              variant="solid"
            >
              Read More
            </Button>
          </Link>
        </Box>
      )}
      <Flex mt={4} justify="center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </Flex>
    </Box>
  );
}

export default CategorySection;
