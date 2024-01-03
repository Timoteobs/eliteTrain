import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import HomeStudent from "@screens/HomeStudent";
import ListTrainingStudents from "@screens/ListTrainingStudents";
import SheetStudent from "@screens/SheetStudent";

export type StudentRoutes = {
  homeStudent: undefined;
  listTrainingStudents: undefined;
  sheetStudent: undefined;
};

export type StudentRoutesProps = NativeStackNavigationProp<StudentRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<StudentRoutes>();

const StudentRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeStudent" component={HomeStudent} />
      <Screen name="listTrainingStudents" component={ListTrainingStudents} />
      <Screen name="sheetStudent" component={SheetStudent} />
    </Navigator>
  );
};

export default StudentRoutes;
