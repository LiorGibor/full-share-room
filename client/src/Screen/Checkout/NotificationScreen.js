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
        const filteredNotifications = response.data.filter(
          (notification) => String(notification.user_id) !== userID
        );
        const filteredTitles = filteredNotifications.map(
          (notification) => notification.notification_name
        );
        setFilteredTitles(filteredTitles);
      } catch (error) {
        console.error(error);
      }
    };
    if (groupID !== "") fetchNotifications();
  }, [groupID, userID]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={filteredTitles}
          renderItem={({ item }) => (
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationTitle}>{item}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },
  header: {
    height: 60,
    backgroundColor: "#1E90FF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  notificationContainer: {
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  notificationTitle: {
    fontSize: 16,
    color: "#000",
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
