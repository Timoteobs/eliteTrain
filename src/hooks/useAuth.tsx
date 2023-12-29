import { useContext } from "react";
import { AuthContext } from "../context/auth/auth";
import { AuthContextType } from "../context/auth/auth.types";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }

  return context;
};

export default useAuth;
