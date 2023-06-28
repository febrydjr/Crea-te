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
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import ChangePasswordPage from "./ChangePasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import VerifyPage from "./VerificationPage";
import Dropzone from "react-dropzone";
import ProfilePage from "./ProfilePage";

import ForgotPassModal from "../components/ForgotPassModal";
import ChangeUsernameModal from "../components/ChangeUsernameModal";
import ChangePhoneModal from "../components/ChangePhoneModal";
import ChangeEmailModal from "../components/ChangeEmailModal";
import MyBlogsPage from "./MyBlogsPage";

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
      return null;
    }

    return <Component {...props} />;
  };
}

const SidebarProfile = () => {
  const [activePage, setActivePage] = useState("updateprofile");
  const [avatar, setAvatar] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUsername,
    onOpen: onOpenUsername,
    onClose: onCloseUsername,
  } = useDisclosure();

  const {
    isOpen: isOpenPhone,
    onOpen: onOpenPhone,
    onClose: onClosePhone,
  } = useDisclosure();

  const {
    isOpen: isOpenEmail,
    onOpen: onOpenEmail,
    onClose: onCloseEmail,
  } = useDisclosure();

  const onForgot = () => {
    onOpen();
  };
  const onUsernameChange = () => {
    onOpenUsername();
  };
  const onEmailChange = () => {
    onOpenEmail();
  };
  const onPhoneChange = () => {
    onOpenPhone();
  };
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
      <Box bg="gray.200" w="230px" p={4}>
        <VStack align="flex-start" spacing={4}>
          <Dropzone onDrop={handleDrop} multiple={false} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{ outline: "none", cursor: "pointer" }}
              >
                <input {...getInputProps()} />
                <Avatar
                  ml={"50%"}
                  mt={4}
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
            ml={4}
            onClick={() => setActivePage("updateprofile")}
            color={activePage === "updateprofile" ? "blue.300" : "inherit"}
          >
            My Blog
          </Link>
          <Accordion defaultIndex={[]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton mt={"-10px"}>
                  <Box display={"flex"} fontWeight={"bold"} textAlign="left">
                    Account Settings
                  </Box>
                  <AccordionIcon font ml={1} />
                </AccordionButton>
              </h2>
              <AccordionPanel mt={"-10px"}>
                <Link
                  fontSize={"md"}
                  // mt={2}
                  // fontWeight={"bold"}
                  ml={2}
                  onClick={onUsernameChange}
                  color={
                    activePage === "changeusername" ? "blue.300" : "inherit"
                  }
                >
                  Change Username
                </Link>
                <br />
                <Link
                  fontSize={"md"}
                  mt={2}
                  // fontWeight={"bold"}
                  ml={2}
                  onClick={onPhoneChange}
                  color={activePage === "changephone" ? "blue.300" : "inherit"}
                >
                  Change Phone
                </Link>
                <br />
                <Link
                  fontSize={"md"}
                  mt={2}
                  // fontWeight={"bold"}
                  ml={2}
                  onClick={onEmailChange}
                  color={activePage === "changeemail" ? "blue.300" : "inherit"}
                >
                  Change Email
                </Link>
                <br />
                <Link
                  fontSize={"md"}
                  mt={2}
                  // fontWeight={"bold"}
                  ml={2}
                  onClick={() => setActivePage("changepassword")}
                  color={
                    activePage === "changepassword" ? "blue.300" : "inherit"
                  }
                >
                  Change Password
                </Link>
                <br />
                <Link
                  fontSize={"md"}
                  // fontWeight={"bold"}
                  mt={2}
                  ml={4}
                  onClick={onForgot}
                  color={
                    activePage === "resetpassword" ? "blue.300" : "inherit"
                  }
                >
                  Reset Password
                </Link>
                <br />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Box>
      <ForgotPassModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <ChangeUsernameModal
        isOpen={isOpenUsername}
        onOpen={onOpenUsername}
        onClose={onCloseUsername}
      />
      <ChangePhoneModal
        isOpen={isOpenPhone}
        onOpen={onOpenPhone}
        onClose={onClosePhone}
      />
      <ChangeEmailModal
        isOpen={isOpenEmail}
        onOpen={onOpenEmail}
        onClose={onCloseEmail}
      />
      {/* Main Content */}
      <Box flex="1" p={4}>
        {renderPage()}
      </Box>
    </Flex>
  );
};

export default withAuth(SidebarProfile);
