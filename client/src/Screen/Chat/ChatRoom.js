import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const ChatRoom = ({ route }) => {
  const { room } = route.params;
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    // Set up the listeners first
    newSocket.on("chat_history", (data) => {
      console.log("Received chat history:", data);
      setChatHistory(data.map((d) => `${d.username}: ${d.message}`));
    });

    newSocket.on("new_message", (data) => {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        `${data.user_id}: ${data.message}`,
      ]);
    });

    newSocket.emit("get_chat_history", { room: String(room) });
    newSocket.emit("join", { username: username, room: room });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave", { username: username, room: room });
      newSocket.close();
    };
  }, [room, username]);

  const sendMessage = () => {
    if (socket && message && room && username) {
      socket.emit("message", {
        message: message,
        room: room,
        user_id: username,
      });
      setMessage("");
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {}; // Return a cleanup function if needed
    }, [socket, room])
  );

  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem("userID");
      console.log("storedUserID", storedUserID);
      setUserID(storedUserID);
    };
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem("userName");
      setUsername(storedUserName);
    };

    fetchUserID();
    fetchUserName();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ marginBottom: 10 }}>{room}</Text>

      <FlatList
        data={chatHistory}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          style={{ flex: 1, borderColor: "gray", borderWidth: 1 }}
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatRoom;
