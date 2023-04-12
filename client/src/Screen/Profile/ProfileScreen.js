import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
// import ManageTasks from "./Functions/ManageTasks";

export default function ProfileScreen({ navigation }) {
  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 16,
        }}
      >
        {/* Below is Profile picture and name of the user that will be dynamic from api */}
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
        <Text style={styles.textDesign}>Lior Miamon</Text>
        <View style={{ flex: 1 }} />
        <Feather name="edit" size={25} color="#000" />
      </View>
      <Text style={styles.textStyle}>Conversation</Text>
      {/* Render all the buttons below */}
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleNavigate("ManageTasks")}
          >
            <Text numberOfLines={2} style={styles.textBox}>
              Mange Task
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleNavigate("NewCall")}
          >
            <Text style={styles.textBox}>
              Opening a new call for the apartment owner
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleNavigate("ManageOutcome")}
          >
            <Text numberOfLines={2} style={styles.textBox}>
              Mange Outcomes
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleNavigate("PayBills")}
          >
            <Text style={styles.textBox}>Pay bills</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleNavigate("SmartDevice")}
          >
            <Text numberOfLines={2} style={styles.textBox}>
              Smart Devices Integration
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleNavigate("More")}
          >
            <Text style={styles.textBox}>More...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingHorizontal: 20,
    backgroundColor: "#B4C7E7",
    borderRadius: 10,
    width: 150,
    shadowColor: "grey",
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 8,
    height: 150,
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  textCostum: {
    alignContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  textStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textBox: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  textDesign: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 15,
  },
});
