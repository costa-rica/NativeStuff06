import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import VideoListScreen from "./screens/VideoListScreen";
import VideoPlayerScreen from "./screens/VideoPlayerScreen";
import GestureScreen from "./screens/GestureScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="VideoListScreen" component={VideoListScreen} />
          <Stack.Screen
            name="VideoPlayerScreen"
            component={VideoPlayerScreen}
          />
          <Stack.Screen name="GestureScreen" component={GestureScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
