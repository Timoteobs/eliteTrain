import { View } from "react-native";
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Box } from "native-base";
import { THEME } from "./src/theme";
import Routes from "@routes/index";

import { AuthProvider } from "./src/context/auth/auth";
import { LoadingProvider } from "./src/context/loading/loadingContext";
import { TrainingSheetProvider } from "./src/context/trainingSheet/trainingSheetContext";
import { ModelExerciseProvider } from "./src/context/modelExercise/modelExerciseContext";
import { DashboardProvider } from "./src/context/dashboard/dashboardContext";
import { VinculationProvider } from "./src/context/vinculation/vinculationContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Lato_400Regular, Lato_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <LoadingProvider>
        <AuthProvider>
          <TrainingSheetProvider>
            <ModelExerciseProvider>
              <DashboardProvider>
                <VinculationProvider>
                  <StatusBar
                    style="light"
                    backgroundColor="transparent"
                    translucent
                  />
                  {fontsLoaded ? <Routes /> : <View />}
                </VinculationProvider>
              </DashboardProvider>
            </ModelExerciseProvider>
          </TrainingSheetProvider>
        </AuthProvider>
      </LoadingProvider>
    </NativeBaseProvider>
  );
}
