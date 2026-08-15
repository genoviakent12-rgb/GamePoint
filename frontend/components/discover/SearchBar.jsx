import React from "react";
import { View, StyleSheet } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { Colors } from "../../app-example/constants/theme";
import Constants from "expo-constants";

const GOOGLE_API_KEY = Constants.expoConfig.extra.googleApiKey;

export default function SearchBar({ 
  setSelectedVenue, 
  location, 
  placeholder="Search sports, venues, games..." }) 
  {
  return (
    <View style={styles.searchContainer}>
      <FontAwesome
        name="search"
        size={20}
        color={Colors.DARKGREY}
        style={{ opacity: 0.6 }}
      />

      <GooglePlacesAutocomplete
        placeholder={placeholder}
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps="handled"
        minLength={2}
        debounce={300}
        onFail={(error) => {
          console.log("Places Error:", error);
        }}
        onNotFound={() => {
          console.log("No places found");
        }}
        onPress={(data, details = null) => {
          if (!details) return;

          const photoReference = details?.photos?.[0]?.photo_reference;

          const imageUrl = photoReference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`
            : null;

          const venue = {
            name: details?.name,
            address: details?.formatted_address,
            rating: details?.rating,
            priceLevel: details?.price_level,
            phone: details?.formatted_phone_number,
            website: details?.website,
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            image: imageUrl,
          };

          setSelectedVenue(venue);
          console.log("Selected Venue:", venue);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          location: location
            ? `${location.latitude},${location.longitude}`
            : undefined,
          radius: 10000,
        }}
        styles={{
          container: {
            flex: 1,
            zIndex: 9999,
          },

          textInputContainer: {
            backgroundColor: "transparent",
            height: 45,
          },

          textInput: {
            fontSize: 17,
            fontFamily: "fontMedium",
            color: Colors.GREY,
            backgroundColor: "transparent",
            paddingLeft: 10,
          },

          listView: {
            position: "absolute",
            top: 55,
            left: -35,
            right: -15,
            backgroundColor: Colors.CHALK,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#ddd",
            elevation: 10,
            zIndex: 9999,
            maxHeight: 300,
          },

          row: {
            padding: 15,
            backgroundColor: Colors.CHALK,
          },

          separator: {
            backgroundColor: "#ddd",
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 10,
    marginTop: 30,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 0.2,
    borderColor: Colors.GREY,
    backgroundColor: Colors.WHITE,
    zIndex: 1000,
    elevation: 1000,
    marginHorizontal: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 0, 
      height: 0.3, 
    }, 
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
