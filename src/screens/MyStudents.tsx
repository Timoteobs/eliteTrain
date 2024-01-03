import React, { useState } from "react";
import Button from "@components/Button";
import HeaderPage from "@components/HeaderPage";
import Input from "@components/Input";
import {
  Avatar,
  Box,
  FlatList,
  Flex,
  Heading,
  Pressable,
  Text,
  VStack,
} from "native-base";
import useTrainingSheet from "@hooks/useTrainingSheet";
import { useNavigation } from "@react-navigation/native";
import useLoading from "@hooks/useLoading";
import useAuth from "@hooks/useAuth";
import { AppNavigatorRouterProps } from "@routes/app.routes";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
    email: "@gmail.com",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item",
    email: "@gmail.com",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Third Item",
    email: "@gmail.com",
  },
];

type ItemProps = { name: string; id: string; email: string };

const MyStudents: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRouterProps>();
  const { visible } = useLoading();

  const handleVinculationStudent = () => {
    navigation.navigate("vinculationStudent");
  };

  const Item = ({ item }) => (
    <Pressable>
      <Flex direction="row" gap={4} mb={5}>
        <Avatar />
        <Flex>
          <Text color="white">{item.name}</Text>
          <Text color="white">{item.email}</Text>
        </Flex>
      </Flex>
    </Pressable>
  );

  return (
    <Box>
      <HeaderPage title="Meus alunos" />
      <VStack px={4} pt={4} space={4}>
        <Button
          title="Novo aluno"
          onPress={handleVinculationStudent}
          isLoading={visible}
          disabled={visible}
        />
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </VStack>
    </Box>
  );
};

export default MyStudents;
