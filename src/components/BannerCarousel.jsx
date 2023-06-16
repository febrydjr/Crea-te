import { Box, Flex, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import articlesData from "../data/articles";

function BannerCarousel() {
  const limitedArticlesData = articlesData.slice(0, 10); // limit yang tampil hanya 10 artikel
  return (
    <Box mb={2}>
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {limitedArticlesData?.map((articlesData) => (
          <Box key={articlesData.id}>
            <Flex
              backgroundImage={articlesData.thumbnail}
              backgroundSize="cover"
              backgroundPosition="center"
              height="500px"
              // m={"auto"}

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
                {articlesData.title} <br />
                <Text
                  textAlign={"left "}
                  fontFamily={"monospace"}
                  fontSize={"md"}
                >
                  Author: {articlesData.author}
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
