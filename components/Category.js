import { Pressable, Image, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/colors";

function Category({ imageUri, title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={imageUri} />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default Category;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: 'white',
    padding: 8
  },

  text: {
    textAlign: "center",
    fontFamily: "primary",
  },
});
