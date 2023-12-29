import React, { useState } from "react";
import Button from "@components/Button";
import HeaderPage from "@components/HeaderPage";
import Input from "@components/Input";
import { Box, Heading, VStack } from "native-base";
import useTrainingSheet from "@hooks/useTrainingSheet";
import { useNavigation } from "@react-navigation/native";
import useLoading from "@hooks/useLoading";
import useAuth from "@hooks/useAuth";

const NewTrainingSheet: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const navigation = useNavigation();
  const { newTrainingSheet } = useTrainingSheet();
  const { visible } = useLoading();
  const { dataUser } = useAuth();

  const handleNewTrainingSheet = async () => {
    const response = await newTrainingSheet({
      name: value,
      idUser: dataUser.uId,
    });
    if (response) {
      navigation.goBack();
    }
  };

  return (
    <Box>
      <HeaderPage title="Nova ficha" />
      <VStack px={4} pt={4} space={4}>
        <Input
          placeholder="Nome da ficha"
          value={value}
          onChangeText={setValue}
        />
        <Button
          title="Salvar"
          onPress={handleNewTrainingSheet}
          isLoading={visible}
          disabled={visible}
        />
      </VStack>
    </Box>
  );
};

export default NewTrainingSheet;
