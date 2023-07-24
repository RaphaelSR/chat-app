import { Entypo } from "@expo/vector-icons/";
import { Box, Center, HStack, Heading, Icon, Pressable } from "native-base";
import React from "react";
import { ContactList } from "../../components/ContactList";
import { UserAvatar } from "../../components/UserAvatar";
import { chatData } from "../../data/MockedUsers";

export function Contacts() {
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
          <Pressable
            width={"38px"}
            height={"38px"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"6px"}
            backgroundColor={"gray.100"}
          >
            <Icon as={<Entypo name="plus" />} size="xl" color="gray.400" />
          </Pressable>
          <Heading p="4" fontSize="18px" fontFamily="Roboto_700Bold">
            Contacts
          </Heading>
          <UserAvatar
            source={{
              uri: "https://avatars.githubusercontent.com/u/12202804?v=4",
            }}
          />
        </HStack>

        <ContactList chatData={chatData} />
      </Box>
    </Center>
  );
}
