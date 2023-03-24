import { StyleSheet, View, TextInput, Text } from "react-native";

export default AdressInput = ({ title, description }) => {
  const myTitle = title ? title : "Adresse";
  const myDesc = description ? description : "Où voulez vous aller ?";
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{myTitle}</Text>
      <TextInput
        style={styles.input}
        placeholder={myDesc}
        placeholderTextColor="#003f5c"
        onChangeText={(msg) => {
          console.log(msg);
          //setTitle(msg);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 30,
    paddingVertical: 10,
    width: "100%",
    borderRadius: 40,
    backgroundColor: "white",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    fontSize: 15,
  },
});
