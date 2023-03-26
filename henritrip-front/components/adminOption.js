import { TouchableOpacity, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

//const options = ["activite", "trip"];
const OptionIcon = ({ option }) => {
  switch (option) {
    case "activite":
      return <MaterialIcons name="sports-cricket" size={18} color="orange" />;
    case "trip":
      return (
        <MaterialCommunityIcons
          name="car-lifted-pickup"
          size={18}
          color="blue"
        />
      );
    default:
      return <MaterialIcons name="sports-cricket" size={18} color="orange" />;
  }
};

export default AdminOption = ({ option, title }) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        columnGap: 10,
        backgroundColor: "lightgrey",
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginVertical: 2.5,
      }}
      onPress={() => {
        console.log(title);
      }}
    >
      <Text style={{ fontSize: 16 }}>{title}</Text>
      {/* Mettre la bonne icône pour chaque option par son nom et pack */}
      <OptionIcon option={option} />
    </TouchableOpacity>
  );
};
