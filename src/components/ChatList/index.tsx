import { Entypo, MaterialIcons } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";
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
import { Contact } from "../../types";
import { UnreadMessagesBadge } from "../UnreadMessagesBadge";

export function ChatList({ chatData }: { chatData: Contact[] }) {
  const navigation = useNavigation();
  const sortedChatData = [...chatData].sort(
    (a, b) =>
      b.chat.messages[b.chat.messages.length - 1].timestamp.getTime() -
      a.chat.messages[a.chat.messages.length - 1].timestamp.getTime()
  );
  const [chatListData, setChatListData] = useState<Contact[]>(sortedChatData);

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
    const previousIndex = chatListData.findIndex(
      (item) => item.userId === rowKey
    );
    updatedData.splice(previousIndex, 1);
    setChatListData(updatedData);
  };

  const onChatRowOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const renderChatItem = ({ item }: { item: Contact }) => (
    <Pressable
      onPress={() => navigation.navigate("ChatRoom", { user: item })}
      _dark={{ bg: "coolGray.800" }}
      _light={{ bg: "white" }}
      paddingY={2}
      borderColor="gray.100"
      borderBottomWidth="1px"
    >
      <Box pl="4" pr="4" py="4">
        <HStack alignItems="center" space={3}>
          <Avatar size="48px" source={{ uri: item.avatar }} />
          <VStack>
            <Text color="blueGray.800" _dark={{ color: "warmGray.50" }} bold>
              {item.name}
            </Text>
            {item.chat.messages && (
              <Text
                color={
                  item.chat.messages[item.chat.messages.length - 1]
                    .unreadCount > 0
                    ? "orange.500"
                    : "blueGray.600"
                }
                _dark={{ color: "warmGray.200" }}
              >
                {item.chat.messages[item.chat.messages.length - 1].textContent}
              </Text>
            )}
          </VStack>
          <Spacer />
          <VStack alignItems="center">
            <Text
              fontSize="xs"
              color="coolGray.400"
              _dark={{ color: "warmGray.50" }}
              alignSelf="flex-start"
            >
              {new Date(
                item.chat.messages[item.chat.messages.length - 1].timestamp
              ).toLocaleTimeString()}
            </Text>
            {item.chat.messages[item.chat.messages.length - 1].unreadCount >
              0 && (
              <UnreadMessagesBadge
                messages={
                  item.chat.messages[item.chat.messages.length - 1].unreadCount
                }
              />
            )}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );

  const renderHiddenChatItem = (
    data: { item: Contact },
    rowMap: { [x: string]: { closeRow: () => void } | { closeRow: () => void } }
  ) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="blueGray.800"
        justifyContent="center"
        onPress={() => closeChatRow(rowMap, data.item.userId)}
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
        onPress={() => deleteChatRow(rowMap, data.item.userId)}
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
      {/* //TODO: Fix swipe list view */}
      {/* <SwipeListView
        data={chatListData}
        renderItem={renderChatItem}
        renderHiddenItem={renderHiddenChatItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onChatRowOpen}
      /> */}
    </Box>
  );
}
