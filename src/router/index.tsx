import { NavigationContainer } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { StatusBar } from "native-base";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Simulate an API call to check user status
    setTimeout(() => {
      setIsLogged(true);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
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
      {true ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
