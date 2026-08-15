import React from "react";
import { Tabs } from "expo-router";

import { Colors } from "../../app-example/constants/theme";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,

        tabBarActiveTintColor: Colors.WHISTLE,
        tabBarInactiveTintColor: Colors.CHALK,
        tabBarInactiveBackgroundColor: "transparent",

        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 20,
          marginLeft: 25,
          marginBottom: 20,
          height: 60,
          width: 350,
          borderRadius: 24,
          backgroundColor: Colors.INK,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          overflow: "hidden",
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        },

        tabBarIconStyle: {
          marginTop: 10,
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="games"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sports" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create_game"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus-circle" size={24} color={color} />
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />

      {/* <Tabs.Screen
        name="venue"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="soccer-field" size={24} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="person" size={21} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
