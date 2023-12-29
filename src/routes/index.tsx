import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import { Box, useTheme } from "native-base";
import useAuth from "@hooks/useAuth";
import AppRoutes from "./app.routes";
import StudentRoutes from "./student.routes";

const Routes: React.FC = () => {
  const { colors } = useTheme();
  const { isAuthenticated, dataUser } = useAuth();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.gray[900],
    },
  };

  const renderRoutes = () => {
    if (isAuthenticated) {
      if (dataUser.type === "A") {
        return <StudentRoutes />;
      } else if (dataUser.type === "P") {
        return <AppRoutes />;
      }
    }
    return <AuthRoutes />;
  };

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer theme={theme}>{renderRoutes()}</NavigationContainer>
    </Box>
  );
};

export default Routes;
