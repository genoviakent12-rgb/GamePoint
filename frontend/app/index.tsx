import {  View,   } from "react-native";
import Login from "../components/LandingPage";
  
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login/>
    </View>
  );
}
