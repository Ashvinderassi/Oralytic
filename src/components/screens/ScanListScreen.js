import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Screen from "../layout/Screen.js";

export const ScanListScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const [scanHistory, setScanHistory] = useState([]);

  const fetchScanHistory = async () => {
    try {
      const response = await fetch(
        `http://10.154.89.89:8000/history/${user.username}`
      );
      const data = await response.json();
      setScanHistory(data);
    } catch (error) {
      console.error("Failed to fetch scan history:", error);
    }
  };
  const handleDeleteScan = async (scan) => {
    try {
      const response = await fetch(
        `http://10.154.89.89:8000/delete_scan?username=${user.username}&timestamp=${scan.timestamp}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (data.message) {
        alert("Scan deleted!");
        setScanHistory(
          scanHistory.filter((s) => s.timestamp !== scan.timestamp)
        );
      } else {
        alert("Delete failed.");
      }
    } catch (error) {
      console.error("Error deleting scan:", error);
      alert("Could not connect to server.");
    }
  };

  useEffect(() => {
    fetchScanHistory();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchScanHistory();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Screen>
      <Text style={styles.boldTextTop}>Welcome back {user.username}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TeethScanScreen", { user })}
      >
        <Text style={styles.ButtonText}>Scan Teeth</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Your Scan History</Text>

      <ScrollView style={styles.container}>
        {scanHistory.length === 0 ? (
          <Text style={{ padding: 10 }}>No scans saved yet.</Text>
        ) : (
          scanHistory.map((scan, index) => (
            <View key={index} style={styles.scanItem}>
              <View style={styles.topRow}>
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  {scan.prediction}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDeleteScan(scan)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <Text>Confidence: {(scan.confidence * 100).toFixed(2)}%</Text>
                <Text style={{ color: "gray" }}>
                  {new Date(scan.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  boldTextTop: {
    fontSize: 20.5,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ButtonText: {
    color: "white",
    padding: 10,
    fontSize: 20,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  historyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  scanItem: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginVertical: 5,
    position: "relative",
  },

  deleteButton: {
    position: "absolute",
    right: 10,
    top: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#fff0f0",
    borderRadius: 5,
  },

  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default ScanListScreen;
