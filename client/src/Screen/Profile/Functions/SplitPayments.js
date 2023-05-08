import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JsonList = ({ data }) => {
  return (
    <View style={styles.table}>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text style={styles.cell}>{key}</Text>
          <Text style={styles.cell}>{JSON.stringify(value)}</Text>
        </View>
      ))}
    </View>
  );
};

const SplitPayments = () => {
  const navigation = useNavigation();

  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: 0,
  });
  const [debts, setDebts] = useState({});
  const [groupID, setGroupID] = useState("");
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");

  const calculateDebts = () => {
    const debts = {};
    expenses.forEach((expense) => {
      const { user_id, amount } = expense;
      debts[user_id] = debts[user_id] || 0;
      debts[user_id] += amount;
    });
    const totalExpense = Object.values(debts).reduce((a, b) => a + b, 0);
    const averageExpense = totalExpense / Object.keys(debts).length;

    Object.keys(debts).forEach((user_id) => {
      debts[user_id] = debts[user_id] - averageExpense;
    });

    setDebts(debts);
  };

  const addExpense = async () => {
    const data = JSON.stringify({
      group_id: groupID, // replace with the email of the current user
      user_id: userID, // replace with the email of the current user
      outcome_name: newExpense.name,
      amount: newExpense.amount,
    });
    try {
      await axios.post("http://localhost:5000/add_outcome", data, {
        headers: { "Content-Type": "application/json" },
      });
      fetchExpenses();
      addNotification();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExpenses = async () => {
    const data = JSON.stringify({
      group_id: groupID,
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/outcomes_from_group_id",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNotification = async () => {
    const data = JSON.stringify({
      group_id: groupID,
      user_id: userID,
      notification_name: `${userName} added new expense on ${newExpense.name} in the amount of  ${newExpense.amount}`,
    });
    try {
      await axios.post("http://localhost:5000/add_notification", data, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchGroupID = async () => {
      const storedGroupID = await AsyncStorage.getItem("groupID");
      setGroupID(storedGroupID);
    };
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem("userID");
      setUserID(storedUserID);
    };
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem("userName");
      setUserName(storedUserName);
    };

    fetchUserID();
    fetchGroupID();
    fetchUserName();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [groupID]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Split Payments</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Expense name"
          onChangeText={(text) => setNewExpense({ ...newExpense, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Expense amount"
          keyboardType="numeric"
          onChangeText={(text) =>
            setNewExpense({ ...newExpense, amount: Number(text) })
          }
        />
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cellHeader}>Name</Text>
            <Text style={styles.cellHeader}>Amount</Text>
            <Text style={styles.cellHeader}>User</Text>
          </View>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{expense.outcome_name}</Text>
              <Text style={styles.cell}>{expense.amount}</Text>
              <Text style={styles.cell}>{expense.user_id}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={addExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        <JsonList data={debts} />
      </View>
      <Button title="Calculate Debts" onPress={calculateDebts} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableContainer: {
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
  },
});

export default SplitPayments;
