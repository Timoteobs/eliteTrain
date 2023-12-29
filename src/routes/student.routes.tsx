import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import HomeStudent from "@screens/HomeStudent";

export type StudentRoutes = {
  homeStudent: {};
};

export type AppNavigatorRouterProps = NativeStackNavigationProp<StudentRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<StudentRoutes>();

const StudentRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeStudent" component={HomeStudent} />
    </Navigator>
  );
};

export default StudentRoutes;
