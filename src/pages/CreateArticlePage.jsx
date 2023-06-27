import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  Image,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null; // or any other placeholder while checking authentication
    }

    return <Component {...props} />;
  };
}

const CreateArticlePage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { username: fetchedUsername, avatar: fetchedAvatar } =
          response.data;
        setUsername(fetchedUsername);
        setAvatar(fetchedAvatar);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const initialValues = {
    title: "",
    imageURL: null,
    category: "",
    content: "",
    keywords: [],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    imageURL: Yup.mixed()
      .required("imageURL is required")
      .test("fileSize", "File size limit exceeded", (value) => {
        if (value) {
          return value.size <= 2 * 1024 * 1024;
        }
        return true;
      }),
    category: Yup.string().required("Category is required"),
    content: Yup.string().required("Content is required"),
    keywords: Yup.array().min(1, "At least one keyword is required"),
  });

  const handleCreateSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("imageURL", values.imageURL);
      // formData.append("imageURL", values.imageURL[0]);
      formData.append("category", values.category);
      formData.append("content", values.content);
      values.keywords.forEach((keyword) =>
        formData.append("keywords[]", keyword)
      );

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      setSubmitting(false);
      toast({
        title: "Article created!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast({
        title: "Error creating article.",
        description: "An error occurred while creating the article.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box fontFamily="monospace" w="80%" m="auto" mb={10} mt={10} px={6} py={4}>
      <Heading fontFamily="monospace" as="h1" size="xl" mb={4}>
        Create Article
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateSubmit}
      >
        {(formik) => (
          <Form>
            <Field name="title">
              {({ field, form }) => (
                <FormControl
                  id="title"
                  mb={4}
                  isInvalid={form.errors.title && form.touched.title}
                >
                  <FormLabel fontWeight="bold">Title</FormLabel>
                  <Input type="text" {...field} />
                  <ErrorMessage
                    name="title"
                    component={Text}
                    color="red.500"
                    mt={1}
                  />
                </FormControl>
              )}
            </Field>
            <Field name="imageURL">
              {({ field, form }) => (
                <FormControl
                  id="imageURL"
                  mb={4}
                  isInvalid={form.errors.imageURL && form.touched.imageURL}
                >
                  <FormLabel fontWeight="bold">imageURL</FormLabel>
                  <input
                    id="imageURLInput"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                      form.setFieldValue(
                        "imageURL",
                        event.currentTarget.files[0]
                      )
                    }
                    style={{ display: "none" }}
                  />
                  <label htmlFor="imageURLInput">
                    <Button
                      as="span"
                      size="sm"
                      variant="outline"
                      colorScheme="teal"
                      cursor="pointer"
                    >
                      Upload
                    </Button>
                  </label>
                  {formik.values.imageURL && (
                    <Box mt={2}>
                      <Image
                        src={URL.createObjectURL(formik.values.imageURL)}
                        maxH="200px"
                      />
                    </Box>
                  )}
                  <ErrorMessage
                    name="imageURL"
                    component={Text}
                    color="red.500"
                    mt={1}
                  />
                </FormControl>
              )}
            </Field>
            <Field name="category">
              {({ field, form }) => (
                <FormControl
                  id="category"
                  mb={4}
                  isInvalid={form.errors.category && form.touched.category}
                >
                  <FormLabel fontWeight="bold">Category</FormLabel>
                  <Select {...field} placeholder="Select category">
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Select>

                  <ErrorMessage
                    name="category"
                    component={Text}
                    color="red.500"
                    mt={1}
                  />
                </FormControl>
              )}
            </Field>

            <div>
              <FormControl
                id="content"
                mb={4}
                isInvalid={formik.errors.content && formik.touched.content}
              >
                <FormLabel fontWeight="bold">News Content</FormLabel>
                <div className="text-editor">
                  <ReactQuill
                    theme="snow"
                    value={formik.values.content}
                    onChange={(value) => formik.setFieldValue("content", value)}
                    onBlur={() => formik.setFieldTouched("content", true)}
                  />
                </div>
                <ErrorMessage
                  name="content"
                  component={Text}
                  color="red.500"
                  mt={1}
                />
              </FormControl>
            </div>

            <Field name="keywords">
              {({ field, form }) => (
                <FormControl
                  id="keywords"
                  mb={4}
                  isInvalid={form.errors.keywords && form.touched.keywords}
                >
                  <FormLabel fontWeight="bold">Keywords</FormLabel>
                  <TagsInput
                    value={field.value}
                    onChange={(tags) => form.setFieldValue("keywords", tags)}
                  />
                  <ErrorMessage
                    name="keywords"
                    component={Text}
                    color="red.500"
                    mt={1}
                  />
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              size="md"
              variant="solid"
              isLoading={formik.isSubmitting}
            >
              Create Article
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withAuth(CreateArticlePage);
