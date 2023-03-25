import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default LocationPin = ({ place }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-pin" size={18} color="lightcoral" />
      <Text style={styles.place}>{place}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginLeft: -5,
    marginVertical: 5,
  },
  place: {
    fontSize: 16,
    marginLeft: 4,
  },
});
