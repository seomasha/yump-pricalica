import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { useCallback } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "./screens/Categories";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'primary': require("./assets/fonts/Mitr-Regular.ttf"),
    'bold': require("./assets/fonts/Mitr-Bold.ttf"),
    'extralight': require("./assets/fonts/Mitr-ExtraLight.ttf"),
    'light': require("./assets/fonts/Mitr-Light.ttf"),
    'medium': require("./assets/fonts/Mitr-Medium.ttf"),
    'semibold': require("./assets/fonts/Mitr-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.rootScreen} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.background}
        >
          <SafeAreaView style={styles.rootScreen}>
            <NavigationContainer theme={MyTheme}>
              <Stack.Navigator screenOptions={{
                headerShown: false,
                presentation: "card",
              }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Categories" component={Categories}/>
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  background: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    justifyContent: "center",
    alignItems: "center",
  },
});
