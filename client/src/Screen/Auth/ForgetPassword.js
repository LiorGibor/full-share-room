import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonComponent from "../../../src/Component/ButtonComponent";
import InputFieldComponent from "../../../src/Component/InputFieldComponent";
import Theme from "../../Constants/Theme";
export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState(""); // In this state whatever email you write will be stored you can use it for sending to server
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
        <Text style={styles.sginInDesign}>Forget Password</Text>
      </View>
      {/* Your Email field Component below */}
      <InputFieldComponent
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        icon="email"
        label="Email"
      />
      {/* Forgot Password Button*/}
      <View style={{ marginHorizontal: 20 }}>
        <ButtonComponent
          label="Forget Password"
          backgroundColor={Theme.green}
          marginTop={10}
          marginButton={10}
        />
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
