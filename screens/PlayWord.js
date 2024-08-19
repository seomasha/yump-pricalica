import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useSelectedButton } from "../context/SelectedButtonProvider";
import { Audio } from "expo-av";
import categoryList from "../data/categories.json";
import AnswerButton from "../components/ui/AnswerButton";
import Category from "../components/ui/Category";
import Modal from "react-native-modal";
import localImages from "../data/localImages";
import localSoundsFemale from "../data/localSoundsFemale";

const allWords = [
  "RUTINA",
  "IGRAČKE",
  "HIGIJENA",
  "KUĆA",
  "PORODICA",
  "PIĆE",
  "OSJEĆAJI",
  "VOĆE",
  "POVRĆE",
  "AKTIVNOSTI",
  "ODJEĆA",
  "ZANIMANJA",
  "OKOLINA",
];
const { width, height } = Dimensions.get("window");
const isSmallDevice = width < 350;

function PlayWord({ navigation }) {
  const [currentSentence, setCurrentSentence] = useState("");
  const [keyword, setKeyword] = useState("");
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [numSelectedSentences, setNumSelectedSentences] = useState(0);
  const [selectedSentences, setSelectedSentences] = useState([]);
  const [scaleAnimation] = useState(new Animated.Value(1));
  const [sound, setSound] = useState(null); // State to manage the sound

  const { selectedCategory, selectedAvatar } = useSelectedButton();

  const categoryData = categoryList.find(
    (category) => category.name === selectedCategory
  );

  const initializeGame = () => {
    if (categoryData && categoryData.sentences) {
      const sentences = categoryData.sentences;

      // Shuffle and select sentences
      const selectedSentencesCombined = sentences
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(sentences.length, 8));

      setSelectedSentences(selectedSentencesCombined);
      setNumSelectedSentences(selectedSentencesCombined.length);
      setCurrentQuestionIndex(0);
      setIsAnswerSelected(false);
    }
  };

  const setupQuestion = (sentence) => {
    setCurrentSentence(sentence.text);
    setKeyword(sentence.keyword);

    const modifiedSentence = sentence.text.replace(
      new RegExp(sentence.keyword, "g"),
      "_"
    );
    setCurrentSentence(modifiedSentence);

    // Generate possible answers
    const answers = [...allWords];
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
    if (!selectedAnswers.includes(sentence.keyword.toUpperCase())) {
      selectedAnswers[Math.floor(Math.random() * selectedAnswers.length)] =
        sentence.keyword.toUpperCase();
    }

    setPossibleAnswers(shuffleArray(selectedAnswers));

    playPronunciation(sentence.image);
  };

  useEffect(() => {
    initializeGame();
  }, [categoryData]);

  useEffect(() => {
    if (
      selectedSentences.length > 0 &&
      currentQuestionIndex < selectedSentences.length
    ) {
      setupQuestion(selectedSentences[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, selectedSentences]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerPress = (answer) => {
    const isCorrect = answer.toUpperCase() === keyword.toUpperCase();
    if (isCorrect) {
      setIsAnswerSelected(true);
      const updatedSentence = currentSentence.replace(/_/g, keyword);
      setCurrentSentence(updatedSentence);

      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          setIsAnswerSelected(false);
          if (currentQuestionIndex < numSelectedSentences - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          } else {
            setShowCongratsModal(true);
          }
        }, 500);
      });
    }
    return isCorrect;
  };

  const closeModal = () => {
    setShowCongratsModal(false);
    initializeGame();
  };

  const getCongratsImage = () => {
    return selectedAvatar === "female"
      ? localImages.femaleAvatar
      : localImages.maleAvatar;
  };

  const getImageForSentence = (sentenceText) => {
    const sentenceData = categoryData.sentences.find(
      (s) => s.image === sentenceText.image
    );
    return sentenceData && sentenceData.image
      ? localImages[sentenceData.image]
      : localImages.default;
  };

  const playPronunciation = async (image) => {
    const soundFile = localSoundsFemale[image];
    if (soundFile) {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
      setSound(newSound);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          newSound.unloadAsync();
        }
      });
    } else {
      console.log("Sound not found for image:", image);
    }
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

      {selectedSentences.length > 0 && (
        <Category
          imageUri={getImageForSentence(
            selectedSentences[currentQuestionIndex]
          )} // Use the function to get the image URI
          onPress={() => {
            console.log(selectedSentences[currentQuestionIndex].text);
          }}
        />
      )}

      <View style={styles.wordContainer}>
        <View style={styles.word}>
          <Animated.View
            style={[
              {
                transform: [{ scale: scaleAnimation }],
              },
            ]}
          >
            <LinearGradient
              colors={["#FAA300", "#FF7000"]}
              style={styles.letterContainer}
            >
              <Text style={styles.letter}>{currentSentence}</Text>
            </LinearGradient>
          </Animated.View>
        </View>
        <TouchableOpacity
          style={styles.speakerButton}
          onPress={() =>
            playPronunciation(selectedSentences[currentQuestionIndex]?.image)
          }
        >
          <MaterialIcons name="volume-up" size={24} color="#FF7000" />
        </TouchableOpacity>
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
            <Image source={getCongratsImage()} style={styles.smileyIcon} />
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
                onPress={() => navigation.navigate("Home")}
              >
                <MaterialIcons name="home" size={24} color="#FF7000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
    borderRadius: 75,
  },
  congratsText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  congratsTextBig: {
    fontSize: 60,
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
  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 64,
  },
  speakerButton: {
    marginLeft: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#FFE8D8",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayWord;
