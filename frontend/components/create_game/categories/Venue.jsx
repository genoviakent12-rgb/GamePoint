import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SearchBar from "../../discover/SearchBar";
import { createVenue } from "../../../services/create_game/VenueService";
import * as Location from "expo-location";
import { Colors } from "../../../app-example/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Venue({ selectedVenue, onSelectVenue, selectedStatus, onSelectStatus }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Location permission needed",
          "Enable location permission to search for nearby venues."
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    };

    getCurrentLocation();
  }, []);

  const handleVenueSelect = async (venue) => {
    // SHOW THE GOOGLE VENUE IMMEDIATELY
    onSelectVenue(venue);

    try {
      const savedVenue = await createVenue({
        name: venue.name,
        address: venue.address,
        latitude: venue.latitude,
        longitude: venue.longitude,
        rating: venue.rating,
        phone: venue.phone,
        imageUrl: venue.image,
        available: true,
      });

      console.log("Saved venue:", savedVenue);

      // KEEP GOOGLE DETAILS AND ADD DATABASE DETAILS SUCH AS ID
      onSelectVenue({
        ...venue,
        ...savedVenue,
      });
    } catch (error) {
      console.error("Failed to save venue:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.venueText}>Venue</Text>

      <SearchBar
        placeholder="Search Venue"
        location={location}
        setSelectedVenue={handleVenueSelect}
      />

      {selectedVenue?.name && (
        <View style={styles.selectedVenue}>
          <Text style={styles.venueName}>{selectedVenue.name}</Text>

          <Text style={styles.venueAddress}>{selectedVenue.address}</Text>
        </View>
      )}

      <View style={styles.statusContainer}>
        <Text style={styles.statusHeader}>Venue Status</Text>

        {/* FIRST ROW */}
        <View style={styles.statusButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.bookedButton,
              selectedStatus === "Booked" && styles.selectedButton,
            ]}
            onPress={() => onSelectStatus("Booked")}
          >
            <Ionicons name="ticket-sharp" size={24} color={Colors.WHITE} />
            <Text style={styles.buttonText}>Booked</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.notBookedButton,
              selectedStatus === "Not Booked" && styles.selectedButton,
            ]}
            onPress={() => onSelectStatus("Not Booked")}
          >
            <Ionicons name="ticket-outline" size={24} color={Colors.WHITE} />
            <Text style={styles.buttonText}>Not Booked</Text>
          </TouchableOpacity>
        </View>

        {/* SECOND ROW */}
        <View style={styles.statusButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.tournamentButton,
              selectedStatus === "Tournament" && styles.selectedButton,
            ]}
            onPress={() => onSelectStatus("Tournament")}
          >
            <MaterialCommunityIcons
              name="tournament"
              size={24}
              color={Colors.WHITE}
            />
            <Text style={styles.buttonText}>Tournament</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.freeButton,
              selectedStatus === "Free" && styles.selectedButton,
            ]}
            onPress={() => onSelectStatus("Free")}
          >
            <MaterialIcons name="money-off" size={24} color={Colors.WHITE} />
            <Text style={styles.buttonText}>Free</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  venueText: {
    fontFamily: "fontMedium",
    fontSize: 15,
    paddingLeft: 5,
  },
  selectedVenue: {
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
  },
  venueName: {
    fontFamily: "fontMedium",
    fontSize: 16,
  },
  venueAddress: {
    marginTop: 5,
    fontSize: 13,
  },
  statusContainer: {
    marginTop: 40,
    width: "100%",
  },

  statusHeader: {
    fontFamily: "fontMedium",
    fontSize: 14,
    paddingLeft: 5,
    marginBottom: 10,
  },

  statusButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
    height: 75,
    borderRadius: 10,
    borderColor: Colors.GREY,
    borderWidth: 0.2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0.2,
      height: 0.3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedButton: {
    borderColor: Colors.GREY,
    borderWidth: 0.2,
    transform: [{ scale: 1.04 }],
  },
  buttonText: {
    fontFamily: "fontMedium",
    fontSize: 13,
    marginTop: 5,
    color: Colors.WHITE,
  },
  bookedButton: {
    backgroundColor: Colors.LIGHTBLUE,
  },
  notBookedButton: {
    backgroundColor: Colors.BLUE,
  },

  tournamentButton: {
    backgroundColor: Colors.RED,
  },

  freeButton: {
    backgroundColor: Colors.GREEN,
  },
});