import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SplitPayments = () => {
  const navigation = useNavigation();

  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    user: "",
    name: "",
    amount: 0,
  });
  const [debts, setDebts] = useState({});

  const calculateDebts = () => {
    const debts = {};
    const users = [...new Set(expenses.map((expense) => expense.user))];
    users.forEach((user) => {
      debts[user] = 0;
    });

    expenses.forEach((expense) => {
      debts[expense.user] += expense.amount;
    });

    const totalExpense = Object.values(debts).reduce((a, b) => a + b, 0);
    const averageExpense = totalExpense / users.length;

    users.forEach((user) => {
      debts[user] = debts[user] - averageExpense;
    });

    setDebts(debts);
  };

  const addExpense = () => {
    axios
      .post("https://your-api-url.com/expenses", newExpense)
      .then((response) => {
        setExpenses([...expenses, response.data]);
        setNewExpense({ user: "", name: "", amount: 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchExpenses = () => {
    axios
      .get("https://your-api-url.com/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expenses Table</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>User</Text>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Amount</Text>
        </View>
        {expenses.map((expense, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{expense.user}</Text>
            <Text style={styles.cell}>{expense.name}</Text>
            <Text style={styles.cell}>{expense.amount}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.heading}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="User"
        onChangeText={(text) => setNewExpense({ ...newExpense, user: text })}
        value={newExpense.user}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setNewExpense({ ...newExpense, name: text })}
        value={newExpense.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        onChangeText={(text) =>
          setNewExpense({ ...newExpense, amount: Number(text) })
        }
        value={String(newExpense.amount)}
        keyboardType="numeric"
      />
      <Button title="Add" onPress={addExpense} />
      <Button title="Calculate Debts" onPress={calculateDebts} />
      <Button title="Fetch Expenses" onPress={fetchExpenses} />
      <Text style={styles.heading}>Debts</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>User</Text>
          <Text style={styles.cell}>Debt</Text>
        </View>
        {Object.entries(debts).map(([user, debt]) => (
          <View key={user} style={styles.row}>
            <Text style={styles.cell}>{user}</Text>
            <Text style={styles.cell}>{debt}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Home"
        onPress={() => navigation.navigate("FoodBottomTabs")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default SplitPayments;
