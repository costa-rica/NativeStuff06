# Native Stuff 06

- downloading files
- playing videos
- gesture areas

## Environment Variables

- store in: .env.local

```env
EXPO_PUBLIC_API_URL=http://192.168.1.193:3000
```

## Installations

### 1. Navigation

`yarn add @react-navigation/native @react-navigation/native-stack`
`npx expo install react-native-screens react-native-safe-area-context`

### 2. Play Video

`expo install expo-file-system`
`yarn add react-native-video`

- specifically for VideoPlayerScreen.js the `expo-video`
  `npx expo install expo-video`

### 3. Gesture handling

`npx expo install react-native-gesture-handler`

## Download the video (or file) implementation

- see VideoListScreen.js

```js
// Step  1: create download object
const downloadResumable = FileSystem.createDownloadResumable(
  videoUrl,
  fileUri,
  {},
  (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log(`Download progress: ${progress * 100}%`);
  }
);
// Step 2: download
const result = await downloadResumable.downloadAsync();
```

## Playing video implementation

1. installation: `npx expo install expo-video`
2. implemenataion:

- if using `FileSystem.documentDirectory` do not include the "file://".
- see the VideoPlayerScreen.js

```js
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
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
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
  );
}
```

## Gesture

```js
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function VideoPlayerScreen({ navigation, route }) {
  // ... code

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={combinedGesture}>
        <View style={styles.containerBottom}></View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
```

## display an image from the FileSystem.documentDirectory

- See VideoPlayerScreenBackup.js

```js
export default function VideoPlayerScreen({ navigation, route }) {
  return (
    <Image
      source={{ uri: route.params.uri }}
      style={styles.imgGearGray}
      alt="logo"
      resizeMode="contain"
    />
  );
}
```
