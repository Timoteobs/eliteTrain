import { createContext, useState, ReactNode, useContext } from "react";
import { Student, VinculationContextType } from "./vinculation.types";
import useLoading from "@hooks/useLoading";
import { useToast } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { Collections } from "@utils/Collections";
import useAuth from "@hooks/useAuth";
import Toast from "@components/Toast";

export const VinculationContext = createContext<VinculationContextType | null>(
  null
);

type Props = {
  children: ReactNode;
};

const VinculationProvider = ({ children }: Props) => {
  const { onOpen, onClose } = useLoading();
  const { dataUser } = useAuth();
  const toast = useToast();

  const [students, setStudents] = useState<Student[]>([]);

  const getStudent = async (email: string) => {
    try {
      onOpen();

      const response = await firestore()
        .collection(Collections.users)
        .where("email", "==", email)
        .get();

      var data: any = [];

      response.docs.map((doc) => {
        data.push({
          uid: doc.id,
          phone: doc.data().phone,
          name: doc.data().name,
          email: doc.data().email,
          idPersonal: doc.data().idPersonal,
        });
      });

      setStudents(data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const setVinculation = async (student: Student) => {
    try {
      onOpen();

      console.log(student);

      if (!!student.idPersonal) {
        toast.show({
          render: () => (
            <Toast
              message="Esse aluno já tem um professor responsável!"
              title="Aluno ja vinculado!"
              type="error"
            />
          ),
        });
        return false;
      }

      await firestore()
        .collection(Collections.users)
        .doc(student.uid)
        .update({
          ...student,
          idPersonal: dataUser.uId,
        });

      toast.show({
        render: () => (
          <Toast
            message="Você já pode prescrever os treinos para esse aluno!"
            title="Vinculação realizada com sucesso!"
            type="success"
          />
        ),
      });

      return true;
    } catch (error) {
      console.error(error);

      toast.show({
        render: () => (
          <Toast message="Tente, novamente!" title="Erro!" type="error" />
        ),
      });
      return false;
    } finally {
      onClose();
    }
  };

  return (
    <VinculationContext.Provider
      value={{ students, getStudent, setVinculation }}
    >
      {children}
    </VinculationContext.Provider>
  );
};

export { VinculationProvider };
