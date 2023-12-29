import Button from "@components/Button";
import HeaderPage from "@components/HeaderPage";
import useLoading from "@hooks/useLoading";
import useTrainingSheet from "@hooks/useTrainingSheet";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouterProps } from "@routes/app.routes";
import {
  Box,
  Center,
  FlatList,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useEffect } from "react";

const TrainingSheets: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRouterProps>();

  const { visible } = useLoading();

  const {
    listTrainingSheet,
    getAllTrainingSheet,
    selectIdTrainingSheetSelected,
  } = useTrainingSheet();

  useEffect(() => {
    getAllTrainingSheet();
  }, []);

  const handleNewTrainingSheet = () => {
    navigation.navigate("newTrainingSheet");
  };

  const handleTrainingSheet = (id: string) => {
    selectIdTrainingSheetSelected(id);
    navigation.navigate("sheet");
  };

  if (visible) {
    return (
      <Center flex={1}>
        <Spinner size={58} />
      </Center>
    );
  }

  return (
    <VStack>
      <HeaderPage title="Fichas" />
      <Box px={4} mt={4}>
        <FlatList
          data={listTrainingSheet}
          ListHeaderComponent={() => (
            <Button title="Nova ficha" onPress={handleNewTrainingSheet} />
          )}
          renderItem={({ item }) => (
            <Pressable
              p={4}
              borderWidth={1}
              borderColor="gray.400"
              mt={4}
              onPress={() => handleTrainingSheet(item.uId)}
            >
              <Text color="white">{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.uId.toString()}
        />
      </Box>
    </VStack>
  );
};

export default TrainingSheets;
