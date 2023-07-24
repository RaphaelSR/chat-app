import { NavigationContainer } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { StatusBar } from "native-base";
import React from "react";
import { Platform, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={Platform.OS === "android" ? "dark-content" : "default"}
        />
        <LottieView
          source={require("../../assets/animations/animation-mail.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={Platform.OS === "android" ? "dark-content" : "default"}
      />
      {user?.loggedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
