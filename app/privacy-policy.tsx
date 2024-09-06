import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import AddressCard from "@/components/cards/address-card";
import { Button } from "@/components/ui/button";
import { Text, View } from "@/components/Themed";

const PrivacyPolicyScreen = () => {
  return (
    <FrameWithHeader showBack title="Privacy Policy">
      <Text style={tw`text-xl font-medium text-gray-700 tracking-wide `}>
        Privacy Policy for Taskrunner
      </Text>

      <Text style={tw`text-base text-gray-600 tracking-wide leading-6`}>
        At Taskrunner, accessible from rideshare.com, one of our main priorities
        is the privacy of our visitors. This Privacy Policy document contains
        types of information that is collected and recorded by rideshare and how
        we use it. If you have additional questions or require more information
        about our Privacy Policy, do not hesitate to contact us. This Privacy
        Policy applies only to our online activities and is valid for visitors
        to our website with regards to the information that they shared and/or
        collect in rideshare. This policy is not applicable to any information
        collected offline or via channels other than this website. Our Privacy
        Policy was created with the help of the Free Privacy Policy Generator.
      </Text>
    </FrameWithHeader>
  );
};

export default PrivacyPolicyScreen;
