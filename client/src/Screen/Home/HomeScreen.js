import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import ItemAllCategroies from "../../../src/Screen/Home/Componentitem/ItemAllCategroies";

export const SLIDER_WIDTH = Dimensions.get("window").width + 2;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
// Below is the static data which will be dynamic from api and show the list
const DATA = [
  {
    title: "Tel Aviv",
    detial: "Yehada Halevi",
    price: "11",
    image: "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900",
    orderID: "1232",
  },
  {
    title: "Rosh HaAyan",
    detial: "Zhabotinski",
    price: "380",
    orderID: "3456",
    image:
      "https://www.unicornsinthekitchen.com/wp-content/uploads/2019/01/Chicken-shawarma.jpg",
  },
  {
    title: "Haifa",
    detial: "A",
    price: "100",
    image:
      "https://img-global.cpcdn.com/recipes/52754ce2ce823191/1200x630cq70/photo.jpg",
    orderID: "4567",
  },
  {
    title: "HoD Hasharon",
    detial: "B",
    price: "230",
    image: "https://images.deliveryhero.io/image/fd-pk/LH/n7uf-hero.jpg",
    orderID: "9765",
  },
  {
    title: "Eilat",
    detial: "K",
    price: "830",
    orderID: "36677",
    image: "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900",
  },
  {
    title: "Kfar Saba",
    detial: "Weizman",
    price: "70",
    orderID: "8809",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg",
  },
  {
    title: "Petah Tikwa",
    detial: "Z",
    price: "170",
    image: "https://static.toiimg.com/photo/msid-82736662/82736662.jpg?896468",
    orderID: "46456",
  },
  {
    title: "Tel Aviv",
    detial: "K",
    price: "500",
    image:
      "https://www.foodiecrush.com/wp-content/uploads/2019/07/Pomodoro-Sauce-foodiecrush.com-018-500x500.jpg",
    orderID: "34546",
  },
  {
    title: "Tel Aviv",
    detial: "Tel Aviv",
    price: "1000",
    image: "https://static.toiimg.com/thumb/57730102.cms?width=1200&height=900",
    orderID: "4747",
  },
  {
    title: " Tel Aviv",
    detial: "Tel Aviv",
    price: "200",
    image:
      "https://www.cookwithkushi.com/wp-content/uploads/2021/08/IMG_9448d.jpg",
    orderID: "3453",
  },
  {
    title: "Tel Aviv",
    detial: "Tel Aviv",
    price: "1530",
    image:
      "https://jessiekoeyskitchen.files.wordpress.com/2016/07/fried-nam-yee-chicken.jpg",
    orderID: "7898",
  },
  {
    title: "Tel Aviv",
    detial: "Tel Aviv",
    price: "130",
    image:
      "https://recipes.timesofindia.com/thumb/msid-54308405,width-1600,height-900/54308405.jpg",
    orderID: "1232",
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Search input field below */}
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="search-sharp"
          size={20}
          color="grey"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          color="#000"
        ></TextInput>
      </View>

      {/* Below is a list of data which render from above data which is static foe now */}
      <FlatList
        style={{ marginEnd: 10, marginEnd: 10 }}
        data={DATA}
        renderItem={({ item }) => (
          // That hare is item we design
          <ItemAllCategroies item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Notification: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "#000",
  },
  searchSection: {
    borderColor: "#02C38E",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "grey",
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
  },
  searchIcon: {
    padding: 10,
    marginTop: 4,
  },
  input: {
    backgroundColor: "#ffffff",
    color: "grey",
    width: "50%",
    borderColor: "#02C38E",
    borderRadius: 10,
  },
  categeory: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
