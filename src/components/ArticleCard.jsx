import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

function ArticleCard(props) {
  const { id, title, author, content } = props.article;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Heading as="h2" size="md">
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        {author}
      </Text>
      <Text mt={2}>{content.slice(0, 100)}...</Text>
      <Link to={`/articles/${id}`}>Read more</Link>
    </Box>
  );
}

export default ArticleCard;
