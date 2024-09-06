import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import tw from "twrnc";

import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/auth-store";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const { register, loading } = useAuthStore();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateInput = (field: keyof typeof errors, value: string) => {
    switch (field) {
      case "firstName":
        if (value.length < 2) {
          setErrors((prev) => ({
            ...prev,
            firstName: "First name is too short",
          }));
        } else {
          setErrors((prev) => ({ ...prev, firstName: "" }));
        }
        break;
      case "lastName":
        if (value.length < 2) {
          setErrors((prev) => ({
            ...prev,
            lastName: "Last name is too short",
          }));
        } else {
          setErrors((prev) => ({ ...prev, lastName: "" }));
        }
        break;
      case "phoneNumber":
        if (!/^(0)?[789][01][0-9]{8}$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            phoneNumber: "Invalid phone number",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phoneNumber: "" }));
        }
        break;
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          setErrors((prev) => ({ ...prev, email: "Invalid email" }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "password":
        if (value.length < 8) {
          setErrors((prev) => ({ ...prev, password: "Password is too short" }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;
      default:
        break;
    }
  };

  const togglePasswordVisibility = (
    field: keyof typeof isPasswordVisible,
    value: boolean
  ) => {
    setIsPasswordVisible((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    // Validate all input fields
    validateInput("firstName", firstName);
    validateInput("lastName", lastName);
    validateInput("phoneNumber", phoneNumber);
    validateInput("email", email);
    validateInput("password", password);
    validateInput("confirmPassword", confirmPassword);

    if (
      errors.firstName === "" &&
      errors.lastName === "" &&
      errors.phoneNumber === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.confirmPassword === ""
    ) {
      // TODO: Handle the continue button press
      console.log({ firstName, lastName, phoneNumber, email, password });
      const registerUser: any = await register(
        firstName,
        email,
        phoneNumber,
        password,
        "supervisors"
      );

      registerUser
        ? router.push({ pathname: "/(auth)/verify-otp", params: { email } })
        : Toast.show({
            type: "error",
            text1: "Failed to register user",
          });

      // ;
    } else {
      console.log("Please fix the errors");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let's get started</Text>
      <Text style={styles.subheader}>Please input your details</Text>
      <View style={[styles.inputRow]}>
        {/* FIRST NAME */}
        <View style={tw`flex-1`}>
          <TextInput
            style={[
              [
                styles.input,
                colorScheme === "dark" && {
                  backgroundColor: "#000000",
                  color: "#fff",
                },
              ],
              // { width: "50%" },
            ]}
            placeholder="First name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              validateInput("firstName", text);
            }}
          />
          {errors.firstName && (
            <Text style={tw`text-sm text-red-500 -mt-2 mb-2`}>
              {errors.firstName}
            </Text>
          )}
        </View>

        <View style={tw`flex-1`}>
          {/* LAST NAME */}
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
              // { width: "50%" },
            ]}
            placeholder="Last name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              validateInput("lastName", text);
            }}
          />
          {errors.lastName && (
            <Text style={tw`text-sm text-red-500 -mt-2 mb-2`}>
              {errors.lastName}
            </Text>
          )}
        </View>
      </View>

      {/* PHONE NUMBER */}
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
        onChangeText={(text) => {
          setPhoneNumber(text);
          validateInput("phoneNumber", text);
        }}
        keyboardType="phone-pad"
      />
      {errors.phoneNumber && (
        <Text style={tw`text-sm text-red-500 -mt-2 mb-2`}>
          {errors.phoneNumber}
        </Text>
      )}

      {/* EMAIL */}
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
        onChangeText={(text) => {
          setEmail(text);
          validateInput("email", text);
        }}
        keyboardType="email-address"
      />
      {errors.email && (
        <Text style={tw`text-sm text-red-500 -mt-2 mb-2`}>{errors.email}</Text>
      )}

      {/* PASSWORD */}
      <View
        style={[
          tw`flex-row items-center `,
          styles.input,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
          },
        ]}
      >
        <TextInput
          style={[
            tw`flex-1`,
            colorScheme === "dark" && {
              color: "#fff",
            },
          ]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validateInput("password", text);
          }}
          secureTextEntry={!isPasswordVisible.password}
          placeholderTextColor="#A8A8A8"
        />
        <TouchableOpacity
          onPress={() =>
            togglePasswordVisibility("password", !isPasswordVisible.password)
          }
        >
          <Text style={tw`text-[#006970] ml-10`}>
            {isPasswordVisible.password ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={tw`text-sm text-red-500 -mt-2 mb-2`}>
          {errors.password}
        </Text>
      )}

      {/* CONFIRM PASSWORD */}
      <View
        style={[
          tw`flex-row items-center `,
          styles.input,
          colorScheme === "dark" && {
            backgroundColor: "#000000",
          },
        ]}
      >
        <TextInput
          style={[
            tw`flex-1`,
            colorScheme === "dark" && {
              color: "#fff",
            },
          ]}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            validateInput("confirmPassword", text);
          }}
          secureTextEntry={!isPasswordVisible.confirmPassword}
          placeholderTextColor="#A8A8A8"
        />
        <TouchableOpacity
          onPress={() =>
            togglePasswordVisibility(
              "confirmPassword",
              !isPasswordVisible.confirmPassword
            )
          }
        >
          <Text style={tw`text-[#006970] ml-10`}>
            {isPasswordVisible.confirmPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={tw`text-sm text-red-500 -mt-2 mb-2`}>
          {errors.confirmPassword}
        </Text>
      )}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
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
