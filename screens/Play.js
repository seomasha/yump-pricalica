import { View, StyleSheet, Text, Pressable } from "react-native";
import Category from "../components/ui/Category";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useSelectedButton } from "../context/SelectedButtonProvider";

function Play() {
  const [letter, setLetter] = useState("?");

  const { selectedGameMode, selectedCategory } = useSelectedButton();

  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <Text>Selected gamemode: {selectedGameMode}</Text>
        <Text>Selected category: {selectedCategory}</Text>
        {/*
        <Category
          imageUri={require("../assets/icons/knjige.png")}
          title="KNJIGE"
        />
        {/* <LinearGradient colors={["#FAA300", "#FF7000"]} style={styles.sound}>
          <AntDesign name="sound" size={24} color="black" />
        </LinearGradient> 
      </View>
      <View style={styles.word}>
        <LinearGradient
          colors={["#FAA300", "#FF7000"]}
          style={styles.letterContainer}
        >
          <Text style={styles.letter}>{letter}</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#FAA300", "#FF7000"]}
          style={styles.letterContainer}
        >
          <Text style={styles.letter}>NJ</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#FAA300", "#FF7000"]}
          style={styles.letterContainer}
        >
          <Text style={styles.letter}>I</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#FAA300", "#FF7000"]}
          style={styles.letterContainer}
        >
          <Text style={styles.letter}>G</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#FAA300", "#FF7000"]}
          style={styles.letterContainer}
        >
          <Text style={styles.letter}>E</Text>
        </LinearGradient>
      </View>
      <View style={styles.answerLetters}>
        <Pressable onPress={() => {
            setLetter('K');
        }}>
            <LinearGradient
            colors={["#FAA300", "#FF7000"]}
            style={styles.letterContainer}
            >
            <Text style={[styles.letter, styles.answerLetter]}>K</Text>
            </LinearGradient>
        </Pressable>

        <Pressable onPress={() => {
            setLetter('R');
        }}>
            <LinearGradient
            colors={["#FAA300", "#FF7000"]}
            style={styles.letterContainer}
            >
            <Text style={[styles.letter, styles.answerLetter]}>R</Text>
            </LinearGradient>
        </Pressable>

        <Pressable onPress={() => {
            setLetter('F');
        }}>
            <LinearGradient
            colors={["#FAA300", "#FF7000"]}
            style={styles.letterContainer}
            >
            <Text style={[styles.letter, styles.answerLetter]}>F</Text>
            </LinearGradient>
        </Pressable>
        */}
      </View>
    </View>
  );
}

export default Play;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  category: {
    flexDirection: "row",
  },

  sound: {
    marginTop: "auto",
    backgroundColor: "#FAA300",
    padding: 16,
    borderRadius: 64,
    marginLeft: 16,
  },

  word: {
    flexDirection: "row",
    marginTop: 16,
    gap: 24,
  },

  letterContainer: {
    borderRadius: 48,
    borderColor: "white",
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  letter: {
    fontSize: 24,
  },

  answerLetters: {
    flexDirection: "row",
    marginTop: 32,
    gap: 32,
  },

  answerLetter: {
    fontSize: 36,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
