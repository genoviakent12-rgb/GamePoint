import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Colors } from "../../app-example/constants/theme";
import { getVenuePhoto } from "../../services/venue/VenueService";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 420;

export default function VenuePage() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const photoNames = params.photos ? JSON.parse(params.photos) : [];
  const rating = params.rating ? Number(params.rating) : 0;
  const ratingCount = params.ratingCount || 0;

  const onImageScroll = (event) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setActiveSlide(slide);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image carousel */}
      <View style={styles.imageWrapper}>
        {photoNames.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onImageScroll}
            scrollEventThrottle={16}
          >
            {photoNames.map((name, i) => (
              <Image
                key={i}
                source={{ uri: getVenuePhoto(name) }}
                style={styles.image}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Ionicons name="image-outline" size={48} color={Colors.GREY} />
          </View>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.INK} />
        </TouchableOpacity>

        {photoNames.length > 1 && (
          <View style={styles.dotsRow}>
            {photoNames.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === activeSlide && styles.dotActive,
                ]}
              />
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorited((prev) => !prev)}
        >
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={22}
            color={Colors.INK}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-social-outline" size={22} color={Colors.INK} />
        </TouchableOpacity>
      </View>

      {/* Title + hours */}
      <View style={styles.section}>
        <Text style={styles.venueName}>{params.name}</Text>

        <View style={styles.hoursRow}>
          <Ionicons name="time-outline" size={20} color={Colors.INK} />
          <Text style={styles.hoursText}>All Days 6AM-12AM</Text>
        </View>

        <Text style={styles.addressText}>{params.address}</Text>

        <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="location" size={18} color="#4285F4" />
          <Text style={styles.mapButtonText}>Show in Map</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Rating + games */}
      <View style={styles.section}>
        <View style={styles.statsRow}>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons
                key={i}
                name={i <= Math.round(rating) ? "star" : "star-outline"}
                size={18}
                color="#F5A623"
              />
            ))}
            <Text style={styles.ratingText}>
              {rating || "—"} ({ratingCount} ratings)
            </Text>
          </View>

          <Text style={styles.gamesText}>8.8k Total Games</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Rate Venue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>0 Upcoming</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Available sports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Sports</Text>
        <Text style={styles.sectionHint}>
          Tap on icon to see Price Chart
        </Text>

        <View style={styles.sportsRow}>
          <TouchableOpacity style={styles.sportCard}>
            <Ionicons name="tennisball-outline" size={28} color={Colors.INK} />
            <Text style={styles.sportLabel}>Badminton</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promo banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>
          Your First{"\n"}Box Cricket Game at{"\n"}50%
        </Text>
      </View>

      {/* Bottom actions */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.corporateButton}>
          <Text style={styles.corporateButtonText}>Corporate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    position: "relative",
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 20,
    right: 78,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  shareButton: {
    position: "absolute",
    bottom: 20,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsRow: {
    position: "absolute",
    bottom: 26,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  dotActive: {
    backgroundColor: Colors.GREEN || "#3DBE5C",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  venueName: {
    fontFamily: "fontBold",
    fontSize: 32,
    color: Colors.INK,
    marginBottom: 16,
  },
  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  hoursText: {
    fontFamily: "font",
    fontSize: 17,
    color: Colors.INK,
  },
  addressText: {
    fontFamily: "font",
    fontSize: 17,
    color: Colors.INK,
    lineHeight: 24,
    marginBottom: 14,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  mapButtonText: {
    fontFamily: "font",
    fontSize: 15,
    color: Colors.INK,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontFamily: "fontBold",
    fontSize: 15,
    color: Colors.INK,
    marginLeft: 6,
  },
  gamesText: {
    fontFamily: "fontBold",
    fontSize: 17,
    color: Colors.INK,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  actionButtonText: {
    fontFamily: "fontBold",
    fontSize: 15,
    color: Colors.INK,
  },
  sectionTitle: {
    fontFamily: "fontBold",
    fontSize: 24,
    color: Colors.INK,
    marginBottom: 6,
  },
  sectionHint: {
    fontFamily: "font",
    fontSize: 14,
    color: Colors.GREY,
    marginBottom: 16,
  },
  sportsRow: {
    flexDirection: "row",
    gap: 12,
  },
  sportCard: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  sportLabel: {
    fontFamily: "font",
    fontSize: 13,
    color: Colors.GREY,
  },
  promoBanner: {
    marginTop: 24,
    marginHorizontal: 20,
    height: 140,
    borderRadius: 16,
    backgroundColor: "#2F8F3D",
    justifyContent: "center",
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  promoText: {
    fontFamily: "fontBold",
    fontSize: 24,
    color: Colors.WHITE,
    lineHeight: 30,
  },
  bottomRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  corporateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  corporateButtonText: {
    fontFamily: "fontBold",
    fontSize: 16,
    color: Colors.INK,
  },
  bookButton: {
    flex: 2,
    backgroundColor: "#2F8F3D",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  bookButtonText: {
    fontFamily: "fontBold",
    fontSize: 16,
    color: Colors.WHITE,
  },
});