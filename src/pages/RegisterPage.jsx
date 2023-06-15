import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  useToast,
} from "@chakra-ui/react";
import { loginData, registerUser } from "../data/loginData";

function RegisterPage({ isAuthenticated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const toast = useToast();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // Check if the username or email is already registered
    const isUsernameTaken = loginData.users.some(
      (user) => user.username === username
    );
    const isEmailTaken = loginData.users.some((user) => user.email === email);

    if (isUsernameTaken) {
      toast({
        title: "Username is already taken",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (isEmailTaken) {
      toast({
        title: "Email is already registered",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      // Add the registered user data to loginData
      const newUser = {
        username,
        email,
        password,
        phone,
      };
      registerUser(newUser);

      setIsRegistered(true);

      toast({
        title: "Registration successful!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

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
        Register
      </Heading>
      <Box as="form" onSubmit={handleRegisterSubmit}>
        <FormControl id="username" mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}"
          />
          <FormHelperText>
            Password must be at least 6 characters long, contain at least 1
            symbol and 1 uppercase letter.
          </FormHelperText>
        </FormControl>
        <FormControl id="phone" mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </FormControl>
        <Button type="submit" size="sm" variant="outline" w="full">
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
