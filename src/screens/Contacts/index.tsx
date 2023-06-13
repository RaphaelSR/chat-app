import { Entypo } from "@expo/vector-icons/";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  ScrollView,
} from "native-base";
import React from "react";

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
          <Icon as={<Entypo name="plus" />} size="xl" color="blueGray.800" />
          <Heading p="4" pb="3" fontSize="18px" fontFamily="Roboto-bold">
            Contacts
          </Heading>
          <Avatar
            size="48px"
            source={{
              uri: "https://avatars.githubusercontent.com/u/12202804?v=4",
            }}
          />
        </HStack>

        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </Box>
    </Center>
  );
}
