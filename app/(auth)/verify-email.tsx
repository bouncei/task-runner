import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { View, Text } from "@/components/Themed";
import { router } from "expo-router";

const VerificationScreen = () => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleVerify = () => {
    // Handle the verify button press
    console.log("Verification code:", code.join(""));
    router.push("/(auth)/set-new-password");
  };

  const handleResendCode = () => {
    // Handle resending the verification code
    console.log("Resend code");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Email Address</Text>
      <Text style={styles.subheader}>
        We've sent an email to{" "}
        <Text style={{ color: "#006970" }}>mercyunique3@gmail.com</Text> with a
        link and a code. You can enter the code below or click the link in the
        email to verify your email address.
      </Text>

      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(index, value)}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendCode}>
          Didn't get any code yet?{" "}
          <Text style={{ textDecorationLine: "underline", color: "#006970" }}>
            Resend code
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 20,
  },
  changeNumber: {
    color: "#006970",
    marginBottom: 20,
    fontWeight: "700",
  },
  codeInputContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
  },
  resendCode: {
    color: "#2C3E50",

    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: "#006970",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 14,
    color: "#777777",
  },
  link: {
    color: "#2C3E50",
    textDecorationLine: "underline",
  },
});

export default VerificationScreen;
