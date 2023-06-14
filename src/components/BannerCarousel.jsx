import { Box, Flex, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function BannerCarousel({ articles }) {
  return (
    <Box mb={10}>
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {articles.map((article) => (
          <Box key={article.id} height="300px">
            <Flex
              backgroundImage={`url(${article.imageUrl})`}
              backgroundSize="cover"
              backgroundPosition="center"
              height="100%"
              align="flex-end"
              p={4}
              color="white"
            >
              <Text fontSize="2xl" fontWeight="bold">
                {article.title}
              </Text>
            </Flex>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default BannerCarousel;
