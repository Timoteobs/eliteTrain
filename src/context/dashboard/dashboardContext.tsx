import { createContext, useState, ReactNode, useContext } from "react";
import { DashboardContextType } from "./dashboard.types";
import useLoading from "@hooks/useLoading";
import firestore from "@react-native-firebase/firestore";
import { Collections } from "@utils/Collections";
import useAuth from "@hooks/useAuth";

export const DashboardContext = createContext<DashboardContextType | null>(
  null
);

type Props = {
  children: ReactNode;
};

const DashboardProvider = ({ children }: Props) => {
  const [trainingsCount, setTrainingsCount] = useState<number>(0);
  const { onOpen, onClose } = useLoading();
  const { dataUser } = useAuth();

  const getTotalTrainings = async (idUser: string) => {
    try {
      onOpen();

      const querySnapshot = await firestore()
        .collection(Collections.trainingSheet)
        .where("idUser", "==", dataUser.uId)
        .get();

      setTrainingsCount(querySnapshot.size);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <DashboardContext.Provider value={{ trainingsCount, getTotalTrainings }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider };
