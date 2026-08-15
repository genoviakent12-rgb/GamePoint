import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Colors } from "../app-example/constants/theme";
import { sports } from "../app-example/constants/sports";
const BLINK_DURATION = 1500;
const SPORT_INTERVAL_DURATION = 3130;

export default function Login() {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter(); 
  

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: BLINK_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: BLINK_DURATION,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      },
    );

    blink.start();

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sports.length);
    }, SPORT_INTERVAL_DURATION); //matching the blink(duration)

    return () => {
      blink.stop();
      clearInterval(interval);
    };
  }, [opacity]);

  const changeSport = () => {
    setIndex((prev) => (prev + 1) % sports.length);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={sports[index].image}
        style={styles.image}
        resizeMode="cover"
      >
        <Pressable onPress={changeSport}>
          <Animated.Text style={[styles.mainText, { opacity }]}>
            {sports[index].name}
          </Animated.Text>
        </Pressable>

        <Text style={[styles.descriptionText, ]}>{sports[index].description}</Text>

        <TouchableOpacity
          onPress={() => {
            setIsClicked(!isClicked);
            router.push("auth/sign-in");
          }}
        >
          <View style={styles.button}>
            <Text
              style={styles.buttonText}
            >
              Let&apos;s get started!
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: 500,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 90,
  },
  mainText: {
    fontFamily: "fontBold",
    color: Colors.WHITE,
    fontSize: 70,
    paddingBottom: 10,
  },
  descriptionText: {
    fontFamily: "font",
    color: Colors.WHITE,
    fontSize: 15,
    paddingBottom: 50,
  },
  button: {
    borderColor: Colors.LIGHTGREY,
    borderWidth: 1,
    borderRadius: 15,
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: -30,
  },
  buttonClicked: {
    borderColor: Colors.GREEN,
    backgroundColor: Colors.GREEN,
    borderRadius: 50,
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: -30,
  },
  buttonText: {
    fontFamily: "fontMedium",
    color: Colors.WHITE,
    fontSize: 20,
  },
});
