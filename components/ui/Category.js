import { Pressable, Image, Text, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

function Category({ imageUri, title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={imageUri}
        style={title ? styles.imageWithTitle : styles.imageFull}
      />
      {title && <Text style={styles.text}>{title}</Text>}
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
    backgroundColor: "white",
    padding: 8,
    width: 150,
    height: 150,
  },
  imageWithTitle: {
    width: '100%', // Adjust the width as needed
    height: 115, // Adjust the height as needed
  },
  imageFull: {
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
    fontFamily: "primary",
  },
});
