import Button from "@components/Button";
import HeaderPage from "@components/HeaderPage";
import Input from "@components/Input";
import useModelExercise from "@hooks/useModelExercise";
import { useNavigation } from "@react-navigation/native";
import { Example } from "@utils/ExerciseList";
import { Box, Center, FlatList, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";

export interface ExerciseModel {
  exerciseDescription: string;
}

const ModelExerciseList: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

  const { selectNameExercise } = useModelExercise();
  const navigation = useNavigation();

  useEffect(() => {
    const filteredExercises = Example.exercise.filter((exercise) =>
      exercise.exerciseDescription
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    setExercises(filteredExercises);
  }, [searchValue]);

  const handleSelectedName = (name: string) => {
    selectNameExercise(name);
    navigation.goBack();
  };

  return (
    <>
      <Box>
        <HeaderPage title="Biblioteca de exercícios" />
        <Box px={4} mt={4} mb={2}>
          <Input
            placeholder="Pesquisar exercício"
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
          />
        </Box>
      </Box>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectedName(item.exerciseDescription)}
            rounded="8"
            overflow="hidden"
            borderWidth="1"
            borderColor="coolGray.300"
            shadow="3"
            p="5"
            my={2}
            mx={4}
          >
            <Text color="white">{item.exerciseDescription}</Text>
          </Pressable>
        )}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => (
          <Center>
            <Text color="white" fontFamily="body">
              Não encontramos o exercício
            </Text>
            <Pressable
              onPress={() => handleSelectedName(searchValue)}
              rounded="8"
              overflow="hidden"
              borderWidth="1"
              borderColor="coolGray.300"
              shadow="3"
              p="5"
              my={2}
              mx={4}
            >
              <Text
                color="white"
                fontFamily="body"
              >{`Adicionar ${searchValue} a lista de exercícios`}</Text>
            </Pressable>
          </Center>
        )}
      />
      <Box mb={12} />
    </>
  );
};

export default ModelExerciseList;
