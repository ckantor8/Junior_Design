import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LevelButton({ text, onPress, txtColor }) {
  return (
    <TouchableOpacity onPress={onPress}
                      accessibilityLabel={"level"} accessibilityRole={"button"} accessibilityHint={"choose level"}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
LevelButton.defaultProps = {
  color: "black"
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
    color: "black",
  },
});