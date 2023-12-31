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

const ChangePhoneModal = ({ isOpen, onClose }) => {
  
  const validationSchema = Yup.object().shape({
    currentPhone: Yup.string().required("Current Phone is required"),
    newPhone: Yup.string().required("New Phone is required"),
  });
  const toast = useToast();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");


      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",
        {
          currentPhone: values.currentPhone,
          newPhone: values.newPhone,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      console.log("Phone number changed successfully");
      toast({
        title: "Phone number changed successfully",
        description: "check your email for verification",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
  
    } catch (error) {
      
      console.error("Error changing phone number:", error);
      toast({
        title: "Error changing phone number",
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
            Change Phone Number
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ currentPhone: "", newPhone: "" }}
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
                  Enter your current phone number and new phone number
                </Text>
                <Field
                  as={Input}
                  type="text"
                  name="currentPhone"
                  rounded={"lg"}
                  placeholder="Enter your current phone number"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  fontFamily={"monospace"}
                />
                <ErrorMessage
                  name="currentPhone"
                  component={Text}
                  fontFamily={"monospace"}
                  color="red.500"
                  // mt={2}
                  mb={4}
                />
                <Field
                  as={Input}
                  type="text"
                  name="newPhone"
                  rounded={"lg"}
                  placeholder="Enter your new phone number"
                  _placeholder={{ fontSize: "sm", color: "gray.400" }}
                  fontFamily={"monospace"}
                />
                <ErrorMessage
                  name="newPhone"
                  fontFamily={"monospace"}
                  component={Text}
                  color="red.500"
                  // mt={2}
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
                  Change Phone Number
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ChangePhoneModal;
