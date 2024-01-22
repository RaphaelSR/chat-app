import { Entypo } from "@expo/vector-icons/";
import { Box, Center, HStack, Heading, Icon, Pressable } from "native-base";
import React, { useEffect, useState } from "react";
import { AddContactModal } from "../../components/AddContactModal"; // Importe o novo modal
import { ContactList } from "../../components/ContactList";
import { UserAvatar } from "../../components/UserAvatar";
import { useAuth } from "../../contexts/AuthContext";
import { getContactsFromFirebase } from "../../services/db";
import { Contact } from "../../types";

export function Contacts() {
  const { user } = useAuth();
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(user?.contacts || []);

  const fetchContacts = async () => {
    if (user && user.userId) {
      const contacts = await getContactsFromFirebase(user.userId);
      if (contacts && contacts.length > 0) {
        const sortedContacts = contacts.sort((a, b) => {
          const aLastMessage = a.lastMessage
            ? new Date(a.lastMessage.timestamp)
            : new Date(0);
          const bLastMessage = b.lastMessage
            ? new Date(b.lastMessage.timestamp)
            : new Date(0);
          return bLastMessage.getTime() - aLastMessage.getTime();
        });
        setContacts(sortedContacts);
      } else {
        setContacts([]);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = (newContact: Contact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

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
            onPress={() => setIsAddContactModalOpen(true)}
          >
            <Icon as={<Entypo name="plus" />} size="xl" color="gray.400" />
          </Pressable>
          <Heading p="4" fontSize="18px" fontFamily="Roboto_700Bold">
            Contacts
          </Heading>
          <UserAvatar
            source={{
              uri: user?.avatar,
            }}
          />
        </HStack>

        {user && (
          <ContactList contactData={contacts} fetchContacts={fetchContacts} />
        )}
        {user && (
          <AddContactModal
            isOpen={isAddContactModalOpen}
            onClose={() => setIsAddContactModalOpen(false)}
            onSubmit={handleAddContact}
            currentUser={{ userId: user.userId }}
            fetchContacts={fetchContacts}
          />
        )}
      </Box>
    </Center>
  );
}
