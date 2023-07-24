import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from "native-base";
import React from "react";

interface CustomToastProps {
  id: string;
  title: string;
  description: string;
  status?: "info" | "warning" | "success" | "error";
  variant?: "solid" | "subtle" | "left-accent" | "top-accent" | "outline";
  isClosable?: boolean;
  onClose: () => void;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  id,
  title,
  description,
  status = "info",
  variant = "solid",
  isClosable = true,
  onClose,
}) => (
  <Alert
    maxWidth="100%"
    alignSelf="center"
    flexDirection="row"
    status={status}
    variant={variant}
  >
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text
            fontSize="md"
            fontWeight="medium"
            flexShrink={1}
            color={variant === "solid" ? "lightText" : "darkText"}
          >
            {title}
          </Text>
        </HStack>
        {isClosable ? (
          <IconButton
            variant="unstyled"
            icon={<CloseIcon size="3" />}
            _icon={{
              color: variant === "solid" ? "lightText" : "darkText",
            }}
            onPress={onClose}
          />
        ) : null}
      </HStack>
      <Text px="6" color={variant === "solid" ? "lightText" : "darkText"}>
        {description}
      </Text>
    </VStack>
  </Alert>
);
