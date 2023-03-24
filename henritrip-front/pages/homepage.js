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

import Spacer from "../components/spacer";
import LogoSVG from "../assets/Logo_henri-side.svg";
import Feather from "@expo/vector-icons/Feather";
import AdressInput from "../components/adressInput";
import MyBtn from "../components/myBtn";

export default HomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ ...homeStyle.home, height: "100%" }}>
      <View style={homeStyle.nav}>
        <TouchableOpacity
          style={homeStyle.navMenu}
          onPress={() => {
            console.log("Pressed");
          }}
        >
          <Feather name="menu" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Pressed");
          }}
        >
          <LogoSVG width={120} height={55} />
        </TouchableOpacity>
      </View>
      <Spacer height={50} />
      <View style={homeStyle.homeTxtView}>
        <Text style={homeStyle.homeTxt}>
          J'organise mon itinéraire pour partir <Text>dans les alpes</Text>
        </Text>
      </View>
      <Spacer height={40} />
      <View style={homeStyle.searchContainer}>
        <AdressInput />
        <Spacer height={5} />
        <AdressInput title="Date(s)" description="Ajoutez vos dates" />
        <Spacer height={10} />
        <MyBtn
          nav={navigation}
          title={"Chercher"}
          color="#598cb7"
          icon="search"
        />
      </View>
    </SafeAreaView>
  );
};

const homeStyle = StyleSheet.create({
  home: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(173,216,230, 0.5)",
    marginTop: StatusBar.currentHeight,
  },

  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "transparent",
    marginTop: 10,
  },
  navMenu: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "lavenderblush",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  homeTxt: {
    fontSize: 28,
    textAlign: "center",
    color: "#598cb7",
  },
  homeTxtView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 10,
    rowGap: 5,
  },
});
