import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import AddressCard from "@/components/cards/address-card";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";

const HelpAndSupportScreen = () => {
  return (
    <FrameWithHeader showBack title="Help and Support">
      <Text style={tw`text-xl font-medium text-gray-700 tracking-wide `}>
        Help and Support
      </Text>

      <Text style={tw`text-base text-gray-600 tracking-wide leading-6`}>
        Lorem ipsum dolor sit amet consectetur. Sit pulvinar mauris mauris eu
        nibh semper nisl pretium laoreet. Sed non faucibus ac lectus eu arcu.
        Nulla sit congue facilisis vestibulum egestas nisl feugiat pharetra.
        Odio sit tortor morbi at orci ipsum dapibus interdum. Lorem felis est
        aliquet arcu nullam pellentesque. Et habitasse ac arcu et nunc euismod
        rhoncus facilisis sollicitudin.
      </Text>
    </FrameWithHeader>
  );
};

export default HelpAndSupportScreen;
