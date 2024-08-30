import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Text, View } from "@/components/Themed";
import TransactionCard from "@/components/cards/transaction-card";
import { Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const dummyTransactions = [
  {
    location: "Berlin Central Station",
    date: "20 Oct, 2:00",
    amount: "#4000",
  },
  {
    location: "Gotthardstraße 71",
    date: "10 Oct, 19:00",
    amount: "#3,000",
  },
];

const SupportFAQScreeen = () => {
  return (
    <FrameWithHeader showBack title="Get Help">
      {/* Header */}
      <Text style={tw`text-2xl font-bold my-4 `}>How can we help?</Text>

      {/* Support Cases */}
      <Text style={tw`text-base font-semibold -mb-4 `}>Support cases</Text>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between  py-4 px-2 `}
      >
        <View style={tw`flex-row items-center`}>
          <View style={tw`p-2 rounded-full bg-[#F8F8F8] `}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={30}
              color="#5C5C5C"
            />
          </View>
          <View style={tw`ml-4`}>
            <Text style={tw`text-base font-medium`}>Inbox</Text>
            <Text style={tw`text-sm text-gray-500`}>View open charts</Text>
          </View>
        </View>
        <Text style={tw`text-gray-500 text-lg`}>&#x203A;</Text>
      </TouchableOpacity>

      {/* Recent Rides */}
      <Text style={tw`text-lg font-semibold mt-4 mb-2`}>
        Get help with a recent ride
      </Text>
      {dummyTransactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          location={transaction.location}
          date={transaction.date}
          amount={transaction.amount}
        />
      ))}

      {/* Select an Older Ride */}
      <TouchableOpacity onPress={() => {}}>
        <Text style={tw`text-lg font-semibold text-green-600 my-4 `}>
          Select an older ride
        </Text>
      </TouchableOpacity>

      {/* Other Help Options */}
      <Text style={tw`text-lg font-semibold  mb-2`}>
        Get help with a recent ride
      </Text>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between py-4 px-2 border-b border-gray-200`}
      >
        <Text style={tw`text-base `}>About Bolt</Text>
        <Text style={tw`text-gray-500 text-lg`}>&#x203A;</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between py-4 px-2 border-b border-gray-200`}
      >
        <Text style={tw`text-base `}>App and features</Text>
        <Text style={tw`text-gray-500 text-lg`}>&#x203A;</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between py-4 px-2 border-b border-gray-200`}
      >
        <Text style={tw`text-base `}>Account and data</Text>
        <Text style={tw`text-gray-500 text-lg`}>&#x203A;</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between py-4 px-2 border-b border-gray-200`}
      >
        <Text style={tw`text-base `}>Payments and pricing</Text>
        <Text style={tw`text-gray-500 text-lg`}>&#x203A;</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`flex-row items-center justify-between py-4 px-2 `}
      >
        <Text style={tw`text-base `}>Using Bolt</Text>
        <Text style={tw`text-gray-500 text-lg`}>&#x203A;</Text>
      </TouchableOpacity>
    </FrameWithHeader>
  );
};

export default SupportFAQScreeen;
