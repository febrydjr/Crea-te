import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Heading, Button, useToast } from "@chakra-ui/react";
import axios from "axios";

function VerificationEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const toast = useToast();
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  console.log(token);

  const verify = async () => {
    try {
      const res = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setIsVerified(true);
        toast({
          title: "Email Successfully verified!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Verification failed!",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  return (
    <Box
      mt={10}
      mb={10}
      px={6}
      py={6}
      maxW="lg"
      mx="auto"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" size="xl" mb={4}>
        Verification
      </Heading>
      {isVerified ? (
        <p>Your request has been successfully changed.</p>
      ) : (
        <div>
          <Text mt={10}>Click the button to verify!</Text>
          <Button onClick={() => verify()} mt={4} colorScheme="blue">
            Verify
          </Button>
        </div>
      )}
    </Box>
  );
}

export default VerificationEmail;
