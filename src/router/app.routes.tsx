import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChatRoom } from "../screens/ChatRoom";
import { Chats } from "../screens/Chats";
import { Contacts } from "../screens/Contacts";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface TabIconProps {
  focused: boolean;
  iconName: string;
  color: string;
  label: string;
}

function TabIcon({ focused, iconName, color, label }: TabIconProps) {
  return (
    <View style={focused ? styles.focusedTab : styles.tab}>
      <Ionicons name={iconName} size={24} color={color} />
      <Text
        style={{
          color: color,
          fontFamily: focused ? "Roboto_700Bold" : "Roboto_400Regular",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  focusedTab: {
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    fontFamily: "Roboto_700Bold",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

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
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              iconName="chatbubble-outline"
              color={color}
              label="Chats"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              iconName="person-outline"
              color={color}
              label="Contacts"
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
      <AppStack.Screen name="ChatRoom" component={ChatRoom} />
    </AppStack.Navigator>
  );
}
