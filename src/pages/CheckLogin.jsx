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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeArticle } from "../utils/ArticleReducer";

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
    <Box
      fontFamily={"monospace"}
      mt={"20px"}
      mb={"20px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack boxShadow={"lg"} rounded={"xl"} padding={10}>
        <Text fontSize={"4xl"} mb={4}>
          Create Article
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex>
            <Box mr={10}>
              <Input
                border={"1px solid #378BA4"}
                placeholder="Upload Image"
                type="file"
                id="file"
                variant={"outline"}
                colorScheme="facebook"
                mb={"10px"}
                onChange={handleImageUpload}
              />
              {selectedImage && (
                <Box mb={8} position={"relative"}>
                  <img
                    src={selectedImage}
                    alt="Image Preview"
                    style={{
                      maxWidth: "300px",
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
  );
};

export default SimpleGridChakra;
