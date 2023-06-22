import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Button, useToast } from "@chakra-ui/react";
import axios from "axios";

function VerificationPage() {
  const [isVerified, setIsVerified] = useState(false);
  const toast = useToast();
  const { token } = useParams();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.patch(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
          {},
          {
            headers,
          }
        );
        if (response.status === 200) {
          setIsVerified(true);
          toast({
            title: "Account verified!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Verification failed!",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };

    handleVerification();
  }, [toast, token]);

  const verify = async () => {
    try {
      const res = await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZ3NhIiwiZW1haWwiOiJhbmdzYWJlbGFuZGExQGdtYWlsLmNvbSIsInBob25lIjoiODU5NjMxNjMxNDEiLCJwYXNzd29yZCI6IiQyYiQxMCRwa1hRT01XUlZpLkpLWW1rRjVPT2J1LkxvV1NYRDVtVGU5LkZHdmJ5aFJTN3pYYzNjWnZQSyIsImlkIjo0ODgsImlzVmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE2ODc0MTcyNDIsImV4cCI6MTY4NzQyMDg0Mn0.0ieHp2b1hifp0jHZBNIx2VighnD9iEWajnN5Pd1_tHY",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
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
        Account Verification
      </Heading>
      {isVerified ? (
        <p>Your account has been successfully verified.</p>
      ) : (
        <div>
          <p>Click the button to verify!</p>
          <Button onClick={() => verify()} mt={4} colorScheme="blue">
            Verify Account
          </Button>
        </div>
      )}
    </Box>
  );
}

export default VerificationPage;
