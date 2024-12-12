import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home of Native Stuff 06</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("VideoListScreen")}
      >
        <Text>Video List Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("GestureScreen")}
      >
        <Text>Gesture Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,20,20,0.2)",
  },
  btn: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 2,
  },
});
