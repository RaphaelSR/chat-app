import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  Modal,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateUserAvatar } from "../../services/db";
import { resizeImage } from "../../utils/resizeImage";
import { uploadImage } from "../../utils/uploadImage";

export function Profile() {
  const { user, setUser } = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleImage = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      const resizedImageUri = await resizeImage(newUri);
      uploadAvatar(resizedImageUri);
    }
  };

  const uploadAvatar = async (uri: string) => {
    try {
      const id = user?.userId as string;
      const avatarUrl = await uploadImage(uri, id);
      await updateUserAvatar(id, avatarUrl as string);
    } catch (error) {}
  };

  const getImage = async (source: "camera" | "library") => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        ...options,
        aspect: [4, 3],
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        ...options,
        aspect: [4, 3],
      });
    }

    handleImage(result);
  };

  const pickImage = async () => {
    getImage("library");
  };
  const takePhoto = async () => {
    getImage("camera");
  };
  const handleAvatarChange = () => {
    setModalVisible(true);
  };

  return (
    <Box flex={1} safeArea>
      <HStack
        bg="primary.500"
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<Entypo name="chevron-small-left" size={24} color="white" />}
        />
        <Heading size="md" color="white">
          Profile
        </Heading>
        <Box size={8} />
      </HStack>
      <Center flex={1}>
        <VStack space={4} alignItems="center">
          <Avatar
            size="2xl"
            source={{ uri: user?.avatar }}
            _text={{ fontSize: "xl", fontWeight: "bold" }}
          />
          <Text fontSize="xl" fontWeight="bold">
            {user?.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            ID: {user?.email}
          </Text>
        </VStack>
      </Center>
      <Button onPress={handleAvatarChange}>Change Avatar</Button>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Change Avatar</Modal.Header>
          <Modal.Body>
            <Button onPress={pickImage}>Escolher da biblioteca</Button>
            <Button onPress={takePhoto}>Tirar foto</Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
