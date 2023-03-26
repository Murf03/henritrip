import { useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Switch,
  Animated,
  Easing,
} from "react-native";
import ExternSign from "../components/externSign";

import { InputIsType } from "../components/inputType";
import Spacer from "../components/spacer";
import MyTextInput from "../components/textinput";
import MyBtn from "../components/myBtn";

import Ionicons from "@expo/vector-icons/Ionicons";

import axios from "axios";
const conf = require("../components/env.json");

export default Register = ({ navigation }) => {
  //Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const [isAdmin, setIsAdmin] = useState("Non");
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isAdmin === "Non") setIsAdmin("Oui");
    else setIsAdmin("Non");
    if (!isEnabled) appear();
    else disappear();
  };

  const { height, width } = Dimensions.get("window");
  const [mail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [adminProof, setAdminProof] = useState("");
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

  const appearAnim = useRef(new Animated.Value(0)).current;

  const appear = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(appearAnim, {
      toValue: 55,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const disappear = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(appearAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  //Api
  const url = conf.baseUrlMobile + "/users/register";
  const api = axios.create({
    baseURL: url,
    headers: { "Content-Type": "application/json" },
    timeout: 1000,
  });

  //Login function
  let register = async () => {
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
      role: isEnabled ? "ADMIN" : "USER",
      preuve: adminProof,
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
      return noUser;
    }
    const id = apiResult["userID"];
    return id;
  };

  let checkUID = (uid) => {
    if (uid !== noUser && uid !== undefined && uid !== null) return true;
    return false;
  };

  //Fonction à transmettre au bouton Connexion
  let btnPressed = async (nav) => {
    if (!waitingApiResult) {
      setWaitingApiResult(true);
      const uid = await register();
      setWaitingApiResult(false);
      if (checkUID(uid)) {
        nav.push("HomePage", {
          userID: uid,
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
      style={{ ...registerStyle.home, height: "100%", flexGrow: 1 }}
    >
      <View style={registerStyle.wlcView}>
        <Text style={registerStyle.wlcTxt}>
          Bienvenu.e sur <Text style={registerStyle.appName}>HenriTrip</Text>
        </Text>
        <Spacer height={15} />
        <Text style={registerStyle.wlcTxtDesc}>
          Veuillez saisir vos informations
        </Text>
      </View>
      <Spacer height={20} />
      <MyTextInput
        placeholder="Email"
        title="Email"
        setTitle={setEmail}
        type={InputIsType.Mail}
        clearError={setError}
      />
      <Spacer height={15} />
      <MyTextInput
        placeholder="Mot de passe"
        title="Password"
        setTitle={setPass}
        type={InputIsType.Password}
        clearError={setError}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
          paddingHorizontal: 15,
        }}
      >
        <Text style={{ color: "grey" }}>
          Compte Admin :{" "}
          <Text style={{ color: isEnabled ? "blue" : "grey" }}>{isAdmin}</Text>
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "lightblue" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Animated.View
        style={{
          height: appearAnim,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          overflow: "hidden",
          paddingTop: 2,
          marginBottom: isEnabled ? 5 : 0,
        }}
      >
        <MyTextInput
          placeholder="Code Admin"
          title="AdminKEy"
          setTitle={setAdminProof}
          type={InputIsType.Text}
          clearError={setError}
        />
      </Animated.View>
      {error === "" ? <Spacer height={10} /> : <ErreurView />}
      <MyBtn nav={navigation} func={btnPressed} title="S'inscrire" />
      <Spacer height={20} />
      <View style={registerStyle.socials}>
        <ExternSign name={"google"} nav={navigation} />
        <ExternSign name={"github"} nav={navigation} />
      </View>
      <Spacer height={30} />
      <TouchableOpacity
        onPress={() => {
          console.log("Aller Se connecter");
          navigation.navigate("SignIn");
        }}
      >
        <Text style={{ textDecorationLine: "underline", fontSize: 15 }}>
          Déjà un compte ? Se connecter !
        </Text>
      </TouchableOpacity>
      <Spacer height={15} />
    </ScrollView>
  );
};

const registerStyle = StyleSheet.create({
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
    fontSize: 45,
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
