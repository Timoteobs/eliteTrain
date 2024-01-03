import { useNavigation } from "@react-navigation/native";
import { StudentRoutesProps } from "@routes/student.routes";

import {
  Avatar,
  Box,
  Flex,
  Image,
  Pressable,
  Progress,
  ScrollView,
  Text,
} from "native-base";
import React from "react";

const HomeStudent: React.FC = () => {
  const navigation = useNavigation<StudentRoutesProps>();

  const handleListTraining = () => {
    navigation.navigate("listTrainingStudents");
  };

  const handleSheetStudent = () => {
    navigation.navigate("sheetStudent");
  };

  return (
    <ScrollView>
      <Box flex={1} px={4} pt={12}>
        <Box
          borderBottomRadius="2xl"
          display="flex"
          flexDir="row"
          alignItems="center"
          gap={4}
        >
          <Avatar
            bg="green.500"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <Box>
            <Text color="white">Bem vindo,</Text>
            <Text color="white" fontFamily="heading">
              Timóteo Barros Silveira
            </Text>
          </Box>
        </Box>
        <Flex mt={8} gap={3}>
          <Text color="white">Seu progresso</Text>
          <Progress colorScheme="emerald" size="lg" value={55} />
        </Flex>
        <Pressable
          minH={40}
          display="flex"
          flexDirection="row"
          bg="black"
          borderRadius={10}
          mt={8}
          onPress={handleListTraining}
        >
          <Image
            source={require("../assets/training_day.jpeg")}
            size="full"
            position="absolute"
            right={0}
            borderRadius={10}
          />
          <Box bg="rgba(0, 0, 0, 0.6)" w="full" h="full" borderRadius={10}>
            <Text
              color="white"
              fontFamily="heading"
              fontSize="2xl"
              position="absolute"
              bottom={0}
              w={"70%"}
              ml={5}
              marginBottom={2}
            >
              Toque para acessar o treino de hoje
            </Text>
          </Box>
        </Pressable>

        <Pressable
          minH={40}
          display="flex"
          flexDirection="row"
          bg="black"
          borderRadius={10}
          mt={8}
          onPress={handleSheetStudent}
        >
          <Image
            source={require("../assets/sheet.jpeg")}
            size="full"
            position="absolute"
            right={0}
            borderRadius={10}
          />
          <Box bg="rgba(0, 0, 0, 0.6)" w="full" h="full" borderRadius={10}>
            <Text
              color="white"
              fontFamily="heading"
              fontSize="2xl"
              position="absolute"
              bottom={0}
              w={"70%"}
              ml={5}
              marginBottom={2}
            >
              Toque para acessar sua ficha de treino
            </Text>
          </Box>
        </Pressable>
      </Box>
    </ScrollView>
  );
};

export default HomeStudent;
