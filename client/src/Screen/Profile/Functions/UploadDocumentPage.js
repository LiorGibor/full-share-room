import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Picker,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DocumentCategory = {
  ApartmentContract: "Apartment contract",
  Bills: "Bills",
  Other: "Other",
};

const data = [
  { id: 1, name: "Document 1", category: DocumentCategory.ApartmentContract },
  { id: 2, name: "Document 2", category: DocumentCategory.Bills },
  { id: 3, name: "Document 3", category: DocumentCategory.Other },
];

export default function UploadDocumentPage() {
  const [documentName, setDocumentName] = useState("");
  const [documentCategory, setDocumentCategory] = useState(
    DocumentCategory.ApartmentContract
  );
  const [documentFile, setDocumentFile] = useState(null);
  const [documents, setDocuments] = useState(data);
  const navigation = useNavigation();

  const handleChooseFile = async () => {
    // Your file picker code
  };

  const handleUpload = () => {
    if (!documentName || !documentCategory || !documentFile) {
      return;
    }

    const newDocument = {
      id: documents.length + 1,
      name: documentName,
      category: documentCategory,
    };

    setDocuments([...documents, newDocument]);
    setDocumentName("");
    setDocumentCategory(DocumentCategory.ApartmentContract);
    setDocumentFile(null);
  };

  const renderDocumentItem = ({ item }) => (
    <View style={styles.documentItem}>
      <Text style={styles.documentName}>{item.name}</Text>
      <Text style={styles.documentCategory}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Document Name"
          value={documentName}
          onChangeText={setDocumentName}
        />
        <Picker
          selectedValue={documentCategory}
          style={styles.input}
          onValueChange={(itemValue) => setDocumentCategory(itemValue)}
        >
          <Picker.Item
            label="Apartment contract"
            value={DocumentCategory.ApartmentContract}
          />
          <Picker.Item label="Bills" value={DocumentCategory.Bills} />
          <Picker.Item label="Other" value={DocumentCategory.Other} />
        </Picker>
        <TouchableOpacity style={styles.fileButton} onPress={handleChooseFile}>
          <Text style={styles.fileButtonText}>
            {documentFile ? documentFile.name : "Choose File"}
          </Text>
        </TouchableOpacity>
        <Button title="Upload" onPress={handleUpload} />
      </View>
      <View style={styles.documentsContainer}>
        <Text style={styles.heading}>Documents</Text>
        <FlatList
          data={documents}
          renderItem={renderDocumentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => navigation.navigate("FoodBottomTabs")}
      >
        <Text style={styles.navigationButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  fileButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  fileButtonText: {
    color: "#555",
  },
  documentsContainer: {
    flex: 1,
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  documentItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  documentCategory: {
    fontSize: 14,
    color: "#555",
  },
  navigationButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  navigationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
