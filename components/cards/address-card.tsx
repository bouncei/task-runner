import React from "react";
import tw from "twrnc";

import { Address } from "@/lib/types";
import { Text, View } from "../Themed";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface AddressCardProps {
  address: Address;
}

const AddressCard = ({ address }: AddressCardProps) => {
  const handleEdit = () => {
    // TODO
  };

  return (
    <View style={tw`flex-row items-center shadow p-4 gap-10 rounded-lg`}>
      <View style={tw`flex-1 flex-row items-start gap-1`}>
        <Ionicons
          name="location-outline"
          size={23}
          color="#5C5C5C"
          style={tw`flex-shrink-0`}
        />
        <View style={tw`items-start gap-1`}>
          <Text style={tw`font-medium`}>{address.title}</Text>
          <Text style={tw`font-light`}>{address.pickup_address}</Text>
        </View>
      </View>

      {/* EDIT ICON */}
      <TouchableOpacity onPress={handleEdit}>
        <Feather name="edit" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default AddressCard;
