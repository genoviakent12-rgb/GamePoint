import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "../../../app-example/constants/theme";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfigs";
import axios from "axios";

export const BORDER_RADIUS = 20;

export default function CreateAccount() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //creates an animated value for bottom container slide up
  const slideAnim = React.useRef(new Animated.Value(500)).current; //the start off screen is 500 pixels below

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, //slides original position
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  //function to check if any fields are empty
  const onCreateAccount = async () => {
    if (!email || !password || !firstName || !surname) {
      Alert.alert("Error", "Please enter all details required");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      // Instead of Firestore setDoc, save profile to your own backend
      await axios.post("http://127.0.0.1:8080/api/users", {
        firebaseUid: user.uid,
        firstName,
        surname,
        email: email.trim(),
      });

      console.log("USER CREATED:", user.uid);

      router.replace("/(tabs)/discover");
    } catch (error) {
      console.log("FULL ERROR:", JSON.stringify(error, null, 2));
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR CODE:", error.code);

      const code = error?.code;
      const message = error?.message || "Something went wrong.";

      if (code === "auth/email-already-in-use") {
        Alert.alert("Error", "That email is already registered.");
      } else if (code === "auth/invalid-email") {
        Alert.alert("Error", "Please enter a valid email.");
      } else if (code === "auth/weak-password") {
        Alert.alert("Weak Password", "Password must be at least 6 characters.");
      } else {
        Alert.alert("Error", message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <ImageBackground
          source={require("../../../assets/images/signinPictures/blueBackground.png")}
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingTop: 0,
          }}
          resizeMode="cover"
        >
          <Image
            source={require("../../../assets/images/logo/logoGP.png")}
            style={styles.logo}
          />
          <Text style={styles.signinText}>Create an Account</Text>
          <Text style={styles.subheaderText}>
            Welcome, create an account to get the full experience!
          </Text>

          <Animated.View
            style={[
              styles.bottomContainer,
              { transform: [{ translateY: slideAnim }], overflow: "hidden" },
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="black"
              style={styles.backButton}
              onPress={() => {
                router.back();
              }}
            />
            <Text style={styles.headerTexts}>First Name</Text>
            <View style={styles.NameContainer}>
              <TextInput
                onChangeText={(value) => setFirstName(value)}
                placeholder="Enter first name"
                placeholderTextColor={"#aaa"}
                autoCapitalize="words"
                style={styles.nameInput}
              />
            </View>

            <Text style={styles.headerTexts}>Surname</Text>
            <View style={styles.NameContainer}>
              <TextInput
                onChangeText={(value) => setSurname(value)}
                placeholder="Enter surname"
                placeholderTextColor={"#aaa"}
                autoCapitalize="words"
                style={styles.nameInput}
              />
            </View>

            <Text style={styles.headerTexts}>Email</Text>
            <View style={styles.emailContainer}>
              <Fontisto name="email" size={24} color="black" />
              <TextInput
                onChangeText={(value) => setEmail(value)}
                placeholder="Enter email"
                placeholderTextColor={"#aaa"}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.emailInput}
              />
            </View>

            <Text style={styles.passwordText}>Password</Text>
            <View style={styles.passwordContainer}>
              <AntDesign name="lock" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={!showPassword}
                placeholder="Enter password here..."
                placeholderTextColor={"#aaa"}
                autoCapitalize="none"
                style={styles.passwordInput}
              />

              <TouchableOpacity
                onPress={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 10,
                marginRight: 20,
              }}
            ></View>

            <View style={styles.buttonsContainer}>
              {/* create account button */}
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={onCreateAccount}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.createAccountButtonText}>
                    Create account
                  </Text>
                  <Feather name="arrow-right" size={24} color={Colors.WHITE} />
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  signinText: {
    fontFamily: "fontBold",
    color: Colors.WHITE,
    fontSize: 40,
    paddingLeft: 20,
    paddingTop: 10,
  },
  subheaderText: {
    fontFamily: "fontMedium",
    color: Colors.WHITE,
    fontSize: 15,
    paddingLeft: 20,
    paddingTop: 5,
    marginBottom: 30,
  },
  logo: {
    height: 60,
    width: 100,
    marginTop: 20,
    marginLeft: -10,
    resizeMode: "contain",
  },
  bottomContainer: {
    backgroundColor: Colors.WHITE,
    height: "100%",
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  NameContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderColor: Colors.GREY,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderColor: Colors.GREY,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTexts: {
    fontFamily: "fontMedium",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 0,
  },
  nameInput: {
    flex: 1,
    fontFamily: "fontMedium",
    fontSize: 18,
    paddingLeft: 15,
  },
  emailInput: {
    flex: 1,
    fontFamily: "fontMedium",
    fontSize: 18,
    paddingLeft: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDER_RADIUS,
    borderColor: Colors.GREY,
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  passwordText: {
    fontFamily: "fontMedium",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  passwordInput: {
    flex: 1,
    fontFamily: "fontMedium",
    fontSize: 18,
    paddingLeft: 15,
  },
  forgotText: {
    fontFamily: "font",
    fontSize: 16,
    color: Colors.BLUE,
    textDecorationLine: "underline",
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },
  signinButton: {
    backgroundColor: Colors.BLUE,
    width: "90%",
    height: 55,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonText: {
    color: Colors.WHITE,
    fontFamily: "font",
    fontSize: 18,
  },
  createAccountButton: {
    marginTop: 20,
    backgroundColor: Colors.BLUE,
    width: "90%",
    height: 55,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButtonText: {
    color: Colors.WHITE,
    fontFamily: "font",
    fontSize: 18,
  },
});
