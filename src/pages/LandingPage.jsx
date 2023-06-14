import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import BannerCarousel from "../components/BannerCarousel";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import articlesData from "../data/articles";
import FavoritesPage from "./FavoritesPage";

function LandingPage() {
  return (
    <Box>
      <FavoritesPage />
      {/* <BannerCarousel articles={articlesData} /> */}

      <Container maxW="100%" py={10}>
        <Heading
          borderRadius={"6px"}
          padding={3}
          background={"#DDE6ED"}
          as="h2"
          size="xl"
          mb={6}
        >
          Populer
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={5}>
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
            title="Sehat"
            articles={articlesData}
            category="Health"
          />
        </SimpleGrid>
      </Container>

      {/* <Footer /> */}
    </Box>
  );
}

export default LandingPage;
