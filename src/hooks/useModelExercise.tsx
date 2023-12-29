import { useContext } from "react";
import { ModelExerciseContext } from "../context/modelExercise/modelExerciseContext";
import { ModelExerciseContextType } from "../context/modelExercise/modelExercise.types";

const useModelExercise = (): ModelExerciseContextType => {
  const context = useContext(ModelExerciseContext);

  if (!context) {
    throw new Error(
      "useModelExercise must be used within a ModelExerciseProvider"
    );
  }

  return context;
};

export default useModelExercise;
