import React from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
import { Text } from "native-base";

var { width } = Dimensions.get("window");

const Banner = () => {

  return (
    <View style={styles.swiper}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageBanner}
          source={{ uri: "https://www.cnu.org/sites/default/files/storefront-proportions.jpg" }}
        />
      </View>
      <Text style={styles.bannerText}>Support Small Businesses Around You.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    width: width,
    height: 200
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  imageBanner: {
    height: "100%",
    width: width,
    opacity: 0.6
  },
  bannerText: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    bottom: 10,
    marginLeft: 20,
    margin: 10,
    marginRight: 50
  }
});

export default Banner;