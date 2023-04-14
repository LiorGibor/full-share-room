import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://example.com/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://example.com/tasks/${taskId}`)
      .then((response) => {
        // Update the list of tasks
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddTask = () => {
    Keyboard.dismiss(); // dismiss the keyboard after adding a new task
    axios
      .post("http://example.com/tasks", {
        text: newTaskText,
      })
      .then((response) => {
        // Update the list of tasks
        setTasks([...tasks, response.data]);
        setNewTaskText("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>

      <ScrollView style={styles.scrollView} keyboardDismissMode="on-drag">
        {tasks.map((task) => (
          <View key={task.id} style={styles.task}>
            <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
              <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.taskText}>{task.text}</Text>

            <TouchableOpacity onPress={() => handleCompleteTask(task.id)}>
              <Text style={styles.complete}>✔</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.task}>
          <TextInput
            style={styles.taskText}
            value={newTaskText}
            onChangeText={(text) => setNewTaskText(text)}
            placeholder="Enter new task"
            onSubmitEditing={handleAddTask} // add a new task when the user submits the text input
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("FoodBottomTabs")}
      >
        <Text style={styles.navButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  delete: {
    fontSize: 20,
    color: "red",
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  complete: {
    fontSize: 20,
    color: "green",
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "#ccc",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default ManageTasks;
