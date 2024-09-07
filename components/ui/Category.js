import React, { useState } from "react";
import { Pressable, Image, Text, StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";

const { width } = Dimensions.get("window");
const isSmallDevice = width <= 350;

function Category({ imageUri, title, onPress }) {
  const [loading, setLoading] = useState(true);

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
      <View style={title ? styles.imageContainerWithTitle : styles.imageContainerFull}>
        {loading && (
          <ActivityIndicator
            size="small"
            color="gray"
            style={styles.loadingIndicator}
          />
        )}
        <Image
          source={imageUri}
          style={title ? styles.imageWithTitle : styles.imageFull}
          onLoadEnd={() => setLoading(false)}
          resizeMode="contain"  // Ensure the image scales properly without stretching
        />
      </View>
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
  imageContainerWithTitle: {
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: "75%",
  },
  imageContainerFull: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageWithTitle: {
    width: "100%",
    height: "100%",
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
  loadingIndicator: {
    position: "absolute",
  },
});
