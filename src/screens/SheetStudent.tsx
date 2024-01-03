import HeaderPage from "@components/HeaderPage";
import { Box, Pressable, Text } from "native-base";
import React from "react";

const SheetStudent: React.FC = () => {
  return (
    <Box>
      <HeaderPage title="Ficha" />
      <Pressable
        minH={24}
        display="flex"
        flexDirection="row"
        bg="black"
        borderRadius={10}
        mt={8}
        onPress={() => {}}
        mx={4}
      >
        <Box bg="green.700" w="full" h="full" borderRadius={10}>
          <Text
            color="white"
            fontFamily="heading"
            fontSize="2xl"
            position="absolute"
            bottom={0}
            w={"70%"}
            ml={5}
            marginBottom={2}
          >
            Adaptação
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default SheetStudent;
