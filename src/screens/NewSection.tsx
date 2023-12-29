import React, { useState } from "react";
import Button from "@components/Button";
import HeaderPage from "@components/HeaderPage";
import Input from "@components/Input";
import { Box, Heading, VStack } from "native-base";
import useTrainingSheet from "@hooks/useTrainingSheet";
import { useNavigation } from "@react-navigation/native";
import useLoading from "@hooks/useLoading";
import useAuth from "@hooks/useAuth";

const NewSection: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const navigation = useNavigation();
  const { newSection } = useTrainingSheet();
  const { visible } = useLoading();
  const { dataUser } = useAuth();

  const handleNewSection = async () => {
    const response = await newSection({
      name: value,
    });

    if (response) {
      navigation.goBack();
    }
  };

  return (
    <Box>
      <HeaderPage title="Nova seção" />
      <VStack px={4} pt={4} space={4}>
        <Input
          placeholder="Nome da seção"
          value={value}
          onChangeText={setValue}
        />
        <Button
          title="Salvar"
          onPress={handleNewSection}
          isLoading={visible}
          disabled={visible}
        />
      </VStack>
    </Box>
  );
};

export default NewSection;
