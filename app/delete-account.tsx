import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/Themed";

const DeleteAccountScreen = () => {
  const handleDeleteAccount = () => {};

  return (
    <FrameWithHeader showBack title="Delete Account">
      {/* TODO */}

      <Text style={tw`text-base text-gray-600 tracking-wide leading-6`}>
        Are you sure you want to delete your account? Please read how account
        deletion will affect. Deleting your account removes personal information
        our database. Tour email becomes permanently reserved and same email
        cannot be re-use to register a new account.
      </Text>

      {/* DELETE BUTTON */}
      <Button size="lg" style={tw`mt-4`} onPress={handleDeleteAccount}>
        <Text style={tw`text-white text-base`}>Delete</Text>
      </Button>
    </FrameWithHeader>
  );
};

export default DeleteAccountScreen;
