import { useState } from "react";
import { Box, Heading, Select } from "@chakra-ui/react";

function BlogSort({ onSort }) {
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    onSort(event.target.value);
  };

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Sort Articles
      </Heading>
      <Select value={selectedSort} onChange={handleSortChange} mb={4}>
        <option value="">Sort By</option>
        <option value="date-desc">Date (Newest First)</option>
        <option value="date-asc">Date (Oldest First)</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
      </Select>
    </Box>
  );
}

export default BlogSort;
