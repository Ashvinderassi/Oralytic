import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const DateTimePicker = ({ handleChangeDate }) => {
  const date = new Date();
  const [day, setDay] = useState(date.getDay());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [hour, setHour] = useState(date.getHours());
  const [minute, setMinute] = useState(date.getMinutes());
//these below are the conditions so if they are not met it will display and error message for now if you type a motn below 10 you will have to just type 7 for jul instead of 07 as it will take 0 and no month starts with 0
  useEffect(() => {
    if (day < 1 || day > 31) {
      alert("Invalid day");
      return;
    }
    if (month < 1 || month > 12) {
      alert("Invalid month");
      return;
    }
    if (year < 0) {
      alert("Invalid year");
      return;
    }
    if (hour < 0 || hour > 23) {
      alert("Invalid hour");
      return;
    }
    if (minute < 0 || minute > 59) {
      alert("Invalid minute");
      return;
    }

    handleChangeDate(new Date(year, month - 1, day, hour, minute)); //-1 because system stores months strarting form 0 meaning january is 0 however user  will type 1 for january as its the first month so we put -1 to offset it
  }, [day, month, year, hour, minute]);

  return (
    <View style={styles.container}>
      {/* The code below takes your input as a string an passes it the anonymouse functon which changes it to a number and stores it in day, month, year etc */}
      <TextInput style={styles.input} placeholder="DD" value={day} onChangeText={(text) => setDay(Number(text))} />
      <TextInput style={styles.input} placeholder="MM" value={month} onChangeText={(text) => setMonth(Number(text))} />
      <TextInput style={styles.input} placeholder="YYYY" value={year} onChangeText={(text) => setYear(Number(text))} />
      <TextInput style={styles.input} placeholder="HH" value={hour} onChangeText={(text) => setHour(Number(text))} />
      <TextInput
        style={styles.input}
        placeholder="MM"
        value={minute}
        onChangeText={(text) => setMinute(Number(text))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    width: "20%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});

export default DateTimePicker;
