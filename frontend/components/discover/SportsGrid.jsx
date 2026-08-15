import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Colors } from "../../app-example/constants/theme";
import { Sports } from "../../app-example/constants/sportsType/sports_icon";
import SportCard from "./SportCard";

const groupedSports = [];

for (let i = 0; i < Sports.length; i += 2) {
  groupedSports.push(Sports.slice(i, i + 2));
}

export default function SportsGrid() {
  return (
    <View style={styles.sportButtonsContainer}>
      <Text style={styles.titleText}>Sports</Text>
      <Text style={styles.categoryText}>5 categories</Text>
      <FlatList
        data={groupedSports}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.sportsContainer}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.map((sport) => (
              <SportCard
                key={sport.id}
                sport={sport}
                onPress={() => console.log(`${sport.title} pressed`)}
              />
            ))}
          </View>
        )}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  sportButtonsContainer: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GREY, 
    borderWidth: 0.2,
    marginHorizontal: 20,
    margin: 50,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0, 
      height: 0.3, 
    }, 
    shadowOpacity: 0.15,
    shadowRadius: 5, 
    
    elevation: 5, 
  },  

  titleText: {
    fontFamily: "fontBold",
    fontSize: 30,
    color: Colors.INK,
    marginTop: 18,
    marginLeft: 18,
  },

  categoryText: {
    fontFamily: "fontMedium",
    fontSize: 15,
    color: Colors.GREY,
    marginTop: 5,
    marginLeft: 18,
  },

  sportsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  column: {
    marginRight: 15,
  },

  // overlay: {
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: 100,

  //   borderBottomLeftRadius: 20,
  //   borderBottomRightRadius: 20,
  // },
});
