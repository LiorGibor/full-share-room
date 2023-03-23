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

export default function Outcomes({onBack}) {
  const [outcomes, setOutcomes] = useState([]);
  const [newOutcome, setNewOutcome] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPrice, setNewPrice] = useState('');

  function addOutcome() {
    if (newOutcome !== '' && newUser !== '') {
      setOutcomes([...outcomes, { outcome: newOutcome, user: newUser, price: newPrice}]);
      setNewOutcome('');
      setNewUser('');
      setNewPrice('');
    }
  }
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Manage Group Outcomes</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Outcome"
          value={newOutcome}
          onChangeText={setNewOutcome}
        />
        <TextInput
          style={styles.input}
          placeholder="price" 
          value={newPrice}
          onChangeText={setNewPrice}
        />
        <TextInput  
          style={styles.input}
          placeholder="User"
          value={newUser}
          onChangeText={setNewUser}
        />
        <TouchableOpacity style={styles.outcome} onPress={addOutcome}>
        <Text style={styles.outcome}>Add Outcome</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={outcomes}
        renderItem={({ item }) => (
          <Text style={styles.task}>
            {item.outcome} : {item.price}$ - Assigned to {item.user}
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
    width: '20%',
    marginRight: 10,
  },
  
  outcome: {
    fontSize: 14,
    textAlign: 'right',
    color: 'blue',
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
