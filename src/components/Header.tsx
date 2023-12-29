import useAuth from "@hooks/useAuth";
import { Avatar, Box, Flex, Text } from "native-base";
import React from "react";

const Header: React.FC = () => {
  const { dataUser } = useAuth();
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      gap={4}
      bgColor="gray.800"
      pt={12}
      px={8}
      pb={8}
    >
      <Box>
        <Avatar />
      </Box>
      <Flex>
        <Text color="white" fontFamily="body" fontSize={12}>
          Bem vindo,
        </Text>
        <Text color="white" fontFamily="heading" fontSize={20}>
          {dataUser.name}!
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
