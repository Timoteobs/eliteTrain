import React from "react";
import useAuth from "@hooks/useAuth";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Popover,
  Text,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouterProps } from "@routes/app.routes";

interface HeaderPageProps {
  title: string;
}

const HeaderPage: React.FC<HeaderPageProps> = ({ title }) => {
  const navigation = useNavigation<AppNavigatorRouterProps>();

  return (
    <Flex flexDirection="column" bgColor="gray.800" pt={12} px={8} pb={8}>
      <Button variant="unstyled" w={0} onPress={() => navigation.goBack()}>
        <Icon
          as={MaterialIcons}
          name="keyboard-arrow-left"
          size={12}
          ml={-7}
          color="white"
        />
      </Button>
      <Text color="white" fontFamily="heading" fontSize={"3xl"}>
        {title}
      </Text>
    </Flex>
  );
};

export default HeaderPage;
