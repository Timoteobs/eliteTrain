import { createContext, useState, ReactNode, useContext } from "react";
import { ModelExerciseContextType } from "./modelExercise.types";
import useLoading from "@hooks/useLoading";

export const ModelExerciseContext =
  createContext<ModelExerciseContextType | null>(null);

type Props = {
  children: ReactNode;
};

const ModelExerciseProvider = ({ children }: Props) => {
  const [nameExerciseSelected, setNameExerciseSelected] = useState<string>("");

  const { onOpen, onClose } = useLoading();

  const selectNameExercise = (name: string) => {
    setNameExerciseSelected(name);
  };

  const clearNameExerciseSelected = () => {
    setNameExerciseSelected("");
  };

  return (
    <ModelExerciseContext.Provider
      value={{
        nameExerciseSelected,
        selectNameExercise,
        clearNameExerciseSelected,
      }}
    >
      {children}
    </ModelExerciseContext.Provider>
  );
};

export { ModelExerciseProvider };
