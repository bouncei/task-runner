import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import AddressCard from "@/components/cards/address-card";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";

const ChangeLanguageScreen = () => {
  const handleSaveLanguage = () => {};
  return (
    <FrameWithHeader showBack title="Change Language">
      {/* TODO */}
      <Text style={tw`text-orange-500 text-2xl`}>TODO</Text>

      {/* Save */}
      <Button size="lg" style={tw`mt-4`} onPress={handleSaveLanguage}>
        <Text style={tw`text-white text-base`}>Save</Text>
      </Button>
    </FrameWithHeader>
  );
};

export default ChangeLanguageScreen;
