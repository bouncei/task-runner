import { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import tw from "twrnc";

import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { useAddressStore } from "@/stores/address-store";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/stores/auth-store";
import { primary } from "@/constants/Colors";

const dummyLocations = [
  {
    id: 1,
    title: "Location 1",
    pickup_address: "123 Main St, Anytown, USA",
    isDefault: true,
  },
  {
    id: 2,
    title: "Location 2",
    pickup_address: "123 Main St, Anytown, USA",
    isDefault: false,
  },
  {
    id: 3,
    title: "Location 3",
    pickup_address: "123 Main St, Anytown, USA",
    isDefault: false,
  },
];

const NewAddressScreen = () => {
  const { security } = useAuthStore();
  const { addresses, setDefaultAddress, addAddress, loading } =
    useAddressStore();
  const [locations, setLocations] = useState(dummyLocations); //! Remove when APIs are ready
  const [newAddress, setNewAddress] = useState({
    title: "",
    pickup_address: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    pickup_address: "",
  });

  const selectDefaultLocation = (id: number) => {
    // !MAKE NECCESSARY MODIFICATIONS WHEN API ENDPOINT IS READY
    const updatedLocations = dummyLocations.map((location) =>
      location.id === id
        ? { ...location, isDefault: true }
        : { ...location, isDefault: false }
    );
    setLocations(updatedLocations);
  };

  const validateField = (field: keyof typeof newAddress, value: string) => {
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
    if (newAddress.title.trim() === "") {
      setErrors({ ...errors, title: "Location tag is required" });
      isValid = false;
    }
    if (newAddress.pickup_address.trim() === "") {
      setErrors({ ...errors, pickup_address: "Pickup address is required" });
      isValid = false;
    }
    return isValid;
  };

  const handleOnChange = (field: keyof typeof newAddress, value: string) => {
    setNewAddress({ ...newAddress, [field]: value });
    validateField(field, value);
  };

  const handleAddingNewAddress = async () => {
    if (!validateForm()) {
      Toast.show({
        type: "error",
        text1: "Please fill in all required fields",
      });
      return;
    }

    // Proceed
    addAddress(newAddress, security!);
  };

  return (
    <FrameWithHeader showBack title="Manage Addresses">
      {/* Location List */}
      {locations.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row justify-between items-center py-4 border-b border-gray-200`}
          onPress={() => selectDefaultLocation(item.id)}
        >
          <View style={tw`flex-row items-center`}>
            <View style={tw`bg-[#006970] bg-opacity-20 rounded-full p-4`}>
              <FontAwesome name="send-o" size={24} color="black" />
            </View>
            <View style={tw`ml-4 gap-2`}>
              <Text style={tw`font-medium`}>{item.pickup_address}</Text>
              <Text style={tw` font-light`}>{item.title}</Text>
            </View>
          </View>
          {item.isDefault && (
            <Ionicons name="checkmark-circle" size={24} color="teal" />
          )}
        </TouchableOpacity>
      ))}

      {/* Add New Location Section */}
      <Text style={tw`text-lg font-semibold mt-6`}>Add new Location +</Text>

      <Text style={tw`text-gray-500 mt-2`}>Pickup address</Text>
      <Input
        // style={tw`border border-gray-300 rounded-lg p-3 mt-2`}
        value={newAddress.pickup_address}
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
        value={newAddress.title}
        error={errors.title}
        onChangeText={(text) => handleOnChange("title", text)}
        placeholder="e.g. Office, Home"
      />
      {errors.title && (
        <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.title}</Text>
      )}

      {/* Add New Location Button */}
      <Button
        onPress={handleAddingNewAddress}
        size="lg"
        style={tw`mt-5`}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={tw`text-center text-base text-white `}>
            Add New Address
          </Text>
        )}
      </Button>
    </FrameWithHeader>
  );
};

export default NewAddressScreen;
