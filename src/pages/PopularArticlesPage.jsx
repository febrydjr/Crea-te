import { useState } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
  Text,
} from "@chakra-ui/react";
import articlesData from "../data/articles";

function PopularArticlesPage() {
  const [popularArticles, setPopularArticles] = useState([]);

  // Sort articles by popularity and slice the top 5
  const sortedArticles = articlesData
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Update popular articles whenever the sorted articles change
  useState(() => {
    setPopularArticles(sortedArticles);
  }, [sortedArticles]);

  return (
    <Box
      bgImg={
        "https://i.pinimg.com/originals/3b/e1/cf/3be1cf74f40ee3cad370e4d0932544f2.gif"
      }
      px={6}
      py={4}
    >
      <Heading
        color={"white"}
        fontFamily={"monospace"}
        as="h1"
        size="xl"
        mb={4}
      >
        Popular Articles
      </Heading>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList fontFamily={"monospace"} mb={4}>
          <Tab color={"white"}>All Time</Tab>
          <Tab color={"white"}>Monthly</Tab>
          <Tab color={"white"}>Weekly</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              {popularArticles?.map((article) => (
                <Box
                  // bgImage={
                  //   "https://picsum.photos/1920/1080?random=" + article.id
                  // }
                  bgColor={"white"}
                  key={article.id}
                  borderWidth="1px"
                  p={4}
                  rounded="md"
                >
                  <Text fontFamily={"monospace"} fontSize="sm" color="gray.600">
                    {article.category}
                  </Text>
                  <Heading fontFamily={"monospace"} as="h2" size="md" my={2}>
                    {article.title}
                  </Heading>
                  <Text fontFamily={"monospace"} fontSize="sm" color="gray.600">
                    By {article.author} on {article.date}
                  </Text>
                  <Text fontFamily={"monospace"} fontSize={"sm"} mt={4}>
                    {article.content.slice(0, 250)}...
                  </Text>
                </Box>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={4}>
              {sortedArticles
                .filter((article) => article.popularity === "monthly")
                .map((article) => (
                  <Box key={article.id} borderWidth="1px" p={4} rounded="md">
                    <Text fontSize="sm" color="gray.600">
                      {article.category}
                    </Text>
                    <Heading as="h2" size="md" my={2}>
                      {article.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      By {article.author} on {article.date}
                    </Text>
                    <Text mt={4}>{article.content.slice(0, 150)}...</Text>
                  </Box>
                ))}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={4}>
              {sortedArticles
                .filter((article) => article.popularity === "weekly")
                .map((article) => (
                  <Box key={article.id} borderWidth="1px" p={4} rounded="md">
                    <Text fontSize="sm" color="gray.600">
                      {article.category}
                    </Text>
                    <Heading as="h2" size="md" my={2}>
                      {article.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      By {article.author} on {article.date}
                    </Text>
                    <Text mt={4}>{article.content.slice(0, 150)}...</Text>
                  </Box>
                ))}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default PopularArticlesPage;
