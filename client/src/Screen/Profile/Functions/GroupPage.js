import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GroupPage = ({ navigation }) => {
  // const [userID, setUserID] = useState(0);
  const [groupID, setGroupID] = useState("");
  const [email, setEmail] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // const handleGetUserIdDetails = async () => {
  //   const data = JSON.stringify({
  //     email: email, // replace with the email of the current user
  //   });
  //   try {
  //     console.log(data);
  //     const response = await axios.post(
  //       "http://localhost:5000/id_from_email",
  //       data,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     setUserID(response.data.user);
  //     console.log(userID);
  //     console.log(response.data.user);
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert("Error", "Unable to get group details");
  //   }
  // };

  const handleCreateNewGroup = async () => {
    try {
      const data = { email, group_name: "Asdasd", group_description: "Aaa" };
      const response = await axios.post(
        "http://localhost:5000/add_group",
        data
      );
      if (response.status === 200) {
        Alert.alert("Success", "Group created successfully");
        console.log("Asd", response.data);
        setGroupID(response.data.group_id);
        AsyncStorage.setItem("groupID", response.data.group_id);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to create  group");
    }
  };
  const handleGetGroupIdDetails = () => {
    // setGroupID(response.data.group);
    console.log("groupID", groupID);
    Alert.alert("Group Number", `The group number is ${groupID}`);
  };

  const handleJoinExistingGroup = async () => {
    try {
      const data = { email, group_id: groupID };
      const response = await axios.post(
        "http://localhost:5000/enter_to_group",
        data
      );
      if (response.status === 200) {
        Alert.alert("Success", "User added successfully");
        AsyncStorage.setItem("groupID", groupID);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to join existing group");
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("userEmail")
      .then((email) => {
        setEmail(email);
      })
      .then(
        AsyncStorage.getItem("groupID").then((groupID) => {
          if (groupID !== "") setGroupID(groupID);
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // add the groupID state as a dependency here
  }, [groupID]);

  // useEffect(() => {
  //   handleGetUserIdDetails();
  // }, [email]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Get Group Details</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetGroupIdDetails}
        >
          <Text style={styles.buttonText}>Get Group Details</Text>
        </TouchableOpacity>

        <View style={styles.groupIDContainer}>
          <Text style={styles.groupIDLabel}>Group Number:</Text>
          <Text style={styles.groupID}>{groupID}</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Join Existing Group</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={[styles.textInput, isFocused && styles.focused]}
          placeholder="Group Number"
          placeholderTextColor="#999"
          onChangeText={setGroupID}
          value={groupID}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleJoinExistingGroup}
        >
          <Text style={styles.buttonText}>Join Existing Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCreateNewGroup}>
          <Text style={styles.buttonText}>Create New Group</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate("FoodBottomTabs")}
      >
        <Text style={styles.bottomButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#ddd",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  groupIDContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupIDLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  groupID: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  bottomButton: {
    backgroundColor: "#007bff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    alignItems: "center",
  },
  bottomButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default GroupPage;
