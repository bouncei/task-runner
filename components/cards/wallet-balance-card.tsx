import tw from "twrnc";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { Text, View } from "../Themed";
import { useWalletStore } from "@/stores/wallet-store";
import { primary } from "@/constants/Colors";
import { router } from "expo-router";

interface WalletBalanceCardProps {}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = () => {
  return (
    <View style={tw`shadow-md p-4 gap-2 rounded-[20px]`}>
      <View style={tw`flex-row items-center justify-between pb-2`}>
        <View>
          <Text style={tw`text-lg font-medium tracking-wide`}>
            Wallat Balance
          </Text>
          <Text
            style={tw`text-2xl text-[${primary}] tracking-wide font-semibold`}
          >
            $ 1544.00
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/withdraw-balance")}
          style={tw`rounded-lg bg-[#F0F3FA] px-3 py-2`}
        >
          <Text style={tw`text-blue-500 text-center text-xs text-[${primary}]`}>
            Withdral
          </Text>
        </TouchableOpacity>
      </View>

      {/* TODO: BALANCE CHART */}
      <Image
        source={{ uri: "https://via.placeholder.com/200x100" }}
        style={tw`w-full h-32 rounded `}
      />
    </View>
  );
};

export default WalletBalanceCard;
