//IMPORT INI
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { setAuthStatus } from "../utils/auth";
// import loginData from "../data/loginData";

function LoginPage() {
  const [login, setLogin] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login");
      setLogin(response.data);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const navigate = useNavigate();
  const [emailOrUsernameOrPhone, setEmailOrUsernameOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toast = useToast();
  //TAMBAH INI -----------------------------
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // //PAKE USE EFFECT INI
  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   setIsAuthenticated(!!isAuthenticated);
  // }, []);

  // if (isAuthenticated) {
  //   return <Navigate to="/checklogin" />;
  // }

  // ---------------------------------------------
  const handleEmailOrUsernameOrPhoneChange = (event) => {
    setEmailOrUsernameOrPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // Find the matching login data based on the entered email/username/phone
    const matchedLogin = login.find((loginData) => {
      return (
        emailOrUsernameOrPhone === loginData.username ||
        emailOrUsernameOrPhone === loginData.email ||
        emailOrUsernameOrPhone === loginData.phone
      );
    });

    // Check if a matching login data was found and the password is correct
    if (matchedLogin && password === matchedLogin.password) {
      setAuthStatus(true); // Set authentication status to true
      toast({
        title: "Login successful!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      localStorage.setItem("isAuthenticated", true);
      navigate(-1); // Navigate to create article page
    } else {
      toast({
        title: "Invalid username or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      mt={10}
      mb={10}
      px={6}
      py={4}
      maxW="sm"
      mx="auto"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" size="xl" mb={4}>
        Login
      </Heading>
      <form onSubmit={handleLoginSubmit}>
        <FormControl id="emailOrUsernameOrPhone" mb={4}>
          <FormLabel>Email or Username or Phone</FormLabel>
          <Input
            type="text"
            value={emailOrUsernameOrPhone}
            onChange={handleEmailOrUsernameOrPhoneChange}
            required
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <InputRightElement>
              <IconButton
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                icon={isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                onClick={handleTogglePasswordVisibility}
                variant="ghost"
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit" size="sm" variant="outline" w="full">
          Login
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        Don't have an account? <Link to="/register">Register here</Link>
      </Text>
    </Box>
  );
}

export default LoginPage;
