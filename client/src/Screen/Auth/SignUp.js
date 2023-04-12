import React, { useState } from "react";
import { adduser } from "../../api/user_api";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputFieldComponent from "../../../src/Component/InputFieldComponent";
import ButtonComponent from "../../../src/Component/ButtonComponent";
import PasswordComponent from "../../../src/Component/PasswordComponent";
import Theme from "../../Constants/Theme";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function SignUp({ navigation }) {
  const [full_name, setName] = useState(""); // In this state whatever name you write will be stored you can use it for sending to server
  const [email, setEmail] = useState(""); // In this state whatever email you write will be stored you can use it for sending to server
  const [password, setPassword] = useState(""); // In this state whatever password you write will be stored you can use it for sending to server
  const [password_confirmation, setPassword_Confirmation] = useState(""); // In this state whatever Confirm Password you write will be stored you can use it for sending to server
  const [username, setUsername] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");

  const signUpFun = () => {
    //Here is your email and password you can send from here
    adduser(
      JSON.stringify({
        username: username.toLocaleLowerCase(),
        email: email.toLocaleLowerCase(),
        password: password,
        full_name: full_name,
        date_of_birth: date_of_birth,
      })
    );
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          style={styles.image}
          name="chevron-back-sharp"
          size={35}
          color={Theme.primary}
        ></Ionicons>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Text style={styles.sginInDesign}>Create Account</Text>
      </View>
      <View>
        {/* Your Name field Component below */}

        <InputFieldComponent
          value={full_name}
          onChangeText={(full_name) => setName(full_name.trim())}
          icon="heart"
          label="Full Name"
        />
        {/* Your Email field Component below */}
        <InputFieldComponent
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          icon="mail"
          label="E-mail"
        />

        {/* Your Password field Component below */}
        <PasswordComponent
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
          icon="key"
          label="Password"
        />

        {/* Your Confirm Password field Component below */}
        <PasswordComponent
          value={password_confirmation}
          onChangeText={(password_confirmation) =>
            setPassword_Confirmation(password_confirmation.trim())
          }
          icon="key"
          label="Confrim Password"
        />
        <InputFieldComponent
          value={username}
          onChangeText={(username) => setUsername(username.trim())}
          icon="lock"
          label="Username"
        />
        <InputFieldComponent
          value={date_of_birth}
          onChangeText={(date_of_birth) => setDateOfBirth(date_of_birth.trim())}
          icon="star"
          label="Date Of Birth"
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        {/* Signup Button*/}
        <TouchableOpacity onPress={() => SignUp()}>
          <ButtonComponent
            label="Sign UP"
            backgroundColor={Theme.green}
            marginLeft={20}
            marginRight={20}
            marginTop={10}
            marginButton={10}
            labelColor={Theme.white}
            onPress={() => signUpFun()}
          />
        </TouchableOpacity>
        <ButtonComponent
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
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              marginLeft: 5,
              color: Theme.primary,
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Sign In
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
  },
  sginInDesign: {
    color: Theme.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  image: {
    height: 30,
    width: 50,
    borderRadius: 25,
    borderColor: "#000",
    margin: 10,
  },
});
