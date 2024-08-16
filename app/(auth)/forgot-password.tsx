import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { router } from "expo-router";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Forgot Password?</Text>

      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
            color: "#fff",
          },
        ]}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#A8A8A8"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/verify-email")}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    // backgroundColor: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    // color: "#333333",
  },

  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 15,
    backgroundColor: "#F0F5F5",
    // color: "#333333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,

    // justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F0F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
  },

  button: {
    backgroundColor: "#006970",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default ForgotPasswordScreen;