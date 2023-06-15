import React, { useState } from "react";
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
import VerifyPage from "./VerifyPage";
import Dropzone from "react-dropzone";

const TestProfile = () => {
  const [activePage, setActivePage] = useState("changepassword");
  const [avatar, setAvatar] = useState("");

  const renderPage = () => {
    switch (activePage) {
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
    <Flex>
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
                  size="xl"
                  src={avatar || "/path-to-default-avatar.png"}
                />
              </div>
            )}
          </Dropzone>
          <Divider />
          <Link
            onClick={() => setActivePage("changepassword")}
            color={activePage === "changepassword" ? "blue.500" : "inherit"}
          >
            Change Password
          </Link>
          <Link
            onClick={() => setActivePage("resetpassword")}
            color={activePage === "resetpassword" ? "blue.500" : "inherit"}
          >
            Reset Password
          </Link>
          <Link
            onClick={() => setActivePage("verify")}
            color={activePage === "verify" ? "blue.500" : "inherit"}
          >
            Verify
          </Link>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={4}>
        {renderPage()}
      </Box>
    </Flex>
  );
};

export default TestProfile;
