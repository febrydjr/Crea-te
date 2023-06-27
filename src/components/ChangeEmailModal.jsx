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
const ChangeEmailModal = ({ isOpen, onClose }) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    currentEmail: Yup.string().required("Current Email is required"),
    newEmail: Yup.string().required("New Email is required"),
  });
  const toast = useToast();
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");

      // Send the PATCH request to the endpoint with the Authorization header
      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
        {
          currentEmail: values.currentEmail,
          newEmail: values.newEmail,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success response
      console.log("Email changed successfully");
      toast({
        title: "Email changed successfully",
        description: "check your email for verification",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      // Show a success message or close the modal
    } catch (error) {
      toast({
        title: "Error changing email",
        description: error.response.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      // Handle error response
      console.error("Error changing email:", error);
      // Show an error message to the user
    }

    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontFamily={"monospace"} fontSize={"2xl"} fontWeight={700}>
            Change Email
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ currentEmail: "", newEmail: "" }}
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
                  Enter your current email and new email
                </Text>
                <Field
                  as={Input}
                  type="text"
                  name="currentEmail"
                  rounded={"lg"}
                  placeholder="Enter your current email"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  fontFamily={"monospace"}
                />
                <ErrorMessage
                  name="currentEmail"
                  component={Text}
                  fontFamily={"monospace"}
                  color="red.500"
                  mb={4}
                />
                <Field
                  as={Input}
                  type="text"
                  name="newEmail"
                  rounded={"lg"}
                  placeholder="Enter your new email"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  fontFamily={"monospace"}
                />
                <ErrorMessage
                  name="newEmail"
                  component={Text}
                  fontFamily={"monospace"}
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
                  Change Email
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ChangeEmailModal;
