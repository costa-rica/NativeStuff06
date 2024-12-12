import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

export default function VideoListScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [downloadStatuses, setDownloadStatuses] = useState({});
  const api_url = process.env.EXPO_PUBLIC_API_URL;
  useEffect(() => {
    // console.log(api_url);
    fetch(`${api_url}/videos`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.videos);
        console.log(`received response: ${data.videos}`);
        checkDownloadedStatus(data.videos); // Check download status for all videos
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const pressBtnVideo = (videoName) => {
    console.log("pressed pressBtnVideo");
    console.log(videoName);
    !downloadStatuses[videoName] && downloadVideo(videoName);
    console.log("got to next screen ....");
    navigation.navigate("VideoPlayerScreen", {
      videoName,
      uri: `${FileSystem.documentDirectory}${videoName}`,
    });
  };

  const downloadVideo = async (elem) => {
    console.log("--- in downloadVideo");
    const videoUrl = `${api_url}/videos/${elem}`;
    console.log(`calling: ${videoUrl}`);
    const fileUri = `${FileSystem.documentDirectory}${elem}`;
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

    try {
      console.log("Trying to download");
      const result = await downloadResumable.downloadAsync();
      console.log("Download complete:", result.uri);
      // You can now use result.uri to view the video
    } catch (error) {
      console.log("Failed to download");
      console.error("Download failed:", error);
    }
  };

  const checkDownloadedStatus = async (videoList) => {
    const statuses = {};
    for (const videoName of videoList) {
      const fileUri = `${FileSystem.documentDirectory}${videoName}`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      statuses[videoName] = fileInfo.exists; // Save download status (true/false)
    }
    setDownloadStatuses(statuses);
  };

  const rows = videos.map((elem, index) => {
    return (
      <View key={index} style={styles.vwRow}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => pressBtnVideo(elem)}
        >
          <Text>{elem}</Text>
          <Text>
            {downloadStatuses[elem] ? "Downloaded" : "Not downloaded"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text>Video List Screen</Text>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}
      >
        <Text>Go Back </Text>
      </TouchableOpacity>
      <Text>The API url: {process.env.EXPO_PUBLIC_API_URL}</Text>

      {rows}
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
  btnBack: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 2,
  },
  vwRow: {
    width: "100%",
    justifyContent: "center",
    padding: 5,
    alignItems: "center",
    height: 120,
  },
  btn: {
    // marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    width: "80%",
  },
});
