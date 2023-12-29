import Button from "@components/Button";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRouterProps } from "@routes/auth.routes";
import {
  Box,
  Center,
  Flex,
  FormControl,
  Stack,
  Text,
  VStack,
  WarningOutlineIcon,
  useToast,
} from "native-base";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "@hooks/useAuth";
import useLoading from "@hooks/useLoading";

interface FormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required("Campo obrigatório!"),
    password: yup
      .string()
      .min(6, "A senha deve conter 6 caracteres")
      .required("Campo obrigatório!"),
  })
  .required();

const Login: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorRouterProps>();

  const { login } = useAuth();
  const { visible } = useLoading();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleNewAccount = () => {
    navigation.navigate("register");
  };

  const onSubmit = (data: FormData) => {
    login(data.email, data.password);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={8}>
        <Center my={48}>
          <Text color="white" fontFamily="heading" fontSize={38} mb={6}>
            Elite Train
          </Text>
          <Flex w="full" gap={5}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={field.onChange}
                  value={field.value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={field.onChange}
                  value={field.value}
                  errorMessage={errors.password?.message}
                />
              )}
              name="password"
              defaultValue=""
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              title="Entrar"
              isLoading={visible}
              disabled={visible}
            />
          </Flex>
        </Center>
        <Center marginTop={10}>
          <Text color="white" fontFamily="body">
            Ainda não tem conta?
          </Text>
          <Button
            onPress={handleNewAccount}
            title="Criar conta"
            variant="outline"
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Login;
