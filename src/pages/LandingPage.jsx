import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
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
    <Box
    // bgImg={"https://marvelapp.com/wp-content/uploads/2020/07/87.png"}
    // maxW={"100vw"}
    >
      <BannerCarousel articles={articlesData} />

      <Container maxW="100%" py={10}>
        <Heading
          fontFamily={"monospace"}
          borderRadius={"6px"}
          padding={3}
          background={"#DDE6ED"}
          as="h2"
          size="xl"
          mb={6}
          border={"2px solid #1A202C"}
        >
          Explore Article
        </Heading>
        {/* 
        <SimpleGrid
          color={"white"}
          // columns={{ base: 1, md: 1, lg: 1 }}
          columns={2}
          spacing={5}
        >
          {articlesData.map((category) => (
            <CategorySection
              key={category.categoryId}
              title={category.categoryName}
              categoryId={category.categoryId}
            />
          ))}
        </SimpleGrid> */}
        <NewsArticle />
      </Container>

      <Footer />
    </Box>
  );
}

export default LandingPage;
