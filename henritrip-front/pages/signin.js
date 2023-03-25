import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import ExternSign from "../components/externSign";

import { InputIsType } from "../components/inputType";
import Spacer from "../components/spacer";
import MyTextInput from "../components/textinput";

import Ionicons from "@expo/vector-icons/Ionicons";

import axios from "axios";
const conf = require("../components/env.json");

function isSearch(title) {
  return title === "Chercher";
}

export default SignIn = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const [mail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(false);
  const [waitingApiResult, setWaitingApiResult] = useState(false);

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
    const mailErrorTooShort = "Email trop court - Invalide";
    const mailErrorNoAt = "Email invalide : Manque @";
    const passErrorTooShort = "Mot de passe trop court";
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
    console.log("on y est!");

    // Si pas d'erreur, appel à l'api
    //D'abord créer le body à transmettre
    const body = {
      email: mail,
      password: pass,
    };
    let apiResult = await api
      .post("/", body)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch(function (error) {
        console.log(error.response);
        //return JSON.stringify({ erreur: true });
        // if (error.response.data == undefined) {
        //   console.log(error + error.response.status);
        //   setError(error.response);
        // } else {
        //   let msg = error.response.data["message"].toString();
        //   console.log(msg + " : " + error.response.status);
        //   if (error.response.status == 500) {
        //     setError("Identifiant ou mot de passe incorrect");
        //   } else setError("Erreur de connexion, vérifiez votre réseau");
        // }
      });

    if (apiResult === undefined || apiResult === null) {
      console.log("résultat null");
      //return JSON.stringify({ erreur: true });
    }
    //console.log("résultat" + apiResult.message);
  };

  const MyBtn1 = ({ nav, title, color, icon, func }) => {
    const isSearchBtn = isSearch(title);
    const btnCol = color ? color : "orange";
    const width = isSearchBtn ? "45%" : "65%";
    const height = isSearchBtn ? 60 : 50;
    const myTitle = title ? title : "Connexion";
    const btnIcon = icon ? true : false;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          width: width,
          height: height,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: btnCol,
          borderRadius: isSearchBtn ? 30 : 25,
          columnGap: 5,
        }}
        onPress={async () => {
          console.log("pressed Login");
          await login();
          //console.log(result);
          nav.push("HomePage");
          // nav.push("HomePage", {
          //   data: result,
          // });
        }}
      >
        {btnIcon ? <Ionicons name="search" size={17} color="white" /> : null}
        <Text style={{ fontSize: 20, color: "white" }}>{myTitle}</Text>
      </TouchableOpacity>
    );
  };

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
      <MyBtn1 nav={navigation} />
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
