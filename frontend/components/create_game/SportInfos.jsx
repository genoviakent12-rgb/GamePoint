import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../app-example/constants/theme";

import BottomSheet from "./ScreenSheet";

import Sport from "./categories/Sport";
import Venue from "./categories/Venue";
import Time from "./categories/Time";
import Date from "./categories/Date";
import Players from "./categories/Players";
import Difficulty, { difficultyLabels } from "./categories/Difficulty";
import CreateGameAction from "./CreateGameAction";

export default function SportInfos() {
  const [activeModal, setActiveModal] = useState(null);

  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMaxPlayers, setSelectedMaxPlayers] = useState(null);
  const [selectedCurrentPlayers, setSelectedCurrentPlayers] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null); 

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
  };

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleMaxPlayersSelect = (max) => {
    setSelectedMaxPlayers(max);
  };

  const handleCurrentPlayersSelect = (current) => {
    setSelectedCurrentPlayers(current);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleStatusSelect = (status) => { 
    console.log(status);
    setSelectedStatus(status); 
  }

  return (
    <View>
      {/* SPORT */}
      <TouchableOpacity
        style={styles.categoryRow}
        onPress={() => setActiveModal("sport")}
      >
        <MaterialIcons
          name="sports"
          size={26}
          color={Colors.BLACK}
          style={styles.icons}
        />

        <Text style={styles.categoryText}>{selectedSport || "Sport"}</Text>

        <MaterialIcons name="navigate-next" size={24} color={Colors.BLACK} />
      </TouchableOpacity>

      {/* VENUE */}
      <TouchableOpacity
        style={styles.categoryRow}
        onPress={() => setActiveModal("venue")}
      >
        <Octicons
          name="location"
          size={24}
          color={Colors.BLACK}
          style={styles.icons}
        />

        <Text style={styles.categoryText}>
          {selectedVenue?.name || "Venue"}
        </Text>

        <MaterialIcons name="navigate-next" size={24} color={Colors.BLACK} />
      </TouchableOpacity>

      {/* TIME */}
      <TouchableOpacity
        style={styles.categoryRow}
        onPress={() => setActiveModal("time")}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color={Colors.BLACK}
          style={styles.icons}
        />

        <Text style={styles.categoryText}>
          {selectedTime
            ? `${selectedTime.timePeriod} -- ${selectedTime.startTime} - ${selectedTime.endTime}`
            : "Time"}
        </Text>

        <MaterialIcons name="navigate-next" size={24} color={Colors.BLACK} />
      </TouchableOpacity>

      {/* DATE */}
      <TouchableOpacity
        style={styles.categoryRow}
        onPress={() => setActiveModal("date")}
      >
        <Feather
          name="calendar"
          size={22}
          color={Colors.BLACK}
          style={styles.icons}
        />

        <Text style={styles.categoryText}>{selectedDate || "Date"}</Text>

        <MaterialIcons name="navigate-next" size={24} color={Colors.BLACK} />
      </TouchableOpacity>

      {/* MAXIMUM PLAYERS */}
      <TouchableOpacity
        style={styles.categoryRow}
        onPress={() => setActiveModal("players")}
      >
        <Octicons
          name="people"
          size={24}
          color={Colors.BLACK}
          style={styles.icons}
        />

        <Text style={styles.categoryText}>
          {selectedMaxPlayers || "Maximum Players"}
        </Text>

        <MaterialIcons name="navigate-next" size={24} color={Colors.BLACK} />
      </TouchableOpacity>

      {/* DIFFICULTY */}
      <TouchableOpacity
        style={styles.categoryRow}
        onPress={() => setActiveModal("difficulty")}
      >
        <AntDesign
          name="crown"
          size={22}
          color={Colors.BLACK}
          style={styles.icons}
        />

        <Text style={styles.categoryText}>
          {difficultyLabels[selectedDifficulty] || "Difficulty"}
        </Text>

        <MaterialIcons name="navigate-next" size={24} color={Colors.BLACK} />
      </TouchableOpacity>

      {/* BOTTOM SHEET */}
      <BottomSheet visible={activeModal !== null} onClose={closeModal}>
        {activeModal === "sport" && (
          <Sport
            selectedSport={selectedSport}
            onSelectSport={handleSportSelect}
          />
        )}

        {activeModal === "venue" && (
          <Venue
            selectedVenue={selectedVenue}
            onSelectVenue={handleVenueSelect}
            selectedStatus={selectedStatus}
            onSelectStatus={handleStatusSelect}
          />
        )}

        {activeModal === "time" && (
          <Time 
            selectedTime={selectedTime} 
            onSelectTime={handleTimeSelect} 
          />
        )}

        {activeModal === "date" && (
          <Date 
            selectedDate={selectedDate} 
            onSelectDate={handleDateSelect} 
          />
        )}

        {activeModal === "players" && (
          <Players
            selectedMaxPlayers={selectedMaxPlayers}
            onSelectMaxPlayers={handleMaxPlayersSelect}
            selectedCurrentPlayers={selectedCurrentPlayers}
            onSelectCurrentPlayers={handleCurrentPlayersSelect}
          />
        )}

        {activeModal === "difficulty" && (
          <Difficulty
            selectedDifficulty={selectedDifficulty}
            onSelectDifficulty={handleDifficultySelect}
          />
        )}
      </BottomSheet>

      {/* CREATE GAME */}
      <CreateGameAction
        selectedSport={selectedSport}
        selectedVenue={selectedVenue}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        selectedMaxPlayers={selectedMaxPlayers}
        selectedCurrentPlayers={selectedCurrentPlayers}
        selectedDifficulty={selectedDifficulty}
        selectedStatus={selectedStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryText: {
    flex: 1,
    fontFamily: "font",
    fontSize: 16,
    color: Colors.BLACK,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 70,
    marginVertical: 10,
    marginHorizontal: "5%",
    paddingHorizontal: 20,
    borderColor: Colors.GREY,
    borderWidth: 0.2,
    borderRadius: 15,
  },

  icons: {
    marginRight: 20,
  },
});
