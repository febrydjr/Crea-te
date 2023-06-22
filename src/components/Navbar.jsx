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
import { TfiWrite } from "react-icons/tfi";
import { EditIcon } from "@chakra-ui/icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Fetch authentication status from local storage

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

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem("isAuthenticated"); // Remove authentication status from local storage
  };

  return (
    <Box
      fontFamily={"monospace"}
      fontSize={"large"}
      bg="gray.800"
      py={4}
      px={8}
      // mb={8}
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
            Popular
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
            to="/create-article"
            mr={4}
            _hover={{ textDecoration: "none" }}
            // rightIcon={<EditIcon />}
          >
            <Button variant={"outline"} size={"sm"} color={"white"}>
              WRITE!
              <TfiWrite size={20} />
            </Button>
          </Link>
          {isAuthenticated ? (
            <>
              <Button
                size={"sm"}
                as={RouterLink}
                to="/"
                // mr={4}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Link as={RouterLink} to="/profile">
                <Avatar name="User" src="/profile" size="sm" ml={4} />
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
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
