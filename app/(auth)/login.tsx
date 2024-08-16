import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { router } from "expo-router";

const LoginScreeen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleLogin = () => {
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subtitle}>Please input your details</Text>

      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
            color: "#fff",
          },
        ]}
        placeholder="youremailaddress@address.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#A8A8A8"
      />

      <View
        style={[
          styles.passwordContainer,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
          },
        ]}
      >
        <TextInput
          style={[
            styles.passwordInput,
            colorScheme === "dark" && {
              color: "#fff",
            },
          ]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="#A8A8A8"
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.showText}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/forgot-password")}
        style={styles.forgotPasswordButton}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Need an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
  subtitle: {
    fontSize: 16,
    color: "#A8A8A8",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
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
  passwordInput: {
    flex: 1,
  },
  showText: {
    color: "#006970",
    marginLeft: 10,
  },
  forgotPasswordButton: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: "#006970",
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
  signUpText: {
    color: "#A8A8A8",
  },
  signUpLink: {
    color: "#006970",
    marginLeft: 5,
  },
});

export default LoginScreeen;