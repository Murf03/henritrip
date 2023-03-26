import { TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function getBtn(name) {
  if (name === "google") {
    return { logo: "logo-google", color: "#4285F4" };
  } else {
    return { logo: "logo-github", color: "#171515" };
  }
}

export default ExternSign = ({ name, nav }) => {
  const { logo, color } = getBtn(name);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        width: 40,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
      }}
      onPress={() => {
        console.log(`pressed ${name}`);
        nav.push("HomePage", {
          userID: "NO_ID",
        });
        //TODO: Edit Login Validation (ExternSign)
      }}
    >
      <Ionicons
        style={{
          width: 20,
          height: 20,
          textAlign: "center",
          textAlignVertical: "center",
        }}
        name={logo}
        size={18}
        color={color}
      />
    </TouchableOpacity>
  );
};
