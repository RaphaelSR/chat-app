import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Chats } from "../screens/Chats";
import { Contacts } from "../screens/Contacts";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        tabBarActiveTintColor: "orange",
        tabBarStyle: { padding: 4 },
      }}
    >
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={focused ? "#f97316" : "#1e293b"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? "#f97316" : "#1e293b"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <AppStack.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      <AppStack.Screen name="Home" component={TabNavigator} />
    </AppStack.Navigator>
  );
}
