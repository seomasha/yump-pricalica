import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelectedButton } from "../context/SelectedButtonProvider";
import categoryList from "../data/categories.json";
import AnswerButton from "../components/ui/AnswerButton";
import Category from "../components/ui/Category";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Play({ navigation }) {
  const [letter, setLetter] = useState("?");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState([]);
  const [missingLetter, setMissingLetter] = useState("");
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const correctAnimationDuration = 1000; // duration in milliseconds

  const { selectedCategory } = useSelectedButton();

  const categoryData = categoryList.find(
    (category) => category.name === selectedCategory
  );

  useEffect(() => {
    if (categoryData) {
      const word = categoryData.words[currentQuestionIndex].name;
      const letters = word.split("");
  
      let randomIndex;
      let selectedLetter;
      do {
        randomIndex = Math.floor(Math.random() * letters.length);
        selectedLetter = letters[randomIndex];
      } while (selectedLetter === " ");
  
      letters[randomIndex] = "?";
  
      setCurrentWord(letters); // Keep original case for each letter
  
      setMissingLetter(selectedLetter); // Set missingLetter without forcing uppercase
  
      // Generate possible answers (including the correct one)
      const answers = [...allLetters];
      const filteredAnswers = answers.filter((letter) => letter !== " ");
      const selectedAnswers = [];
      for (let i = 0; i < 3; i++) {
        selectedAnswers.push(
          filteredAnswers.splice(
            Math.floor(Math.random() * filteredAnswers.length),
            1
          )[0]
        );
      }
      if (!selectedAnswers.includes(selectedLetter.toUpperCase())) {
        selectedAnswers[
          Math.floor(Math.random() * selectedAnswers.length)
        ] = selectedLetter.toUpperCase();
      }
  
      setPossibleAnswers(shuffleArray(selectedAnswers));
    }
  }, [currentQuestionIndex, categoryData]);
  

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerPress = (answer) => {
    const isCorrect = answer.toUpperCase() === missingLetter.toUpperCase();
    if (isCorrect) {
      setIsAnswerSelected(true);
      setLetter(missingLetter.toUpperCase());
      setCurrentWord((prevWord) => {
        const updatedWord = [...prevWord];
        const index = updatedWord.indexOf("?");
        updatedWord[index] = missingLetter;
        return updatedWord;
      });
      setTimeout(() => {
        setIsAnswerSelected(false);
        setLetter("?");
        if (currentQuestionIndex < categoryData.words.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          navigation.navigate("Home");
        }
      }, correctAnimationDuration);
    }
    return isCorrect;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <LinearGradient
            colors={["#FFA500", "#FF4500"]}
            style={styles.gradient}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <LinearGradient
            colors={["#FFA500", "#FF4500"]}
            style={styles.gradient}
          >
            <MaterialIcons name="home" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.category}>
        {categoryData && (
          <>
            <Text style={styles.categoryText}>
              Odabrana kategorija: {categoryData.name}
            </Text>
            <Text style={styles.questionText}>
              Pitanje {currentQuestionIndex + 1} / {categoryData.words.length}
            </Text>
          </>
        )}
      </View>
      {categoryData && (
        <Category
          imageUri={require("../assets/icons/ljudi.png")}
          title={categoryData.words[currentQuestionIndex].name}
          onPress={() => {}}
        />
      )}
      <View style={styles.word}>
        <LinearGradient
          colors={["#FAA300", "#FF7000"]}
          style={styles.letterContainer}
        >
          <Text style={styles.letter}>{currentWord.join(" ")}</Text>
        </LinearGradient>
      </View>
      <View style={styles.answerButtons}>
        {possibleAnswers.map((answer) => (
          <AnswerButton
            key={answer}
            label={answer}
            onPress={() => handleAnswerPress(answer)}
          />
        ))}
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
    alignItems: "center",
    marginBottom: 20,
  },

  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  questionText: {
    fontSize: 16,
    color: "#666",
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

  answerButtons: {
    flexDirection: "row",
    marginTop: 32,
    gap: 32,
  },

  headerButtons: {
    position: "absolute",
    top: 30,
    left: 10,
    flexDirection: "row",
    zIndex: 10,
  },
  button: {
    marginRight: 10,
    borderRadius: 25,
  },
  gradient: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});
