import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Login from "@screens/Login";
import Register from "@screens/Register";

type AuthRoutes = {
  login: undefined;
  register: undefined;
};

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

const AuthRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
    </Navigator>
  );
};

export default AuthRoutes;
