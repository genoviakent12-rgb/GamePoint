import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Colors } from "../../../app-example/constants/theme";

export default function Date({ selectedDate, onSelectDate }) {
  const today = new global.Date().toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date</Text>

      <Calendar
        minDate={today}
        onDayPress={(day) => onSelectDate(day.dateString)}
        markedDates={
          selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  selectedColor: Colors.BLUE,
                },
              }
            : {}
        }
        theme={{
          todayTextColor: Colors.BLUE,
          selectedDayBackgroundColor: Colors.BLUE,
          arrowColor: Colors.BLUE,
          textDayFontFamily: "font",
          textMonthFontFamily: "fontMedium",
          textDayHeaderFontFamily: "fontMedium",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "fontMedium",
    fontSize: 15,
    paddingLeft: 5,
    marginBottom: 15,
  },
});
