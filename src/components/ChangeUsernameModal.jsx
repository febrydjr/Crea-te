import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ChangeUsernameModal = ({ isOpen, onClose }) => {

  const validationSchema = Yup.object().shape({
    currentUsername: Yup.string().required("Current Username is required"),
    newUsername: Yup.string().required("New Username is required"),
  });

 
  const toast = useToast();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");

    
      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
        {
          currentUsername: values.currentUsername,
          newUsername: values.newUsername,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

   
      console.log("Username changed successfully");
      toast({
        title: "Username changed successfully",
        description: "check your email for verification",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    
    } catch (error) {
      // Handle error response
      console.error("Error changing username:", error);
      toast({
        title: "Error changing username",
        description: error.response.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    
    }

    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontFamily={"monospace"} fontSize={"2xl"} fontWeight={700}>
            Change Username
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ currentUsername: "", newUsername: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <Text
                  fontFamily={"monospace"}
                  fontSize={"sm"}
                  mb={4}
                  fontWeight={400}
                  color={"gray.600"}
                >
                  Enter your current username and new username
                </Text>
                <Field
                  as={Input}
                  type="text"
                  name="currentUsername"
                  rounded={"lg"}
                  //   focusBorderColor="#C77DFF"
                  placeholder="Enter your current username"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  fontFamily={"monospace"}
                />
                <ErrorMessage
                  name="currentUsername"
                  fontFamily={"monospace"}
                  component={Text}
                  color="red.500"
                  mb={4}
                />
                <Field
                  as={Input}
                  type="text"
                  name="newUsername"
                  rounded={"lg"}
                  //   focusBorderColor="#C77DFF"
                  placeholder="Enter your new username"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  fontFamily={"monospace"}
                />
                <ErrorMessage
                  name="newUsername"
                  fontFamily={"monospace"}
                  component={Text}
                  color="red.500"
                  //   mt={2}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  fontFamily={"monospace"}
                  display={"flex"}
                  justifyContent={"center"}
                  w={"100%"}
                  rounded={"lg"}
                  color={"white"}
                  colorScheme={"facebook"}
                  isLoading={isSubmitting}
                >
                  Change Username
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ChangeUsernameModal;
