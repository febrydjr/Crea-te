import {
  Box,
  Grid,
  GridItem,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import BannerCarousel from "../components/BannerCarousel";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import ArticlePage from "./ArticlePage";
import NewsArticle from "../components/NewsArticle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function LandingPage() {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
        );
        const data = response.data;
        setArticlesData(data);
      } catch (error) {
        console.error("Error fetching articles data", error);
      }
    };

    fetchArticlesData();
  }, []);

  return (
    <Box maxWidth={"100%"} bgColor={"#E8EDE7"}>
      <BannerCarousel></BannerCarousel>
      <Flex height="85vh" width="100%">
        <Box width="5%" bg="white">
          <Flex height="100%" justifyContent="center" alignItems="center">
            <Text
              fontFamily={"monospace"}
              transform="rotate(-90deg)"
              fontSize="6xl"
            >
              explore
            </Text>
          </Flex>
        </Box>
        <Box w={"95%"}>
          <Box p={6}>
            <NewsArticle />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default LandingPage;
