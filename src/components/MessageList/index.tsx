import { VStack } from "native-base";
import React from "react";
import { Message, User } from "../../types";
import { MessageBubble } from "../MessageBubble";

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUser,
}: MessageListProps) => {
  return (
    <VStack space={1} px={2}>
      {messages.map((message) => (
        <MessageBubble
          key={message.messageId}
          message={message}
          isCurrentUser={message.sender.userId === currentUser.userId}
        />
      ))}
    </VStack>
  );
};
