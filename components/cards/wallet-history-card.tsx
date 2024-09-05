import tw from "twrnc";
import React from "react";
import { TouchableOpacity } from "react-native";

import { Text, View } from "../Themed";
import { useWalletStore } from "@/stores/wallet-store";
import { primary } from "@/constants/Colors";

interface WalletHistoryCard {
  truncateAmount: number;
}

const WalletHistoryCard: React.FC<WalletHistoryCard> = ({ truncateAmount }) => {
  const { expenses, getExpenses } = useWalletStore();

  const displayAllExpenses = () => {};

  return (
    <View style={tw`shadow-md p-4 rounded-[20px]`}>
      <View style={tw`flex-row items-center justify-between pb-2`}>
        <Text style={tw`text-lg font-medium tracking-wide`}>
          Withdrawal History
        </Text>
        <TouchableOpacity
          onPress={displayAllExpenses}
          style={tw`rounded-lg bg-[#F0F3FA] px-3 py-2`}
        >
          <Text style={tw`text-blue-500 text-center text-xs text-[${primary}]`}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <HistoryItem date="14/06/2021, 14:24 AM" amount="$100" />
      <HistoryItem date="24/05/2021, 22:30 AM" amount="$224" />
      <HistoryItem date="11/04/2021, 16:20 AM" amount="$200" />
      <HistoryItem date="11/04/2021, 16:20 AM" amount="$200" />
    </View>
  );
};

const HistoryItem = ({ date, amount }: { date: string; amount: string }) => (
  <TouchableOpacity
    style={tw`flex-row justify-between items-center py-3 border-b border-gray-200`}
  >
    <View style={tw`flex-row items-center`}>
      <View style={tw`size-5 bg-[${primary}] rounded mr-4`} />
      <Text style={tw`text-gray-600 text-base`}>{date}</Text>
    </View>
    <Text style={tw`text-green-500 font-medium text-base`}>{amount}</Text>
  </TouchableOpacity>
);

export default WalletHistoryCard;
