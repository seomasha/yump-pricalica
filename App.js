import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Categories from "./screens/Categories";
import Play from "./screens/Play";
import PlayWord from "./screens/PlayWord";
import { SelectedButtonProvider } from "./context/SelectedButtonProvider";

// Prevent the splash screen from auto-hiding until ready
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    primary: require("./assets/fonts/Mitr-Regular.ttf"),
    bold: require("./assets/fonts/Mitr-Bold.ttf"),
    extralight: require("./assets/fonts/Mitr-ExtraLight.ttf"),
    light: require("./assets/fonts/Mitr-Light.ttf"),
    medium: require("./assets/fonts/Mitr-Medium.ttf"),
    semibold: require("./assets/fonts/Mitr-SemiBold.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
        setIsReady(true);
      } else {
        // Hide the splash screen after 3s as a fallback
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          setIsReady(true);
        }, 3000);
      }
    };

    hideSplashScreen();
  }, [fontsLoaded, fontError]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.rootScreen}>
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.background}
        >
          <SafeAreaView style={styles.rootScreen}>
            <SelectedButtonProvider>
              <NavigationContainer theme={MyTheme}>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.ScaleFromCenterAndroid,
                  }}
                >
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Categories" component={Categories} />
                  <Stack.Screen name="Play" component={Play} />
                  <Stack.Screen name="PlayWord" component={PlayWord} />
                </Stack.Navigator>
              </NavigationContainer>
            </SelectedButtonProvider>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  background: {
    flex: 1,
    justifyContent: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
