import { View } from "react-native";

export default Spacer = ({ height, bg }) => {
  const bgC = bg ? bg : "transparent";
  return (
    <View
      style={{
        backgroundColor: bgC,
        height: height,
        width: "100%",
      }}
    ></View>
  );
};
