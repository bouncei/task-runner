import React from "react";
import { Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Text, View } from "../Themed";
import { Button } from "../ui/button";
import { primary } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

interface TripCardProps {
  title: string;
  user: string;
  rating: string;
  onPress: () => void;
}

const TripCard: React.FC<TripCardProps> = ({
  title,
  user,
  rating,
  onPress,
}) => {
  return (
    <View style={tw` shadow-md py-4 rounded-[20px] `}>
      {/* HEARDER */}
      <View style={tw`bg-transparent px-4 pb-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-lg font-medium`}>{title}</Text>
          <TouchableOpacity
            onPress={onPress}
            style={tw`rounded-full bg-[#F0F3FA] px-3 py-2`}
          >
            <Text
              style={tw`text-blue-500 text-center text-xs text-[${primary}]`}
            >
              Navigation
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center mt-2`}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={tw`w-10 h-10 rounded-full`}
          />
          <View style={tw`ml-4`}>
            <Text style={tw`text-sm font-semibold`}>{user}</Text>
            <Text style={tw`text-xs text-gray-500`}>⭐ {rating}</Text>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <TouchableOpacity
        style={tw`px-4 pt-4 border-t border-[#EBF0FA] flex-row items-center justify-between`}
      >
        <Text style={tw`text-base font-medium`}>Upcoming Trips (5)</Text>
        <FontAwesome5 name="chevron-right" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TripCard;
