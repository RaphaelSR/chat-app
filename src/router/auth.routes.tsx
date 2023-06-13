import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { LogIn } from "../screens/LogIn";
import { SignUp } from "../screens/SignUp";

const AuthStack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <AuthStack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      <AuthStack.Screen name="Signup" component={SignUp} />
      <AuthStack.Screen name="Login" component={LogIn} />
    </AuthStack.Navigator>
  );
}
