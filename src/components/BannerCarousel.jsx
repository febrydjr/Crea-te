import { Box, Flex, Image, Stack, Text, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function BannerCarousel() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const fetchSlides = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=1"
      );
      const fetchedSlides = response.data.result.map((slideData) => ({
        img: `https://minpro-blog.purwadhikabootcamp.com/${slideData.imageURL}`,
        label: slideData.title,
        description: slideData.author,
      }));
      setSlides(fetchedSlides);
    } catch (error) {
      console.error("error fetching slides", error);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" pos="relative" overflow="hidden">
        <Flex h="400px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
              />
              <Stack
                p="8px 12px"
                pos="absolute"
                bottom="24px"
                textAlign="center"
                w="full"
                mb="8"
                color="white"
              >
                <Text fontSize="2xl">{slide.label}</Text>
                <Text fontSize="lg">{slide.description}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
        <Text
          cursor="pointer"
          pos="absolute"
          top="50%"
          w="auto"
          mt="-22px"
          p="16px"
          color="white"
          fontWeight="bold"
          fontSize="18px"
          transition="0.6s ease"
          borderRadius="0 3px 3px 0"
          userSelect="none"
          left="0"
          onClick={prevSlide}
          _hover={{
            opacity: 0.8,
            bg: "black",
          }}
        >
          &#10094;
        </Text>
        <Text
          cursor="pointer"
          pos="absolute"
          top="50%"
          w="auto"
          mt="-22px"
          p="16px"
          color="white"
          fontWeight="bold"
          fontSize="18px"
          transition="0.6s ease"
          borderRadius="0 3px 3px 0"
          userSelect="none"
          right="0"
          onClick={nextSlide}
          _hover={{
            opacity: 0.8,
            bg: "black",
          }}
        >
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", null, "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{
                bg: "blackAlpha.800",
              }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}

export default BannerCarousel;
