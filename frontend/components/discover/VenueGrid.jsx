import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "../../app-example/constants/theme";
import {
  getNearbyVenues,
  getVenuePhoto,
} from "../../services/venue/VenueService";
import { useRouter } from "expo-router";

export default function VenueGrid() {
  const [venues, setVenues] = useState([]);
  const router = useRouter();
  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      const data = await getNearbyVenues(25.204849, 55.270783);
      setVenues(data.places || []);
    } catch (error) {
      console.error("Error loading venues:", error);
    }
  };

  return (
    <View style={styles.venueContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>Venues</Text>
        <Text style={styles.subtitleText}>{venues.length} nearby</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {venues.map((venue) => {
          const photoName = venue.photos?.[0]?.name;

          return (
            <TouchableOpacity
              key={venue.id}
              style={styles.venueCard}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/venue-page",
                  params: {
                    id: venue.id,
                    name: venue.displayName?.text || "Unknown venue",
                    address: venue.formattedAddress || "",
                    photos: JSON.stringify(
                      venue.photos?.map((p) => p.name) || [],
                    ),
                    rating: venue.rating ?? "",
                    ratingCount: venue.userRatingCount ?? "",
                  },
                })
              }
            >
              {photoName ? (
                <Image
                  source={{ uri: getVenuePhoto(photoName) }}
                  style={styles.venueImage}
                />
              ) : (
                <View style={styles.noImage}>
                  <Ionicons
                    name="image-outline"
                    size={28}
                    color={Colors.GREY}
                  />
                </View>
              )}

              <View style={styles.venueInfo}>
                <Text
                  style={styles.venueName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {venue.displayName?.text || "Unknown venue"}
                </Text>

                <View style={styles.venueMetaRow}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={Colors.GREY}
                  />
                  <Text style={styles.venueMetaText} numberOfLines={1}>
                    {venue.formattedAddress || "Nearby"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  venueContainer: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 50,
    borderRadius: 24,
    paddingTop: 18,
    paddingBottom: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 16,
  },

  titleText: {
    fontFamily: "fontBold",
    fontSize: 26,
    color: Colors.INK,
  },

  subtitleText: {
    fontFamily: "font",
    fontSize: 13,
    color: Colors.GREY,
  },

  scrollContent: {
    paddingLeft: 20,
    paddingRight: 12,
  },

  venueCard: {
    width: 190,
    marginRight: 14,
    backgroundColor: Colors.WHITE,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  venueImage: {
    width: "100%",
    height: 120,
  },

  noImage: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },

  venueInfo: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },

  venueName: {
    fontFamily: "fontBold",
    fontSize: 14,
    color: Colors.BLACK,
    lineHeight: 18,
    marginBottom: 6,
  },

  venueMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  venueMetaText: {
    fontFamily: "font",
    fontSize: 11,
    color: Colors.GREY,
    flexShrink: 1,
  },
});
