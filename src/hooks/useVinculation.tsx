import { useContext } from "react";
import { VinculationContextType } from "../context/vinculation/vinculation.types";
import { VinculationContext } from "../context/vinculation/vinculationContext";

const useVinculation = (): VinculationContextType => {
  const context = useContext(VinculationContext);

  if (!context) {
    throw new Error("useVinculation must be used within a VinculationProvider");
  }

  return context;
};

export default useVinculation;
