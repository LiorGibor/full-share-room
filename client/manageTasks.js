import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from 'react-native';

export default function ManageTasks({ onBack }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newUser, setNewUser] = useState('');

  function addTask() {
    if (newTask !== '' && newUser !== '') {
      setTasks([...tasks, { task: newTask, user: newUser }]);
      setNewTask('');
      setNewUser('');
    }
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Manage Group Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TextInput
          style={styles.input}
          placeholder="User"
          value={newUser}
          onChangeText={setNewUser}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Text style={styles.task}>
            {item.task} - Assigned to {item.user}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: '30%',
    marginRight: 10,
  },
  task: {
    fontSize: 18,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
