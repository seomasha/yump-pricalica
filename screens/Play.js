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
import categoryList from "../data/categories.json";
import AnswerButton from "../components/ui/AnswerButton";
import Category from "../components/ui/Category";
import Modal from "react-native-modal";

const allLetters = "ABCDEFGHIJKLMNOPRSTUVZČĆŽŠĐ".split("");
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
  const [scaleAnimation] = useState(new Animated.Value(1));

  const { selectedCategory } = useSelectedButton();

  const localImages = {
    // ======> RUTINA
    budjenje: require("../assets/icons/budjenje.png"),
    pranjezuba: require("../assets/icons/pranjezuba.png"),
    dorucak: require("../assets/icons/dorucak.png"),
    oblacenje: require("../assets/icons/iciuskolu.png"),
    iciuskolu: require("../assets/icons/iciuskolu.png"),
    ucenje: require("../assets/icons/ucenje.png"),
    kupanje: require("../assets/icons/kupanje.png"),
    pripremazaspavanje: require("../assets/icons/pripremazaspavanje.png"),
    spavanje: require("../assets/icons/spavanje.png"),
    // ======> IGRACKE
    lutka: require("../assets/icons/lutka.png"),
    medo: require("../assets/icons/medo.png"),
    puzle: require("../assets/icons/puzle.png"),
    papirniavion: require("../assets/icons/papirniavion.png"),
    autic: require("../assets/icons/autic.png"),
    puskanavodu: require("../assets/icons/puskanavodu.png"),
    kamioncic: require("../assets/icons/kamioncic.png"),
    rubikovakocka: require("../assets/icons/rubikovakocka.png"),
    legokocke: require("../assets/icons/legokocke.png"),
    baloni: require("../assets/icons/baloni.png"),
    hulahop: require("../assets/icons/hulahop.png"),
    lopta: require("../assets/icons/lopta.png"),
    lopta: require("../assets/icons/lopta.png"),
    vijaca: require("../assets/icons/vijaca.png"),

    // ======> LICNA HIGIJENA
    umivanje: require("../assets/icons/umivanje.png"),
    cetkicazazube: require("../assets/icons/cetkicazazube.png"),
    cesljanje: require("../assets/icons/cesljanje.png"),
    cesaljzakosu: require("../assets/icons/cesaljzakosu.png"),
    pastazazube: require("../assets/icons/pastazazube.png"),
    vodicazaispiranjeusta: require("../assets/icons/vodicazaispiranjeusta.png"),
    krema: require("../assets/icons/krema.png"),
    parfem: require("../assets/icons/parfem.png"),
    // ======> KUCA
    spavacasoba: require("../assets/icons/spavacasoba.jpg"),
    dnevnasoba: require("../assets/icons/dnevnasoba.jpg"),
    kuhinja: require("../assets/icons/kuhinja.jpg"),
    kupatilo: require("../assets/icons/kupatilo.jpg"),
    ormar: require("../assets/icons/ormar.png"),
    polica: require("../assets/icons/polica.png"),
    cvijece: require("../assets/icons/cvijece.png"),
    jastuk: require("../assets/icons/jastuk.png"),
    deka: require("../assets/icons/deka.jpg"),
    tepih: require("../assets/icons/tepih.png"),
    kauc: require("../assets/icons/kauc.jpg"),
    prozor: require("../assets/icons/prozor.jpg"),
    krevet: require("../assets/icons/krevet.png"),
    stolica: require("../assets/icons/stolica.png"),
    // ======> CLANOVI PORODICE
    mama: require("../assets/icons/mama.png"),
    otac: require("../assets/icons/otac.png"),
    roditelji: require("../assets/icons/roditelji.jpg"),
    djed: require("../assets/icons/djed.png"),
    nana: require("../assets/icons/nana.png"),
    brat: require("../assets/icons/brat.png"),
    sestra: require("../assets/icons/sestra.png"),
    tetak: require("../assets/icons/tetak.png"),
    tetka: require("../assets/icons/tetka.png"),
    rodjaci: require("../assets/icons/rodjaci.png"),
    // ======> PICE
    kafa: require("../assets/icons/kafa.png"),
    caj: require("../assets/icons/caj.png"),
    mlijeko: require("../assets/icons/mlijeko.png"),
    sokodjabuke: require("../assets/icons/sokodjabuke.png"),
    sokodnarandze: require("../assets/icons/sokodjabuke.png"),
    limunada: require("../assets/icons/limunada.png"),
    toplacokolada: require("../assets/icons/toplacokolada.png"),
    voda: require("../assets/icons/voda.png"),
    jogurt: require("../assets/icons/jogurt.png"),

  };

  const categoryData = categoryList.find(
    (category) => category.name === selectedCategory
  );

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

      let filteredWords = categoryData.words.filter((word) => {
        return (
          !excludedCategories.includes(word.category) &&
          (word.category === "easy" || word.category === "hard")
        );
      });

      const easyWords = filteredWords.filter(
        (word) => word.category === "easy"
      );
      const hardWords = filteredWords.filter(
        (word) => word.category === "hard"
      );

      const selectedEasyWords = easyWords
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(easyWords.length, 5));
      const selectedHardWords = hardWords
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(hardWords.length, 3));

      const selectedWordsCombined = [
        ...selectedEasyWords,
        ...selectedHardWords,
      ];

      setSelectedWords(selectedWordsCombined);
      setNumSelectedWords(selectedWordsCombined.length);
      setCurrentQuestionIndex(0);
      setLetter("_");
      setIsAnswerSelected(false);

      if (selectedWordsCombined.length > 0) {
        setupQuestion(selectedWordsCombined[0].name);
      }
    }
  };

  const getImageForWord = (word) => {
    const wordData = categoryData.words.find((w) => w.name === word);
    return wordData && wordData.image
      ? localImages[wordData.image]
      : localImages.default;
  };

  const setupQuestion = (word) => {
    setSelectedWord(word);
    const letters = word.split("");

    let randomIndex;
    let selectedLetter;
    do {
      randomIndex = Math.floor(Math.random() * letters.length);
      selectedLetter = letters[randomIndex];
    } while (selectedLetter === " ");

    const specialCombinations = ["nj", "lj", "dž"];
    let missingLetter = selectedLetter;

    if (
      randomIndex < letters.length - 1 &&
      specialCombinations.includes(selectedLetter + letters[randomIndex + 1])
    ) {
      missingLetter = selectedLetter + letters[randomIndex + 1];
      letters[randomIndex] = "_";
      letters[randomIndex + 1] = "";
    } else if (
      randomIndex > 0 &&
      specialCombinations.includes(letters[randomIndex - 1] + selectedLetter)
    ) {
      missingLetter = letters[randomIndex - 1] + selectedLetter;
      letters[randomIndex - 1] = "_";
      letters[randomIndex] = "";
    } else {
      letters[randomIndex] = "_";
    }

    setCurrentWord(letters);
    setMissingLetter(missingLetter);

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
    if (!selectedAnswers.includes(missingLetter.toUpperCase())) {
      selectedAnswers[Math.floor(Math.random() * selectedAnswers.length)] =
        missingLetter.toUpperCase();
    }

    setPossibleAnswers(shuffleArray(selectedAnswers));
  };

  useEffect(() => {
    initializeGame();
  }, [categoryData]);

  useEffect(() => {
    if (
      selectedWords.length > 0 &&
      currentQuestionIndex < selectedWords.length
    ) {
      setupQuestion(selectedWords[currentQuestionIndex].name);
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
        if (missingLetter.length === 2) {
          updatedWord[index] = missingLetter[0];
          updatedWord[index + 1] = missingLetter[1];
        } else {
          updatedWord[index] = missingLetter;
        }
        return updatedWord;
      });

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
          setLetter("_");
          if (currentQuestionIndex < numSelectedWords - 1) {
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

      {selectedWord && (
        <Category
          imageUri={getImageForWord(selectedWord)} // Use the function to get the image URI
          onPress={() => {
            console.log(selectedWord);
          }}
        />
      )}

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
            <Text style={styles.letter}>{currentWord.join(" ")}</Text>
          </LinearGradient>
        </Animated.View>
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
});
