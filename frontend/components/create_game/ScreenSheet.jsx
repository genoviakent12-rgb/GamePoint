import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { Colors } from "../../app-example/constants/theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function ScreenSheet({ visible, onClose, children }) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <BlurView
          intensity={20}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />

        <Animated.View 
        style={[
          styles.screenSheet, 
            {
              transform: [{ translateY: slideAnim}], 
            },
          ]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close"
              size={28}
              color={Colors.BLACK}
            />
          </TouchableOpacity>

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  screenSheet: {
    backgroundColor: Colors.CHALK,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    minHeight: "80%",
    marginBottom: -10,
  },
  closeButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});