import { TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function isSearch(title) {
  return title === "Chercher";
}

export default MyBtn = ({ nav, title, color, icon, func }) => {
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
        const result = await func();
        console.log(result);
        nav.push("HomePage", {
          data: result,
        });
      }}
    >
      {btnIcon ? <Ionicons name="search" size={17} color="white" /> : null}
      <Text style={{ fontSize: 20, color: "white" }}>{myTitle}</Text>
    </TouchableOpacity>
  );
};
