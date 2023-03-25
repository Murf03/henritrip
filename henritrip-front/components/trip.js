import { StyleSheet, View, TextInput, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Divider from "./divider";
import LocationPin from "./locationPin";
import Spacer from "./spacer";
import { getRandImage, getRandImageOfCity, getImage } from "./staticImages";

const defaultImage = require("../assets/images/toulouse1.jpg");

// toulouse: 0; paris: 1; londre: 2; porto: 3; barca: 4;

export default Trip = ({ title, createdBy, city, imageNum, random }) => {
  const myTitle = title ? title : "Découverte de Toulouse";
  const myCreator = createdBy ? createdBy : "Henri Trip";
  const myCity = city ?? 0;
  const myImage = random
    ? getRandImage()
    : city != null && imageNum != null
    ? getImage(city, imageNum)
    : city != null
    ? getRandImageOfCity(city)
    : defaultImage;
  return (
    <View style={tripStyles.container}>
      <View style={tripStyles.imageContainer}>
        <Image style={tripStyles.image} alt="Toulouse" source={myImage} />
      </View>
      <View style={tripStyles.bottomView}>
        <Text numberOfLines={2} style={tripStyles.title}>
          {myTitle}
        </Text>
        <Spacer height={7.5} />
        <Text style={tripStyles.by}>
          By : <Text style={tripStyles.creator}>{myCreator}</Text>
        </Text>
        <Spacer height={12} />
        <Divider />
        <Spacer height={10} />
        <LocationPin place="Le Phare du Cap Ferret" />
        <LocationPin place="La Pointe du Cap Ferret" />
        <LocationPin place="Village des Pêcheurs" />
        <LocationPin place="Cycloland" />
        <Spacer height={10} />
        <TouchableOpacity
          style={tripStyles.detailsContainer}
          onPress={() => {
            console.log("Pressed");
          }}
        >
          <Text style={tripStyles.detailsTxt}>Voir les détails</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const borderRadius = 25;

const tripStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
  },
  bottomView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
  title: {
    fontSize: 25,
    color: "#336699",
    overflow: "hidden",
  },
  creator: {
    fontSize: 20,
    color: "rgb(84, 168, 252)",
  },
  by: {
    fontSize: 20,
    color: "rgb(84, 168, 252)",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  detailsTxt: {
    fontSize: 18,
    color: "#004f91",
    marginLeft: 10,
  },
});
