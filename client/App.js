import StackNavigation from "./src/Navigation/StackNavigation";
import React, { useState, useEffect } from "react";
import { LogBox, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./src/Navigation/AuthStack";

//Below Command is to hide all the unnecessary warnings from app
LogBox.ignoreAllLogs();
const App = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isLogin, setIsLogin] = useState("0");

  const getMyStringValue = async () => {
    try {
      await AsyncStorage.getItem("isLogin").then((res) => {
        console.log("----->>>" + res);
        setIsLogin(res);
      });
      setisLoading(false);

      return;
    } catch (e) {
      // read error
      console.log(res);
    }
  };
  useEffect(() => {
    getMyStringValue();
  }, []);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }} />
      {/* Below Decide on which screens an app have to go  */}
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? null : isLogin === "1" ? (
          <StackNavigation />
        ) : (
          <AuthStack />
        )}
      </SafeAreaView>
    </>
  );
};
export default App;
