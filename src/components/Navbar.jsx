import {
  Box,
  Flex,
  Link,
  Spacer,
  Image,
  Avatar,
  IconButton,
  Collapse,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { BiSolidSearch } from "react-icons/bi";
import articlesData from "../data/articles";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    const filteredArticles = articlesData.filter((article) => {
      const { title, author, category } = article;
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        title.toLowerCase().includes(lowerCaseQuery) ||
        author.toLowerCase().includes(lowerCaseQuery) ||
        category.toLowerCase().includes(lowerCaseQuery)
      );
    });

    navigate("/search-results", { state: { filteredArticles } });
  };

  return (
    <Box
      fontFamily={"monospace"}
      fontSize={"large"}
      bg="gray.800"
      py={4}
      px={8}
    >
      <Flex align="center" justify="space-between" color="white">
        <Flex align="center">
          <Image
            src="https://seeklogo.com/images/S/spider-man-logo-FD57A89F7D-seeklogo.com.png"
            alt="Logo"
            boxSize={8}
            mr={4}
          />
          <Link
            as={RouterLink}
            to="/"
            fontWeight="bold"
            fontSize="2xl"
            // mt={2}
            _hover={{ textDecoration: "none" }}
          >
            MAIBLOGGGG
          </Link>
          <Input
            // size={"lg"}
            w={"300px"}
            fontFamily={"monospace"}
            placeholder="Search articles, keywords, etc..."
            ml={6}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button ml={2} colorScheme="facebook" onClick={handleSearch}>
            <AiOutlineSearch size={"20px"} />
          </Button>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} align="center">
          <Link
            as={RouterLink}
            to="/articles/popular"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            Popular Articles
          </Link>
          <Link
            as={RouterLink}
            to="/create-article"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            Create Article
          </Link>
          <Link
            as={RouterLink}
            to="/myblogs"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            My Blog
          </Link>
          <Link
            as={RouterLink}
            to="/login"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            Log In
          </Link>
          <Link
            as={RouterLink}
            to="/register"
            _hover={{ textDecoration: "none" }}
          >
            Register
          </Link>
          <Link as={RouterLink} to="/profile">
            <Avatar
              name="User"
              src="path/to/profile-picture"
              size="sm"
              ml={4}
            />
          </Link>
        </Flex>
        <IconButton
          aria-label="Toggle navigation"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          onClick={handleToggle}
          display={{ base: "flex", md: "none" }}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex direction="column" mt={4} color="white">
          {/* Existing code */}
        </Flex>
      </Collapse>
    </Box>
  );
}

export default Navbar;
