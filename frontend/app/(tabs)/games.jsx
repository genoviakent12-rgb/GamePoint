import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Colors } from "../../app-example/constants/theme";
import { auth, db } from "../../configs/FirebaseConfigs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import TodoModal from "../../components/discover/TodoModal";
import axios from "axios";
import GreetingHeader from "../../components/games/GreetingHeader_Games";
import CreateGameButton from "../../components/games/CreateGameButton";
import GameCard from "../../components/games/GameCard";
import { getGames } from "../../services/games/GameService";
import { useRouter } from "expo-router";

export default function Games() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [lists, setLists] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect runs side effects (like data fetching) after the component renders.
  // We use it here because fetching a user profile is a side effect — it reaches
  // outside the component (network request, Firestore) rather than just computing
  // something from props/state. The empty dependency array [] means this effect
  // runs only once, right after the component first mounts (similar to
  // componentDidMount in class components).
  useEffect(() => {
    // We define an async function INSIDE useEffect instead of making the useEffect
    // callback itself async, because React expects the function passed to useEffect
    // to return either nothing or a cleanup function — never a Promise.
    // If you mark the effect callback itself `async`, it implicitly returns a
    // Promise, which breaks React's cleanup-function contract and can cause
    // warnings/bugs. So the standard pattern is: declare a named async function
    // inside the effect, then call it immediately.
    const fetchUser = async () => {
      // Grab whichever Firebase user is currently signed in (if any).
      const currentUser = auth.currentUser;

      // Guard clause: if nobody is logged in, there's nothing to fetch.
      // Reset state to "empty" values and exit early so we don't try to
      // query the backend or Firestore with an undefined uid.
      if (!currentUser) {
        setUserData(null);
        setLists([]);
        return;
      }

      // --- Fetch #1: Get user profile data from our own backend API ---
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/users/firebase/${currentUser.uid}`,
        );
        // Store the backend's user data in state so the UI can use it.
        setUserData(response.data);
      } catch (error) {
        // If the backend call fails (server down, user not found, etc.),
        // log it and fall back to null rather than crashing the component.
        console.log("Failed to fetch user profile from backend:", error);
        setUserData(null);
      }

      // --- Fetch #2: Get the user's checklist from Firestore ---
      // This is a SEPARATE try/catch from the backend call above, on purpose:
      // the two data sources are independent, so a failure in one shouldn't
      // prevent us from attempting (or having already succeeded at) the other.
      try {
        const docSnap = await getDoc(doc(db, "Users", currentUser.uid));

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Use nullish coalescing (??) so that if `checklist` is missing
          // or null/undefined, we default to an empty array instead of
          // setting lists to undefined (which could break array operations
          // like .map() later in the UI).
          setLists(data.checklist ?? []);
        } else {
          // Document doesn't exist in Firestore yet — treat as empty list.
          setLists([]);
        }
      } catch (error) {
        console.log("Failed to fetch checklist from Firestore:", error);
        setLists([]);
      }
    };

    // Actually invoke the async function we just defined.
    // We can't just write `useEffect(async () => {...}, [])` (see note above),
    // so instead we declare fetchUser and immediately call it here.
    fetchUser();
  }, []); // Empty dependency array = run once on mount only.

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

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     try {
  //       const data = await getGames();
        
  //       setGames(data);
  //     } catch (error) {
  //       console.log("Failed to load games:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGames();
  // }, []);

  useFocusEffect(
  useCallback(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);

        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.log("Failed to load games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [])
);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <GreetingHeader
          userData={userData}
          onTodoPress={() => setShowChecklist(true)}
        />
        <View style={styles.topBarLine} />
      </View>

      <TodoModal
        visible={showChecklist}
        onClose={closeChecklist}
        lists={lists}
        setLists={saveChecklist}
      />
      {/* main container */}
      <ScrollView contentContainerStyle={styles.noGameContainer}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <CreateGameButton onPress={() => router.push("/create_game")} />
          </View>

          {games.length === 0 ? ( 
            <View style={styles.emptyMessage}>
            <Text style={styles.noGamesText}>
              No games here yet. Create one to play!
            </Text>
          </View>
          ) : ( 
        games.map((game) => (
            <GameCard 
            key={game.id} 
            game={game} 
            users={userData}
            onGameDeleted={(deletedGameId) =>{ 
              setGames((currentGames) =>
                currentGames.filter((game) => game.id !== deletedGameId)
              );
            }}
            />
          ))
        )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHALK,
  },
  topBar: {
    backgroundColor: Colors.INK,
    paddingTop: 80,
    paddingBottom: 22,
  },
  noGameContainer: {
    flexGrow: 1,
    backgroundColor: Colors.CHALK,
  },
  content: {
    alignItems: "center",
    backgroundColor: Colors.CHALK,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  emptyMessage: {
    alignItems: "center",
    marginTop: 250,
  },
  noGamesText: {
    fontFamily: "font", 
    color: Colors.GREY,
    fontSize: 20,
  }
});
