import { Button, Input, Modal, VStack, useToast } from "native-base";
import React, { useState } from "react";
import { CustomToast } from "../../components/CustomToast";
import { addContactToFirestore } from "../../services/db";
import { Contact } from "../../types";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newContact: Contact) => void;
  currentUser: { userId: string };
  fetchContacts: () => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  fetchContacts,
}) => {
  const [userId, setUserId] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const newContact = await addContactToFirestore(
        currentUser.userId,
        userId.toLowerCase()
      );
      if (newContact) {
        onSubmit(newContact);
        onClose();
        fetchContacts();
        toast.show({
          render: () => (
            <CustomToast
              id="add-contact-success"
              title="Success"
              description="Contact added successfully!"
              status="success"
              variant="solid"
              onClose={() => toast.close("add-contact-success")}
            />
          ),
          placement: "top",
        });
      } else {
        toast.show({
          render: () => (
            <CustomToast
              id="add-contact-failure"
              title="Failed"
              description="Contact not found!"
              status="error"
              variant="solid"
              onClose={() => toast.close("add-contact-failure")}
            />
          ),
          placement: "top",
        });
      }
    } catch (error) {
      toast.show({
        render: () => (
          <CustomToast
            id="add-contact-failure"
            title="Failed"
            description={error.message}
            status="error"
            variant="solid"
            onClose={() => toast.close("add-contact-failure")}
          />
        ),
        placement: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add New Contact</Modal.Header>
        <Modal.Body>
          <VStack space={4} width="100%">
            <Input
              placeholder="Enter the e-mail of the contact"
              value={userId}
              onChangeText={(text) => setUserId(text.toLowerCase())}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={handleSubmit}>Add Contact</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
