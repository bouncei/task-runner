import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { View, Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";

const SetNewPasswordScreen = () => {
  const colorScheme = useColorScheme();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState({
    newPassword: true,
    confirmPassword: true,
  });

  const togglePasswordVisibility = (name: string, value: boolean) => {
    setSecureTextEntry({ ...secureTextEntry, [name]: value });
  };

  const handleSave = () => {
    // Handle the save button press
    console.log("New password:", newPassword);
    console.log("Confirm password:", confirmPassword);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        colorScheme === "dark" && {
          backgroundColor: "#000000",
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={24}
            style={[
              colorScheme === "dark" && {
                backgroundColor: "#000000",
                color: "#fff",
              },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Set New Password</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={styles.subheader}>Set your new password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              colorScheme === "dark" && {
                backgroundColor: "#000000",
                color: "#fff",
              },
            ]}
            placeholder="Enter Your New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={secureTextEntry.newPassword}
          />
          <TouchableOpacity
            onPress={() =>
              togglePasswordVisibility(
                "newPassword",
                !secureTextEntry.newPassword
              )
            }
            style={styles.eyeIcon}
          >
            <Ionicons
              name={secureTextEntry.newPassword ? "eye" : "eye-off"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              colorScheme === "dark" && {
                backgroundColor: "#000000",
                color: "#fff",
              },
            ]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureTextEntry.confirmPassword}
          />
          <TouchableOpacity
            onPress={() =>
              togglePasswordVisibility(
                "confirmPassword",
                !secureTextEntry.confirmPassword
              )
            }
            style={styles.eyeIcon}
          >
            <Ionicons
              name={secureTextEntry.confirmPassword ? "eye" : "eye-off"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordGuideline}>
          At least 1 number or a special character
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  //   header: {
  //     fontSize: 24,
  //     fontWeight: "bold",
  //     marginBottom: 8,
  //     // textAlign: "center",
  //   },
  subheader: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 20,
    // textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderColor: "#CCCCCC",
    backgroundColor: "#F0F5F5",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  passwordGuideline: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#006970",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SetNewPasswordScreen;
