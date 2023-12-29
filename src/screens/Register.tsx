import React from "react";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@components/Button";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRouterProps } from "@routes/auth.routes";
import { Center, Flex, Radio, Text, VStack } from "native-base";
import useAuth from "@hooks/useAuth";
import useLoading from "@hooks/useLoading";
import { maskPhone, removeMaskFromJSON } from "@utils/Mask";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  type: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  phone: yup.string().required("Telefone é obrigatório"),
  type: yup.string().required("O tipo é obrigatório"),
});

const Register: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorRouterProps>();
  const { register } = useAuth();
  const { visible } = useLoading();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const formattedData: FormData = removeMaskFromJSON(data, ["phone"]);
    register(formattedData);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={8}>
        <Center my={48}>
          <Text color="white" fontFamily="heading" fontSize={38} mb={6}>
            Cadastro
          </Text>
          <Flex w="full" gap={5}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
              name="name"
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
              name="password"
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Telefone"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(maskPhone(text))}
                  value={value}
                  errorMessage={errors.phone?.message}
                />
              )}
              name="phone"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Radio.Group
                  name="myRadioGroup"
                  accessibilityLabel="type user"
                  value={value}
                  onChange={onChange}
                  colorScheme="green"
                >
                  <Radio value="P" my={1}>
                    <Text color="white" fontFamily="body">
                      Professor
                    </Text>
                  </Radio>
                  <Radio value="A" my={1}>
                    <Text color="white" fontFamily="body">
                      Aluno
                    </Text>
                  </Radio>
                </Radio.Group>
              )}
              name="type"
              defaultValue=""
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              title="Cadastrar"
              isLoading={visible}
              disabled={visible}
            />
            <Button onPress={goBack} title="Voltar" variant="outline" />
          </Flex>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Register;
