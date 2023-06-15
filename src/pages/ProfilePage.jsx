import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleUpdateProfileSubmit = (event) => {
    event.preventDefault();
    // Implement your update profile logic here
    setIsSuccess(true);
    toast({
      title: "Profile updated successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isSuccess) {
    return (
      <Box px={6} py={4}>
        <Heading as="h1" size="xl" mb={4}>
          Profile Updated Successfully!
        </Heading>
        <p>Your profile has been updated successfully.</p>
      </Box>
    );
  }

  return (
    <Box marginBottom={"250px"} px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Update Profile
      </Heading>
      <Box as="form" onSubmit={handleUpdateProfileSubmit}>
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
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </FormControl>
        <FormControl id="phoneNumber" mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </FormControl>
        <Button type="submit" size="sm" variant="outline">
          Update Profile
        </Button>
      </Box>
    </Box>
  );
}

export default ProfilePage;
