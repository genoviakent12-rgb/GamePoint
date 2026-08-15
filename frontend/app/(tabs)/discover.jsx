import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Colors } from "../../app-example/constants/theme";
import { auth, db } from "../../configs/FirebaseConfigs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as Location from "expo-location";
import TodoModal from "../../components/discover/TodoModal";
import GreetingHeader from "../../components/discover/GreetingHeader";
import SearchBar from "../../components/discover/SearchBar";
import SportsGrid from "../../components/discover/SportsGrid";
import axios from "axios";
import VenueGrid from "../../components/discover/VenueGrid";

export default function Discover() {
  const [showChecklist, setShowChecklist] = useState(false);
  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState(null);
  const [, setSelectedVenue] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission status:", status);

      if (status !== "granted") {
        Alert.alert(
          "Location Required",
          "Please enable location permission to find nearby places."
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      console.log(currentLocation);
    })();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setUserData(null);
        setLists([]);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/users/firebase/${currentUser.uid}`
        );
        setUserData(response.data);
      } catch (error) {
        console.log("Failed to fetch user profile from backend:", error);
        setUserData(null);
      }

      try {
        const docSnap = await getDoc(doc(db, "Users", currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLists(data.checklist ?? []);
        } else {
          setLists([]);
        }
      } catch (error) {
        console.log("Failed to fetch checklist from Firestore:", error);
        setLists([]);
      }
    };

    fetchUser();
  }, []);

  const closeChecklist = () => {
    setShowChecklist(false);
  };

  const saveChecklist = async (updatedLists) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      await updateDoc(doc(db, "Users", currentUser.uid), {
        checklist: updatedLists,
      });
      setLists(updatedLists);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* greeting and checklist */}
      <View style={styles.topBar}>
        <GreetingHeader
          userData={userData}
          onTodoPress={() => setShowChecklist(true)}
        />
        <View style={styles.topBarLine} />
      </View>

      {/* Search bar */}
      <SearchBar setSelectedVenue={setSelectedVenue} location={location} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          <SportsGrid />
          <VenueGrid />
        </View>
      </ScrollView>

      {/* to do list */}
      <TodoModal
        visible={showChecklist}
        onClose={closeChecklist}
        lists={lists}
        setLists={saveChecklist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHALK,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topBar: {
    backgroundColor: Colors.INK,
    paddingTop: 80,
    paddingBottom: 22,
  },
  mainContainer: {
    backgroundColor: Colors.CHALK,
    marginTop: -22,
    paddingBottom: 30,
  },
});