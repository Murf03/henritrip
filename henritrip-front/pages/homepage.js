import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Spacer from "../components/spacer";
import LogoSVG from "../assets/Logo_henri-side.svg";
import Feather from "@expo/vector-icons/Feather";
import AdressInput from "../components/adressInput";
import MyBtn from "../components/myBtn";
import MyTooltip from "../components/tooltip";

import Ionicons from "@expo/vector-icons/Ionicons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import Trip from "../components/trip";
const Drawer = createDrawerNavigator();

export default HomePage = ({ nav, route }) => {
  const [isVisible, setVisible] = useState(false);
  const myMarginTop = isVisible ? 0 : StatusBar.currentHeight;
  const data = route.params;
  console.log("data : " + data);
  const Profile = ({ navigation, userId }) => {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  };
  const Home = ({ navigation }) => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ ...homeStyle.home, height: "100%", flexGrow: 1 }}
      >
        <StatusBar animated={!isVisible} hidden={isVisible} />
        <View style={homeStyle.nav}>
          <TouchableOpacity
            style={homeStyle.navMenu}
            onPress={() => {
              console.log("Pressed Menu");

              navigation.toggleDrawer();
            }}
          >
            <Feather name="menu" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("Go to Sign in");
              navigation.navigate("SignIn");
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
          <View style={homeStyle.tooltipAndButton}>
            <TouchableOpacity
              style={homeStyle.tooltip}
              onPress={() => {
                console.log("PRessed");
                setVisible(!isVisible);
              }}
            >
              <Ionicons name="information" size={18} color="orange" />
            </TouchableOpacity>
            <MyBtn
              nav={navigation}
              title={"Chercher"}
              color="#598cb7"
              icon="search"
            />
          </View>
        </View>
        <Spacer height={25} />
        <View style={homeStyle.tooltipContainer}></View>
        <MyTooltip
          isVisible={isVisible}
          setVisible={setVisible}
          title="Informations"
          desc="Faites vos recherches de RoadTrips parmi les nombreuses que nous proposons !"
        />
        <View style={homeStyle.tripsRecContainer}>
          <Text style={homeStyle.tripsRec}>Trips recommandés</Text>
          <TouchableOpacity
            style={homeStyle.seeAllTripsContainer}
            onPress={() => {
              console.log("Pressed");
            }}
          >
            <Text style={homeStyle.seeAllTrips}>Voir +</Text>
          </TouchableOpacity>
        </View>
        <Spacer height={20} />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 15,
            rowGap: 20,
          }}
        >
          <Trip
            createdBy="Pascal Vidal"
            title="Paris, Ville lumière"
            city={1}
            imageNum={0}
          />
          <Trip createdBy="Henri Trip." city={0} imageNum={8} />
          <Trip
            title="Visite de lieux insolites - Barcelone"
            createdBy="Emilie Lautrec"
            city={4}
            imageNum={3}
          />
          <Trip
            createdBy="Murf M."
            title="Oh Toulouuuuse !!!"
            city={0}
            imageNum={3}
          />
          <Trip
            title="Balade en plein coeur de la ville"
            createdBy="Benoit Paire"
            random={true}
          />
          <Trip
            createdBy="Marcelo B."
            title="Venez découvrir Porto"
            city={3}
            imageNum={3}
          />
          <Trip createdBy="Laurie P." city={2} imageNum={2} />
        </View>
        <Spacer height={50} />
      </ScrollView>
    );
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

const homeStyle = StyleSheet.create({
  home: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(173,216,230, 0.5)",
  },

  statusBarMargin: {
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
  tooltip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgrey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tooltipAndButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
  },
  tripsRecContainer: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tripsRec: {
    fontSize: 22,
  },
  seeAllTrips: {
    fontSize: 18,
    color: "orange",
  },
  seeAllTripsContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
