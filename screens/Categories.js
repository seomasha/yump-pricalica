import { View, StyleSheet } from "react-native";
import Category from "../components/Category";

function Categories() {
  return (
    <View style={styles.root}>
      <View style={styles.categories}>
        <Category
          imageUri={require("../assets/icons/razgovor.png")}
          title="RAZGOVOR"
        />
        <Category
          imageUri={require("../assets/icons/ljudi.png")}
          title="LJUDI"
        />
        <Category
          imageUri={require("../assets/icons/osjecaji.png")}
          title="OSJECAJI"
        />
        <Category
          imageUri={require("../assets/icons/hrana.png")}
          title="HRANA"
        />
        <Category
          imageUri={require("../assets/icons/zivotinje.png")}
          title="ZIVOTINJE"
        />
        <Category
          imageUri={require("../assets/icons/skola.png")}
          title="SKOLA"
        />
        <Category
          imageUri={require("../assets/icons/aktivnosti.png")}
          title="AKTIVNOSTI"
        />
        <Category
          imageUri={require("../assets/icons/oblici.png")}
          title="OBLICI"
        />
        <Category imageUri={require("../assets/icons/boje.png")} title="BOJE" />
        <Category
          imageUri={require("../assets/icons/odjeca.png")}
          title="ODJECA"
        />
      </View>
    </View>
  );
}

export default Categories;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: 700,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});
