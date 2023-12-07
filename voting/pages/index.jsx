import { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const SignIn = () => {
  SignIn.title = "Sign In";
  const [credentials, setCredentials] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", { credentials });
      localStorage.setItem("token", response.data.token);
      toast({
        title: "Logged in!",
        description: "Logged in successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.response.data);
      toast({
        title: "Error!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setCredentials(event.target.value);
  };

  return (
    <Container
      bgImage={"dal.png"}
      maxW="100vw"
      h={"100vh"}
      p={{ base: 5, md: 10 }}
    >
      <Center>
        <Stack spacing={8}>
          <Stack align="center">
            <Image
              w={"100px"}
              borderRadius={20}
              src="https://play-lh.googleusercontent.com/tWyvyETE6twEP9Vie_B_N702jzqzLqkjfVwOn5qxbobzKeKE0kzMQbdBcBX1-E7I9g"
            />
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={1}
          >
            <VStack spacing={4} w="100%">
              <Text fontWeight={"bold"}>LOGIN TO ACCESS YOUR DIARIES!</Text>
              <FormControl id="password">
                <FormLabel>Login Credentials</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={"password"}
                    value={credentials}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%">
            <Stack direction="row" justifyContent="space-between" w="100%">
                <Text fontSize={"xs"} mb={2} textAlign={"justify"}>
                Input the existing Login Credentials created during registration. Please remember! Keep your login credentials safe.
                </Text>
              </Stack>
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Link
                  href="/register"
                  color={"blue.400"}
                  textDecoration={"underline"}
                  fontSize={{ base: "sm", sm: "sm" }}

                >
                  Create account?
                </Link>
              </Stack>
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: "green.500",
                }}
                rounded="md"
                w="100%"
                onClick={handleSignIn}
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SignIn;
