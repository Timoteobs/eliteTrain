import useDashboard from "@hooks/useDashboard";
import { Box, Divider, Flex, Text } from "native-base";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";

const Statistic: React.FC = () => {
  const { width } = Dimensions.get("screen");
  const boxWidth = width * 0.9;

  const { trainingsCount, getTotalTrainings } = useDashboard();

  useEffect(() => {
    getTotalTrainings("1");
  }, []);

  return (
    <Flex
      bg="green.700"
      width="full"
      height={24}
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      py={4}
      px={8}
    >
      <Flex>
        <Text fontFamily="heading" fontSize={22} textAlign="center">
          150
        </Text>
        <Text textAlign="center">Alunos</Text>
      </Flex>
      <Divider orientation="vertical" />
      <Flex>
        <Text fontFamily="heading" fontSize={22} textAlign="center">
          {trainingsCount}
        </Text>
        <Text textAlign="center">Treinos</Text>
      </Flex>
      <Divider orientation="vertical" />
      <Flex>
        <Text fontFamily="heading" fontSize={22} textAlign="center">
          150
        </Text>
        <Text textAlign="center">Feedbacks</Text>
      </Flex>
    </Flex>
  );
};

export default Statistic;
