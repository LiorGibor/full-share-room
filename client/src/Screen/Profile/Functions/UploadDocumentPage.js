import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UploadDocumentPage = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      Upload document page
      <Button title="Home" onPress={() => navigation.navigate("UserPage")} />
    </View>
  );
};

export default UploadDocumentPage;
