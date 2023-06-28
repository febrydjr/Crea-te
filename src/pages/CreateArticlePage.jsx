import {
  Box,
  Button,
  Heading,
  Input,
  Menu,
  MenuButton,
  Select,
  MenuItem,
  MenuList,
  Grid,
  Text,
  Textarea,
  FormLabel,
  Flex,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeArticle } from "../utils/ArticleReducer";
import { BsPencilFill } from "react-icons/bs";
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
const SimpleGridChakra = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategory(res.data);
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      country: document.getElementById("country").value,
      CategoryId: selectedOption,
      url: "/",
      keywords: document.getElementById("keywords").value,
    };
    const file = document.getElementById("file").files[0];
    dispatch(makeArticle(data, file));
  };

  return (
    <Box bgColor={"#E8EDE7"}>
      <Box
        fontFamily={"monospace"}
        // bgColor={""}

        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          mt={"40px"}
          mb={"40px"}
          bgColor={"white"}
          boxShadow={"dark-lg"}
          rounded={"xl"}
          padding={10}
        >
          <Flex display={"flex"} justifyContent={"flex-start"}>
            <Text mr={4} fontSize={"4xl"} mb={4}>
              Create Article
            </Text>
            <BsPencilFill size={30} />
          </Flex>
          <form onSubmit={handleSubmit}>
            <Flex>
              <Box mr={10}>
                <Flex>
                  {/* <FormLabel display={"flex"} alignItems={"center"}>
                  Image
                </FormLabel> */}
                  <Input
                    border={"1px solid #378BA4"}
                    type="file"
                    id="file"
                    variant={"outline"}
                    colorScheme="facebook"
                    mb={"10px"}
                    onChange={handleImageUpload}
                  />
                </Flex>
                {selectedImage && (
                  <Box mb={6} position={"relative"}>
                    <img
                      src={selectedImage}
                      alt="Image Preview"
                      style={{
                        maxWidth: "332px",
                        maxHeight: "300px",
                        marginTop: "10px",
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Box>
                <Input
                  type="text"
                  id="title"
                  mb={"10px"}
                  border={"1px solid #378BA4"}
                  placeholder={"Input Title"}
                />
                <Box alignSelf={"left"} mb={"20px"}>
                  <Select
                    mb={"10px"}
                    border={"1px solid #378BA4"}
                    value={selectedOption}
                    onChange={handleOptionChange}
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <option value="">Select Category</option>
                    {category &&
                      category.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                  <Input
                    type="text"
                    placeholder="Keyword"
                    id="keywords"
                    mb={"10px"}
                    border={"1px solid #378BA4"}
                  />

                  <Input
                    type="text"
                    placeholder="Country?"
                    id="country"
                    mb={"10px"}
                    border={"1px solid #378BA4"}
                  />
                </Box>
              </Box>
            </Flex>
            <Box>
              <Textarea
                placeholder="Input Your News Content"
                height={"300px"}
                w={"820px"}
                mb={"20px"}
                id="content"
                border={"1px solid #378BA4"}
              ></Textarea>
            </Box>
            <Button colorScheme="facebook" type="submit">
              CREATE!
            </Button>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default SimpleGridChakra;
