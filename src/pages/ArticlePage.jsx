import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import articlesData from "../data/articles";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

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
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 1;
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticle = articles[indexOfFirstArticle];
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1"
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber === prevPage && currentPage === 1) {
      setCurrentPage(totalPages);
    } else if (pageNumber === nextPage && currentPage === totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    setPrevPage(currentPage > 1 ? currentPage - 1 : null);
    setNextPage(currentPage < totalPages ? currentPage + 1 : null);
  }, [currentPage, totalPages]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={i === currentPage ? "facebook" : "gray"}
          mx={1}
          mb={4}
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  if (!currentArticle) {
    return null; // or handle the case when the current article is not available
  }

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <Box
      bgImage={"https://wallpaperaccess.com/full/8881426.gif"}
      bgSize={"cover"}
      p={4}
    >
      {/* <SimpleGrid> */}
      <Box maxW="1500px" mx="auto" mb={6}>
        <Box
          bgColor={"white"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            src={`https://minpro-blog.purwadhikabootcamp.com/${currentArticle.imageURL}`}
            alt={currentArticle.title}
          />

          <Box p={4}>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Button
                onClick={handleLikeClick}
                colorScheme={isLiked ? "red" : "gray"}
                size="md"
                px={2}
                py={2}
              >
                <FaHeart size={24} />
              </Button>
            </Box>
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
      {/* </SimpleGrid> */}

      <Flex justifyContent="center" alignItems="center">
        <Button
          onClick={() => handlePageChange(prevPage)}
          disabled={!prevPage}
          colorScheme="facebook"
          mx={1}
          mb={4}
        >
          Prev
        </Button>
        {renderPageNumbers()}
        <Button
          onClick={() => handlePageChange(nextPage)}
          disabled={!nextPage}
          colorScheme="facebook"
          mx={1}
          mb={4}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default withAuth(ArticlePage);
