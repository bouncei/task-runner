import { View, Text } from "@/components/Themed";
import React from "react";
import tw from "twrnc";

const ProfileScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-2xl`}>Profile section</Text>
    </View>
  );
};

export default ProfileScreen;
