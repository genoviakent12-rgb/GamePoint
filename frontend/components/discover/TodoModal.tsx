import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Colors } from "../../app-example/constants/theme";

type Props = {
  visible: boolean;
  onClose: () => void;
  lists: Checklist[];
  setLists: (lists: Checklist[]) => void;
};

interface Checklist {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoModal({
  visible,
  onClose,
  lists,
  setLists,
}: Props) {
  //create a todo text variable for const addTodo, this state will allow the functions to work
  const [listText, setListText] = useState<string>("");

  //checks if todos are empty
  const isListEmpty = lists.length === 0;

  const addList = (): void => {
    if (listText.trim() !== "") {
      const newList: Checklist = {
        id: Date.now(),
        text: listText,
        completed: false,
      };

      setLists([newList, ...lists]);

      setListText("");
    }
  };

  const toggleList = (id: number): void => {
    const updatedLists = lists.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    });

    setLists(updatedLists);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={10} tint="regular" style={StyleSheet.absoluteFill} />

      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color={Colors.INK} />
          </TouchableOpacity>

          <View style={styles.upperContainer}>
            <Text style={styles.title}>My Checklist</Text>

            <Text style={styles.todayText}>What&apos;s for today?</Text>

            <TextInput
              style={styles.input}
              value={listText}
              placeholder="Add item here"
              onChangeText={setListText}
            />

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.button} onPress={addList}>
                <Text style={styles.addText}>Add to list</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: "flex-start",
                alignContent: "flex-start",
              }}
            >
              <Text style={styles.listText}>List:</Text>

              <ScrollView style={styles.scrollView}>
                {isListEmpty ? (
                  <Text style={styles.addListText}>
                    No items in the checklist yet. Add one!
                  </Text>
                ) : (
                  lists.map((lists: Checklist) => (
                    <View key={lists.id}>
                      <Text
                        onPress={() => toggleList(lists.id)}
                        style={
                          lists.completed
                            ? styles.listFinished
                            : styles.listUnfinished
                        }
                      >
                        {lists.text}
                      </Text>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  upperContainer: {
    backgroundColor: Colors.CHALK,
    alignSelf: "center",
    height: 250,
    width: 360,
    top: -40,
    justifyContent: "flex-start",

    borderTopRightRadius: 10,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  card: {
    marginTop: 32,
    backgroundColor: Colors.CHALK,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 40,
    width: "90%",
    height: 725,
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  closeButton: {
    position: "absolute",
    zIndex: 99,
    top: 15,
    right: 15,
  },
  title: {
    fontSize: 32,
    marginTop: 50,
    fontFamily: "fontBold",
    textAlign: "center",
    color: Colors.INK,
  },
  todayText: {
    textAlign: "left",
    marginLeft: 20,
    fontFamily: "fontMedium",
    marginTop: 20,
    fontSize: 22,
    color: Colors.INK,
  },
  input: {
    fontSize: 18,
    textAlign: "left",
    fontFamily: "font",
    marginTop: 10,
    marginLeft: 20,
    color: Colors.INK,
  },
  button: {
    marginTop: 15,
    backgroundColor: Colors.INK,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9,
    marginBottom: 20,
  },
  addText: {
    fontFamily: "font",
    color: Colors.WHISTLE,
    fontSize: 15,
  },
  listText: {
    marginLeft: 20,
    marginTop: 20,
    fontFamily: "fontMedium",
    fontSize: 22,
    color: Colors.INK,
  },
  scrollView: {
    height: 250,
    width: "100%",
  },
  addListText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "font",
    color: Colors.GREY,
  },
  lists: {
    fontSize: 15,
    textAlign: "left",
    marginLeft: 20,
  },
  listFinished: {
    textDecorationLine: "line-through",
    textAlign: "left",
    marginLeft: 20,
    fontFamily: "fontMedium",
    fontSize: 18,
    color: Colors.GREY,
  },
  listUnfinished: {
    textAlign: "left",
    marginLeft: 20,
    fontFamily: "fontBold",
    fontSize: 18,
    color: Colors.INK,
  },
});
