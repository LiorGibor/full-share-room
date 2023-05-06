import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import Theme from "../../src/Constants/Theme";
export default function PasswordComponent({
  value,
  onChangeText,
  label,
  icon,
  keyboardType,
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View>
      <TextInput
        theme={{ roundness: 5 }}
        style={styles.container}
        value={value}
        selectionColor={Theme.primary}
        activeOutlineColor={Theme.primary}
        outlineColor={Theme.grey}
        label={label}
        keyboardType={keyboardType}
        mode="outlined"
        onChangeText={onChangeText}
        secureTextEntry={passwordVisible}
        left={<TextInput.Icon name={icon} />}
        right={
          <TextInput.Icon
            name={passwordVisible ? "eye" : "eye-off"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.white,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
