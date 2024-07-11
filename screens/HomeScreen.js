import { Image, StyleSheet, View } from "react-native";
import Button from "../components/ui/Button";
import { useSelectedButton } from "../context/SelectedButtonProvider";

function HomeScreen({ navigation }) {
  const { setSelectedGameMode } = useSelectedButton();

  const handlePress = (name) => {
    setSelectedGameMode(name);
    navigation.navigate("Categories");
  };

  return (
    <View style={styles.root}>
      <View style={styles.logo}>
        <Image source={require("../assets/images/logo.png")} />
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            handlePress("SLOVO");
          }}
        >
          SLOVO
        </Button>
        <Button
          onPress={() => {
            handlePress("RIJEC");
          }}
        >
          RIJEČ
        </Button>
        <Button
          onPress={() => {
            handlePress("RECENICA");
          }}
        >
          REČENICA
        </Button>
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
    flexDirection: "row",
    gap: 16,
  },
});
