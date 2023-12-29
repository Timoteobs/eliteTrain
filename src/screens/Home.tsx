import React from "react";
import { Box, VStack } from "native-base";
import Header from "@components/Header";
import Statistic from "@components/Statistic";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouterProps } from "@routes/app.routes";

const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRouterProps>();

  const handleTrainingSheets = () => {
    navigation.navigate("trainingSheets");
  };

  return (
    <Box>
      <Header />
      <VStack flex={1} px={4} pt={4} space={4}>
        <Statistic />
        <Button
          title="Fichas"
          variant="outline"
          onPress={handleTrainingSheets}
        />
        <Button title="Alunos" variant="outline" />
        <Button title="Feedbacks" variant="outline" />
      </VStack>
    </Box>
  );
};

export default Home;
