import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Category from "../components/Category";
import categoryList from "../data/categories.json";

function Categories({ navigation }) {
  const localImages = {
    ljudi: require("../assets/icons/ljudi.png"),
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <LinearGradient
          colors={["#FFA500", "#FF4500"]} // Orange gradient
          style={styles.gradient}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <FlatList
        data={categoryList}
        renderItem={({ item }) => (
          <Category title={item.name} imageUri={localImages[item.image]} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.categories}
      />
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
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
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
});
