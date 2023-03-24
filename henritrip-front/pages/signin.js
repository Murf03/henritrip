import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import ExternSign from "../components/externSign";

import { InputIsType } from "../components/inputType";
import MyBtn from "../components/myBtn";
import Spacer from "../components/spacer";
import MyTextInput from "../components/textinput";

export default SignIn = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const [mail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <SafeAreaView style={{ ...signStyle.home, height: "100%" }}>
      <View style={signStyle.wlcView}>
        <Text style={signStyle.wlcTxt}>
          Bienvenu.e sur <Text style={signStyle.appName}>HenriTrip</Text>
        </Text>
        <Spacer height={20} />
        <Text style={signStyle.wlcTxtDesc}>Veuillez vous connecter</Text>
      </View>
      <Spacer height={50} />
      <MyTextInput
        placeholder="Email"
        title="Email"
        setTitle={setEmail}
        type={InputIsType.Mail}
      />
      <Spacer height={30} />
      <MyTextInput
        placeholder="Mot de passe"
        title="Password"
        setTitle={setPass}
        type={InputIsType.Password}
      />
      <Spacer height={30} />
      <MyBtn nav={navigation} />
      <Spacer height={20} />
      <View style={signStyle.socials}>
        <ExternSign name={"google"} nav={navigation} />
        <ExternSign name={"github"} nav={navigation} />
      </View>
      <Spacer height={50} />
    </SafeAreaView>
  );
};

const signStyle = StyleSheet.create({
  home: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  wlcView: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  wlcTxt: {
    fontSize: 50,
    maxWidth: "80%",
    fontWeight: "bold",
    textAlign: "center",
  },
  wlcTxtDesc: {
    fontSize: 25,
    maxWidth: "80%",
    textAlign: "center",
  },
  appName: {
    fontSize: 50,
    color: "floralwhite",
  },
  socials: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 50,
  },
});
