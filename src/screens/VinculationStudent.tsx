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
  Text,
  VStack,
} from "native-base";
import useTrainingSheet from "@hooks/useTrainingSheet";
import { useNavigation } from "@react-navigation/native";
import useLoading from "@hooks/useLoading";
import useAuth from "@hooks/useAuth";
import useVinculation from "@hooks/useVinculation";
import { Pressable } from "react-native";

const VinculationStudent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const { students, getStudent, setVinculation } = useVinculation();
  const { visible } = useLoading();

  const handleNewSection = async () => {
    await getStudent(value);
  };

  const Item = ({ item }) => (
    <Pressable
      onPress={() => {
        setVinculation(item);
      }}
    >
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
      <HeaderPage title="Nova seção" />
      <VStack px={4} pt={4} space={4}>
        <Input
          placeholder="Informe o email do aluno!"
          value={value}
          onChangeText={setValue}
        />
        <Button
          title="Buscar"
          onPress={handleNewSection}
          isLoading={visible}
          disabled={visible}
        />

        <FlatList
          data={students}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.uid}
        />
      </VStack>
    </Box>
  );
};

export default VinculationStudent;
