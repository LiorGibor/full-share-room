import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
export default function ItemAllCategroies(props) {
  const { image } = props.item;
  const { title } = props.item;
  const { price } = props.item;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.textDesign}>City:</Text>
        <Text style={styles.text}>{title}</Text>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.text}>12/12/2021</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.textDesign}>Street:</Text>
        <Text style={styles.text}>Yehuda Halevi</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.textDesign}>Entry date:</Text>
        <Text style={styles.text}>10/02/2023</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.textDesign}>Price:</Text>
        <Text style={styles.text}>{price}</Text>
      </View>
      <View
        style={{
          backgroundColor: "#7B7A7A",
          height: 2,
          width: "100%",
          marginTop: 10,
        }}
      ></View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Octicons name="comment" size={20} color="black" />

        <Text style={styles.text}>Comments</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    marginStart: 16,
    backgroundColor: "#E7E6E6",
    marginEnd: 10,
    padding: 10,
    borderRadius: 10,
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  textCostum: {
    alignContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  textDesign: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 16,
    marginStart: 10,
  },
});
