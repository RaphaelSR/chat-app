import { Entypo } from "@expo/vector-icons/";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { UserData } from "../../data/MockedUsers";

type RootStackParamList = {
  ChatRoom: { user: UserData };
};

type ChatRoomRouteProp = RouteProp<RootStackParamList, "ChatRoom">;

function truncate(string: string, maxLength: number) {
  if (string.length <= maxLength) {
    return string;
  }
  return string.slice(0, maxLength) + "...";
}

// Componente de botão de ícone
const IconButton = ({ iconName, color, bg, size, ...props }) => (
  <Pressable
    width={"38px"}
    height={"38px"}
    alignItems={"center"}
    justifyContent={"center"}
    borderRadius={"6px"}
    backgroundColor={bg}
    {...props}
  >
    <Icon as={<Entypo name={iconName} />} size={size} color={color} />
  </Pressable>
);

export function ChatRoom() {
  const route = useRoute<ChatRoomRouteProp>();
  const { user } = route.params;
  const navigation = useNavigation();

  return (
    <Center flex={1}>
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
        flex="1"
        safeAreaTop
        maxW="400px"
        w="100%"
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          paddingX={4}
          paddingBottom={2}
          borderColor="gray.100"
          borderBottomWidth="1px"
        >
          <IconButton
            iconName="chevron-small-left"
            bg="gray.100"
            color="gray.400"
            size="xl"
            onPress={() => navigation.goBack()}
          />
          <HStack alignItems={"center"}>
            <Avatar
              size="48px"
              mr="4"
              source={{
                uri: user.avatarUrl,
              }}
            />
            <VStack>
              <Heading fontSize="18px" fontFamily="Roboto_500Medium">
                {truncate(user.fullName, 10)}
              </Heading>
              <Text
                fontSize="xs"
                fontFamily="Roboto_400Regular"
                color="orange.500"
                _dark={{ color: "warmGray.50" }}
              >
                Online now
              </Text>
            </VStack>
          </HStack>
          <HStack>
            <IconButton
              iconName="video-camera"
              bg="gray.100"
              color="gray.400"
              size="md"
              mr="2"
            />
            <IconButton
              iconName="phone"
              bg="gray.100"
              color="gray.400"
              size="md"
            />
          </HStack>
        </HStack>
      </Box>
    </Center>
  );
}
