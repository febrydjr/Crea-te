import React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
      "Password must be at least 6 characters long, contain at least 1 symbol and 1 uppercase letter"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string().required("Phone Number is required"),
});

const RegisterPage = () => {
  const toast = useToast();

  const handleRegisterSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        values
      );

      if (response.status === 200) {
        toast({
          title: "Registration successful!",
          description: response.data.message,
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        console.log(response.data.message);
      } else {
        toast({
          title: "Registration failed",
          description: "Unable to register. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
    }
  };

  return (
    <Box
      // bgImg={
      //   "https://i.pinimg.com/originals/3b/e1/cf/3be1cf74f40ee3cad370e4d0932544f2.gif"
      // }
      bgColor={"#E8EDE7"}
      maxW={"100vw"}
      px={6}
      py={4}
    >
      <Box
        bg={"white"}
        mt={10}
        mb={10}
        px={6}
        py={4}
        maxW="sm"
        mx="auto"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        fontFamily={"monospace"}
      >
        <Heading fontFamily={"monospace"} as="h1" size="xl" mb={4}>
          Register
        </Heading>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            FE_URL: "http://localhost:3000",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegisterSubmit}
        >
          <Form>
            <Field name="username">
              {({ field }) => (
                <FormControl id="username" mb={4}>
                  <FormLabel>Username</FormLabel>
                  <Input {...field} type="text" required />
                  <ErrorMessage
                    name="username"
                    component={FormHelperText}
                    errorBorderColor="red.300"
                  />
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field }) => (
                <FormControl id="email" mb={4}>
                  <FormLabel>Email Address</FormLabel>
                  <Input {...field} type="email" required />
                  <ErrorMessage
                    name="email"
                    component={FormHelperText}
                    errorBorderColor="red.300"
                  />
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field }) => (
                <FormControl id="password" mb={4}>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" required />
                  <ErrorMessage
                    name="password"
                    component={FormHelperText}
                    errorBorderColor="red.300"
                  />
                </FormControl>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ field }) => (
                <FormControl id="confirmPassword" mb={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input {...field} type="password" required />
                  <ErrorMessage
                    name="confirmPassword"
                    component={FormHelperText}
                    errorBorderColor="red.300"
                  />
                </FormControl>
              )}
            </Field>

            <Field name="phone">
              {({ field }) => (
                <FormControl id="phone" mb={4}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input {...field} type="tel" required />
                  <ErrorMessage
                    name="phone"
                    component={FormHelperText}
                    errorBorderColor="red.300"
                  />
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              type="submit"
              size="md"
              // justify="center"
              colorScheme="facebook"
            >
              Register
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterPage;
