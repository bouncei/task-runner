import { StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import tw from "twrnc";
import { useDeliveryStore } from "@/stores/delivery-store";
import { useAuthStore } from "@/stores/auth-store";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { EvilIcons } from "@expo/vector-icons";
import { Input } from "@/components/ui/input";
import Colors from "@/constants/Colors";
import DeliveryCard from "@/components/cards/delivery-card";

export default function TabTwoScreen() {
  const { security } = useAuthStore();
  const colorScheme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { deliveries, getDeliveries } = useDeliveryStore();

  useEffect(() => {
    if (!security) return;

    getDeliveries(security.email, security.token);
  }, [security]);

  let timeoutId: any;

  const deliverySearch = useCallback((query: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(async () => {
      try {
        // TODO: USE APPROPRAITE ENDPOINT
        const response = await fetch(`https://example.com/search?q=${query}`);
        const data = await response.json();
        setSearchResults(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    deliverySearch(query);
  };

  return (
    <FrameWithHeader>
      <Text style={tw`text-xl font-semibold tracking-wide`}>
        Delivery History
      </Text>
      <View
        style={tw`bg-[#0069701A] px-3 py-2 rounded-lg mt-1 flex flex-row gap-2 items-center `}
      >
        <EvilIcons name="search" size={28} color={Colors[colorScheme].text} />

        <Input
          style={tw`bg-transparent border-0 px-0`}
          placeholder="Search for delivery history..."
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
          keyboardType="web-search"
        />
      </View>

      {deliveries.map((delivery, index) => (
        <DeliveryCard key={index} delivery={delivery} />
      ))}
    </FrameWithHeader>
  );
}
