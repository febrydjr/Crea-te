import { Box, Container, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import {
  FiMail,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiGithub,
  FiGitBranch,
  FiGitCommit,
  FiGitPullRequest,
  FiGitlab,
  FiLinkedin,
} from "react-icons/fi";

function Footer() {
  return (
    <Box
      fontFamily={"monospace"}
      m={"auto"}
      bg="#378BA4"
      color="white"
      py={8}
      as="footer"
    >
      <Container maxW="container.lg" h="100%">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} h="100%">
          <Box>
            <Text fontSize={"lg"} fontWeight="bold" mb={4}>
              Newsletter
            </Text>
            <Text fontSize={"sm"}>
              Sign up for our newsletter to receive updates and news about our
              latest articles.
            </Text>
            {/* Add your newsletter subscription form here */}
          </Box>
          <Box fontSize="sm">
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Social Media
            </Text>
            <Flex align="center">
              <FiTwitter size={20} />
              <Link href="#" ml={2}>
                Twitter
              </Link>
              <Flex ml={10} align="center">
                <FiMail size={20} />
                <Link href="#" ml={2}>
                  E-mail
                </Link>
              </Flex>
            </Flex>
            <Flex align="center" mt={2}>
              <FiFacebook size={20} />
              <Link href="#" ml={2}>
                Facebook
              </Link>
              <Flex ml={8} align="center">
                <FiGithub size={20} />
                <Link href="#" ml={2}>
                  GitHub
                </Link>
              </Flex>
            </Flex>
            <Flex align="center" mt={2}>
              <FiInstagram size={20} />
              <Link href="#" ml={2}>
                Instagram
              </Link>
              <Flex ml={6} align="center">
                <FiLinkedin size={20} />
                <Link href="#" ml={2}>
                  LinkedIn
                </Link>
              </Flex>
            </Flex>
            {/* <Flex align="center" mt={2}>
              <FiMail size={20} />
              <Link href="#" ml={2}>
                E-mail
              </Link>
            </Flex> */}
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              About Us
            </Text>
            <Text fontSize="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
              ullamcorper mauris, eu vulputate ligula.
            </Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Contact Us
            </Text>
            <Text fontSize={"sm"}>Email: febrydj99@gmailcom</Text>
            <Text fontSize={"sm"}>Phone: 085763167141</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Footer;
