import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Sports } from "../../../app-example/constants/sportsType/sports_icon";
import { Colors } from "../../../app-example/constants/theme";

const groupedIcons = [];

for (let i = 0; i < Sports.length; i += 2) {
  groupedIcons.push(Sports.slice(i, i + 2));
}

export default function Sport({ selectedSport, onSelectSport }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sports</Text>

      <View style={styles.sportsContainer}>
        <FlatList
          data={groupedIcons}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.iconsContainer}
          renderItem={({ item }) => (
            <View style={styles.columnContainer}>
              {item.map((sport) => {
                const Icon = sport.iconType;

                const isSelected = selectedSport === sport.title;

                return (
                  <View style={styles.iconContainer} key={sport.id}>
                    <TouchableOpacity
                      style={[
                        styles.iconButton,
                        isSelected && styles.selectedIconButton,
                      ]}
                      onPress={() => onSelectSport(sport.title)}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name={sport.icon}
                        size={sport.size || 30}
                        color={isSelected ? Colors.BLUE : Colors.BLACK}
                      />

                      <Text
                        style={[
                          styles.iconText,
                          isSelected && styles.selectedIconText,
                        ]}
                      >
                        {sport.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sportsContainer: {
    marginTop: 5,
  },

  titleText: {
    fontFamily: "fontMedium",
    fontSize: 15,
    paddingLeft: 5,
  },

  columnContainer: {
    marginRight: 30,
  },

  iconsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  iconContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  selectedIconButton: {
    transform: [{ scale: 1.05 }],
  },

  iconText: {
    marginTop: 5,
    fontFamily: "fontMedium",
    fontSize: 12,
    color: Colors.BLACK,
  },

  selectedIconText: {
    color: Colors.BLUE,
  },
});
