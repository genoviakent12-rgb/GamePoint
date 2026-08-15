import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Colors } from "@/app-example/constants/theme";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    fontBold: require("../assets/fonts/Anton-Regular.ttf"),
    fontMedium: require("../assets/fonts/Manrope-Bold.ttf"),
    font: require("../assets/fonts/Manrope-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
    screenOptions={{ 
      headerShown: false, 
      animation: "fade", 
      contentStyle: { 
        backgroundColor: Colors.WHITE
      },
    }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="sports/badminton"/>
      <Stack.Screen name="sports/cricket"/>
      <Stack.Screen name="sports/football"/>
      <Stack.Screen name="sports/volleyball"/>
      <Stack.Screen name="sports/basketball"/>
    </Stack>
  );
}
