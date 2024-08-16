import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { router } from "expo-router";

const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    // TODO: Handle the continue button press
    console.log({ firstName, lastName, phoneNumber, email, password });
    router.push("/(auth)/verify-otp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let's get started</Text>
      <Text style={styles.subheader}>Please input your details</Text>
      <View style={[styles.inputRow, { width: "100%" }]}>
        <TextInput
          style={[
            [
              styles.input,
              colorScheme === "dark" && {
                backgroundColor: "#000000",
                color: "#fff",
              },
            ],
            { width: "50%" },
          ]}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[
            [
              styles.input,
              colorScheme === "dark" && {
                backgroundColor: "#000000",
                color: "#fff",
              },
            ],
            styles.lastNameInput,
            { width: "50%" },
          ]}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
            color: "#fff",
          },
        ]}
        placeholder="Your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
            color: "#fff",
          },
        ]}
        placeholder="Your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[
          styles.input,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
            color: "#fff",
          },
        ]}
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By signing up, you agree to snap
        <Text style={styles.link}> Terms of Service </Text>
        and
        <Text style={styles.link}> Privacy Policy</Text>.
      </Text>
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.signInText}>
          Already had an account?{" "}
          <Text style={{ color: "#006970" }}>Sign in</Text>{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    // backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    // textAlign: "center",
  },
  subheader: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 20,
    // textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#CCCCCC",
    backgroundColor: "#F0F5F5",

    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    // width: "100%",
  },
  lastNameInput: {
    // margin: 10,
  },
  continueButton: {
    backgroundColor: "#006970",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 14,
    // color: "#777777",
    // textAlign: "center",
    marginBottom: 20,
  },
  link: {
    // color: "#2C3E50",
    textDecorationLine: "underline",
  },
  signInText: {
    // color: "#2C3E50",
    fontSize: 16,
    marginVertical: 6,
    textAlign: "center",
  },
});

export default RegisterScreen;
