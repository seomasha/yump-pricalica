import { useRef, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Categories from "./screens/Categories";
import Play from "./screens/Play";
import PlayWord from "./screens/PlayWord";
import { SelectedButtonProvider } from "./context/SelectedButtonProvider";

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
  const navigationRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
      setIsReady(true);
    };

    setTimeout(hideSplashScreen, 3000);
  }, []);

  useEffect(() => {
    if (isReady && navigationRef.current) {
      navigationRef.current.navigate("Home");
    }
  }, [isReady]);

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
  }
});
