import { useContext } from "react";
import { TrainingSheetContext } from "../context/trainingSheet/trainingSheetContext";
import { TrainingSheetContextType } from "../context/trainingSheet/trainingSheet.types";

const useTrainingSheet = (): TrainingSheetContextType => {
  const context = useContext(TrainingSheetContext);

  if (!context) {
    throw new Error(
      "useTrainingSheet must be used within a TrainingSheetProvider"
    );
  }

  return context;
};

export default useTrainingSheet;
