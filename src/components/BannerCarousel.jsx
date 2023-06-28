import { Box, Flex, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import articlesData from "../data/articles";
import axios from "axios";
import { useEffect, useState } from "react";

function BannerCarousel() {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog"
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const sortedArticlesData = articles.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const limitedArticlesData = sortedArticlesData.slice(0, 10);

  return (
    <Box>
      <Carousel showThumbs={false} autoPlay infiniteLoop useKeyboardArrows>
        {limitedArticlesData.map((articleData) => (
          <Box key={articleData.id}>
            <Flex
              backgroundImage={`https://minpro-blog.purwadhikabootcamp.com/${articleData.imageURL}`}
              backgroundSize="cover"
              backgroundPosition="center"
              height="500px"
              align="flex-end"
              p={4}
              color="white"
            >
              <Text
                ml={2}
                mb={4}
                fontSize="4xl"
                fontFamily={"monospace"}
                fontWeight="bold"
              >
                {articleData.title} <br />
                <Text
                  mr={2}
                  textAlign={"left "}
                  fontFamily={"monospace"}
                  fontSize={"md"}
                >
                  Author: {articleData.User.username}
                </Text>
              </Text>
            </Flex>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default BannerCarousel;
