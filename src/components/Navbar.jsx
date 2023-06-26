import {
  Box,
  Flex,
  Link,
  Text,
  Spacer,
  Image,
  Avatar,
  IconButton,
  Collapse,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { BiSolidSearch } from "react-icons/bi";
import articlesData from "../data/articles";
import { TfiWrite } from "react-icons/tfi";
import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "../App.css";

function Navbar() {
  const [isToggle, setIsToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Fetch authentication status from local storage

  const finalRef = useRef(null);

  const handleToggle = () => {
    setIsToggle(!isToggle);
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
    localStorage.removeItem("token"); // Remove authentication status from local storage
    onClose();
    navigate("/");
  };

  return (
    <Box
      fontFamily={"monospace"}
      fontSize={"large"}
      bg="#036280"
      py={4}
      px={8}
      // mb={8}
    >
      <Flex align="center" justify="space-between" color="white">
        <Flex align="center">
          <Link as={RouterLink} to="/">
            <Image
              src="https://seeklogo.com/images/S/spider-man-logo-FD57A89F7D-seeklogo.com.png"
              alt="Logo"
              boxSize={8}
              mr={4}
            />
          </Link>
          <Link
            as={RouterLink}
            to="/"
            fontWeight="bold"
            fontSize="2xl"
            // mt={2}
            _hover={{ textDecoration: "none" }}
            // fontStyle={"italic"}
            fontFamily={"monospace"}
          >
            CREAṯE
          </Link>
          <Input
            // size={"lg"}
            w={"300px"}
            fontFamily={"monospace"}
            placeholder="Search articles, keywords, etc..."
            _placeholder={{ color: "white" }}
            ml={6}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            ml={2}
            colorScheme="gray"
            _hover={{ bg: "#DAFFFB" }}
            onClick={handleSearch}
          >
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

          {/* <Link
            as={RouterLink}
            to="/myblogs"
            mr={4}
            _hover={{ textDecoration: "none" }}
          >
            My Blog
          </Link> */}
          <Link
            as={RouterLink}
            to="/create-article"
            mr={4}
            _hover={{ textDecoration: "none" }}
            // rightIcon={<EditIcon />}
          >
            <Button
              // variant={"outline"}
              size={"sm"}
              color={"#1A202C"}
              _hover={{ textColor: "white", bgColor: "#3b5998" }}
              bgColor={"whitesmoke"}
            >
              CREAṯE&nbsp;
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
                onClick={onOpen}
                _hover={{ textColor: "black", bgColor: "white" }}
                bgColor={"red.500"}
                textColor={"white"}
              >
                Farewell?
              </Button>
              {/* MODAL ---------------------------- */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader fontSize={"2xl"} fontFamily={"monospace"}>
                    Farewell?
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text fontFamily={"monospace"} fontSize={"md"}>
                      Hai! Sebelum mengucapkan selamat tinggal dan keluar dari
                      akun kamu, aku hanya ingin memberi informasi. Ingatlah
                      untuk memeriksa kembali pengaturan akunmu, pastikan semua
                      data penting Anda disimpan, dan ucapkan selamat tinggal
                      pada urusan yang belum selesai.
                      <br />
                      <br />
                      aku benci perpisahan yang datang dengan penyesalan, jadi
                      luangkan waktu sejenak untuk memastikan bahwa kamu sudah
                      siap. Siap? Baiklah, silakan klik tombol logout itu dan
                      istirahat. aku akan berada di sini menunggumu kembali!
                    </Text>
                  </ModalBody>

                  <ModalFooter>
                    {/* <Button colorScheme="teal" mr={3} onClick={onClose}>
                      Close
                    </Button> */}
                    <Button
                      fontFamily={"monospace"}
                      onClick={handleLogout}
                      // onClick={(() => handleLogout(), navigate("/"))}
                      // navigate={navigate("/")}
                      colorScheme="red"
                    >
                      Logout
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* --------------------------------- */}
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
          icon={isToggle ? <AiOutlineClose /> : <GiHamburgerMenu />}
          onClick={handleToggle}
          display={{ base: "flex", md: "none" }}
        />
      </Flex>
      {/* <Collapse in={isToggle} animateOpacity>
        <Flex direction="column" mt={4} color="white">
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
        </Flex>
      </Collapse> */}
    </Box>
  );
}

export default Navbar;
