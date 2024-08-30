import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import AddressCard from "@/components/cards/address-card";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";

const InviteFriendsScreen = () => {
  const handleSavePassword = () => {};
  return (
    <FrameWithHeader showBack title="Invite Friends">
      {/* TODO */}

      {/* Save */}
      <Button size="lg" style={tw`mt-4`} onPress={handleSavePassword}>
        <Text style={tw`text-white text-base`}>Save</Text>
      </Button>
    </FrameWithHeader>
  );
};

export default InviteFriendsScreen;
