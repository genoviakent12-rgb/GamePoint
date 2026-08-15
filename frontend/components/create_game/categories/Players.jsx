import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../../app-example/constants/theme";

export default function Players({
  selectedMaxPlayers,
  onSelectMaxPlayers,
  selectedCurrentPlayers,
  onSelectCurrentPlayers,
}) {
  const decreaseMaxPlayers = () => {
    if (selectedMaxPlayers > 2 && selectedMaxPlayers > selectedCurrentPlayers) {
      onSelectMaxPlayers(selectedMaxPlayers - 1);
    }
  };

  const increaseMaxPlayers = () => {
    if (selectedMaxPlayers < 99) {
      onSelectMaxPlayers(selectedMaxPlayers + 1);
    }
  };

  const increaseCurrentPlayers = () => {
    if (selectedCurrentPlayers < selectedMaxPlayers) {
      onSelectCurrentPlayers(selectedCurrentPlayers + 1);
    }
  };

  const decreaseCurrentPlayers = () => {
    if (selectedCurrentPlayers > 2) {
      onSelectCurrentPlayers(selectedCurrentPlayers - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Maximum Players</Text>

      <View style={{marginTop: 80}}>
        <View style={styles.informationContainer}>
          <Text style={styles.headerText}>
            How many people are you expecting to come?
          </Text>

          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.button}
              onPress={decreaseMaxPlayers}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>{selectedMaxPlayers}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={increaseMaxPlayers}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.informationContainer}>
          <Text style={styles.headerText}>
            How many current players are there already?
          </Text>

          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.button}
              onPress={decreaseCurrentPlayers}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>{selectedCurrentPlayers}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={increaseCurrentPlayers}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: "fontMedium",
    fontSize: 15,
    paddingLeft: 5,
  },
  informationContainer: {
    alignItems: "center",
  },
  headerText: {
    fontFamily: "font",
    fontSize: 15,
    marginTop: 50,
    paddingLeft: 5,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    gap: 24,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.BLACK,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
    lineHeight: 34,
  },
  count: {
    fontSize: 28,
    minWidth: 45,
    textAlign: "center",
    fontFamily: "fontMedium",
  },
});
