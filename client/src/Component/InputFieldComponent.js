import { StyleSheet, View, text } from "react-native";
import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import Theme from "../../src/Constants/Theme";
import {} from "react-native";

export default function InputFieldComponent({
  value,
  onChangeText,
  icon,
  label,
  keyboardType,
  placeholder,
}) {
  return (
    <View>
      <TextInput
        theme={{ roundness: 5 }}
        style={styles.input}
        value={value}
        selectionColor={Theme.primary}
        activeOutlineColor={Theme.primary}
        outlineColor={Theme.grey}
        label={label}
        placeholder={placeholder}
        keyboardType={keyboardType}
        mode="outlined"
        onChangeText={onChangeText}
        left={<TextInput.Icon name={icon} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Theme.white,
  },
});
