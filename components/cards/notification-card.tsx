import React from "react";
import tw from "twrnc";

import { Text, View } from "../Themed";
import { Image, TouchableOpacity } from "react-native";

interface NotificationCardProps {
  title: string;
  description: string;
  date: string;
  type?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  description,
  date,
  type,
}) => {
  return (
    <TouchableOpacity
      style={tw`rounded-xl border p-4 border-gray-300 flex-row items-start gap-4`}
    >
      <Image
        source={require("@/assets/images/icons/call.png")}
        style={tw`size-10 rounded-lg`}
      />

      <View style={tw`gap-1 flex-col flex-1`}>
        <Text style={tw`text-lg font-medium tracking-wide`}>{title}</Text>
        <Text style={tw`text-gray-500 flex-wrap`}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
