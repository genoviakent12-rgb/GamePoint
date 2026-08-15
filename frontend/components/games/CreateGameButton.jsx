import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../app-example/constants/theme";
import React from "react";

export default function CreateGameButton({ onPress }) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.createText}>Create game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.GREEN,
    borderColor: Colors.TURF,
    borderWidth: 0.2,
    marginTop: 20,
    width: 350,
    height: 45,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  createText: {
    fontFamily: "fontMedium",
    fontSize: 15,
    color: Colors.WHITE,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
