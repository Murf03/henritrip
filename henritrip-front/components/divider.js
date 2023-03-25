import { View } from "react-native";

export default Divider = () => {
  return (
    <View>
      <View
        style={{
          height: 1,
          borderColor: "lightgrey",
          borderBottomWidth: 2.5,
          borderRadius: 1,
        }}
      />
    </View>
  );
};
