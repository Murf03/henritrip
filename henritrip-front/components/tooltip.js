import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import { useState } from "react";

export default MyTooltip = ({ isVisible, setVisible, title, desc }) => {
  return (
    <Modal
      style={styles.centerView}
      isVisible={isVisible}
      hideModalContentWhileAnimating={true}
      backdropColor="transparent"
      swipeDirection={["left", "right", "up", "down"]}
      animationInTiming={1200}
      animationIn="bounceInUp"
      animationOutTiming={350}
      animationOut="fadeOut"
      onBackButtonPress={() => setVisible(!isVisible)}
      onBackdropPress={() => setVisible(!isVisible)}
      onSwipeComplete={() => setVisible(!isVisible)}
      transparent={true}
    >
      <View style={[styles.container, isVisible ? styles.shadow : null]}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            console.log("Pressed");
            setVisible(!isVisible);
          }}
        >
          <Ionicons name="close" size={18} color="#598cb7" />
        </TouchableOpacity>
        <View style={styles.descContainer}>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    </Modal>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const modalHeight = windowHeight * 0.3;

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15,
    backgroundColor: "transparent",
    padding: 20,
    paddingTop: 15,
  },
  title: {
    fontSize: 25,
    color: "#598cb7",
    marginBottom: 15,
  },
  desc: {
    fontSize: 17,
    color: "black",
  },
  descContainer: {
    display: "flex",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgrey",
    position: "absolute",
    top: 12,
    right: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#336690",
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "snow",
    shadowOffset: {
      width: 7.5,
      height: 7.5,
    },
    shadowOpacity: 2,
    shadowRadius: 22,
    elevation: 8,
  },
});
