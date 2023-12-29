/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, ReactNode } from "react";
import {
  AuthContextType,
  InitialValueUSer,
  RegisterParams,
  User,
} from "./auth.types";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import useLoading from "@hooks/useLoading";
import { useToast } from "native-base";
import Toast from "@components/Toast";
import { Collections } from "@utils/Collections";

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [dataUser, setDataUSer] = useState<User>(InitialValueUSer);
  const { onClose, onOpen } = useLoading();
  const toast = useToast();

  const login = async (email: string, password: string) => {
    onOpen();
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const responseUser = await firestore()
        .collection(Collections.users)
        .doc(response.user.uid)
        .get();

      setDataUSer({
        uId: response.user.uid,
        email: responseUser.data()?.email,
        name: responseUser.data()?.name,
        phone: responseUser.data()?.phone,
        type: responseUser.data()?.type,
      });
    } catch (error: unknown) {
      console.error(error);
      toast.show({
        render: () => (
          <Toast
            message="Erro ao tentar fazer login, tente novamente!"
            title="Login"
            type="error"
          />
        ),
      });
    } finally {
      onClose();
    }
  };

  const register = async (params: RegisterParams) => {
    try {
      onOpen();

      const response = await auth().createUserWithEmailAndPassword(
        params.email,
        params.password
      );

      await firestore().collection("Users").doc(response.user.uid).set({
        uid: response.user.uid,
        name: params.name,
        email: params.email,
        phone: params.phone,
        type: params.type,
      });

      setDataUSer({
        uId: response.user.uid,
        email: params.email,
        name: params.name,
        phone: params.phone,
        type: params.type,
      });
    } catch (error: unknown) {
      console.error(error);
      toast.show({
        render: () => (
          <Toast
            message="Erro ao tentar criar conta, tente novamente!"
            title="Criar conta"
            type="error"
          />
        ),
      });
    } finally {
      onClose();
    }
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        dataUser,
        isAuthenticated: !!dataUser.uId,
        logout,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
