import { View, Text, StyleSheet, Pressable } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";

function Button({ children }) {
  return (
    <LinearGradient colors={["#FAA300", "#FF7000"]} style={styles.container}>
        <Text style={styles.text}>{children}</Text>
    </LinearGradient>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "white",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontFamily: "semibold",
  },
});
