import React, { useEffect } from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import AddressCard from "@/components/cards/address-card";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { useAddressStore } from "@/stores/address-store";
import { useAuthStore } from "@/stores/auth-store";
import { ActivityIndicator } from "react-native";
import { primary } from "@/constants/Colors";

const AddressScreen = () => {
  const { security } = useAuthStore();
  const { getAddresses, loading, addresses } = useAddressStore();

  useEffect(() => {
    getAddresses(security!);
  }, []);

  return (
    <FrameWithHeader showBack title="Address">
      {/* DISPLAY USER ADDRESSES */}
      {loading ? (
        <ActivityIndicator color={primary} />
      ) : (
        <View style={tw`gap-4`}>
          {addresses.map((address, index) => (
            <AddressCard address={address} key={index} />
          ))}
        </View>
      )}

      {/* ADD NEW ADDRESS */}
      {!loading && (
        <Button
          size="lg"
          style={tw`mt-4`}
          onPress={() => router.push("/new-address")}
        >
          <Text style={tw`text-white text-base`}>Add New Adress</Text>
        </Button>
      )}
    </FrameWithHeader>
  );
};

export default AddressScreen;
