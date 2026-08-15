import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Colors } from "../../app-example/constants/theme";

export default function SportCard({ sport, onPress }) {
  const Icon = sport.iconType;
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        source={sport.background}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        {Icon && (
          <Icon name={sport.icon} size={35} color="white" style={styles.icon} />
        )}

        <Text style={styles.itemTitle}>{sport.title}</Text>
        <Text style={styles.itemDesc}>{sport.desc}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 160,
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 15,
  },

  itemTitle: {
    color: Colors.CHALK,
    fontSize: 20,
    fontFamily: "fontBold",
    textAlign: "left",
    paddingLeft: 14,
    paddingBottom: 14,
    marginBottom: -15,
  },

  itemDesc: {
    color: Colors.CHALK,
    fontSize: 12,
    fontFamily: "fontMedium",
    textAlign: "left",
    paddingLeft: 14,
    paddingBottom: 14,
  },

  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },

  icon: { 
    margin: 12, 
  }, 

  image: {
    borderRadius: 25,
    resizeMode: "cover",
  },
});
