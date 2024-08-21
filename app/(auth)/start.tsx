import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";
import { router } from "expo-router";

export default function StartScreen() {
  const handleRoute = (role: string) => {
    router.push({
      pathname: "/(auth)/onboarding",
      params: {
        role,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text} lightColor="#006970">
          Enter as
        </Text>

        <TouchableOpacity
          onPress={() => handleRoute("sender")}
          style={[styles.button, styles.senderButton]}
        >
          <Text lightColor="white" style={{ fontSize: 18 }}>
            Sender
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleRoute("rider")}
          style={[styles.button, styles.riderButton]}
        >
          <Text style={{ fontSize: 18 }}>Rider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  innerContainer: {
    width: "100%",
    padding: 30,
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },

  text: {
    fontSize: 18,
    marginBottom: 10,
  },

  button: {
    padding: 15,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  senderButton: {
    backgroundColor: "#006970",
  },

  riderButton: {
    borderColor: "#006970",
    borderWidth: 1,
  },
});
