import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { Routes } from "./src/router";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NativeBaseProvider config={config}>
      <Routes />
    </NativeBaseProvider>
  );
}

async function loadFonts() {
  await Font.loadAsync({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    // Adicione outras variações de fonte conforme necessário
  });
}
