import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ManageTasks = () => {
  const [groupID, setGroupID] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const navigation = useNavigation();

  const loadTasks = async () => {
    try {
      const response = await axios.get(
        `https://myapi.com/tasks?groupID=${groupID}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    const data = JSON.stringify({
      group_id: groupID, // replace with the email of the current user
      mission_name: taskName,
      mission_description: taskDescription,
    });
    try {
      await axios.post("http://localhost:5000/add_mission", data, {
        headers: { "Content-Type": "application/json" },
      });
      setTaskName("");
      setTaskDescription("");
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.post(`https://myapi.com/tasks/${taskId}/delete`);
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchGroupID = async () => {
      const storedGroupID = await AsyncStorage.getItem("groupID");
      setGroupID(storedGroupID);
    };
    fetchGroupID();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [groupID]);

  return (
    <View>
      <Text>Task List</Text>
      <TextInput
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Task name"
      />
      <TextInput
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder="Task description"
      />
      <Button title="Add task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item: task }) => (
          <View>
            <CheckBox value={false} onChange={() => deleteTask(task.id)} />
            <Text>{task.taskName}</Text>
            <Text>{task.taskDescription}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("FoodBottomTabs")}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageTasks;
