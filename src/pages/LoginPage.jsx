import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  Checkbox,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { setAuthStatus } from "../utils/auth";

function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      emailOrUsernameOrPhone: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrUsernameOrPhone: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
          values
        );

        const token = response.data.token;
        if (keepLoggedIn) {
          localStorage.setItem("token", token);
        }

        setAuthStatus(true); //------------------------------------- FUNGSI DI UTILS/AUTH
        toast({
          title: "Login successful!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });

        // localStorage.setItem("isAuthenticated", true); //----------------------------UBAH INI
        navigate(-1); // Navigate to last page
      } catch (error) {
        // setAuthStatus(true);
        toast({
          title: "Username/password/phone/email salah",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error.response.data);
      }
    },
  });

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleKeepLoggedInChange = (event) => {
    setKeepLoggedIn(event.target.checked);
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
      <form onSubmit={formik.handleSubmit}>
        <FormControl id="emailOrUsernameOrPhone" mb={4}>
          <FormLabel>Email or Username or Phone</FormLabel>
          <Input
            type="text"
            value={formik.values.emailOrUsernameOrPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.emailOrUsernameOrPhone &&
              formik.errors.emailOrUsernameOrPhone
            }
          />
          {formik.touched.emailOrUsernameOrPhone &&
          formik.errors.emailOrUsernameOrPhone ? (
            <Text color="red.500" fontSize="sm" mt={1}>
              {formik.errors.emailOrUsernameOrPhone}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <Text color="red.500" fontSize="sm" mt={1}>
                {formik.errors.password}
              </Text>
            ) : null}
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
        <Checkbox
          isChecked={keepLoggedIn}
          onChange={handleKeepLoggedInChange}
          colorScheme="blue"
          mb={4}
        >
          Keep me logged in
        </Checkbox>
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
