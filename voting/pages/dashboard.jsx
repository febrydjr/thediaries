import {
  Grid,
  Image,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  VStack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  Dashboard.title = "Diary";
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }

  const [search, setSearch] = useState("");
  const data = [
    {
      id: 1,
      title: "Title 1",
      notes: "This is notes for Title 1",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
    {
      id: 2,
      title: "Title 2",
      notes:
        "0This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2This is notes for Title 2",
    },
  ];

  const total = data.length + 1;
  const imageUrl =
    "https://clipart-library.com/2023/desktop-wallpaper-notebook-notepad-mobile-phones-notepad-transparent-cartoon-clipart-silhouettes.jpg";

  const images = Array.from({ length: total }, (_, index) => imageUrl);

  const chunkedImages = [];
  for (let i = 0; i < total; i += 5) {
    chunkedImages.push(images.slice(i, i + 5));
  }

  const handleAddNew = () => {
    console.log("Adding a new entry...");
  };

  return (
    <Box bg={"#F7F7F7"} h={data.length < 5 ? "100vh" : "100%"}>
      <Stack
        bgColor={"#F7F7F7"}
        mx={6}
        py={6}
        mr={6}
        direction={"row"}
        align={"center"}
        spacing={6}
      >
        <Image
          cursor={"pointer"}
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          w={"80px"}
          borderRadius={20}
          src="https://play-lh.googleusercontent.com/tWyvyETE6twEP9Vie_B_N702jzqzLqkjfVwOn5qxbobzKeKE0kzMQbdBcBX1-E7I9g"
        />
        <FormControl>
          <FormLabel>Search Diaries:</FormLabel>
          <InputGroup>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
            <InputRightAddon
              cursor="pointer"
              bg={"#EAFFD0"}
              color={"black"}
              onClick={() => {
                alert(`Result: ${search}`);
              }}
              children="Submit"
            />
          </InputGroup>
          <FormHelperText>
            Can be used to search for diary titles and contents
          </FormHelperText>
        </FormControl>
      </Stack>

      <Grid templateColumns="repeat(5, 1fr)" gap={0} position="relative">
        {chunkedImages.map((chunk, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {chunk.map((_, columnIndex) => {
              const dataIndex = rowIndex * 5 + columnIndex;
              if (dataIndex < data.length) {
                const { title, notes } = data[dataIndex];
                return (
                  <Box key={`${rowIndex}-${columnIndex}`} position="relative">
                    <Image
                      src={imageUrl}
                      alt={`Image ${rowIndex * 5 + columnIndex + 1}`}
                      maxH="100%"
                      maxW="100%"
                      boxSize="100%"
                      objectFit="cover"
                    />
                    <Box
                      maxW={"70%"}
                      position="absolute"
                      top="57px"
                      left="75px"
                    >
                      <Text
                        zIndex={1}
                        color="black"
                        fontSize="10px"
                        textAlign="left"
                        overflowWrap="break-word"
                      >
                        {notes}
                      </Text>
                    </Box>
                    <Box
                      maxW={"70%"}
                      position="absolute"
                      top="35px"
                      left="75px"
                    >
                      <Text
                        zIndex={1}
                        fontWeight="bold"
                        color="black"
                        fontSize="11px"
                        textAlign="left"
                      >
                        Title: {title}
                      </Text>
                    </Box>
                  </Box>
                );
              }
              return (
                <Box
                  key={`add-new-${rowIndex}-${columnIndex}`}
                  position="relative"
                  //   cursor="pointer"
                >
                  <Image
                    src={imageUrl}
                    alt={`Add New Entry`}
                    maxH="100%"
                    maxW="100%"
                    boxSize="100%"
                    objectFit="cover"
                  />
                  <Text
                    position="absolute"
                    top="48%"
                    left="51%"
                    transform="translate(-50%, -50%)"
                    color="black"
                    fontSize="16px"
                    fontWeight="bold"
                  >
                    <Button
                      bg="#EAFFD0"
                      onClick={handleAddNew}
                      border={"1px solid black"}
                    >
                      Add New Diary
                    </Button>
                  </Text>
                </Box>
              );
            })}
            {chunk.length < 5 &&
              Array.from({ length: 5 - chunk.length }).map((_, emptyIndex) => (
                <div key={`empty-${rowIndex}-${emptyIndex}`} />
              ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
