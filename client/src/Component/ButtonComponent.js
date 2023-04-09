import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Theme from "../Constants/Theme";

export default function ButtonComponent({
  label,
  width,
  marginTop,
  marginButton,
  onPress,
  marginRight,
  backgroundColor,
  marginLeft,
  height,
  extraStyles,
  labelColor,
}) {
  const styles = StyleSheet.create({
    btnBg: {
      width: width ? width : "100%",
      backgroundColor: backgroundColor,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      height: height ? height : 40,
      marginBottom: marginButton ? marginButton : 0,
      marginTop: marginTop ? marginTop : 0,
      marginRight: marginRight ? marginRight : 0,
      marginLeft: marginLeft ? marginLeft : 0,
      ...extraStyles,
    },
    btnText: {
      color: Theme.white,
      fontSize: 18,
      fontWeight: "700",
      fontStyle: "normal",
    },
  });
  return (
    <TouchableOpacity style={[styles.btnBg]} onPress={onPress}>
      <Text style={{ ...styles.btnText, color: labelColor }}>{label}</Text>
    </TouchableOpacity>
  );
}
