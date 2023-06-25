import { Entypo, MaterialIcons } from "@expo/vector-icons/";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { UserData } from "../../data/MockedUsers";

export function ContactList({ chatData }: { chatData: UserData[] }) {
  const sortedChatData = [...chatData].sort(
    (a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
  );
  const [chatListData, setChatListData] = useState<UserData[]>(sortedChatData);

  const closeChatRow = (
    rowMap: { [x: string]: { closeRow: () => void } },
    rowKey: string | number
  ) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteChatRow = (
    rowMap: { [x: string]: { closeRow: () => void } },
    rowKey: string | number
  ) => {
    closeChatRow(rowMap, rowKey);
    const updatedData = [...chatListData];
    const previousIndex = chatListData.findIndex((item) => item.key === rowKey);
    updatedData.splice(previousIndex, 1);
    setChatListData(updatedData);
  };

  const onChatRowOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const renderChatItem = ({ item }: { item: UserData }) => (
    <Pressable
      onPress={() => console.log("Chat item pressed")}
      _dark={{ bg: "coolGray.800" }}
      _light={{ bg: "white" }}
      borderColor="gray.100"
      borderBottomWidth="1px"
    >
      <Box pl="4" pr="4" pb="1" mt="4">
        <HStack alignItems="center" space={3}>
          <Avatar size="48px" source={{ uri: item.avatarUrl }} />
          <VStack>
            <Text color="blueGray.800" _dark={{ color: "warmGray.50" }} bold>
              {item.fullName}
            </Text>
            <Text color={"warmGray.400"} _dark={{ color: "warmGray.200" }}>
              Last seen recently
            </Text>
          </VStack>
          <Spacer />
          <VStack alignItems="center">
            <Text
              fontSize="xs"
              fontFamily="Roboto_400Regular"
              color="orange.500"
              _dark={{ color: "warmGray.50" }}
              alignSelf="flex-start"
            >
              Message
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );

  const renderHiddenChatItem = (
    data: { item: UserData },
    rowMap: { [x: string]: { closeRow: () => void } | { closeRow: () => void } }
  ) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="blueGray.800"
        justifyContent="center"
        onPress={() => closeChatRow(rowMap, data.item.key)}
        _pressed={{ opacity: 0.5 }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="white"
          />
          <Text fontSize="xs" fontWeight="medium" color="white">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteChatRow(rowMap, data.item.key)}
        _pressed={{ opacity: 0.5 }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" flex="1">
      <SwipeListView
        data={chatListData}
        renderItem={renderChatItem}
        renderHiddenItem={renderHiddenChatItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onChatRowOpen}
      />
    </Box>
  );
}
