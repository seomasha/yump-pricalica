import { Image, StyleSheet, View } from "react-native";
import Button from "../components/ui/Button";

function HomeScreen({navigation}) {
  return (
    <View style={styles.root}>
      <View style={styles.logo}>
        <Image source={require("../assets/images/logo.png")} />
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => {
            navigation.navigate("Categories")
        }}>IGRAJ</Button>
        <Button>NAPIŠI</Button>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttons: {
    flexDirection: 'row',
    gap: 16
  }
});
