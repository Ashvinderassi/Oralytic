import { Pressable, StyleSheet, Text } from "react-native";

const EditButtons = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.EditButtons}>
      <Text style={styles.EditButtonsText}>{label}</Text>
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

  EditButtons: {
    color: "white",
    fontSize: 20,
    flex: 1,
    backgroundColor: "#007AFF",
    width: 175,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundColor: "#007AFF",

  EditButtonsText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default EditButtons;
