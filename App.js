import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    primary: require("./assets/fonts/Mitr-Regular.ttf"),
    bold: require("./assets/fonts/Mitr-Bold.ttf"),
    extralight: require("./assets/fonts/Mitr-ExtraLight.ttf"),
    light: require("./assets/fonts/Mitr-Light.ttf"),
    medium: require("./assets/fonts/Mitr-Medium.ttf"),
    semibold: require("./assets/fonts/Mitr-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    //return <AppLoading />
    //here add a SplashScreen.async() smth
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
