import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Image, Text, Button, Flex, VStack } from "@chakra-ui/react";
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
      return null; // or any other placeholder while checking authentication
    }

    return <Component {...props} />;
  };
}

const ArticlePage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 1;
  const totalArticles = articlesData.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticle = articlesData[indexOfFirstArticle];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          // variant={i === currentPage ? "teal" : "outline"}
          colorScheme={i === currentPage ? "teal" : "gray"}
          mx={1}
          mb={4}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <Box
      bgImage={"https://wallpaperaccess.com/full/8881426.gif"}
      bgSize={"cover"}
      p={4}
    >
      <Box maxW="1100px" mx="auto" mb={6}>
        <Box
          bgColor={"white"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={currentArticle.thumbnail} alt={currentArticle.title} />
          <Box p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              {currentArticle.title}
            </Text>
            <Text fontSize="md" fontStyle="italic" mb={4}>
              By {currentArticle.author}
              <Text>Published: {currentArticle.date}</Text>
            </Text>
            <Text mb={4}>{currentArticle.content}</Text>
            Keyword: {currentArticle.keywords}
          </Box>
        </Box>
      </Box>
      <Flex justifyContent="center" alignItems="center">
        {renderPageNumbers()}
      </Flex>
    </Box>
  );
};

export default withAuth(ArticlePage);
// export default ArticlePage;
