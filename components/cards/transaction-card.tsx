import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Text, View } from "../Themed";

type TransactionCardProps = {
  location: string;
  date: string;
  amount: string;
};

const TransactionCard = ({ location, date, amount }: TransactionCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={tw`flex-row items-center justify-between py-4  border-b border-gray-200`}
    >
      <View style={tw`flex-row items-center`}>
        <View style={tw`bg-[#006970] bg-opacity-20 p-3 rounded-full`}>
          <Image
            source={require("@/assets/images/icons/bike.png")}
            style={tw`size-10  `}
            resizeMode="contain"
          />
        </View>
        <View style={tw`ml-4`}>
          <Text style={tw`text-base `}>{location}</Text>
          <Text style={tw`text-sm text-gray-500`}>{date}</Text>
        </View>
      </View>
      <Text style={tw`text-base font-semibold text-black`}>{amount}</Text>
    </TouchableOpacity>
  );
};

export default TransactionCard;
