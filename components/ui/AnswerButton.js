import React, { useRef } from "react";
import { Pressable, StyleSheet, Text, Animated, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AnswerButton = ({ label, onPress }) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [state, setState] = React.useState("default");

  const handlePress = () => {
    const isSuccess = onPress();
    if (isSuccess) {
      setState("success");
      setTimeout(() => setState("default"), 1000);
    } else {
      setState("error");
      startShakeAnimation();
      setTimeout(() => {
        setState("default");
        shakeAnimation.setValue(0); // Reset animation value after shake
      }, 300); // Adjust the duration of shake as needed
    }
  };

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const buttonStyles = [
    styles.button,
    state === "success" && styles.success,
    state === "error" && styles.error,
    {
      transform: [{ translateX: shakeAnimation }],
    },
  ];

  const labelStyles = [
    styles.label,
    state === "success" && styles.labelSuccess,
  ];

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={buttonStyles}>
        <LinearGradient
          colors={
            state === "success"
              ? ["#28a745", "#218838"]
              : ["#FFA500", "#FF4500"]
          }
          style={styles.gradient}
        >
          <Text style={labelStyles}>{label}</Text>
        </LinearGradient>
        <View style={styles.string}></View>
      </Animated.View>
    </Pressable>
  );
};

export default AnswerButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    margin: 5,
  },
  gradient: {
    width: 50,
    height: 60,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  labelSuccess: {
    color: "white",
  },
  success: {
    borderColor: "#28a745",
  },
  error: {
    borderColor: "#dc3545",
  },
  string: {
    width: 2,
    height: 20,
    backgroundColor: "#000",
    marginTop: -5,
    zIndex: -1,
  },
});
