import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../../app-example/constants/theme";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Time({ selectedTime, onSelectTime }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Time</Text>

      <View style={styles.timeColumn}>
        {/* MORNING */}
        <TouchableOpacity
          style={[
            styles.timeButtons,
            selectedTime?.timePeriod === "Morning" && {
              backgroundColor: Colors.WHISTLE,
            },
          ]}
          onPress={() =>
            onSelectTime({
              timePeriod: "Morning",
              startTime: "05:00",
              endTime: "11:00",
            })
          }
        >
          <View style={styles.timeButtonInner}>
            <Fontisto
              name="day-haze"
              size={60}
              color={
                selectedTime?.timePeriod === "Morning"
                  ? Colors.WHITE
                  : Colors.WHISTLE
              }
              style={styles.iconLeft}
            />

            <Text
              style={[
                styles.timeText,
                selectedTime?.timePeriod === "Morning" &&
                  styles.selectedTimeText,
              ]}
            >Morning Time</Text>

            <Text
              style={[
                styles.timeDesc,
                selectedTime?.timePeriod === "Morning" &&
                  styles.selectedTimeDesc,
              ]}
            >5 AM to 11 AM</Text>
          </View>
        </TouchableOpacity>

        {/* AFTERNOON */}
        <TouchableOpacity
          style={[
            styles.timeButtons,
            selectedTime?.timePeriod === "Afternoon" && {
              backgroundColor: Colors.COURT_RED,
            },
          ]}
          onPress={() =>
            onSelectTime({
              timePeriod: "Afternoon",
              startTime: "12:00",
              endTime: "17:00",
            })
          }
        >
          <View style={styles.timeButtonInner}>
            <Fontisto
              name="day-sunny"
              size={60}
              color={
                selectedTime?.timePeriod === "Afternoon"
                  ? Colors.WHITE
                  : Colors.COURT_RED
              }
              style={styles.iconRight}
            />

            <Text
              style={[
                styles.timeText,
                selectedTime?.timePeriod === "Afternoon" &&
                  styles.selectedTimeText,
              ]}
            >Afternoon Time</Text>

            <Text
              style={[
                styles.timeDesc,
                selectedTime?.timePeriod === "Afternoon" &&
                  styles.selectedTimeDesc,
              ]}
            >
              12 PM to 5 PM
            </Text>
          </View>
        </TouchableOpacity>

        {/* EVENING */}
        <TouchableOpacity
          style={[
            styles.timeButtons,
            selectedTime?.timePeriod === "Evening" && {
              backgroundColor: Colors.VIOLET,
            },
          ]}
          onPress={() =>
            onSelectTime({
              timePeriod: "Evening",
              startTime: "18:00",
              endTime: "21:00",
            })
          }
        >
          <View style={styles.timeButtonInner}>
            <Fontisto
              name="night-clear"
              size={55}
              color={
                selectedTime?.timePeriod === "Evening"
                  ? Colors.WHITE
                  : Colors.VIOLET
              }
              style={styles.iconLeft}
            />

            <Text
              style={[
                styles.timeText,
                selectedTime?.timePeriod === "Evening" &&
                  styles.selectedTimeText,
              ]}
            >Evening Time</Text>

            <Text
              style={[
                styles.timeDesc,
                selectedTime?.timePeriod === "Evening" &&
                  styles.selectedTimeDesc,
              ]}
            >
              6 PM to 9 PM
            </Text>
          </View>
        </TouchableOpacity>

        {/* NIGHT */}
        <TouchableOpacity
          style={[
            styles.timeButtons,
            selectedTime?.timePeriod === "Night" && {
              backgroundColor: Colors.DARKVIOLET,
            },
          ]}
          onPress={() =>
            onSelectTime({
              timePeriod: "Night",
              startTime: "00:00",
              endTime: "02:00",
            })
          }
        >
          <View style={styles.timeButtonInner}>
            <Ionicons
              name="cloudy-night-outline"
              size={60}
              color={
                selectedTime?.timePeriod === "Night"
                  ? Colors.WHITE
                  : Colors.DARKVIOLET
              }
              style={styles.iconRight}
            />

            <Text
              style={[
                styles.timeText,
                selectedTime?.timePeriod === "Night" && styles.selectedTimeText,
              ]}
            >Night Time</Text>

            <Text
              style={[
                styles.timeDesc,
                selectedTime?.timePeriod === "Night" && styles.selectedTimeDesc,
              ]}
            >
              12 AM to 2 AM
            </Text>
          </View>
        </TouchableOpacity>
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
  timeColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timeButtons: {
    backgroundColor: Colors.WHITE,
    width: "90%",
    height: 80,
    margin: 10,
    marginTop: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0.2,
      height: 0.3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },

  timeButtonInner: {
    flex: 1,
    borderRadius: 25,
    borderColor: Colors.GREY,
    borderWidth: 0.2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  iconLeft: {
    position: "absolute",
    left: 15,
    top: 5,
    transform: [{ translateY: 5 }, { rotate: "25deg" }],
  },
  iconRight: {
    position: "absolute",
    right: 15,
    top: 5,
    transform: [{ translateY: 5 }, { rotate: "-15deg" }],
  },
  timeText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "font",
    color: Colors.BLACK,
  },
  timeDesc: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "font",
    color: Colors.GREY,
  },
  selectedTimeText: {
    color: Colors.WHITE,
  },
  selectedTimeDesc: {
    color: Colors.WHITE,
  },
});
