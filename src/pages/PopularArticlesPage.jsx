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
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Popular Articles
      </Heading>
      <Tabs variant="soft-rounded" colorScheme="purple">
        <TabList mb={4}>
          <Tab>All Time</Tab>
          <Tab>Monthly</Tab>
          <Tab>Weekly</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              {popularArticles?.map((article) => (
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
