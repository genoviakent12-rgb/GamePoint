import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "../../app-example/constants/theme";

export default function GreetingHeader({ userData, onTodoPress }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>Find Your Games</Text>
        <Text style={styles.nameText}>
          {`Hey, ${userData?.firstName ?? "Player"}!`}
        </Text>
      </View>

      <TouchableOpacity onPress={onTodoPress} style={styles.todoButton}>
        <FontAwesome6 name="clipboard-list" size={20} color={Colors.WHISTLE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 22,
    marginBottom: 5,
    marginTop: -15,
  },
  eyebrow: {
    fontFamily: "fontMedium",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: Colors.WHISTLE,
    marginBottom: 2,
  },
  nameText: {
    fontSize: 35,
    fontFamily: "fontBold",
    color: Colors.CHALK,
  },
  todoButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.INK_2,
    borderColor: Colors.GREY,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});
