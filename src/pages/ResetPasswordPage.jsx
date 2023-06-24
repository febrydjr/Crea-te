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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function ResetPasswordPage() {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const toast = useToast();

  const handleResetPasswordSubmit = (values, { setSubmitting }) => {
    axios
      .patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Password reset successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Password reset failed.",
          description: "An error occurred while resetting your password.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box m={"auto"} width={"30%"} mt={10} mb={10} px={6} py={4}>
      <Box bgColor={"gray.40"} px={6} py={6} boxShadow={"lg"}>
        <Heading fontFamily={"monospace"} as="h1" size="xl" mb={4}>
          Reset Password
        </Heading>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
          })}
          onSubmit={handleResetPasswordSubmit}
        >
          <Form>
            <Field name="password">
              {({ field }) => (
                <FormControl id="password" mb={4}>
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" {...field} required />
                  <ErrorMessage name="password" component="div" color="red" />
                </FormControl>
              )}
            </Field>
            <Field name="confirmPassword">
              {({ field }) => (
                <FormControl id="confirmPassword" mb={4}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input type="password" {...field} required />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    color="red"
                  />
                </FormControl>
              )}
            </Field>
            <Button
              mt={2}
              type="submit"
              size="md"
              variant="solid"
              colorScheme="facebook"
            >
              Reset Password
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}

export default ResetPasswordPage;
