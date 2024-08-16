import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";
import { router } from "expo-router";

export default function OnBoardingScreen() {
  const goToLogin = () => {
    router.push("/(auth)/login");
  };
  return (
    <ImageBackground
      source={require("@/assets/images/start.png")} // Replace with your image URL or require statement for a local image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Taskrunner</Text>
        <Text style={styles.subtitle}>
          Items will be Delivered in few clicks
        </Text>
        <Text style={styles.description}>
          On-demand delivery whenever and wherever the need arises.
        </Text>
        <TouchableOpacity style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.signInText}>
          Have an account already?{" "}
          <Text style={styles.signInLink} onPress={goToLogin}>
            SIGN IN
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    height: "50%",
    fontSize: 50,
    // fontWeight: "bold",
    color: "white",
    // marginVertical: "auto",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#006970",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    width: "100%",
    textAlign: "right",
  },
  signInLink: {
    // color: "#007BFF",
    color: "white",
    textDecorationLine: "underline",
    // fontWeight: "bold",
  },
});
