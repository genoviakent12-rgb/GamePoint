import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/FirebaseConfigs";
import { Colors } from "../../app-example/constants/theme";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Replace with your actual user fetch (same pattern as Discover.jsx)
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserData({
        name: currentUser.displayName || "Player",
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      });
    }
  }, []);

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await signOut(auth);
          router.replace("/auth");
        },
      },
    ]);
  };

  const menuItems = [
    { icon: "person-outline", label: "Edit Profile", route: "/profile/edit" },
    { icon: "location-outline", label: "My Venues", route: "/profile/venues" },
    { icon: "trophy-outline", label: "My Games", route: "/profile/games" },
    { icon: "notifications-outline", label: "Notifications", route: "/profile/notifications" },
    { icon: "settings-outline", label: "Settings", route: "/profile/settings" },
    { icon: "help-circle-outline", label: "Help & Support", route: "/profile/help" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarWrapper}>
            {userData?.photoURL ? (
              <Image source={{ uri: userData.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarInitial}>
                  {userData?.name?.charAt(0)?.toUpperCase() || "?"}
                </Text>
              </View>
            )}
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={14} color={Colors.INK} />
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>{userData?.name || "Player"}</Text>
          <Text style={styles.email}>{userData?.email || ""}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Games</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.6</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Venues</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuRow,
                index === menuItems.length - 1 && styles.menuRowLast,
              ]}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconWrap}>
                  <Ionicons name={item.icon} size={20} color={Colors.INK} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.GREY} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.RED} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHALK,
  },
  header: {
    backgroundColor: Colors.INK,
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.GREEN,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontFamily: "fontBold",
    fontSize: 36,
    color: Colors.WHITE,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.INK,
  },
  name: {
    fontFamily: "fontBold",
    fontSize: 22,
    color: Colors.WHITE,
  },
  email: {
    fontFamily: "font",
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: -24,
    borderRadius: 18,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontFamily: "fontBold",
    fontSize: 20,
    color: Colors.INK,
  },
  statLabel: {
    fontFamily: "font",
    fontSize: 12,
    color: Colors.GREY,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E5E5",
  },
  menuCard: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.CHALK,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: {
    fontFamily: "fontMedium",
    fontSize: 15,
    color: Colors.INK,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.RED,
  },
  logoutText: {
    fontFamily: "fontMedium",
    fontSize: 15,
    color: Colors.RED,
  },
  versionText: {
    textAlign: "center",
    fontFamily: "font",
    fontSize: 12,
    color: Colors.GREY,
    marginTop: 16,
    marginBottom: 30,
  },
});