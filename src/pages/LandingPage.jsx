import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import BannerCarousel from "../components/BannerCarousel";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import articlesData from "../data/articles";
import slicedArticlesData from "../data/articles";
import FavoritesPage from "./FavoritesPage";
import ArticlePage from "./ArticlePage";

function LandingPage() {
  return (
    <Box
      bgImg={
        "https://i.pinimg.com/originals/3b/e1/cf/3be1cf74f40ee3cad370e4d0932544f2.gif"
      }
      maxW={"100vw"}
      // px={4}
      // py={4}
      bgSize="cover"
      // bgRepeat="no-repeat"
    >
      {/* <ArticlePage /> */}
      {/* <FavoritesPage /> */}
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
          Artikel Populer
        </Heading>

        <SimpleGrid
          color={"white"}
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={5}
        >
          <CategorySection
            title="Teknologi"
            articles={articlesData}
            category="Technology"
          />
          <CategorySection
            title="Politik"
            articles={articlesData}
            category="Politics"
          />
          <CategorySection
            title="Bisnis"
            articles={articlesData}
            category="Business"
          />
          <CategorySection
            title="Olahraga"
            articles={articlesData}
            category="Sports"
          />
          <CategorySection
            title="Kesehatan"
            articles={articlesData}
            category="Health"
          />
          <CategorySection
            title="Entertainment"
            articles={articlesData}
            category="Entertainment"
          />
          <CategorySection
            title="Liburan"
            articles={articlesData}
            category="Travel"
          />
          <CategorySection
            title="Agama"
            articles={articlesData}
            category="Religion"
          />
        </SimpleGrid>
      </Container>

      {/* <Footer /> */}
    </Box>
  );
}

export default LandingPage;
