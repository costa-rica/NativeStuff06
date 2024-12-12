import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function VideoPlayerScreen({ navigation, route }) {
  console.log(`route.params.videoName: ${route.params.videoName}`);
  console.log(`route.params.uri: ${route.params.uri}`);

  // Remove "file://" prefix from the uri string
  const videoSource = (() => {
    if (route.params.uri.startsWith("file://")) {
      return route.params.uri.replace("file://", "");
    }
    return route.params.uri;
  })();

  const player = useVideoPlayer(videoSource, (player) => {
    console.log("--- in player ");
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  // implement gestures
  // Pan gesture for swipe detection
  const swipeGesture = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        Alert.alert("Swipe", `Swiped Right at ${player.currentTime}`);
      } else {
        Alert.alert("Swipe", `Swiped Left at ${player.currentTime}`);
      }
    } else {
      if (translationY > 0) {
        Alert.alert("Swipe", `Swiped Down at ${player.currentTime}`);
      } else {
        Alert.alert("Swipe", `Swiped Up at ${player.currentTime}`);
      }
    }
  });

  // Tap gesture for tap detection
  const tapGesture = Gesture.Tap().onEnd(() => {
    Alert.alert("Tap", `Tapped area at ${player.currentTime}`);
  });

  // Combine swipe and tap gestures
  const combinedGesture = Gesture.Race(swipeGesture, tapGesture);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text>Video Player Screen</Text>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Text>Go Back </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => console.log("pressed buttone")}
        >
          <Text>buton</Text>
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={combinedGesture}>
          <View style={styles.containerBottom}>
            <View style={styles.vwVideoTitle}>
              <Text style={styles.txtTitle}>{route.params.videoName}</Text>
              <Text style={styles.txtTitle}>{route.params.uri}</Text>
            </View>
            {route.params.videoName === "LePetitSkellington.png" ? (
              <View style={styles.vwVideo}>
                <Image
                  source={{ uri: route.params.uri }}
                  style={styles.imgGearGray}
                  alt="logo"
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.vwVideo}>
                <Text>video</Text>
                <View style={styles.contentContainer}>
                  <VideoView
                    style={styles.video}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                  />
                  <View style={styles.controlsContainer}>
                    <Button
                      title={isPlaying ? "Pause" : "Play"}
                      onPress={() => {
                        console.log("--- pressed play");
                        if (isPlaying) {
                          player.pause();
                        } else {
                          player.play();
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerTop: {
    // height: "15%",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },

  btnBack: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 2,
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
  // ----- BOTTOM -----
  containerBottom: {
    flex: 1,
    backgroundColor: "rgba(100,0,0,0.3)",
    borderStyle: "dashed",
    borderTopColor: "black",
    borderTopWidth: 5,
  },
  vwVideoTitle: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  txtTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  vwVideo: {
    flex: 1,
    backgroundColor: "green",
  },
  imgGearGray: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
