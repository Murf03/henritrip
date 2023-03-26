import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import ExternSign from "../components/externSign";

import { InputIsType } from "../components/inputType";
import Spacer from "../components/spacer";
import MyTextInput from "../components/textinput";
import MyBtn from "../components/myBtn";

import Ionicons from "@expo/vector-icons/Ionicons";

import axios from "axios";
const conf = require("../components/env.json");

export default SignIn = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const [mail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(false);
  const [waitingApiResult, setWaitingApiResult] = useState(false);
  const noUser = "NO_USER";
  const [userID, setUserID] = useState("NO_USER");
  const mailErrors = [
    "Email trop court - Invalide",
    "Email invalide : Manque @",
  ];
  const passErrors = ["Mot de passe trop court"];

  //Api
  const url = conf.baseUrlMobile + "/users/login";
  const api = axios.create({
    baseURL: url,
    headers: { "Content-Type": "application/json" },
    timeout: 1000,
  });

  //Login function
  let login = async () => {
    //Pour l'instant très petite vérif;
    const mailErrorTooShort = mailErrors[0];
    const mailErrorNoAt = mailErrors[1];
    const passErrorTooShort = passErrors[0];
    if (mail.length <= 5 && error !== mailErrorTooShort) {
      setError(mailErrorTooShort);
      console.log(error);
      return;
    }
    if (!mail.includes("@") && error !== mailErrorNoAt) {
      setError(mailErrorNoAt);
      console.log(error);
      return;
    }
    if (pass.length <= 3 && error !== passErrorTooShort) {
      setError(passErrorTooShort);
      console.log(error);
      return;
    }

    // Si pas d'erreur, appel à l'api
    //D'abord créer le body à transmettre
    const body = {
      email: mail,
      password: pass,
    };
    let apiResult = await api
      .post("/", body)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error && error.response && error.response.data) {
          console.log(error.response.data);
          setError(error.response.data.message);
        }
        console.log(error.message);
      });

    if (apiResult === undefined || apiResult === null) {
      return { userID: noUser, role: "USER" };
    }
    return apiResult;
    //return id;
  };

  let checkUID = (uid) => {
    if (uid !== noUser && uid !== undefined && uid !== null) return true;
    return false;
  };

  //Fonction à transmettre au bouton Connexion
  let btnPressed = async (nav) => {
    if (!waitingApiResult) {
      setWaitingApiResult(true);
      const result = await login();
      const uid = result["userID"];
      const role = result["role"];
      setWaitingApiResult(false);
      if (checkUID(uid)) {
        nav.push("HomePage", {
          userID: uid,
          role: role,
        });
      }
    }
  };

  const ErreurView = () => {
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            textAlign: "center",
            maxWidth: "85%",
            fontSize: 15,
            color: "red",
          }}
        >
          {error}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ ...signStyle.home, height: "100%", flexGrow: 1 }}
    >
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
        clearError={setError}
      />
      <Spacer height={30} />
      <MyTextInput
        placeholder="Mot de passe"
        title="Password"
        setTitle={setPass}
        type={InputIsType.Password}
        clearError={setError}
      />
      {error === "" ? <Spacer height={30} /> : <ErreurView />}
      <MyBtn nav={navigation} func={btnPressed} />
      <Spacer height={20} />
      <View style={signStyle.socials}>
        <ExternSign name={"google"} nav={navigation} />
        <ExternSign name={"github"} nav={navigation} />
      </View>
      <Spacer height={30} />
      <TouchableOpacity
        onPress={() => {
          console.log("S'inscrire");
          navigation.push("Register");
        }}
      >
        <Text style={{ textDecorationLine: "underline", fontSize: 15 }}>
          Nouveau chez nous ? S'inscrire !
        </Text>
      </TouchableOpacity>
      <Spacer height={25} />
    </ScrollView>
  );
};

const signStyle = StyleSheet.create({
  home: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "lightblue",
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
