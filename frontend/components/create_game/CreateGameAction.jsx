import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Colors } from "../../app-example/constants/theme";
import { createGame } from "../../services/create_game/SportService";
import { useRouter } from "expo-router";
import axios from "axios";
import { auth } from "../../configs/FirebaseConfigs";

export default function CreateGameAction({
  selectedSport,
  selectedVenue,
  selectedTime,
  selectedDate,
  selectedMaxPlayers,
  selectedCurrentPlayers,
  selectedDifficulty,
  selectedStatus
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateGame = async () => {
    if (
      !selectedSport ||
      !selectedVenue ||
      !selectedTime ||
      !selectedDate ||
      !selectedMaxPlayers ||
      !selectedStatus
    ) {
      Alert.alert("Missing Category", "Please finish all categories.");
      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert("Not signed in", "Please sign in before creating a game.");
      return;
    }

    try {
      setLoading(true);

      // GET THE POSTGRES USER CONNECTED TO THE FIREBASE USER
      const userResponse = await axios.get(
        `http://127.0.0.1:8080/api/users/firebase/${currentUser.uid}`,
      );

      const host = userResponse.data;

      const game = {
        sport: selectedSport,
        venue: selectedVenue,

        // CONNECT THE GAME TO THE LOGGED-IN USER
        host: {
          id: host.id,
        },

        timePeriod: selectedTime.timePeriod,
        startTime: selectedTime.startTime,
        endTime: selectedTime.endTime,
        date: selectedDate,
        maxPlayers: selectedMaxPlayers,
        currentPlayers: selectedCurrentPlayers,
        playersGoing: selectedCurrentPlayers,
        gameDifficulty: selectedDifficulty,
        status: selectedStatus,
      };

      const createdGame = await createGame(game);

      console.log("Game created successfully:", createdGame);

      Alert.alert("Success", "Game created successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("Failed to create game:", error);
      Alert.alert("Error", "Could not create the game. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateGame}
        disabled={loading}
      >
        <Text style={styles.createText}>
          {loading ? "Creating..." : "Create Game"}
        </Text>
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
    marginLeft: 25,
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
