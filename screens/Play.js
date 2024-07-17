import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useSelectedButton } from "../context/SelectedButtonProvider";
import categoryList from "../data/categories.json";
import AnswerButton from "../components/ui/AnswerButton";
import Category from "../components/ui/Category";
import Modal from "react-native-modal";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const { width, height } = Dimensions.get("window");
const isSmallDevice = width < 350;

function Play({ navigation }) {
  const [letter, setLetter] = useState("_");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [missingLetter, setMissingLetter] = useState("");
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [numSelectedWords, setNumSelectedWords] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);

  const { selectedCategory } = useSelectedButton();

  const categoryData = categoryList.find(
    (category) => category.name === selectedCategory
  );

  // Function to initialize game state
  const initializeGame = () => {
    if (categoryData && categoryData.words) {
      const excludedCategories = [
        "Okolina",
        "Čarobne riječi",
        "Putovanje",
        "Slatkiši",
        "Društvene igre",
        "Grickalice",
      ];

      // Filter categoryData.words based on conditions
      let filteredWords = categoryData.words.filter((word) => {
        return (
          !excludedCategories.includes(word.category) &&
          (word.category === "easy" || word.category === "hard")
        );
      });

      // Separate easy and hard words
      const easyWords = filteredWords.filter(
        (word) => word.category === "easy"
      );
      const hardWords = filteredWords.filter(
        (word) => word.category === "hard"
      );

      // Randomly select easy words (up to 5)
      const selectedEasyWords = easyWords
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(easyWords.length, 5));

      // Randomly select hard words (up to 3)
      const selectedHardWords = hardWords
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(hardWords.length, 3));

      // Combine selected easy and hard words
      const selectedWordsCombined = [
        ...selectedEasyWords,
        ...selectedHardWords,
      ];

      setSelectedWords(selectedWordsCombined); // Set the selected words
      setNumSelectedWords(selectedWordsCombined.length); // Set the number of selected words
      setCurrentQuestionIndex(0); // Reset to the first question
      setLetter("_"); // Reset letter placeholder if needed
      setIsAnswerSelected(false); // Reset answer selection state

      // Handle the first question setup (if needed)
      if (selectedWordsCombined.length > 0) {
        const word = selectedWordsCombined[0].name;
        setSelectedWord(word); // Set the selected word
        const letters = word.split("");

        let randomIndex;
        let selectedLetter;
        do {
          randomIndex = Math.floor(Math.random() * letters.length);
          selectedLetter = letters[randomIndex];
        } while (selectedLetter === " ");

        letters[randomIndex] = "_";

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
          selectedAnswers[Math.floor(Math.random() * selectedAnswers.length)] =
            selectedLetter.toUpperCase();
        }

        setPossibleAnswers(shuffleArray(selectedAnswers));
      }
    }
  };

  useEffect(() => {
    initializeGame(); // Initialize game state when categoryData changes
  }, [categoryData]);

  useEffect(() => {
    // Update currentWord and possibleAnswers when currentQuestionIndex or selectedWords changes
    if (
      selectedWords.length > 0 &&
      currentQuestionIndex < selectedWords.length
    ) {
      const word = selectedWords[currentQuestionIndex].name;
      setSelectedWord(word); // Set the selected word
      const letters = word.split("");

      let randomIndex;
      let selectedLetter;
      do {
        randomIndex = Math.floor(Math.random() * letters.length);
        selectedLetter = letters[randomIndex];
      } while (selectedLetter === " ");

      letters[randomIndex] = "_";

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
        selectedAnswers[Math.floor(Math.random() * selectedAnswers.length)] =
          selectedLetter.toUpperCase();
      }

      setPossibleAnswers(shuffleArray(selectedAnswers));
    }
  }, [currentQuestionIndex, selectedWords]);

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
        const index = updatedWord.indexOf("_");
        updatedWord[index] = missingLetter;
        return updatedWord;
      });
      setTimeout(() => {
        setIsAnswerSelected(false);
        setLetter("_");
        if (currentQuestionIndex < numSelectedWords - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setShowCongratsModal(true);
        }
      }, 1000); // Use correctAnimationDuration if needed
    }
    return isCorrect;
  };

  const closeModal = () => {
    setShowCongratsModal(false);
    initializeGame(); // Restart game when modal is closed
  };

  return (
    <SafeAreaView style={styles.container}>
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

      {categoryData && (
        <Category
          imageUri={require("../assets/icons/budjenje.png")}
          title={selectedWord} // Use selectedWord here
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

      <Modal
        isVisible={showCongratsModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.7}
        onBackdropPress={closeModal}
        style={styles.modal}
        avoidKeyboard={true}
        useNativeDriver={true}
      >
        <View style={styles.fullScreenModal}>
          <View style={styles.congratsModalContainer}>
            <Image
              source={require("../assets/icons/happy.png")}
              style={styles.smileyIcon}
            />
            <Text style={styles.congratsText}>
              Sva pitanja su odgovorena tačno
            </Text>
            <Text style={styles.congratsTextBig}>BRAVO!</Text>
            <View style={styles.congratsButtonsContainer}>
              <TouchableOpacity
                style={styles.congratsButton}
                onPress={() => {
                  setShowCongratsModal(false);
                  initializeGame(); // Restart the game
                }}
              >
                <FontAwesome name="repeat" size={24} color="#FF7000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.congratsButton}
                onPress={() => {
                  setShowCongratsModal(false);
                  navigation.navigate("Home");
                }}
              >
                <FontAwesome name="home" size={24} color="#FF7000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Play;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    padding: Math.min(width, height) * 0.02, // dynamic padding based on screen size
  },
  category: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: Math.min(width, height) * 0.02, // dynamic padding
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
    color: "white",
  },
  answerButtons: {
    flexDirection: "row",
    marginTop: isSmallDevice ? 8 : 16,
    marginBottom: isSmallDevice ? 16 : 32, // smaller gap for small devices
    gap: Math.min(width, height) * 0.05, // dynamic gap
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
  fullScreenModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  congratsModalContainer: {
    backgroundColor: "#FF7000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  smileyIcon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  congratsText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  congratsTextBig: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  congratsButtonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },
  congratsButton: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
