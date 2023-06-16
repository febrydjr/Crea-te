import {
  Box,
  Flex,
  Link,
  Spacer,
  Image,
  Avatar,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box bg="gray.800" py={4} px={8}>
      <Flex align="center" justify="space-between" color="white">
        <Flex align="center">
          <Image
            src="https://seeklogo.com/images/S/spider-man-logo-FD57A89F7D-seeklogo.com.png"
            alt="Logo"
            boxSize={8}
            mr={2}
          />
          <Link
            as={RouterLink}
            to="/"
            fontWeight="bold"
            fontSize="xl"
            _hover={{ textDecoration: "none" }}
          >
            MAI BLOGGGGG
          </Link>
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
          <Link
            as={RouterLink}
            to="/articles/popular"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Popular Articles
          </Link>
          <Link
            as={RouterLink}
            to="/create-article"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Create Article
          </Link>
          <Link
            as={RouterLink}
            to="/myblogs"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            My Blog
          </Link>
          <Link
            as={RouterLink}
            to="/login"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Log In
          </Link>
          <Link
            as={RouterLink}
            to="/register"
            mb={2}
            _hover={{ textDecoration: "none" }}
          >
            Register
          </Link>
          <Link as={RouterLink} to="/profile">
            <Avatar
              name="User"
              src="path/to/profile-picture"
              size="sm"
              mb={2}
            />
          </Link>
        </Flex>
      </Collapse>
    </Box>
  );
}

export default Navbar;
