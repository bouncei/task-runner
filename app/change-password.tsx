import React, { useState } from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import AddressCard from "@/components/cards/address-card";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Input } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";

const ChangePasswordScreen = () => {
  const colorScheme = useColorScheme() ?? "light";

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [passwordVisibile, setPasswordVisible] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const togglePasswordVisibility = (
    field: keyof typeof passwordVisibile,
    value: boolean
  ) => {
    setPasswordVisible((prev) => ({ ...prev, [field]: value }));
  };

  const handleOnChange = (field: keyof typeof passwords, text: string) => {
    setPasswords((prev) => ({ ...prev, [field]: text }));
    validateInput(field, text);
  };

  const validateInput = (field: keyof typeof passwords, text: string) => {
    let error = "";
    if (field === "old" || field === "new") {
      if (text.length < 8) {
        error = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(text)) {
        error = "Password must contain at least one uppercase letter";
      } else if (!/[a-z]/.test(text)) {
        error = "Password must contain at least one lowercase letter";
      } else if (!/[0-9]/.test(text)) {
        error = "Password must contain at least one number";
      }
    } else if (field === "confirm") {
      if (text !== passwords.new) {
        error = "Confirm password does not match new password";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSavePassword = () => {
    if (Object.values(errors).every((error) => error === "")) {
      // Save password logic here
    } else {
      alert("Please fix the errors and try again");
    }
  };

  return (
    <FrameWithHeader showBack title="Change Password">
      <View style={tw`gap-4`}>
        {/* OLD PASSWORD */}
        <View
          style={[
            tw`flex-row items-center h-[60px] border border-[#E0E0E0] bg-[#F0F5F5] rounded-xl pl-2 pr-[15px]`,
            colorScheme === "dark" && {
              backgroundColor: "#000000",
            },
          ]}
        >
          <Input
            placeholder="Old Password"
            style={tw`border-0 flex-1 text-base h-14 `}
            value={passwords.old}
            onChangeText={(text) => {
              handleOnChange("old", text);
              // validateInput("password", text);
            }}
            secureTextEntry={!passwordVisibile.old}
            placeholderTextColor="#A8A8A8"
          />

          <TouchableOpacity
            onPress={() =>
              togglePasswordVisibility("old", !passwordVisibile.old)
            }
          >
            <Text style={tw` text-[#006970]`}>
              <Ionicons
                name={passwordVisibile.old ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        </View>
        {errors.old && (
          <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.old}</Text>
        )}

        {/* New PASSWORD */}
        <View
          style={[
            tw`flex-row items-center h-[60px] border border-[#E0E0E0] bg-[#F0F5F5] rounded-xl pl-2 pr-[15px]`,
            colorScheme === "dark" && {
              backgroundColor: "#000000",
            },
          ]}
        >
          <Input
            placeholder="New Password"
            style={tw`border-0 flex-1 text-base h-14 `}
            value={passwords.new}
            onChangeText={(text) => {
              handleOnChange("new", text);
              // validateInput("password", text);
            }}
            secureTextEntry={!passwordVisibile.new}
            placeholderTextColor="#A8A8A8"
          />

          <TouchableOpacity
            onPress={() =>
              togglePasswordVisibility("new", !passwordVisibile.new)
            }
          >
            <Text style={tw` text-[#006970]`}>
              <Ionicons
                name={passwordVisibile.new ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        </View>
        {errors.new && (
          <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.new}</Text>
        )}

        {/* CONFIRM PASSWORD */}
        <View
          style={[
            tw`flex-row items-center h-[60px] border border-[#E0E0E0] bg-[#F0F5F5] rounded-xl pl-2 pr-[15px]`,
            colorScheme === "dark" && {
              backgroundColor: "#000000",
            },
          ]}
        >
          <Input
            placeholder="Confirm Password"
            style={tw`border-0 flex-1 text-base h-14 `}
            value={passwords.confirm}
            onChangeText={(text) => {
              handleOnChange("confirm", text);
              // validateInput("password", text);
            }}
            secureTextEntry={!passwordVisibile.confirm}
            placeholderTextColor="#A8A8A8"
          />

          <TouchableOpacity
            onPress={() =>
              togglePasswordVisibility("confirm", !passwordVisibile.confirm)
            }
          >
            <Text style={tw` text-[#006970]`}>
              <Ionicons
                name={
                  passwordVisibile.confirm ? "eye-off-outline" : "eye-outline"
                }
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        </View>
        {errors.confirm && (
          <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.confirm}</Text>
        )}
      </View>

      {/* Save */}
      <Button size="lg" style={tw`mt-4`} onPress={handleSavePassword}>
        <Text style={tw`text-white text-base`}>Save</Text>
      </Button>
    </FrameWithHeader>
  );
};

export default ChangePasswordScreen;
