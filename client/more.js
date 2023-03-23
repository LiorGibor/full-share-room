import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function More({onBack}) {
  return (
    <View style={styles.pageContainer}>
      <Text>This is manage more options page </Text>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    pageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue',
      },
    backButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'blue',
      borderRadius: 5,
    },
    backButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });

// export default More;
