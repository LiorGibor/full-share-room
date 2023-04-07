import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import ItemPopular from "../CommonComponent/ItemPopular";
// Below is a list of static chat that will be dynamic
const DATA = [
  {
    title: "Yehuda Halevi 52",
    detial: "Relevant",
    price: "3400",
    image:
      "https://www.sabresim.co.il/sites/default/files/styles/display800x600/public/jl2.jpg?itok=Sm-HjxAW",
    orderID: "1232",
  },
  {
    title: "Rotchild 36",
    detial: "Relevant",
    price: "280",
    image:
      "https://www.sabresim.co.il/sites/default/files/styles/display800x600/public/jl2.jpg?itok=Sm-HjxAW",
    orderID: "1232",
  },
  {
    title: "Nachmani 22",
    detial: "Not Relevant",
    price: "380",
    orderID: "3456",
    image:
      "https://www.sabresim.co.il/sites/default/files/styles/display800x600/public/jl.jpg?itok=SXEGjdoy",
  },
  {
    title: "Hagibor 12",
    detial: "Not Relevant",
    price: "100",
    image:
      "https://www.sabresim.co.il/sites/default/files/styles/display800x600/public/jl.jpg?itok=SXEGjdoy",
    orderID: "4567",
  },
  {
    title: "Shir 10",
    detial: "Relevant",
    price: "230",
    image:
      "https://www.sabresim.co.il/sites/default/files/styles/display800x600/public/jl.jpg?itok=SXEGjdoy",
    orderID: "9765",
  },
  {
    title: "Gilboa 90",
    detial: "Waiting for final answer",
    price: "830",
    orderID: "36677",
    image:
      "https://www.sabresim.co.il/sites/default/files/styles/display800x600/public/jl.jpg?itok=SXEGjdoy",
  },
];
export default function ChatList({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textStyle}>Conversation</Text>
      </View>
      {/* Below is the list of all the chatlist which show when click on chat button from bottom for now this data also coming from above static data */}
      <FlatList
        style={{ marginEnd: 10, marginEnd: 10 }}
        data={DATA}
        renderItem={({ item }) => (
          //Below is a design of how it look like in a list
          <ItemPopular item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#F2F2F2",
    flex: 1,
    borderRadius: 15,
    shadowColor: "grey",
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
  },
  textStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
});
