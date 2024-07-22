import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Category from "../components/ui/Category";
import categoryList from "../data/categories.json";
import { useSelectedButton } from "../context/SelectedButtonProvider";

function Categories({ navigation }) {
  const localImages = {
    ljudi: require("../assets/icons/ljudi.png"),
    razgovor: require("../assets/icons/razgovor.png"),
    rutina: require("../assets/icons/rutina.png"),
    igracke: require("../assets/icons/igracke.png"),
    kuca: require("../assets/icons/kuca.png"),
    pice: require("../assets/icons/pice.png"),
    osjecaji: require("../assets/icons/osjecaji.png"),
    voce: require("../assets/icons/voce.png"),
    povrce: require("../assets/icons/povrce.png"),
    aktivnosti: require("../assets/icons/aktivnosti.png"),
    licnahigijena: require("../assets/icons/licnahigijena.png"),
    clanoviporodice: require("../assets/icons/clanoviporodice.png"),
    odjeca: require("../assets/icons/odjeca.png"),
    zanimanja: require("../assets/icons/zanimanja.png"),
    okolina: require("../assets/icons/okolina.png"),
    carobnerijeci: require("../assets/icons/carobnerijeci.png"),
    sport: require("../assets/icons/sport.png"),
    putovanje: require("../assets/icons/putovanje.png"),
    objekti: require("../assets/icons/objekti.png"),
    hrana: require("../assets/icons/hrana.png"),
    domacezivotinje: require("../assets/icons/domacezivotinje.png"),
    divljezivotinje: require("../assets/icons/divljezivotinje.png"),
    prevoznasredstva: require("../assets/icons/prevoznasredstva.png"),
    skola: require("../assets/icons/skola.png"),
    abeceda: require("../assets/icons/abeceda.png"),
    azbuka: require("../assets/icons/azbuka.png"),
    zabava: require("../assets/icons/zabava.png"),
    oblici: require("../assets/icons/oblici.png"),
    boje: require("../assets/icons/boje.png"),
    slatkisi: require("../assets/icons/slatkisi.png"),
    brojevi: require("../assets/icons/brojevi.png"),
    drustveneigre: require("../assets/icons/drustveneigre.png"),
    grickalice: require("../assets/icons/grickalice.png"),
  };

  const itemsPerPage = 4; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const flatListRef = useRef(null);

  const { setSelectedCategory } = useSelectedButton();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataSlice = categoryList.slice(startIndex, endIndex);
    setVisibleCategories(dataSlice);
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const pageIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentPage(pageIndex);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const maxPageIndex = Math.ceil(categoryList.length / itemsPerPage) - 1;
    if (currentPage < maxPageIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePress = (name) => {
    setSelectedCategory(name);
    navigation.navigate("Play");
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Category
        title={item.name}
        imageUri={localImages[item.image]}
        onPress={() => handlePress(item.name)}
      />
    </View>
  );

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LinearGradient colors={["#FFA500", "#FF4500"]} style={styles.gradient}>
          <Icon name="arrow-back" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={visibleCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEnabled={false}
        snapToInterval={Dimensions.get("window").width / itemsPerPage}
        contentContainerStyle={styles.categories}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Navigation buttons */}
      <TouchableOpacity
        style={[styles.navigationButton, styles.previousButton]}
        onPress={goToPreviousPage}
        disabled={currentPage === 0}
      >
        <Icon name="keyboard-arrow-left" size={30} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navigationButton, styles.nextButton]}
        onPress={goToNextPage}
        disabled={(currentPage + 1) * itemsPerPage >= categoryList.length}
      >
        <Icon name="keyboard-arrow-right" size={30} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

export default Categories;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  categories: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  separator: {
    width: 10,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 10,
    borderRadius: 25,
  },
  gradient: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  navigationButton: {
    position: "absolute",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    zIndex: 10,
  },
  previousButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
});
