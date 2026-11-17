import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const defaultArtistImage = require("../../assets/images/img1.png");

export default function Detail() {
  const { id, name, image } = useLocalSearchParams();

  const artistId = Array.isArray(id) ? id[0] : id;
  const artistName = (Array.isArray(name) ? name[0] : name) || "Artista desconocido";
  const artistImage = Array.isArray(image) ? image[0] : image;

  const imageSource =
    artistImage && artistImage.trim().length > 0
      ? { uri: artistImage }
      : defaultArtistImage;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={imageSource}
          style={styles.image}
          testID="detail-artist-image"
          accessibilityLabel={`Imagen de ${artistName}`}
        />
        <Text style={styles.name} testID="detail-artist-name">
          {artistName}
        </Text>
        {artistId ? (
          <Text style={styles.subtitle} testID="detail-artist-id">
            ID: {artistId}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 20,
    backgroundColor: "#e5e5ea",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
});
