import React from "react";
import tw from "twrnc";

import { Text, View } from "../Themed";
import { primary } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";

interface RiderHistoryCardProps {
  status: "completed" | "cancelled" | string;
  title: string;
  description: string;
}

const RiderHistoryCard: React.FC<RiderHistoryCardProps> = ({
  status,
  title,
  description,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={tw`rounded-xl border border-[${primary}] p-4 flex-row items-center justify-between`}
    >
      <View>
        <Text style={tw`text-lg font-medium text-[#414141]`}>{title}</Text>
        <Text style={tw` text-[#B8B8B8]`}>{description}</Text>
      </View>

      <Text
        style={[
          tw`capitalize`,
          status === "completed" ? tw`text-green-500` : tw`text-red-500`,
        ]}
      >
        {status === "completed" ? "Done" : "Cancelled"}
      </Text>
    </TouchableOpacity>
  );
};

export default RiderHistoryCard;
