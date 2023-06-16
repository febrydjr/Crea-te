import { Box, Flex, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import articlesData from "../data/articles";

function BannerCarousel() {
  return (
    <Box mb={2}>
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {articlesData?.map((articlesData) => (
          <Box key={articlesData.id} height="500px">
            <Flex
              backgroundImage={articlesData.thumbnail}
              backgroundSize="cover"
              backgroundPosition="center"
              height="100%"
              m={"auto"}
              align="flex-end"
              p={4}
              color="white"
            >
              <Text
                mb={4}
                fontSize="4xl"
                fontFamily={"monospace"}
                fontWeight="bold"
              >
                {articlesData.title} <br></br>
              </Text>
            </Flex>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default BannerCarousel;
