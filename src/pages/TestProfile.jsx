import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Flex,
  VStack,
  Text,
  Link,
  Divider,
} from "@chakra-ui/react";
import ChangePasswordPage from "./ChangePasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import VerifyPage from "./VerificationPage";
import Dropzone from "react-dropzone";
import ProfilePage from "./ProfilePage";

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
const TestProfile = () => {
  const [activePage, setActivePage] = useState("updateprofile");
  const [avatar, setAvatar] = useState("");

  const renderPage = () => {
    switch (activePage) {
      case "updateprofile":
        return <ProfilePage />;
      case "changepassword":
        return <ChangePasswordPage />;
      case "resetpassword":
        return <ResetPasswordPage />;
      case "verify":
        return <VerifyPage />;
      default:
        return null;
    }
  };

  const handleDrop = (acceptedFiles) => {
    // Assuming only one file is accepted
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Flex fontFamily={"monospace"}>
      {/* Sidebar */}
      <Box bg="gray.200" w="200px" p={4}>
        <VStack align="flex-start" spacing={4}>
          <Dropzone onDrop={handleDrop} multiple={false} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{ outline: "none", cursor: "pointer" }}
              >
                <input {...getInputProps()} />
                <Avatar
                  ml={"35%"}
                  size="xl"
                  src={avatar || "/path-to-default-avatar.png"}
                />
              </div>
            )}
          </Dropzone>
          <Divider />
          <Link
            fontSize={"md"}
            fontWeight={"bold"}
            ml={1}
            onClick={() => setActivePage("updateprofile")}
            color={activePage === "updateprofile" ? "blue.300" : "inherit"}
          >
            Update Profile
          </Link>
          <Link
            fontSize={"md"}
            fontWeight={"bold"}
            ml={1}
            onClick={() => setActivePage("changepassword")}
            color={activePage === "changepassword" ? "blue.300" : "inherit"}
          >
            Change Password
          </Link>
          <Link
            fontSize={"md"}
            fontWeight={"bold"}
            ml={1}
            onClick={() => setActivePage("resetpassword")}
            color={activePage === "resetpassword" ? "blue.300" : "inherit"}
          >
            Reset Password
          </Link>
          {/* <Link
            fontSize={"md"}
            fontWeight={"bold"}
            ml={1}
            onClick={() => setActivePage("verify")}
            color={activePage === "verify" ? "blue.300" : "inherit"}
          >
            Verify
          </Link> */}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={4}>
        {renderPage()}
      </Box>
    </Flex>
  );
};

export default withAuth(TestProfile);
