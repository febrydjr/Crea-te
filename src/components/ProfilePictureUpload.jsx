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
  const [picture, setPicture] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleUploadPictureSubmit = (event) => {
    event.preventDefault();
    // Implement your upload picture logic here
    setIsSuccess(true);
    toast({
      title: "Profile picture uploaded successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (isSuccess) {
    return (
      <Box px={6} py={4}>
        <Heading as="h1" size="xl" mb={4}>
          Profile Picture Uploaded Successfully!
        </Heading>
        <p>Your profile picture has been uploaded successfully.</p>
      </Box>
    );
  }

  return (
    <Box px={6} py={4}>
      <Heading as="h1" size="xl" mb={4}>
        Upload Profile Picture
      </Heading>
      <Box as="form" onSubmit={handleUploadPictureSubmit}>
        <FormControl id="picture" mb={4}>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            onChange={handlePictureChange}
            accept="image/*"
            required
          />
        </FormControl>
        <Button type="submit" size="sm" variant="outline">
          Upload Picture
        </Button>
      </Box>
    </Box>
  );
}

export default ProfilePage;
