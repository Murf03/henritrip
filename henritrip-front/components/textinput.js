import { StyleSheet, View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { InputIsType } from "./inputType";
import { useState } from "react";

function getKBType(type) {
  switch (type) {
    case InputIsType.Mail:
      return "email-address";
    case InputIsType.Num:
      return "number-pad";
    default:
      return "default";
  }
  return "default";
}

function getAutoComplete(type) {
  switch (type) {
    case InputIsType.Mail:
      return "email";
    case InputIsType.Password:
      return "password";
    default:
      return "off";
  }
  return "off";
}

function isObscure(type) {
  if (type === InputIsType.Password) return true;
  return false;
}

export default MyTextInput = ({ placeholder, setTitle, type }) => {
  const kbType = getKBType(type);
  const autoComplete = getAutoComplete(type);
  const isPw = isObscure(type);
  const [secure, setSecure] = useState(isPw);

  return (
    <View style={inputStyle.inputView}>
      <TextInput
        style={inputStyle.textInput}
        keyboardType={kbType}
        autoComplete={autoComplete}
        placeholder={placeholder}
        placeholderTextColor="#003f5c"
        secureTextEntry={secure}
        onChangeText={(msg) => {
          console.log(msg);
          setTitle(msg);
        }}
      />
      {isPw ? (
        <Ionicons
          style={{
            width: 20,
            height: 20,
            textAlign: "center",
            textAlignVertical: "center",
            height: 40,
            marginRight: 10,
          }}
          name={secure ? "eye" : "eye-off"}
          size={15}
          color="rgba(120,130,140,.75)"
          onPress={() => setSecure(!secure)}
        />
      ) : null}
    </View>
  );
};

const inputStyle = StyleSheet.create({
  textInput: {
    height: 50,
    flex: 1,
    width: "100%",
    paddingLeft: 15,
    fontSize: 14,
  },
  inputView: {
    backgroundColor: "transparent",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#336699",
    width: "70%",
    height: 50,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
