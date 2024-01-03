import Button from "@components/Button";
import HeaderPage from "@components/HeaderPage";
import {
  Box,
  Center,
  FlatList,
  Flex,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";

const listExercise = [
  { uid: 1 },
  { uid: 2 },
  { uid: 3 },
  { uid: 4 },
  { uid: 5 },
  { uid: 6 },
  { uid: 7 },
  { uid: 9 },
  { uid: 10 },
  { uid: 11 },
  { uid: 12 },
  { uid: 13 },
  { uid: 14 },
  { uid: 15 },
  { uid: 16 },
  { uid: 17 },
  { uid: 18 },
];

const ListTrainingStudents: React.FC = () => {
  const RenderItem = ({ item }) => {
    return (
      <Pressable w="full" mt={16} p={5} bg="gray.800">
        <Box
          bg="green.700"
          w={20}
          h={20}
          alignItems="center"
          justifyContent="center"
          mt={-16}
          borderRadius={10}
          mb={4}
        >
          <Text color="white" fontFamily="body" fontSize={24}>
            {item.uid}
          </Text>
        </Box>

        <VStack space={6}>
          <Text fontSize={20} color="white" fontFamily="heading">
            SUPINO INCLINADO
          </Text>
          <Flex flexDirection="row" justifyContent="space-between">
            <Text fontFamily="body" color="white" fontSize={16}>
              Rep:
            </Text>
            <Text fontFamily="body" color="white" fontSize={16}>
              Série:
            </Text>
            <Text fontFamily="body" color="white" fontSize={16}>
              Time:
            </Text>
            <Text fontFamily="body" color="white" fontSize={16}>
              Carga:
            </Text>
          </Flex>
          <Button title="Finalizar exercício" />
        </VStack>
      </Pressable>
    );
  };

  return (
    <Box flex={1}>
      <HeaderPage title="Lista de exercícios" />

      <FlatList
        data={listExercise}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => String(item.uid)}
      />
    </Box>
  );
};

export default ListTrainingStudents;
