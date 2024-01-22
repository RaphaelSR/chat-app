import { Entypo, MaterialIcons } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  VStack,
  useToast,
} from "native-base";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { useAuth } from "../../contexts/AuthContext";
import { deleteContactFromFirebase } from "../../services/db";
import { Contact } from "../../types";
import { CustomToast } from "../CustomToast";

type RootStackParamList = {
  ChatRoom: { user: Contact };
};

interface ContactListProps {
  contactData: Contact[];
  fetchContacts: () => void;
}

export function ContactList({ contactData, fetchContacts }: ContactListProps) {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "ChatRoom">>();

  const { user } = useAuth();
  const toast = useToast();

  const closeContactRow = (rowMap: any, rowKey: string | number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteContactRow = async (
    rowMap: any,
    rowKey: string | any,
    userId: string | any
  ) => {
    const deleteSuccess = await deleteContactFromFirebase(userId, rowKey);
    if (deleteSuccess) {
      closeContactRow(rowMap, rowKey);
      fetchContacts();
      toast.show({
        render: () => (
          <CustomToast
            id="delete-contact-success"
            title="Success"
            description="Contact deleted successfully!"
            status="success"
            variant="solid"
            onClose={() => toast.close("delete-contact-success")}
          />
        ),
        placement: "top",
      });
    } else {
      console.error("Erro ao deletar contato da lista de contatos");
      toast.show({
        render: () => (
          <CustomToast
            id="delete-contact-failure"
            title="Error"
            description="Failed to delete contact!"
            status="error"
            variant="solid"
            onClose={() => toast.close("delete-contact-failure")}
          />
        ),
        placement: "top",
      });
    }
  };

  const onContactRowOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <Pressable
      onPress={() => navigation.navigate("ChatRoom", { user: item })}
      _dark={{ bg: "coolGray.800" }}
      _light={{ bg: "white" }}
      borderColor="gray.100"
      borderBottomWidth="1px"
    >
      <Box pl="4" pr="4" pb="1" mt="4">
        <HStack alignItems="center" space={3}>
          <Avatar size="48px" source={{ uri: item.avatar }} />
          <VStack>
            <Text color="blueGray.800" _dark={{ color: "warmGray.50" }} bold>
              {item.name}
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

  const renderHiddenContactItem = (
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
        onPress={() => closeContactRow(rowMap, data.item.userId)}
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
        onPress={() => deleteContactRow(rowMap, data.item.userId, user?.userId)}
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
        data={contactData}
        keyExtractor={(item) => item.userId}
        renderItem={renderContactItem}
        renderHiddenItem={renderHiddenContactItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onContactRowOpen}
      />
    </Box>
  );
}
