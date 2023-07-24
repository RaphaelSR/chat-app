import { Avatar, Menu, Pressable } from "native-base";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

interface UserAvatarProps {
  source: { uri: string };
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ source }) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <Avatar size="48px" source={source} />
          </Pressable>
        );
      }}
    >
      <Menu.Item onPress={() => console.log("Profile")}>Profile</Menu.Item>
      <Menu.Item onPress={handleLogout}>Logout</Menu.Item>
    </Menu>
  );
};
