import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function TeethScanScreen({ route }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission required",
        "Please allow access to your camera roll."
      );
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!res.canceled && res.assets.length > 0) {
      const selectedImage = res.assets[0];
      setImage(selectedImage.uri);
      sendToAPI(selectedImage.uri);
    }
  };

  const sendToAPI = async (uri) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "teeth.jpg",
      type: "image/jpeg",
    });

    try {
      const res = await fetch("http://10.154.89.89:8000/predict", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      if (data.error) {
        Alert.alert("Prediction failed", data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.log("API error:", err);
      Alert.alert("Error", "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveScan = async () => {
    if (!result) return alert("No scan to save.");

    try {
      const response = await fetch("http://10.154.89.89:8000/save_scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: route.params.user.username,
          prediction: result.prediction,
          confidence: result.confidence,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (data.message) {
        alert("Scan saved!");
      } else {
        alert("Failed to save scan.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  const diagnosisAdvice = {
    calculus:
      "You should visit a dentist. Regular brushing and flossing can prevent this.",
    caries:
      "You may have a cavity. Reduce sugar intake and book a dental appointment.",
    Gingivitis:
      "Use mouthwash, brush gently for 2 mins, and schedule a dental visit soon.",
    healthy:
      "Your teeth look great! Keep brushing twice daily and flossing regularly.",
    hypodontia:
      "Possible missing teeth. Braces or dental consultation may help.",
    "Mouth Ulcer":
      "Rinse with salt water, avoid spicy foods. See a dentist if it persists.",
    "Tooth Discoloration":
      "Try whitening toothpaste or consult a dentist for pro whitening.",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Teeth Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      )}
      {result && console.log("Prediction received:", result.prediction)}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Prediction:</Text>
          <Text style={styles.resultText}>{result.prediction}</Text>
          <Text style={styles.resultLabel}>Confidence:</Text>
          <Text style={styles.resultText}>
            {(result.confidence * 100).toFixed(2)}%
          </Text>

          <Text style={styles.adviceLabel}>Advice:</Text>
          <Text style={styles.adviceText}>
            {diagnosisAdvice[result.prediction]}
          </Text>

          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={handleSaveScan}
          >
            <Text style={styles.buttonText}>Save Scan</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e0e0e0",
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 20,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  resultBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  resultLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  resultText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  adviceLabel: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  adviceText: {
    fontSize: 15,
    color: "#444",
    marginTop: 5,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
