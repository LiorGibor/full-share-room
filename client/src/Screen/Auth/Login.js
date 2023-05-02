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
import { user_login } from "../../api/user_api";
import { UserContext } from "../../api/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Theme from "../../Constants/Theme";
export default function Login({ navigation }) {
  const [email, setEmail] = useState(""); // In this state whatever email you write will be stored you can use it for sending to server
  const [password, setPassword] = useState(""); // In this state whatever password you write will be stored you can use it for sending to server
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [userID, setUserID] = useState("");
  const [groupID, setGroupID] = useState("");

  const handleLogin = () => {
    console.log("in");
    AsyncStorage.setItem("userEmail", email)
      .then(() => {
        console.log("Email saved successfully");
      })
      .catch((error) => {
        console.error(error);
      });
    user_login(
      JSON.stringify({
        email: email.toLocaleLowerCase(),
        password: password,
      })
    )
      .then((result) => {
        if (result.status == 200) {
          console.log("success");
          // send another Axios request to get the user ID
          handleGetUserIdDetails().catch((error) => {
            console.error(error);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGetGroupIdDetails = async () => {
    const data = JSON.stringify({
      user_id: userID, // replace with the email of the current user
    });
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/group_id_from_user_id",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      setGroupID(response.data.group);

      // Alert.alert("Group Number", `The group number is ${response.data.group}`);
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Unable to get group details");
    }
  };

  const handleGetUserIdDetails = async () => {
    const data = JSON.stringify({
      email: email, // replace with the email of the current user
    });
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/id_from_email",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserID(response.data.user);
      console.log(userID);
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", "Unable to get group details");
    }
  };

  const loginFun = () => {
    //Here is your email and password you can send from here
    console.log("Email=>" + email + "Password=>" + password);
    navigation.navigate("FoodBottomTabs");
  };

  useEffect(() => {
    if (userID !== "") {
      AsyncStorage.setItem("userID", userID);

      handleGetGroupIdDetails();
    }
  }, [userID]);

  useEffect(() => {
    if (groupID !== "") {
      AsyncStorage.setItem("groupID", groupID);

      navigation.navigate("FoodBottomTabs");
    }
  }, [groupID]);

  return (
    <SafeAreaView style={styles.container}>
      <UserContext.Provider value={{ email }}>
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
          {checkValidEmail ? (
            <Text style={styles.textFailed}>Wrong format email</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
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
            onPress={() => handleLogin()}
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
          <Entypo
            name="facebook-with-circle"
            size={50}
            color="#1877F2"
          ></Entypo>
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
      </UserContext.Provider>
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
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 10,
    width: "100%",
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 24,
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
  },
});
