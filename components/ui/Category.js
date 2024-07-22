import React from "react";
import { Pressable, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const isSmallDevice = width <= 350;

function Category({ imageUri, title, onPress }) {
  return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          !title &&
            (isSmallDevice
              ? styles.containerFullSmall
              : styles.containerFullLarge),
        ]}
      >
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
    width: 150,
    height: 150,
    marginTop: isSmallDevice ? 36 : 24,
  },
  containerFullLarge: {
    width: 180,
    height: 180,
  },
  containerFullSmall: {
    width: 150,
    height: 150,
  },
  imageWithTitle: {
    width: "75%",
    height: "75%",
  },
  imageFull: {
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
    fontFamily: "primary",
    color: "black",
    fontSize: 14,
  },
});
