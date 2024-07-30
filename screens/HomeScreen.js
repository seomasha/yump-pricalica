// HomeScreen.js

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "../components/ui/Button";
import AvatarButton from "../components/ui/AvatarButton"; // Import the AvatarButton component
import { useSelectedButton } from "../context/SelectedButtonProvider";

function HomeScreen({ navigation }) {
  const { setSelectedGameMode, selectedAvatar, setSelectedAvatar } = useSelectedButton();
  //const { selectedAvatar, setSelectedAvatar } = useAvatar(); // Access the avatar context

  const handlePress = (name) => {
    setSelectedGameMode(name);
    navigation.navigate("Categories");
  };

  const handleAvatarPress = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <View style={styles.root}>
      <View style={styles.avatarButtons}>
        {/* Female Avatar Button */}
        <AvatarButton
          onPress={() => handleAvatarPress("female")}
          source={require("../assets/icons/femaleavatar.jpg")}
          size={50}
          style={{ opacity: selectedAvatar === "female" ? 1 : 0.5 }} // Visual feedback
        />
        {/* Male Avatar Button */}
        <AvatarButton
          onPress={() => handleAvatarPress("male")}
          source={require("../assets/icons/manavatar.jpg")}
          size={50}
          style={{ opacity: selectedAvatar === "male" ? 1 : 0.5 }} // Visual feedback
        />
      </View>
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
  avatarButtons: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
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
