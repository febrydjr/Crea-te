import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// import SideLogo from "../assets/logo_purple.png";
// import ForgotPassModal from "../components/ForgotPassModal";
import { loginSuccess } from "../utils/AuthReducer";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Link, navigate, useNavigate } from "react-router-dom";
import { setAuthStatus } from "../utils/auth";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const LoginPage = () => {
  const [show, setShow] = React.useState(false);
  const handleClickShowPW = () => setShow(!show);
  const navigate = useNavigate();
  // modal for forgot password
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onForgot = () => {
    onOpen();
  };

  // username, email, and phone in one input
  function whichType(username) {
    if (username.match(/\d+/)) return "phone";
    if (username.match(/^[\w\.]+@\w+\.\w{2,3}/)) return "email";
    return "username";
  }

  // auth
  const dispatch = useDispatch();
  // const loginButton = useSelector((state) => state.AuthReducer.login);

  const login = async (values) => {
    try {
      const { username, email, phone, password } = values;
      const res = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        {
          username: username,
          email: email,
          phone: phone,
          password: password,
        }
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(loginSuccess(res.data.token));
        setAuthStatus(true);
        toast({
          title: "Login successful!",
          description: "Happy to see you again!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Login failed!",
        description: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  // validation
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values);
      onClose();
    },
  });

  return (
    <Box
      boxShadow={"lg"}
      p={4}
      fontFamily={"monospace"}
      margin={"auto"}
      mt={20}
      mb={20}
      w={"20%"}
      h={"350px"}
      borderRadius={4}
    >
      {/* <Flex> */}
      {/* <Box w={"40%"} h={"100vh"} bgColor={"#E0AAFF"}>
          <Link to={"/"}>
            <Image
              src="https://picsum.photos/200"
              h={"30px"}
              m={"30px 60px"}
              _hover={{ filter: "brightness(150%)", transition: "300ms" }}
            />
          </Link>
          <Text
            fontSize={"lg"}
            fontWeight={"bold"}
            color={"#6C12B5"}
            m={"30px 60px"}
          >
            A professional writer is an amateur who didn't quit.” <br /> ~
            Richard Bach
          </Text>
        </Box> */}
      <Box>
        {/* <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={4}
            p={"20px 40px"}
          >
            <Text>Not a member?</Text>
            <Button
              as={"a"}
              fontSize={"md"}
              fontWeight={400}
              variant={"link"}
              href={"/sign-up"}
              color={"#9D4EDD"}
            >
              Sign up now
            </Button>
          </Box> */}
        {/* <VStack spacing={"4"} p={"20px 50px"}> */}
        <Box w={"200px"}>
          <Text
            w={"100%"}
            // fontSize={"xx-large"}
            display={"flex"}
            justifyContent={"flex-start"}
            fontWeight={"bold"}
            mb={4}
            fontSize={"4xl"}
          >
            Log In!
          </Text>
          {/* <Text
                fontSize={"xs"}
                color={"gray.400"}
                fontStyle={"italic"}
                align={"left"}
              >
                You can login by username, email, or phone number
              </Text> */}
        </Box>
        <Box w={"full"}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                value={formik.values.email}
                rounded={"lg"}
              />
              {formik.touched.email && formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel htmlFor="password" mt={"4"}>
                <Flex alignItems={"baseline"} justifyContent={"space-between"}>
                  Password
                  {/* <Button variant={"link"} onClick={onForgot}>
                    <Text
                      fontSize={"xs"}
                      fontWeight={400}
                      color={"blue"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Forgot Password?
                    </Text>
                  </Button> */}
                </Flex>
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  rounded={"lg"}
                />
                <InputRightElement>
                  <Button h="42px" size="sm" onClick={handleClickShowPW}>
                    {show ? (
                      <AiFillEyeInvisible size={"23px"} />
                    ) : (
                      <AiFillEye size={"23px"} />
                    )}
                  </Button>
                </InputRightElement>
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>
            <Button
              rightIcon={<ArrowForwardIcon />}
              type="submit"
              display={"flex"}
              justifyContent={"center"}
              w={"100%"}
              mt={"8"}
              rounded={"lg"}
              color={"white"}
              colorScheme={"facebook"}
              // _hover={{ bgColor: "blue" }}
              // _active={{ bgColor: "#6C12B5" }}
            >
              Login
            </Button>
          </form>
        </Box>
        {/* </VStack> */}
      </Box>
      {/* </Flex> */}
    </Box>
  );
};

export default LoginPage;
