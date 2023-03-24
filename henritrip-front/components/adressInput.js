import { useRef } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";

export default AdressInput = ({ title, description }) => {
  const myTitle = title ? title : "Adresse";
  const myDesc = description ? description : "Où voulez vous aller ?";
  const inputRef = useRef(null);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        console.log("pressed");
        if (!inputRef.current.isFocused()) inputRef.current.focus();
      }}
    >
      <Text style={styles.label}>{myTitle}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={myDesc}
        placeholderTextColor="#003f5c"
        onChangeText={(msg) => {
          console.log(msg);
          //setTitle(msg);
        }}
      />
    </Pressable>
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
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "left",
  },
});
