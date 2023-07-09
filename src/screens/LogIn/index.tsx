import { MaterialIcons } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";

export function LogIn() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleSubmitLogIn = () => {
    const userLogIn = { name, email, password };
    console.log(userLogIn);
  };
  return (
    <Box
      flex={1}
      safeArea
      bg={{
        linearGradient: {
          colors: [
            "darkBlue.800",
            "darkBlue.700",
            "darkBlue.600",
            "darkBlue.500",
            "darkBlue.400",
            "darkBlue.300",
          ],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <VStack
        position="absolute"
        borderTopLeftRadius={60}
        bottom={0}
        h="60%"
        w="100%"
        alignItems="center"
        p={30}
        bg="white"
      >
        <Heading
          size="xl"
          fontWeight="600"
          fontFamily="Roboto_700Bold"
          color="orange.500"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Log In
        </Heading>
        <FormControl isRequired alignItems="center" marginTop="42px">
          <Input
            w={{
              base: "100%",
              md: "25%",
            }}
            p="17px, 20px"
            bg={"warmGray.100"}
            borderWidth={0}
            fontFamily="Roboto_400Regular"
            borderRadius={10}
            value={email}
            onChangeText={handleEmailChange}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="mail" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Email"
          />
        </FormControl>
        <FormControl isRequired alignItems="center">
          <Input
            w={{
              base: "100%",
              md: "25%",
            }}
            p="17px, 20px"
            bg={"warmGray.100"}
            borderWidth={0}
            fontFamily="Roboto_400Regular"
            borderRadius={10}
            marginTop={4}
            type={show ? "text" : "password"}
            value={password}
            onChangeText={handlePasswordChange}
            InputLeftElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
          />
        </FormControl>
        <Button
          onPress={handleSubmitLogIn}
          mt="78px"
          width="100%"
          h={60}
          borderRadius={10}
          bg="orange.500"
          isDisabled={!email || !password}
          _text={{
            fontFamily: "Roboto_400Regular",
          }}
        >
          Login
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" fontFamily="Roboto_400Regular">
            Don't have an account?{" "}
          </Text>
          <Link
            _text={{
              color: "orange.500",
              fontWeight: "medium",
              fontSize: "sm",
              fontFamily: "Roboto_400Regular",
            }}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up here
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
