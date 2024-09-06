import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";
import { primary } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import { router } from "expo-router";

const SettingsScreen = () => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <FrameWithHeader showBack title="Settings">
      <View style={tw`gap-4`}>
        {/*  CHANGE PASSWORD */}
        <TouchableOpacity
          onPress={() => router.push("/change-password")}
          style={tw`border border-[${primary}] p-4 rounded-xl flex-row items-center `}
        >
          <Text style={tw`flex-1 text-base `}>Change Password</Text>
          <FontAwesome
            name="angle-right"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        {/*  PRIVACY POLICY */}
        <TouchableOpacity
          onPress={() => router.push("/privacy-policy")}
          style={tw`border border-[${primary}] p-4 rounded-xl flex-row items-center `}
        >
          <Text style={tw`flex-1 text-base `}>Privacy Policy</Text>
          <FontAwesome
            name="angle-right"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        {/*  CONTACT US */}
        <TouchableOpacity
          onPress={() => router.push("/contact-us")}
          style={tw`border border-[${primary}] p-4 rounded-xl flex-row items-center `}
        >
          <Text style={tw`flex-1 text-base `}>Contact Us</Text>
          <FontAwesome
            name="angle-right"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        {/* DELETE ACCOUNT */}
        <TouchableOpacity
          onPress={() => router.push("/delete-account")}
          style={tw`border border-[${primary}] p-4 rounded-xl flex-row items-center `}
        >
          <Text style={tw`flex-1 text-base `}>Delete Account</Text>
          <FontAwesome
            name="angle-right"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </FrameWithHeader>
  );
};

export default SettingsScreen;
