import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
export default function ItemPopular(props, onPress) {
  console.log("🚀 ~ file: ItemPopular.js:20 ~ ItemPopular ~ props:", props);
  const { image } = props.item;
  const { title } = props.item;
  const { detial } = props.item;
  const { navigation } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ChatScreen", {
          name: title,
        })
      }
    >
      <Image
        style={styles.image}
        source={{ uri: image }}
        resizeMode="contain"
      />

      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          flex: 1,
          width: 50,
          height: 50,
        }}
      >
        <View style={styles.textCostum}>
          <View style={{ marginStart: 15, marginVertical: 15 }}>
            <Text style={styles.textDesign}>{title}</Text>

            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  marginEnd: 20,
                  fontWeight: "normal",
                }}
              >
                {detial}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.7,
    borderBottomColor: "grey",
    marginStart: 16,
    alignItems: "center",
    backgroundColor: "#F5F9F6",
    marginEnd: 10,
    flexDirection: "row",
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
});
