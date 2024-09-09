import { useRef, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { ImageBackground, BackHandler, SafeAreaView, StyleSheet, View, Platform, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
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

  const [fontsLoaded, fontError] = useFonts({
    primary: require("./assets/fonts/Mitr-Regular.ttf"),
    bold: require("./assets/fonts/Mitr-Bold.ttf"),
    extralight: require("./assets/fonts/Mitr-ExtraLight.ttf"),
    light: require("./assets/fonts/Mitr-Light.ttf"),
    medium: require("./assets/fonts/Mitr-Medium.ttf"),
    semibold: require("./assets/fonts/Mitr-SemiBold.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    };

    hideSplashScreen();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (isReady && navigationRef.current) {
      navigationRef.current.navigate("Home");
    }
  }, [isReady]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "Nema internet konekcije",
          "Morate imati aktivnu i stabilnu internet konekciju za korištenje ove aplikacije.",
          [
            { text: "OK", onPress: () => Platform.OS === "android" ? BackHandler.exitApp() : null }
          ],
          { cancelable: false }
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
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
  }
});
