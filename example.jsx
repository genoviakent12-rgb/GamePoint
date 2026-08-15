import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../app-example/constants/theme";
import { moderateScale } from "react-native-size-matters";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, {useRouter} from "react";
import { deleteGame as deleteGameAPI } from "../../services/create_game/SportService";
export default function GameCard({ game, users, venue }) {

  const router = useRouter(); 
  const sportIcons = {
    badminton: "badminton",
    basketball: "basketball",
    volleyball: "volleyball",
    football: "football",
    cricket: "cricket",
  };

  const id = game?.hostId; 

  const location =
    game?.venue?.name || game?.venue?.address || "Unknown Location";

  const playerName = game?.host
    ? `${game.host.firstName || ""} ${game.host.surname || ""}`.trim()
    : "Unknown Player";

  const playersGoing =
    game?.playersGoing != null
      ? `${game.playersGoing + " / " + game.maxPlayers} ${game.playersGoing === 1 ? "person" : "people"} coming`
      : "Be the first person to join!";

  // const profilePicture = game?.host?.profilePicture;
  const difficulty = game?.gameDifficulty ?? 0;
  const startTime = game?.startTime ? game.startTime.substring(0, 5) : "--:--";
  const endTime = game?.endTime ? game.endTime.substring(0, 5) : "--:--";
  const sport = game?.sport?.toLowerCase();
  const sportIcon = sportIcons[sport];
  const status = game?.status;
  const currentUserId = users?.id;

  const handleDeleteGame = async () => {
    try {
      console.log("Game ID:", game.id);
      console.log("Game Host ID:", game.host?.id);
      console.log("Current User ID:", currentUserId);

      await deleteGameAPI(game.id, currentUserId);

      console.log("Game deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <View style={styles.informationContainer}>
      {game.map((game) => {
        return (
          <TouchableOpacity 
            key={game.id}
            style={styles.informationBox}
            onPress={() => 
              router.push({ 
                pathname: "/player_game-page", 
                params: {
                  id: currentUserId,
                  location: location,
                  playerName: playerName, 
                  playersGoing: playersGoing, 
                  difficulty: difficulty, 
                  startTime: startTime, 
                  endTime: endTime, 
                  status: status
                },
              })
            }
          >
            <View style={styles.leftSection}>
              <View style={styles.profilePicture} />

              {/* venue location */}
              <View style={styles.infoRow}>
                <Octicons name="location" size={28} color={Colors.DARKGREY} />
                <Text style={styles.infoText}>{location}</Text>
              </View>

              {/* people going to play */}
              <View style={styles.infoRow}>
                <Octicons name="people" size={28} color={Colors.DARKGREY} />
                <Text style={styles.infoText}>{playersGoing}</Text>
              </View>
            </View>

            {/* player name */}
            <View style={styles.detailsSection}>
              <View style={styles.nameRow}>
                <Text style={styles.playerName}>{`${playerName}'s Game`}</Text>

                {/* difficulty icons */}
                <View style={styles.difficultyContainer}>
                  {Array.from({ length: difficulty }, (_, index) => (
                    <MaterialCommunityIcons
                      key={index}
                      name={sportIcon}
                      size={20}
                      color={Colors.BLUE}
                    />
                  ))}
                </View>
              </View>

              {/* time and status container */}
              <View style={styles.timeAndStatusContainer}>
                {/* time */}
                <View style={[styles.timeAndStatusBox, styles.timeBox]}>
                  <Text style={styles.time}>{`${startTime} - ${endTime}`}</Text>
                </View>
                {/* status */}
                <View style={[styles.timeAndStatusBox, styles.statusBox]}>
                  <Text style={styles.status}>{status}</Text>
                </View>
              </View>
            </View>

            {game.host?.id === currentUserId && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteGame}
              >
                <Text style={styles.deleteText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    right: 16,
    bottom: 20,
    backgroundColor: Colors.RED,
    width: 60,
    height: 26,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: Colors.WHITE,
    fontFamily: "fontMedium",
    fontSize: 12,
  },
  informationContainer: {
    width: "90%",
    height: 180,
    marginTop: 20,
    borderColor: Colors.GREY,
    borderWidth: 0.2,
    borderRadius: 24,
  },

  informationBox: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 25,
  },
  leftSection: {
    alignItems: "flex-start",
    width: 55,
  },
  profilePicture: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    marginBottom: 18,
    borderWidth: 0.2,
    borderColor: Colors.GREY,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 7,
    width: 200,
  },
  infoRowAndCancel: {
    marginRight: 50,
  },
  infoText: {
    marginLeft: 6,
    fontFamily: "fontMedium",
    fontSize: 13,
    color: Colors.GREY,
    flexShrink: 0,
  },
  detailsSection: {
    marginLeft: 8,
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  playerName: {
    fontFamily: "fontMedium",
    fontSize: 15,
    color: Colors.BLACK,
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  timeAndStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  timeAndStatusBox: {
    marginTop: 7,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.BLUE,
    minWidth: 55,
    alignItems: "center",
  },
  time: {
    fontFamily: "fontMedium",
    fontSize: 11,
    color: Colors.WHITE,
  },
  status: {
    fontFamily: "fontMedium",
    fontSize: 11,
    color: Colors.WHITE,
    textTransform: "uppercase",
  },
  statusBox: {},
  timeBox: {
    backgroundColor: Colors.GREEN,
  },
});
