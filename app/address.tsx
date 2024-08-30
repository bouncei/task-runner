import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import AddressCard from "@/components/cards/address-card";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";

const AddressScreen = () => {
  return (
    <FrameWithHeader showBack title="Address">
      {/* DISPLAY USER ADDRESSES */}
      <View style={tw`gap-4`}>
        {[0, 0, 0, 0, 0].map((address, index) => (
          <AddressCard key={index} />
        ))}
      </View>

      {/* ADD NEW ADDRESS */}
      <Button size="lg" style={tw`mt-4`}>
        <Text style={tw`text-white text-base`}>Add New Adress</Text>
      </Button>
    </FrameWithHeader>
  );
};

export default AddressScreen;
