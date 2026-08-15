
import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../app-example/constants/theme";
import { useRouter } from "expo-router";
import SportInfos from "../../components/create_game/SportInfos";

export default function Create_game() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.titleRow}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={Colors.GREY}
            style={styles.backButton}
            onPress={() => router.back()}
          />

          <Text style={styles.title}>Create Game</Text>
        </View>
      </View>

      <View>
        <SportInfos 
        
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHALK,
  },

  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "15%",
  },

  titleRow: {
    flexDirection: "row",
  },

  backButton: {
    position: "absolute",
    right: 220,
    top: 52,
  },

  title: {
    fontFamily: "fontMedium",
    marginTop: 50,
    fontSize: 20,
  },
});