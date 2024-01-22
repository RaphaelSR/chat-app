import { Button, HStack, Input } from "native-base";
import React, { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <HStack space={1} p={2} mb={2}>
      <Input
        flex={1}
        borderRadius="full"
        py={3}
        px={4}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button onPress={handleSend} px={3} borderRadius="full">
        Send
      </Button>
    </HStack>
  );
};
