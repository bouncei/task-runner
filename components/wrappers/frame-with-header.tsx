import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import tw from "twrnc";
import { View, Text } from "../Themed";

import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  showBack?: boolean;
  title?: string;
}

const FrameWithHeader: React.FC<Props> = ({ children, showBack, title }) => {
  return (
    <View style={tw`flex-1 h-full py-20 gap-5 h-full w-full px-6`}>
      {showBack && (
        <View style={tw`flex flex-row gap-4  items-center`}>
          <Button
            variant="ghost"
            style={tw` bg-white p-2 py-3 rounded-full shadow-xl`}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={25} color="black" />
          </Button>
          {title && (
            <Text style={tw`text-xl text-center font-medium`}>{title}</Text>
          )}
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={tw`flex-1 h-full gap-3 `}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FrameWithHeader;
