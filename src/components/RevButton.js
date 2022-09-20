import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { color } from "react-native-reanimated";

export default function RevButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

    if (global.scheme == "dark") {
        global.color = "darkslategrey";
        global.color2 = "lightslategray";
        global.color3 = "black";
        global.text = "white";
    } else {
        global.color = "ivory";
        global.color2 = "papayawhip";
        global.color3 = "lightgray";
        global.text = "black";
    }

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 200,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: global.color,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset : { width: 0, height: 4},
    elevation: 7.5,
    marginTop: -140,
  },
  buttonText: {
    fontStyle: "normal",
    fontSize: 18,
    color: global.text,
    textAlign: "center",
    justifyContent: "center",
  },
});