import { Pressable, StyleSheet, Text } from "react-native";

const LoginButton = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.LoginButton}>
      <Text style={styles.LoginButtonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
  },

  LoginButton: {
    width: 300,
    height: 100,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 50,
  },

 

  LoginButtonText: {
    
    fontSize: 40,
  },
});

export default LoginButton;
