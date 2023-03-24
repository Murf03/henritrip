import { TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function isSearch(title) {
  return title === "Chercher";
}

export default MyBtn = ({ nav, title, color, icon }) => {
  const btnCol = color ? color : "orange";
  const width = isSearch(title) ? "45%" : "65%";
  const height = isSearch(title) ? 60 : 50;
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
        borderRadius: 25,
        columnGap: 5,
      }}
      onPress={() => {
        console.log("pressed Login");
        nav.push("HomePage");
        //TODO: Edit Login Validation (Btn)
      }}
    >
      {btnIcon ? <Ionicons name="search" size={17} color="white" /> : null}
      <Text style={{ fontSize: 20, color: "white" }}>{myTitle}</Text>
    </TouchableOpacity>
  );
};
