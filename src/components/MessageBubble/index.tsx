import { Avatar, Box, HStack, Text } from "native-base";
import React from "react";
import { Message } from "../../types";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
}: MessageBubbleProps) => {
  return (
    <HStack
      alignItems="center"
      space={2}
      my={1}
      ml={isCurrentUser ? "auto" : 0}
      mr={isCurrentUser ? 0 : "auto"}
    >
      {!isCurrentUser && (
        <Avatar size="sm" source={{ uri: message.sender.avatar }} />
      )}
      <Box
        py={2}
        px={3}
        rounded="lg"
        bg={isCurrentUser ? "blue.500" : "gray.200"}
        maxWidth="80%"
        alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
      >
        <Text color={isCurrentUser ? "white" : "black"}>
          {message.textContent}
        </Text>
      </Box>
    </HStack>
  );
};
