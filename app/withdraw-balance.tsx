import tw from "twrnc";
import { Alert, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { primary } from "@/constants/Colors";
import { Button } from "@/components/ui/button";
import WalletHistoryCard from "@/components/cards/wallet-history-card";
import WalletBalanceCard from "@/components/cards/wallet-balance-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const WithdrawalBalanceScreen = () => {
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState<any>(null);

  const handleSubmit = () => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Invalid amount. Please enter a valid amount.");
    } else {
      // TODO: Implement withdrawal logic
      Alert.alert(`Withdrawing ${amountValue}`);
      setError(null);
    }
  };
  return (
    <View style={tw`flex-1  gap-4 h-full w-full bg-[#EBF0FA]  `}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`relative`}
      >
        <View style={tw`flex-1  bg-transparent relative `}>
          {/* HEADER */}
          <View
            style={tw`flex-row  items-center px-4 h-[13rem] bg-[${primary}] rounded-b-[50px]`}
          >
            <Button variant="ghost" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </Button>

            <View
              style={tw`ml-20 flex-row items-center justify-center bg-transparent`}
            >
              <Text
                style={tw`text-2xl tracking-wider font-semibold text-white`}
              >
                Wallet
              </Text>
            </View>
          </View>

          <View
            style={tw`absolute top-[10rem] w-full h-full px-6 bg-transparent pb-20`}
          >
            <View style={tw`gap-5 bg-transparent`}>
              {/* WALLET BALANCE CARD */}
              <WalletBalanceCard />

              {/* AMOUNT INPUT */}
              <View style={tw`bg-transparent gap-2 `}>
                <Text style={tw`text-xl tracking-wide`}>Amount</Text>
                <Input
                  keyboardType="number-pad"
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    setError(null);
                  }}
                  error={error}
                />
                {error && <Text style={tw`text-red-500 text-sm`}>{error}</Text>}
              </View>

              <Button size="lg" style={tw`mt-10`} onPress={handleSubmit}>
                <Text style={tw`text-white text-lg`}>Submit</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WithdrawalBalanceScreen;
