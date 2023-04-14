import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ApplyRequest = () => {
  const [subject, setSubject] = useState("");
  const [summary, setSummary] = useState("");
  const [fileUri, setFileUri] = useState(null);
  const navigation = useNavigation();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setFileUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("summary", summary);
    formData.append("file", {
      uri: fileUri,
      name: "file.pdf", // replace with actual file name
      type: "application/pdf", // replace with actual file type
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/requests",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data); // handle success response
    } catch (error) {
      console.log(error); // handle error response
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply Request</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Subject:</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Summary:</Text>
        <TextInput
          style={[styles.input, styles.summaryInput]}
          value={summary}
          onChangeText={setSummary}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Text style={styles.uploadButtonText}>Upload File</Text>
      </TouchableOpacity>
      {fileUri && (
        <Text style={styles.fileUri}>{fileUri.split("/").pop()}</Text>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("FoodBottomTabs")}
      >
        <Text style={styles.navButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  summaryInput: {
    height: 100,
    textAlignVertical: "top",
  },
  uploadButton: {
    backgroundColor: "#4caf50",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fileUri: {
    marginVertical: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#2196f3",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  navButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  navButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default ApplyRequest;
