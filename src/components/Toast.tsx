import { Box, Text, VStack } from "native-base";
import React from "react";

interface ToastProps {
  title: string;
  message: string;
  type: "error" | "success" | "info";
}

const Toast: React.FC<ToastProps> = ({ title, message, type }) => {
  return (
    <Box
      bg={type === "error" ? "red.300" : "emerald.300"}
      px="2"
      py="1"
      rounded="sm"
      w="full"
    >
      <VStack space={1}>
        <Text fontFamily="heading" fontSize={18}>
          {title}
        </Text>
        <Text fontFamily="body" fontSize={14}>
          {message}
        </Text>
      </VStack>
    </Box>
  );
};

export default Toast;
