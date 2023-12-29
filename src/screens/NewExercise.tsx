import React, { useEffect, useRef, useState } from "react";
import HeaderPage from "@components/HeaderPage";
import {
  ScrollView,
  VStack,
  Input as InputNativeBase,
  IInputProps,
} from "native-base";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@components/Input";
import Button from "@components/Button";
import useTrainingSheet from "@hooks/useTrainingSheet";
import useLoading from "@hooks/useLoading";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  AppNavigatorRouterProps,
  AppRoutes,
  NewExerciseParams,
} from "@routes/app.routes";
import useModelExercise from "@hooks/useModelExercise";
import { TextInput } from "react-native";

interface FormData {
  exerciseName: string;
  repetitions: number;
  restTime: number;
  weight?: number;
  observation?: string;
  series: number;
  order: number;
}

const schema = yup.object().shape({
  exerciseName: yup.string().required("Nome do exercício é obrigatório"),
  repetitions: yup
    .number()
    .required("Número de repetições é obrigatório")
    .positive("Número de repetições deve ser positivo"),
  order: yup
    .number()
    .required("A ordem é obrigatória")
    .positive("A ordem deve ser positiva"),
  series: yup
    .number()
    .required("Número de séries é obrigatório")
    .positive("Número de séries deve ser positivo"),
  restTime: yup
    .number()
    .required("Tempo de descanso é obrigatório")
    .positive("Tempo de descanso deve ser positivo"),
  observation: yup.string(),
});

type NewExerciseScreenRouteProp = RouteProp<AppRoutes, "newTrainingSheet">;

const NewExercise: React.FC = () => {
  const navigator = useNavigation<AppNavigatorRouterProps>();
  const { visible } = useLoading();
  const { newExerciseInSection, deleteExercise, editExercise } =
    useTrainingSheet();
  const { nameExerciseSelected, clearNameExerciseSelected } =
    useModelExercise();

  const route = useRoute<NewExerciseScreenRouteProp>();
  const { params } = route;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (params?.type === "edit") {
      const { exercise } = params;

      setValue("order", exercise.order);
      setValue("exerciseName", exercise.exerciseName || nameExerciseSelected);
      setValue("series", exercise.series);
      setValue("repetitions", exercise.repetitions);
      setValue("restTime", exercise.restTime);
      setValue("weight", exercise.weight);
      setValue("observation", exercise.observation);
    }
  }, []);

  useEffect(() => {
    if (nameExerciseSelected) {
      setValue("exerciseName", nameExerciseSelected);
      clearNameExerciseSelected();
    }
  }, [nameExerciseSelected]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { exercise } = params;

    if (params?.type === "edit") {
      const response = await editExercise({ ...exercise, ...data });
      if (response) {
        navigator.goBack();
      }
    } else {
      const response = await newExerciseInSection(data);
      if (response) {
        reset();
      }
    }
  };

  const handleDeleteExercise = async () => {
    const { exercise } = params;
    const response = await deleteExercise(exercise.uid);
    if (response) {
      navigator.goBack();
    }
  };

  const handleModelExercise = () => {
    navigator.navigate("modelExerciseList");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderPage title="Novo exercício" />
      <VStack px={4} pt={4} space={4}>
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Ordem do exercício"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value?.toString()}
              keyboardType="numeric"
              errorMessage={errors.order?.message}
              returnKeyType="next"
            />
          )}
          name="order"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Nome do exercício"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              errorMessage={errors.exerciseName?.message}
              onPressIn={handleModelExercise}
            />
          )}
          name="exerciseName"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Número de séries"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value?.toString()}
              keyboardType="numeric"
              errorMessage={errors.series?.message}
            />
          )}
          name="series"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Número de repetições"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value?.toString()}
              keyboardType="numeric"
              errorMessage={errors.repetitions?.message}
            />
          )}
          name="repetitions"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Tempo de descanso"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value?.toString()}
              keyboardType="numeric"
              errorMessage={errors.restTime?.message}
            />
          )}
          name="restTime"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Carga"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value?.toString()}
              keyboardType="numeric"
              errorMessage={errors.weight?.message}
            />
          )}
          name="weight"
          defaultValue={0}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Observação"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              errorMessage={errors.observation?.message}
            />
          )}
          name="observation"
          defaultValue=""
        />
        <Button
          title="Salvar"
          onPress={handleSubmit(onSubmit)}
          isLoading={visible}
        />
        {params?.type === "edit" && (
          <Button
            title="Excluir"
            onPress={handleDeleteExercise}
            isLoading={visible}
            bg="red.500"
          />
        )}
      </VStack>
    </ScrollView>
  );
};

export default NewExercise;
