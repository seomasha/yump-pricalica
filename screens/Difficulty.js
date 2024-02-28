import { View, StyleSheet } from "react-native";
import Button from "../components/ui/Button";

function Difficulty({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate("Play");
        }}
      >
        LAHKO
      </Button>
      <Button>TEŠKO</Button>
    </View>
  );
}

export default Difficulty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
