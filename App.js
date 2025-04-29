import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScanListScreen from "./src/components/screens/ScanListScreen";
import SignUpScreen from "./src/components/screens/SignUpScreen";
import LoggingInScreen from "./src/components/screens/LoggingInScreen"
import TeethScanScreen from "./src/components/screens/TeethScanScreen";


const Stack = createNativeStackNavigator();

export const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoggingInScreen"
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      >
        
        <Stack.Screen
          name="ScanListScreen"
          component={ScanListScreen}
          options={{ title: "Home Page" }}
        />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: "Sign up" }}
        />
        
        <Stack.Screen
          name="LoggingInScreen"
          component={LoggingInScreen}
          options={{ title: "Login Screen" }}
        />

        <Stack.Screen
          name="TeethScanScreen"
          component={TeethScanScreen}
          options={{ title: "Teeth Scan" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
