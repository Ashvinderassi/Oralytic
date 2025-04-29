import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Screen from "../layout/Screen.js";
import API from "../API/API.js";

const APIURL = "https://softwarehub.uk/unibase/staysafe/v1/api/users";

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async () => {
    if (!firstName || !lastName || !username || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://10.154.89.89:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.error) {
        Alert.alert("Signup Failed", data.error);
      } else {
        Alert.alert("Success", "Account created!");
        navigation.navigate("LoggingInScreen");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Could not connect to API.");
    }
  };

  const addUser = async (endpoint, User) => {
    const response = await API.post(endpoint, User);
    setIsloading(false);
    if (response.isSuccess) setContacts(response.result);
    if (response.isSuccess) {
      Alert.alert("Success", "Added successfully!");
    } else {
      Alert.alert("Error", "Failed to add you.");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter UserName"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddUser}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SignUpScreen;
