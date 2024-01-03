import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "@screens/Home";
import NewExercise from "@screens/NewExercise";
import NewSection from "@screens/NewSection";
import NewTrainingSheet from "@screens/NewTrainingSheet";
import Sheet from "@screens/Sheet";
import TrainingSheets from "@screens/TrainingSheets";
import { Exercise } from "../context/trainingSheet/trainingSheet.types";
import ModelExerciseList from "@screens/ModelExerciseList";
import MyStudents from "@screens/MyStudents";
import VinculationStudent from "@screens/VinculationStudent";

export interface NewExerciseParams {
  type: "new" | "edit";
  exercise?: Exercise;
}

export type AppRoutes = {
  home: undefined;
  trainingSheets: undefined;
  newTrainingSheet: undefined;
  sheet: undefined;
  newSection: undefined;
  newExercise: NewExerciseParams;
  modelExerciseList: undefined;
  myStudents: undefined;
  vinculationStudent: undefined;
};

export type AppNavigatorRouterProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

const AppRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="trainingSheets" component={TrainingSheets} />
      <Screen name="newTrainingSheet" component={NewTrainingSheet} />
      <Screen name="sheet" component={Sheet} />
      <Screen name="newSection" component={NewSection} />
      <Screen name="newExercise" component={NewExercise} />
      <Screen name="modelExerciseList" component={ModelExerciseList} />
      <Screen name="myStudents" component={MyStudents} />
      <Screen name="vinculationStudent" component={VinculationStudent} />
    </Navigator>
  );
};

export default AppRoutes;
