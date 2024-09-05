import tw from "twrnc";
import { Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { Text, View } from "@/components/Themed";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { primary } from "@/constants/Colors";
import TripCard from "@/components/cards/trip-card";
import PreviousTripCard from "@/components/cards/previous-trip-card";
import { Button } from "@/components/ui/button";
import WalletHistoryCard from "@/components/cards/wallet-history-card";
import WalletBalanceCard from "@/components/cards/wallet-balance-card";

const WalletScreen = () => {
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
            <View style={tw`gap-4 bg-transparent`}>
              {/* ALL TRIPS FOR THE PRESENT DAY*/}
              <Pressable
                onPress={() => {}}
                style={tw`bg-white shadow-md py-4 rounded-[20px] `}
              >
                <View
                  style={tw`bg-transparent h-[6rem] items-center justify-center px-4 pb-4`}
                >
                  <Text style={tw`text-2xl tracking-wider`}>Last 1 Month</Text>
                  <Text
                    style={tw`text-2xl text-[${primary}] tracking-wide font-semibold`}
                  >
                    $ 12,491.22
                  </Text>
                </View>

                <View
                  style={tw`px-4 pt-4 border-t border-[#EBF0FA] flex-row items-center justify-between`}
                >
                  <View style={tw`flex-row items-center gap-1`}>
                    <FontAwesome6 name="repeat" size={20} color="black" />
                    <Text style={tw`text-lg tracking-wide`}>244 Rides</Text>
                  </View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <FontAwesome6 name="clock" size={20} color="black" />
                    <Text style={tw`text-base tracking-wide`}>25D</Text>

                    <Text style={tw`text-base tracking-wide`}>23H</Text>
                  </View>
                </View>
              </Pressable>

              {/* WALLET BALANCE CARD */}
              <WalletBalanceCard />

              {/* EXPENSES HISTORY */}
              <WalletHistoryCard truncateAmount={5} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WalletScreen;
