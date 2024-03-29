import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AdminRequestPage = () => {
  const [faults, setFaults] = useState([]);
  const [groupID, setGroupID] = useState(0);

  const navigation = useNavigation();

  const loadFaults = async () => {
    const data = JSON.stringify({
      group_id: groupID,
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/faults_from_group_id",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFaults(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (faultId) => {
    try {
      const response = await axios.post(`http://localhost:5000/delete_call`, {
        fault_id: faultId,
      });

      if (response.data.status === "success") {
        Alert.alert("Success", "Request deleted successfully!");
        loadFaults();
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to delete the request."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the server.");
    }
  };

  useEffect(() => {
    const fetchGroupID = async () => {
      const storedGroupID = await AsyncStorage.getItem("groupID");
      setGroupID(storedGroupID);
      // call loadFaults() when groupID is loaded
    };

    fetchGroupID();
  }, []);

  useEffect(() => {
    loadFaults();
  }, [groupID]);

  const FaultItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View>
        <Text style={styles.taskName}>Name: {item.fault_name}</Text>
        <Text style={styles.taskDescription}>
          Description: {item.fault_description}
        </Text>
        <Text style={styles.taskDescription}>Created: {item.created_date}</Text>
        <Text style={styles.taskDescription}>Status: {item.fixed}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.fault_id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Applications opened by roomates to you{" "}
        </Text>
      </View>{" "}
      <View style={styles.faultsContainer}>
        <Text style={styles.faultsHeaderText}>Applications:</Text>
        <FlatList
          data={faults}
          keyExtractor={(item) => item.fault_id.toString()}
          renderItem={({ item }) => <FaultItem item={item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyTasksContainer}>
              <Text style={styles.emptyTasksText}>No faults found</Text>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate("OwnerPage")}
              >
                <Text style={styles.submitButtonText}>Home</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#62B1F6",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  fileButton: {
    backgroundColor: "#62B1F6",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  fileButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#62B1F6",
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  faultsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  faultsHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskDescription: {
    marginBottom: 5,
  },
  emptyTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  emptyTasksText: {
    color: "#999",
    fontStyle: "italic",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AdminRequestPage;
