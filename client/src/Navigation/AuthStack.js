import React from "react";
import {} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screen/Auth/Login";
import SignUp from "../Screen/Auth/SignUp";
import FoodBottomTabs from "../../src/Navigation/FoodBottomTabs";
import ForgetPassword from "../Screen/Auth/ForgetPassword";
import ChatScreen from "../Screen/Auth/ChatScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodBottomTabs"
          component={FoodBottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthStack;
