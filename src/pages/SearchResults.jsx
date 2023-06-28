import { Box, Heading, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const { filteredArticles } = location.state;

  return (
    <Box bg={"#E8EDE7"} fontFamily={"monospace"} p={4}>
      <Heading fontFamily={"monospace"} mb={4}>
        Search Results
      </Heading>
      {filteredArticles.length > 0 ? (
        // filteredArticles.map((article) => (
        <SimpleGrid columns={[2, null, 3]} spacing={4}>
          {filteredArticles.map((article) => (
            <Box
              bgColor={"white"}
              key={article.id}
              border={"1px solid lightgray"}
              borderWidth="1px"
              borderRadius={"lg"}
              p={4}
            >
              <Image src={article.thumbnail}></Image>
              {/* {article.thumbnail} */}
              <Text fontSize={"xl"} mt={2} mb={2} fontWeight="bold">
                {article.title}
              </Text>
              {/* <img src={article.thumbnail} alt={article.title} /> */}
              {/* <Box fontWeight="bold" mt={2}>
              {article.title}
            </Box> */}
              <Box>{article.category}</Box>
              <Box>{article.author}</Box>
              <Box>{article.date}</Box>
              <Box fontSize={"sm"} mt={2}>
                {article.content.slice(0, 200)}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No articles found.</Text>
      )}
    </Box>
  );
}

export default SearchResults;
