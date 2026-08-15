import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getGameById } from "../../../services/create_game/SportService";
import { Colors } from "../../../app-example/constants/theme";

export default function PlayerGame() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameData = await getGameById(id);
        setGame(gameData);
      } catch (error) {
        console.error("Failed to load game:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadGame();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.INK} />
      </View>
    );
  }

  if (!game) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Game not found.</Text>
      </View>
    );
  }

  const hostName = game.host
    ? `${game.host.firstName || ""} ${game.host.surname || ""}`.trim()
    : "Unknown host";

  const venueName = game.venue?.name || "Venue not set";
  const venueAddress = game.venue?.address || "";
  const startTime = game.startTime ? game.startTime.substring(0, 5) : "--:--";
  const endTime = game.endTime ? game.endTime.substring(0, 5) : "--:--";
  const players = game.players || [];
  const instructions = game.otherInstructions || "";
  const instructionsPreview =
    instructions.length > 90 && !showFullInstructions
      ? instructions.slice(0, 90) + "..."
      : instructions;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={26} color={Colors.WHITE} />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerIconButton}>
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color={Colors.WHITE}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerIconButton}
                onPress={() => setIsSaved((prev) => !prev)}
              >
                <Ionicons
                  name={isSaved ? "bookmark" : "bookmark-outline"}
                  size={20}
                  color={Colors.WHITE}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.sportTitle}>{game.sport}</Text>

          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={15} color="rgba(255,255,255,0.75)" />
            <Text style={styles.timeText}>
              {startTime} - {endTime}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.timeText}>{game.date}</Text>
          </View>

          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusPillText}>{game.status}</Text>
          </View>
        </View>

        {/* Venue card — overlaps header like your VenuePage pattern */}
        <View style={styles.venueCard}>
          <View style={styles.venueIconWrap}>
            <Ionicons name="location" size={18} color={Colors.GREEN} />
          </View>
          <View style={styles.venueTextWrap}>
            <Text style={styles.venueName}>{venueName}</Text>
            {venueAddress ? (
              <Text style={styles.venueAddress} numberOfLines={1}>
                {venueAddress}
              </Text>
            ) : (
              <Text style={styles.venueUnconfirmed}>
                Venue not confirmed by host yet
              </Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.GREY} />
        </View>

        {/* Host card */}
        <View style={styles.hostCard}>
          <View style={styles.hostAvatar}>
            <Text style={styles.hostInitial}>
              {hostName.charAt(0)?.toUpperCase() || "?"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.hostLabel}>Hosted by</Text>
            <Text style={styles.hostName}>{hostName}</Text>
          </View>
          <View style={styles.difficultyPill}>
            <Text style={styles.difficultyPillText}>
              {game.gameDifficulty || "Any level"}
            </Text>
          </View>
        </View>

        {/* Instructions */}
        {instructions ? (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Other instructions</Text>
            <View style={styles.instructionsBox}>
              <View style={styles.instructionsBar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.instructionsText}>
                  {instructionsPreview}
                </Text>
                {instructions.length > 90 && (
                  <TouchableOpacity
                    onPress={() => setShowFullInstructions((prev) => !prev)}
                  >
                    <Text style={styles.seeMoreText}>
                      {showFullInstructions ? "See less" : "See more"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : null}

        {/* Players */}
        <View style={styles.sectionCard}>
          <View style={styles.playersHeaderRow}>
            <Text style={styles.sectionTitle}>
              Players ({game.playersGoing ?? players.length}/{game.maxPlayers})
            </Text>
          </View>

          <View style={styles.slotsRow}>
            {Array.from({ length: game.maxPlayers || 0 }).map((_, i) => {
              const player = players[i];
              return (
                <View key={i} style={styles.slotItem}>
                  {player ? (
                    <View style={styles.playerAvatarFilled}>
                      <Text style={styles.playerInitial}>
                        {player.firstName?.charAt(0)?.toUpperCase() || "?"}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.playerAvatarEmpty}>
                      <Ionicons
                        name="add"
                        size={18}
                        color={Colors.GREY}
                      />
                    </View>
                  )}
                  <Text style={styles.slotLabel} numberOfLines={1}>
                    {player ? player.firstName : "Open"}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.queryButton}>
          <Ionicons name="chatbubble-outline" size={18} color={Colors.INK} />
          <Text style={styles.queryButtonText}>Send query</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHALK,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.CHALK,
  },
  notFoundText: {
    fontFamily: "font",
    fontSize: 16,
    color: Colors.GREY,
  },

  header: {
    backgroundColor: Colors.INK,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  sportTitle: {
    fontFamily: "fontBold",
    fontSize: 30,
    color: Colors.WHITE,
    marginTop: 18,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  timeText: {
    fontFamily: "font",
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 14,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.GREEN,
  },
  statusPillText: {
    fontFamily: "fontMedium",
    fontSize: 12,
    color: Colors.WHITE,
  },

  venueCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: -22,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  venueIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EAF9EE",
    justifyContent: "center",
    alignItems: "center",
  },
  venueTextWrap: {
    flex: 1,
  },
  venueName: {
    fontFamily: "fontBold",
    fontSize: 15,
    color: Colors.INK,
  },
  venueAddress: {
    fontFamily: "font",
    fontSize: 12,
    color: Colors.GREY,
    marginTop: 2,
  },
  venueUnconfirmed: {
    fontFamily: "font",
    fontSize: 12,
    color: Colors.GREY,
    marginTop: 2,
    fontStyle: "italic",
  },

  hostCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
  },
  hostAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.INK,
    justifyContent: "center",
    alignItems: "center",
  },
  hostInitial: {
    fontFamily: "fontBold",
    fontSize: 16,
    color: Colors.WHITE,
  },
  hostLabel: {
    fontFamily: "font",
    fontSize: 11,
    color: Colors.GREY,
  },
  hostName: {
    fontFamily: "fontMedium",
    fontSize: 15,
    color: Colors.INK,
    marginTop: 1,
  },
  difficultyPill: {
    backgroundColor: Colors.CHALK,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  difficultyPillText: {
    fontFamily: "fontMedium",
    fontSize: 11,
    color: Colors.INK,
  },

  sectionCard: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: "fontBold",
    fontSize: 16,
    color: Colors.INK,
    marginBottom: 12,
  },
  instructionsBox: {
    flexDirection: "row",
    backgroundColor: Colors.CHALK,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  instructionsBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: Colors.GREEN,
  },
  instructionsText: {
    fontFamily: "font",
    fontSize: 13,
    color: Colors.INK,
    lineHeight: 19,
  },
  seeMoreText: {
    fontFamily: "fontMedium",
    fontSize: 12,
    color: Colors.INK,
    textDecorationLine: "underline",
    marginTop: 6,
    textAlign: "right",
  },

  playersHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slotsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  slotItem: {
    alignItems: "center",
    width: 56,
  },
  playerAvatarFilled: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.GREEN,
    justifyContent: "center",
    alignItems: "center",
  },
  playerAvatarEmpty: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#DADADA",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  playerInitial: {
    fontFamily: "fontBold",
    fontSize: 16,
    color: Colors.WHITE,
  },
  slotLabel: {
    fontFamily: "font",
    fontSize: 11,
    color: Colors.GREY,
    marginTop: 6,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  queryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    paddingVertical: 15,
  },
  queryButtonText: {
    fontFamily: "fontBold",
    fontSize: 14,
    color: Colors.INK,
  },
  joinButton: {
    flex: 1.4,
    backgroundColor: Colors.GREEN,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  joinButtonText: {
    fontFamily: "fontBold",
    fontSize: 15,
    color: Colors.WHITE,
  },
});