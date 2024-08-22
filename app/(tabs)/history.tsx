import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import tw from "twrnc";
import { useDeliveryStore } from "@/stores/delivery-store";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export default function TabTwoScreen() {
  const { security } = useAuthStore();
  const { deliveries, getDeliveries } = useDeliveryStore();

  useEffect(() => {
    if (!security) return;

    getDeliveries(security.email, security.token);
  }, [security]);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-2xl`}>History Screen</Text>
    </View>
  );
}
