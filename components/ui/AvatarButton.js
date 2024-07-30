import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

function AvatarButton({ onPress, source, size = 40, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { width: size, height: size, borderRadius: size / 2 },
        style, // Apply custom styles
      ]}
    >
      <Image source={source} style={styles.avatar} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4, // Add some horizontal spacing
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50, // Make the image fully rounded
  },
});

export default AvatarButton;
