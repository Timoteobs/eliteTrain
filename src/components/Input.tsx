import { Input as InputNativeBase, IInputProps, Text, Box } from "native-base";
import React from "react";

interface InputProps extends IInputProps {
  errorMessage?: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <Box>
      <InputNativeBase
        bg="gray.700"
        h="54px"
        borderWidth={0}
        px={4}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{
          bg: "gray.700",
          borderWidth: "1",
          borderColor: "green.500",
        }}
        {...props}
      />
      {props.errorMessage && (
        <Text color="white" fontFamily="body">
          {props.errorMessage}
        </Text>
      )}
    </Box>
  );
};

export default Input;
