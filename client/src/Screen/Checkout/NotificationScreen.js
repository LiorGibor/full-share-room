import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  Image,
  View,
  FlatList,
} from "react-native";
import ItemCart from "./CartItem/ItemCart";
const DATA = [
  {
    title: "Shalom send you a friend request",
    text: "hi kay",
    price: "130",
    image:
      "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU=",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
  },
  {
    title: "Ido send you a friend request",
    text: "I am fine",
    price: "280",
    image:
      "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
  },
  {
    title: "Lior send you a friend request",
    text: "how are you",
    price: "380",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
    image:
      "https://media.istockphoto.com/id/1318858332/photo/headshot-portrait-of-smiling-female-employee-posing-in-office.jpg?b=1&s=170667a&w=0&k=20&c=xaXWxTDSzfZp6Xa16RFBfFknXBRQkfkZD8BKr07-Aac=",
  },
  {
    title: "Shir  send you a friend request",
    text: "how can",
    price: "100",
    image:
      "https://media.istockphoto.com/id/1300972574/photo/millennial-male-team-leader-organize-virtual-workshop-with-employees-online.jpg?b=1&s=170667a&w=0&k=20&c=96pCQon1xF3_onEkkckNg4cC9SCbshMvx0CfKl2ZiYs=",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
  },
  {
    title: "Shalom send you a friend request",
    text: "I am good",
    price: "230",
    image:
      "https://media.istockphoto.com/id/1318858332/photo/headshot-portrait-of-smiling-female-employee-posing-in-office.jpg?b=1&s=170667a&w=0&k=20&c=xaXWxTDSzfZp6Xa16RFBfFknXBRQkfkZD8BKr07-Aac=",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
  },
  {
    title: "Shalom send you a friend request",
    text: "2000$ send ",
    price: "830",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
    image:
      "https://media.istockphoto.com/id/1318858332/photo/headshot-portrait-of-smiling-female-employee-posing-in-office.jpg?b=1&s=170667a&w=0&k=20&c=xaXWxTDSzfZp6Xa16RFBfFknXBRQkfkZD8BKr07-Aac=",
  },
  {
    title: "Shalom send you a friend request",
    text: "how do you do",
    price: "70",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
    image:
      "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU=",
  },
  {
    title: "Shalom send you a friend request",
    text: "I hi",
    price: "170",
    image:
      "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU=",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
  },
  {
    title: "Shalom send you a friend request",
    text: "heloo !",
    price: "500",
    image:
      "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU=",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
  },
  {
    title: "Shalom send you a friend request",
    text: "what your status",
    price: "1000",
    image:
      "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU=",
    icon: "https://image.shutterstock.com/image-vector/phone-icon-vector-call-telephone-260nw-1721247196.jpg",
  },
];

export default function NotificationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textStyle}>Notification</Text>
      </View>
      {/* Hare we using FlatList to display our data from data base */}
      <FlatList
        style={{ marginEnd: 10, marginEnd: 10 }}
        data={DATA}
        renderItem={({ item }) => (
          // That hare is item we design
          <ItemCart item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },

  textStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
});
