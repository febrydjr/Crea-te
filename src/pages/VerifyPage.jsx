import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

function VerifyPage({ isAuthenticated }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const toast = useToast();

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleVerifySubmit = (event) => {
    event.preventDefault();
    // Implement your verification logic here
    setIsVerified(true);
    toast({
      title: "Verification successful!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isVerified) {
    return <Navigate to="/landing" />;
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Verify Account
      </Heading>
      <Box as="form" onSubmit={handleVerifySubmit}>
        <FormControl id="verificationCode" mb={4}>
          <FormLabel>Verification Code</FormLabel>
          <Input
            type="text"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            required
          />
        </FormControl>
        <Button type="submit" size="sm" variant="outline">
          Verify
        </Button>
      </Box>
    </Box>
  );
}

export default VerifyPage;