import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";

interface TripCardProps {
  status: string;
  itemNumber: string;
  pickupLocation: string;
  deliveryLocation: string;
}

const MainTripCard: React.FC<TripCardProps> = ({
  status,
  itemNumber,
  pickupLocation,
  deliveryLocation,
}) => {
  return (
    <View
      style={tw`bg-white p-4 rounded-xl border border-gray-400 shadow mb-4`}
    >
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={tw`w-full h-32 rounded-lg mb-4`}
      />

      <Text style={tw`text-sm text-gray-500`}>{status}</Text>
      <Text style={tw`text-sm font-semibold text-gray-500`}>#{itemNumber}</Text>
      <Text style={tw`text-lg font-bold mt-2`}>Item Number</Text>
      <Text style={tw`text-sm text-gray-700 font-bold`}>{itemNumber}</Text>

      <View style={tw`flex-row items-center mt-4`}>
        <Ionicons name="location-outline" size={20} color="red" />
        <Text style={tw`text-sm text-gray-500 ml-2`}>Pickup Location</Text>
      </View>
      <Text style={tw`text-sm text-gray-700 ml-6`}>{pickupLocation}</Text>

      <View style={tw`flex-row items-center mt-4`}>
        <Ionicons name="location-outline" size={20} color="green" />
        <Text style={tw`text-sm text-gray-500 ml-2`}>Delivery Location</Text>
      </View>
      <Text style={tw`text-sm text-gray-700 ml-6`}>{deliveryLocation}</Text>
    </View>
  );
};

export default MainTripCard;
