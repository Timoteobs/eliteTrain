import React, { useEffect, useState } from "react";

import HeaderPage from "@components/HeaderPage";
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouterProps } from "@routes/app.routes";
import useTrainingSheet from "@hooks/useTrainingSheet";
import Button from "@components/Button";
import { Exercise } from "src/context/trainingSheet/trainingSheet.types";
import useLoading from "@hooks/useLoading";
import Alert from "@components/Alert";

const Sheet: React.FC = () => {
  const [visibleAlert, serVisibleAlert] = useState<boolean>(false);

  const navigation = useNavigation<AppNavigatorRouterProps>();

  const {
    listSections,
    sectionSelected,
    listExercise,
    getAllSections,
    selectedSection,
    getAllExercisesBySectionId,
    deleteSection,
    selectIdSectionForDelete,
  } = useTrainingSheet();
  const { visible } = useLoading();

  useEffect(() => {
    getAllSections();
  }, []);

  const handleSelectedSection = (id: string) => {
    selectedSection(id);
    getAllExercisesBySectionId(id);
  };

  const RenderItem: React.FC<{ item: Exercise }> = ({ item }) => {
    return (
      <Pressable
        borderWidth={1}
        borderColor="gray.300"
        p={4}
        mt={4}
        mx={4}
        onPress={() => handleEditExercise(item)}
      >
        <VStack space={2}>
          <Text color="white" fontSize={20}>
            {item.exerciseName}
          </Text>
          <Flex flexDirection="row" justifyContent="space-between">
            <Text fontFamily="body" color="white">
              Rep: {item.repetitions}
            </Text>
            <Text fontFamily="body" color="white">
              Série: {item.series}
            </Text>
            <Text fontFamily="body" color="white">
              Time: {item.restTime}'
            </Text>
            <Text fontFamily="body" color="white">
              Carga: {item.weight}
            </Text>
          </Flex>
        </VStack>
      </Pressable>
    );
  };

  const handleNewSection = () => {
    navigation.navigate("newSection");
  };

  const handleNewExercise = () => {
    navigation.navigate("newExercise", { type: "new" });
  };

  const handleEditExercise = (item: Exercise) => {
    navigation.navigate("newExercise", { type: "edit", exercise: item });
  };

  const closeAlert = () => {
    serVisibleAlert(false);
  };

  const openAlert = (id: string) => {
    serVisibleAlert(true);
    selectIdSectionForDelete(id);
  };

  return (
    <>
      <Box>
        <HeaderPage title="Ficha" />
        <VStack px={4} pt={4} space={4}>
          <Heading color="white" fontFamily="heading">
            Seções
          </Heading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={4}>
              {listSections.map((el, index) => (
                <Button
                  key={index}
                  title={el.name}
                  w={130}
                  variant={sectionSelected === el.uid ? "solid" : "outline"}
                  onPress={() => handleSelectedSection(el.uid)}
                  onLongPress={() => openAlert(el.uid)}
                />
              ))}
              {visible ? (
                <Spinner />
              ) : (
                <IconButton
                  size={8}
                  variant="outline"
                  _icon={{
                    as: MaterialIcons,
                    name: "plus-one",
                  }}
                  onPress={handleNewSection}
                />
              )}
            </HStack>
          </ScrollView>

          <Divider />
          <Heading color="white" fontFamily="heading">
            Exercicios
          </Heading>
          <Button
            title="Adicionar exercicio"
            onPress={handleNewExercise}
            isLoading={visible}
          />
        </VStack>

        <Alert
          isOpen={visibleAlert}
          onClose={closeAlert}
          text="Todos os exercícios dentro dela também serão removidos!"
          title="Deseja realmente remover a seção de treino?"
          onDelete={deleteSection}
        />
      </Box>
      <FlatList
        data={listExercise}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => String(item.uid)}
      />
    </>
  );
};

export default Sheet;
