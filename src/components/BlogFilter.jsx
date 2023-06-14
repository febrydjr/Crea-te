import { useState } from "react";
import { Box, Heading, Select } from "@chakra-ui/react";

function BlogFilter({ categories, onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Filter Articles
      </Heading>
      <Select value={selectedCategory} onChange={handleCategoryChange} mb={4}>
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </Box>
  );
}

export default BlogFilter;
