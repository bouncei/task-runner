import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <View style={tw`flex-1 h-full  gap-4 h-full w-full px-6`}>
      <SafeAreaView>
        {showBack && (
          <View style={tw`flex flex-row gap-8 pb-5 items-center`}>
            <Button
              variant="ghost"
              style={tw` bg-white p-0 size-[46px] rounded-full shadow-md`}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={25} color="black" />
            </Button>
            {title && (
              <Text style={tw`text-xl tracking-wide text-center font-semibold`}>
                {title}
              </Text>
            )}
          </View>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={tw`flex-1 h-full gap-3 pb-52 `}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default FrameWithHeader;
