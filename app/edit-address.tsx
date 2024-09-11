import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Address } from "@/lib/types";
import { useAddressStore } from "@/stores/address-store";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import tw from "twrnc";

const EditAddressScreen = () => {
  const { security } = useAuthStore();
  const { updateAddress, loading, addressToUpdate } = useAddressStore();

  const [address, setAddress] = useState<any>(addressToUpdate);
  const [errors, setErrors] = useState({
    title: "",
    pickup_address: "",
  });

  const validateField = (field: keyof typeof address, value: string) => {
    switch (field) {
      case "title":
        if (value.trim() === "") {
          setErrors({ ...errors, title: "Location tag is required" });
        } else {
          setErrors({ ...errors, title: "" });
        }
        break;
      case "pickup_address":
        if (value.trim() === "") {
          setErrors({
            ...errors,
            pickup_address: "Pickup address is required",
          });
        } else {
          setErrors({ ...errors, pickup_address: "" });
        }
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (address?.title.trim() === "") {
      setErrors({ ...errors, title: "Location tag is required" });
      isValid = false;
    }
    if (address?.pickup_address.trim() === "") {
      setErrors({ ...errors, pickup_address: "Pickup address is required" });
      isValid = false;
    }
    return isValid;
  };

  const handleOnChange = (field: keyof typeof address, value: string) => {
    setAddress({ ...address, [field]: value });
    validateField(field, value);
  };

  const handleUpdatingAddress = async () => {
    if (!validateForm()) {
      Toast.show({
        type: "error",
        text1: "Please fill in all required fields",
      });
      return;
    }

    // Proceed
    updateAddress(address, security!);
  };

  return (
    <FrameWithHeader showBack title="Edit Address">
      <Text style={tw`text-gray-500 mt-2`}>Pickup address</Text>
      <Input
        // style={tw`border border-gray-300 rounded-lg p-3 mt-2`}
        value={address.pickup_address}
        error={errors.pickup_address}
        onChangeText={(text) => handleOnChange("pickup_address", text)}
        placeholder="Enter pickup address"
      />
      {errors.pickup_address && (
        <Text style={tw`text-red-500 text-xs -mt-3`}>
          {errors.pickup_address}
        </Text>
      )}

      <Text style={tw`text-gray-500 mt-4`}>Location tag</Text>
      <Input
        value={address.title}
        error={errors.title}
        onChangeText={(text) => handleOnChange("title", text)}
        placeholder="e.g. Office, Home"
      />
      {errors.title && (
        <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.title}</Text>
      )}

      {/* Update Location Button */}
      <Button
        onPress={handleUpdatingAddress}
        size="lg"
        style={tw`mt-5`}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={tw`text-center text-base text-white `}>
            Update Address
          </Text>
        )}
      </Button>
    </FrameWithHeader>
  );
};

export default EditAddressScreen;
