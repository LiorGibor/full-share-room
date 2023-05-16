import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonComponent from "../../../src/Component/ButtonComponent";
import InputFieldComponent from "../../../src/Component/InputFieldComponent";
import Theme from "../../Constants/Theme";

export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleForgetPasswordPress = () => {
    const subject = "Password Reset Request";
    const body = "Please reset my password.";

    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          style={styles.image}
          name="chevron-back-sharp"
          size={35}
          color={Theme.primary}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forget Password</Text>
      </View>

      <InputFieldComponent
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        icon="email"
        label="Email"
      />

      <View style={{ marginHorizontal: 20 }}>
        <ButtonComponent
          label="Forget Password"
          backgroundColor={Theme.green}
          marginTop={10}
          marginButton={10}
          onPress={handleForgetPasswordPress}
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
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  title: {
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
