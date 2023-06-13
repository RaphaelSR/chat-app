import { Box, Text } from "native-base";
import React from "react";

export function UnreadMessagesBadge({ messages }: { messages: number }) {
  return (
    <Box
      alignSelf="flex-end"
      width="20px"
      height="20px"
      borderRadius="50px"
      bg={{
        linearGradient: {
          colors: ["#FFA925", "#FF7841"],
          start: [0, 0],
          end: [1, 1],
        },
      }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="white" fontSize="10px" fontFamily="Roboto">
        {messages}
      </Text>
    </Box>
  );
}
