import { useContext } from "react";
import { LoadingContext } from "../context/loading/loadingContext";
import { LoadingContextType } from "../context/loading/loading.types";

const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading deve ser utilizado dentro de um AuthProvider");
  }

  return context;
};

export default useLoading;
