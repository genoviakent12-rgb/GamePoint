import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Colors } from "../../../app-example/constants/theme";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../../../configs/FirebaseConfigs";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

export const BORDER_RADIUS = 20;

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //creates an animated value for bottom container slide up
  const slideAnim = React.useRef(new Animated.Value(500)).current; //the start off screen is 500 pixels below

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, //slides original position
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  //function to sign in the user if no account has been logged in yet
  //try and catch for error handling
  const onSignIn = async () => {
    if (loading) return;

    if (!email || !password) {
      Alert.alert("Error", "Please enter all required details");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      // Instead of Firestore getDoc, fetch profile from your own backend
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/users/firebase/${user.uid}`,
        );
        console.log("User data:", response.data);
      } catch (fetchError) {
        console.log("No backend profile found for this user.");
      }

      router.replace("/(tabs)/discover");
    } catch (error) {
      // ...unchanged error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={require("../../../assets/images/signinPictures/blueBackground.png")}
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingTop: 60,
          }}
          resizeMode="cover"
        >
          <Image
            source={require("../../../assets/images/logo/logoGP.png")}
            style={styles.logo}
          />
          <Text style={styles.signinText}>Sign in</Text>
          <Text style={styles.subheaderText}>
            Welcome back, let&apos;s sign you in again!
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
            <Text style={styles.emailText}>Email Address</Text>
            <View style={styles.emailContainer}>
              <Fontisto name="email" size={24} color="black" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address here..."
                placeholderTextColor={"#aaa"}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.emailInput}
                textContentType="emailAddress"
              />
            </View>

            <Text style={styles.passwordText}>Password</Text>
            <View style={styles.passwordContainer}>
              <AntDesign name="lock" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter password here..."
                placeholderTextColor={"#aaa"}
                autoCapitalize="none"
                style={styles.passwordInput}
                textContentType="password"
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
            >
              <Pressable
                onPress={() => {
                  router.push("/auth/forgot-password");
                }}
              >
                <Text style={styles.forgotText}>Forgot Password</Text>
              </Pressable>
            </View>

            <View style={styles.buttonsContainer}>
              {/* sign in button */}
              <TouchableOpacity
                style={styles.signinButton}
                onPress={onSignIn}
                disabled={loading}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.signinButtonText}>Sign In</Text>
                  <Feather name="arrow-right" size={24} color={Colors.WHITE} />
                </View>
              </TouchableOpacity>

              {/* create account button */}
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => {
                  router.push("/auth/create-account");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.createAccountButtonText}>
                    Create account
                  </Text>
                  <Feather name="arrow-right" size={24} color={Colors.WHITE} />
                </View>
              </TouchableOpacity>

              <View>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await signOut(auth);

                      router.replace("/(tabs)/discover");
                    } catch (error) {
                      console.log("Guest login error:", error);
                    }
                  }}
                >
                  {/* <Text style={styles.continueText}>
                    Continue without creating an account
                  </Text> */}
                </TouchableOpacity>
              </View>
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
  emailText: {
    fontFamily: "fontMedium",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 20,
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
    marginTop: 35,
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
  continueText: {
    fontFamily: "font",
    fontSize: 15,
    paddingTop: 18,
    color: Colors.BLUE,
  },
});
