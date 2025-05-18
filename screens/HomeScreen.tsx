import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const HomeScreen: React.FC = () => {
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [leadTime, setLeadTime] = useState<string>('10');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const pickPdf = async () => {
    setUploadStatus(null);
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPdfName(result.assets[0].name);
      setUploading(true);
      // TODO: Upload to backend
      setTimeout(() => {
        setUploading(false);
        setUploadStatus('PDF uploaded successfully!');
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrucknerDevice</Text>
      <Button title="Pick PDF" onPress={pickPdf} />
      {pdfName && <Text style={styles.pdfName}>Selected: {pdfName}</Text>}
      <Text style={styles.label}>Notification lead time (seconds):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={leadTime}
        onChangeText={setLeadTime}
      />
      {uploading && <ActivityIndicator size="small" color="#0000ff" />}
      {uploadStatus && <Text style={styles.status}>{uploadStatus}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  pdfName: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    width: 120,
    marginTop: 8,
    textAlign: 'center',
  },
  status: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
  },
});

export default HomeScreen; 