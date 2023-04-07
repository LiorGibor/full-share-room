import React, { useState, useEffect } from "react";
import { HelperText } from "react-native-paper";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import InputFieldComponent from "../../../src/Component/InputFieldComponent";
import ButtonComponent from "../../../src/Component/ButtonComponent";
import PasswordComponent from "../../../src/Component/PasswordComponent";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

import Theme from "../../Constants/Theme";
export default function Login({ navigation }) {
  const [email, setEmail] = useState(""); // In this state whatever email you write will be stored you can use it for sending to server
  const [password, setPassword] = useState(""); // In this state whatever password you write will be stored you can use it for sending to server

  const loginFun = () => {
    //Here is your email and password you can send from here
    console.log("Email=>" + email + "Password=>" + password);
    navigation.navigate("FoodBottomTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 120, height: 220 }}>
          <Image
            source={require("../../../assets/icon.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode={"cover"}
          />
        </View>
      </View>
      <View>
        {/* Your email field Component below */}
        <InputFieldComponent
          placeholder={"Enter your email"}
          icon="email"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Your Password field Component below */}
        <PasswordComponent
          placeholder={"Enter your password"}
          icon="key"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {/* Forgot password button  */}
      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword")}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={styles.forgetPassword}>Forget Password?</Text>
        </TouchableOpacity>

        {/* Login Button which navigate to next Home screen who have footer too*/}

        <ButtonComponent
          label="SignIn"
          onPress={() => loginFun()}
          backgroundColor={Theme.green}
          marginLeft={20}
          marginRight={20}
          marginTop={10}
          marginButton={10}
          labelColor={Theme.white}
        />
        {/* Signup Button which navigate to next Signup screen */}
        <ButtonComponent
          onPress={() => navigation.navigate("SignUp")}
          label="Or Sign Up with:"
          backgroundColor={Theme.black}
          marginLeft={20}
          marginRight={20}
          labelColor={Theme.white}
        />
      </View>

      {/* Facebook and Google Button Wrapper including Buttons */}
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Entypo name="facebook-with-circle" size={50} color="#1877F2"></Entypo>
        <View style={{ marginHorizontal: 20 }}></View>
        <Ionicons name="logo-google" size={50} color="#1877F2"></Ionicons>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignSelf: "center",
        }}
      >
        {/* Create an account Button which navigate to next Signup screen */}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text
            style={{
              marginLeft: 5,
              color: Theme.primary,
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  sginInDesign: {
    color: "#7B7BC4",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  forgetPassword: {
    color: "#7B7BC4",
    marginVertical: 5,
    fontSize: 14,
  },
});
