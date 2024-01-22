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
  useToast,
} from "native-base";
import React, { useState } from "react";
import { CustomToast } from "../../components/CustomToast";
import { useAuth } from "../../contexts/AuthContext";
import { signUp } from "../../services/auth";
import { UserStatus } from "../../types";

export function SignUp() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState<UserStatus | string>(
    UserStatus.Available
  );
  const navigation = useNavigation();
  const { setUser } = useAuth();
  const toast = useToast();
  const handleEmailChange = (value: string) => {
    setEmail(value.toLowerCase());
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleSubmitSignUp = () => {
    signUp(email.toLowerCase(), password, name, avatar, status)
      .then((user) => {
        setUser({ ...user, loggedIn: true });
      })
      .catch((error) => {
        toast.show({
          render: () => (
            <CustomToast
              id="signup-failure"
              title="Failed to Sign Up"
              description={error.message}
              status="error"
              variant="solid"
              onClose={() => toast.close("signup-failure")}
            />
          ),
          placement: "top",
        });
        console.log(error);
      });
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
        h="65%"
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
          Sign Up
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
            value={name}
            onChangeText={handleNameChange}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Name"
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
          onPress={handleSubmitSignUp}
          mt="60px"
          width="100%"
          h={60}
          borderRadius={10}
          bg="orange.500"
          isDisabled={!email || !password || !name}
          _text={{
            fontFamily: "Roboto_400Regular",
          }}
        >
          Sign Up
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" fontFamily="Roboto_400Regular">
            Do you have an account?{" "}
          </Text>
          <Link
            _text={{
              color: "orange.500",
              fontWeight: "medium",
              fontSize: "sm",
              fontFamily: "Roboto_400Regular",
            }}
            onPress={() => navigation.navigate("Login")}
          >
            Login Here
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
