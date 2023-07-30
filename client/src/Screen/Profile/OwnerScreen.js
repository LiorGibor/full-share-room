import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OwnerScreen({ navigation }) {
  const [userName, setUserName] = useState("asd");
  const [groupID, setGroupID] = useState("");

  const handleNavigate = (screen) => {
    console.log(screen);
    navigation.navigate(screen);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem("userName");
      console.log("storedUserName", storedUserName);

      setUserName(storedUserName);
    };

    const fetchGroupID = async () => {
      const storedGroupID = await AsyncStorage.getItem("groupID");
      setGroupID(storedGroupID);
    };

    fetchGroupID();
    fetchUserName();
  }, []);

  useEffect(() => {
    console.log("This is groupID", groupID);
  }, [groupID]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 16 }}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
        <Text style={styles.textStyle}>{userName}</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => window.location.reload()}>
          <Image
            style={styles.image}
            source={{
              uri: "https://thumbs.dreamstime.com/b/logout-isolated-special-cyan-blue-round-button-abstract-illustration-logout-special-cyan-blue-round-button-103957079.jpg",
            }}
            resizeMode={"cover"}
          />
        </TouchableOpacity>{" "}
      </View>
      <Text style={styles.textStyle}>Menu</Text>

      <ScrollView>
        {/* Keeping the Owner specific tasks but giving them the same styling as User tasks */}
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
            onPress={() => {
              handleNavigate("CreateGroup");
            }}
          >
            <Text numberOfLines={2} style={styles.textBox}>
              Create Group
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              handleNavigate("AdminRequestPage");
            }}
          >
            <Text style={styles.textBox}>Admin Requests</Text>
          </TouchableOpacity>
        </View>
        {/* Add more owner-specific tasks styled the same way */}
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
    borderRadius: 10,
    width: 150,
    shadowColor: "grey",
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 8,
    height: 150,
    backgroundColor: "#ADD8E6", // Light blue color added here
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  textStyle: {
    color: "#022",
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
});
