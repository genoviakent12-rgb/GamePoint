import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../../app-example/constants/theme";
import Slider from '@react-native-community/slider'; 


export const difficultyLabels = {
    1: "Beginner", 
    2: "Amateur",
    3: "Intermediate",
    4: "Advanced",
    5: "Pro" 
  };

export default function Difficulty( {selectedDifficulty, onSelectDifficulty, selectedSport} ) {

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Difficulty</Text>

      <View style={styles.content}>
        <Text style={styles.difficultyLevel}>{difficultyLabels[selectedDifficulty]}</Text>
        <Slider
        style={styles.slider}
        value={selectedDifficulty}
        onValueChange={onSelectDifficulty}
        minimumValue={1}
        maximumValue={5}
        step={1}
        minimumTrackTintColor={Colors.BLUE}
        maximumTrackTintColor={Colors.YELLOW}
        />
      </View>
      <View style={{alignItems:"flex-start", alignContent: "flex-start", marginTop: 20,
        }}> 
        <Text style={styles.legendText}>Beginner = 1 game icon</Text>
        <Text style={styles.legendText}>Amateur = 2 game icon</Text>
        <Text style={styles.legendText}>Intermediate = 3 game icon</Text>
        <Text style={styles.legendText}>Advanced = 4 game icon</Text>
        <Text style={styles.legendText}>Pro = 5 game icon</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1
  },
  title: { 
    fontFamily: "fontMedium",
    fontSize: 15,
    paddingLeft: 5,
    marginBottom: 50,
  }, 
  content: {
    alignItems: "center"
  },
  slider: { 
    width: "100%", 
    height: 50,
  },
  difficultyLevel: { 
    fontFamily: "fontMedium",
    fontSize: 40,
    paddingLeft: 5,
  },
  legendText: { 
    fontFamily: "font", 
    color: Colors.GREY,
    fontSize: 15,
  }
})