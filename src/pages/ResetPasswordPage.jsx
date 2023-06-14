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

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleResetPasswordSubmit = (event) => {
    event.preventDefault();
    // Implement your reset password logic here
    setIsSuccess(true);
    toast({
      title: "Password reset successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isSuccess) {
    return (
      <Box px={6} py={4}>
        <Heading as="h1" size="xl" mb={4}>
          Password Reset Successfully!
        </Heading>
        <p>Your password has been reset successfully.</p>
      </Box>
    );
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Reset Password
      </Heading>
      <Box as="form" onSubmit={handleResetPasswordSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </FormControl>
        <FormControl id="newPassword" mb={4}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </FormControl>
        <FormControl id="confirmNewPassword" mb={4}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            type="password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            required
          />
        </FormControl>
        <Button type="submit" size="sm" variant="outline">
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}

export default ResetPasswordPage;
