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

const ForgotPassModal = ({ isOpen, onClose }) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Send the PUT request to the endpoint
      await axios.put(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
        {
          email: values.email,
          FE_URL: "http://localhost:3000",
        }
      );

      // Handle success response
      console.log("Password reset email sent successfully");
      // Show a success message or close the modal
    } catch (error) {
      // Handle error response
      console.error("Error sending password reset email:", error);
      // Show an error message to the user
    }

    // setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontFamily={"monospace"} fontSize={"2xl"} fontWeight={700}>
            Forgot Password?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ email: "" }}
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
                  Enter the email address you used when you registered
                </Text>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  rounded={"lg"}
                  focusBorderColor="#C77DFF"
                  placeholder="Enter your email address"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  fontFamily={"monospace"}
                />
                <ErrorMessage
                  name="email"
                  component={Text}
                  color="red.500"
                  mt={2}
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
                  Send Verification Link
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
export default ForgotPassModal;
