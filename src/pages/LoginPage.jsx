import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
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

function LoginPage({ isAuthenticated }) {
  const [emailOrUsernameOrPhone, setEmailOrUsernameOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const toast = useToast();

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
    // Implement your login logic here
    setIsLoginSuccessful(true);
    toast({
      title: "Login successful!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isLoginSuccessful) {
    return (
      <Box px={6} py={4}>
        <Heading as="h1" size="xl" mb={4}>
          Login
        </Heading>
        <Box as="form" onSubmit={handleLoginSubmit}>
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
          <Button type="submit" size="sm" variant="outline">
            Login
          </Button>
        </Box>
        <Text mt={4}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Text>
      </Box>
    );
  }

  return <Navigate to="/" />;
}

export default LoginPage;
