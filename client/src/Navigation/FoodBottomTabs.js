import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../../src/Screen/Home/HomeScreen";
import ChatList from "../Screen/Chat/ChatList";
import StepIndicatorScreen from "../Screen/Checkout/NotificationScreen";
import ProfileScreen from "../../src/Screen/Profile/ProfileScreen";
import Theme from "../../src/Constants/Theme";

const Tab = createBottomTabNavigator();
// Below are the screens whcih use in bottom tab those are import in this screen
function FoodBottomTabs({ route }) {
  return (
    <Tab.Navigator
      //First screen will be home all the time
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: Theme.primary,
        headerShown: false,
        tabBarInactiveTintColor: Theme.grey,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            //This is the icon use for Home in bottom tab
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messeage"
        component={ChatList}
        options={{
          tabBarLabel: "Messeage",
          tabBarIcon: ({ color, size }) => (
            //This is the icon use for Message in bottom tab
            <AntDesign name="message1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={StepIndicatorScreen}
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ color, size }) => (
            //This is the icon use for Notificatio in bottom tab
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            //This is the icon use for Profile in bottom tab
            <FontAwesome5 name="user-alt" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default FoodBottomTabs;
