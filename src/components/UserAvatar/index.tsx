import { useNavigation } from "@react-navigation/native";
import { Avatar, Menu, Pressable } from "native-base";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { logout } from "../../services/auth";
import { updateUserStatus } from "../../services/db";
import { UserStatus } from "../../types";
import { StatusModal } from "../StatusModal";

interface UserAvatarProps {
  source: { uri: string };
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ source }) => {
  const { user, setUser } = useAuth();
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (status: UserStatus | string) => {
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    try {
      await updateUserStatus(user.userId, status);
      setUser({ ...user, status });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Menu
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Avatar size="48px" source={source} />
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={() => setStatusModalOpen(true)}>Status</Menu.Item>
        <Menu.Item onPress={() => navigation.navigate("Profile")}>
          Profile
        </Menu.Item>
        <Menu.Item onPress={handleLogout}>Logout</Menu.Item>
      </Menu>
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onSubmit={handleStatusUpdate}
        currentStatus={user?.status}
      />
    </>
  );
};
