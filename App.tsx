import {
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { LinearGradient } from "expo-linear-gradient";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Routes } from "./src/router";

export default function App() {
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider config={config}>
      <Routes />
    </NativeBaseProvider>
  );
}
