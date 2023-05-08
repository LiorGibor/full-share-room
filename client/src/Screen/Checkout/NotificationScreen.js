import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationScreen({ navigation }) {
  const [userID, setUserID] = useState("");
  const [groupID, setGroupID] = useState("");
  const [filteredTitles, setFilteredTitles] = useState([]);

  useEffect(() => {
    const fetchGroupID = async () => {
      const storedGroupID = await AsyncStorage.getItem("groupID");
      setGroupID(storedGroupID);
    };
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem("userID");
      setUserID(storedUserID);
    };

    fetchUserID();
    fetchGroupID();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = JSON.stringify({
        group_id: groupID,
      });
      try {
        const response = await axios.post(
          "http://localhost:5000/notifications_from_group_id",
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("current user ID is", userID);
        console.log(response.data);
        const filteredNotifications = response.data.filter(
          (notification) => String(notification.user_id) !== userID
        );
        console.log(filteredNotifications);

        const filteredTitles = filteredNotifications.map(
          (notification) => notification.notification_name
        );
        setFilteredTitles(filteredTitles);
        console.log(filteredTitles);
      } catch (error) {
        console.error(error);
      }
    };
    if (groupID !== "") fetchNotifications();
  }, [groupID, userID]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textStyle}>Notification</Text>
      </View>
      {/* Here we're using FlatList to display our data from the database */}
      <FlatList
        style={{ marginEnd: 10, marginEnd: 10 }}
        data={filteredTitles}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },

  textStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
});
