import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function GestureScreen({ navigation }) {
  // Pan gesture for swipe detection
  const swipeGesture = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        Alert.alert("Swipe", "Swiped Right");
      } else {
        Alert.alert("Swipe", "Swiped Left");
      }
    } else {
      if (translationY > 0) {
        Alert.alert("Swipe", "Swiped Down");
      } else {
        Alert.alert("Swipe", "Swiped Up");
      }
    }
  });

  // Tap gesture for tap detection
  const tapGesture = Gesture.Tap().onEnd(() => {
    Alert.alert("Tap", "Tapped the area");
  });

  // Combine swipe and tap gestures
  const combinedGesture = Gesture.Race(swipeGesture, tapGesture);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={combinedGesture}>
          <View style={styles.swipeTapArea}>
            <Text style={styles.text}>Swipe or Tap in this area</Text>
          </View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  swipeTapArea: {
    width: "80%",
    height: "50%",
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
