import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { View, Text } from "@/components/Themed";

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
  };

  const handleResendCode = () => {
    // Handle resending the verification code
    console.log("Resend code");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter the 4-digit code</Text>
      <Text style={styles.subheader}>
        Please input the verification code sent to your phone number
        23480******90
      </Text>
      <TouchableOpacity>
        <Text style={styles.changeNumber}>Change number?</Text>
      </TouchableOpacity>
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
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By signing up, you agree to snap
        <Text style={styles.link}> Terms of Service </Text>
        and
        <Text style={styles.link}> Privacy Policy</Text>.
      </Text>
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
    marginVertical: 20,
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
