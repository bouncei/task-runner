import React from "react";
import { Image } from "react-native";
import tw from "twrnc";
import { Text, View } from "../Themed";
import { primary } from "@/constants/Colors";

interface PreviousTripCardProps {
  // TODO
}

const PreviousTripCard: React.FC<PreviousTripCardProps> = (
  {
    // TODO
  }
) => {
  return (
    <View style={tw` shadow-md py-4 rounded-[20px]`}>
      {/* HEADER */}
      <View style={tw`bg-transparent pb-4`}>
        <Text style={tw`text-lg font-medium mb-4 px-4  tracking-wide`}>
          Previous Trip
        </Text>
        <Image
          source={{ uri: "https://via.placeholder.com/200x100" }}
          style={tw`w-full h-24 `}
        />
      </View>

      <View
        style={tw`flex-row items-center px-4 pt-4 border-t border-[#EBF0FA] `}
      >
        <View style={tw`flex-1 flex-row gap-3 items-center`}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={tw`size-10 rounded-full`}
          />
          <Text style={tw`text-base font-medium`}>John Doe</Text>
        </View>

        <Text style={tw`text-sm text-gray-500 text-[${primary}]`}>
          Total: $500
        </Text>
      </View>
    </View>
  );
};

export default PreviousTripCard;
