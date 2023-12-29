import { createContext, useState, ReactNode, useContext } from "react";
import { LoadingContextType } from "./loading.types";

export const LoadingContext = createContext<LoadingContextType | null>(null);

type Props = {
  children: ReactNode;
};

const LoadingProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onOpen = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        visible,
        onOpen,
        onClose,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider };
