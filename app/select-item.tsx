import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
} from "react-native";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import { View, Text } from "@/components/Themed";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useDeliveryStore } from "@/stores/delivery-store";

const ItemDetailsScreen = () => {
  // TODO: IMPLEMENT INPUT VALIDATION
  const { params } = useRoute() as any;
  const colorScheme = useColorScheme() ?? "light";
  const { setNewDelivery, newDelivery } = useDeliveryStore();
  const [edit, setEdit] = useState<boolean>(false);
  const [itemData, setItemData] = useState({
    name: "",
    quantity: "0",
    recipientName: "",
    recipientPhone: "",
    recipientEmailAddress: "",
    loadWeight: "",
    breakable: "",
    pictureOfPackage: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmailAddress: "",
    loadWeight: "",
    breakable: "",
  });

  useEffect(() => {
    // Checking if purpose is to edit
    if (!params.edit) return;

    setEdit(true);
    setItemData(newDelivery?.itemData);
  }, [params, newDelivery]);

  const handleOnChange = (field: keyof typeof itemData, value: string) => {
    setItemData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!itemData.name) {
      newErrors.name = "Please select an item type";
      isValid = false;
    }

    if (!itemData.quantity || parseInt(itemData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid quantity";
      isValid = false;
    }

    if (!itemData.recipientName) {
      newErrors.recipientName = "Please enter the recipient's name";
      isValid = false;
    }

    if (!itemData.recipientPhone) {
      newErrors.recipientPhone = "Please enter the recipient's phone number";
      isValid = false;
    }

    if (!itemData.recipientEmailAddress) {
      newErrors.recipientEmailAddress =
        "Please enter the recipient's email address";
      isValid = false;
    }

    if (!itemData.loadWeight) {
      newErrors.loadWeight = "Please enter the load weight";
      isValid = false;
    }

    if (!itemData.breakable) {
      newErrors.breakable = "Please select if the item is breakable";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    const isValid = validateInputs();
    if (!isValid) return;

    setNewDelivery({
      locations: {
        pickup: newDelivery?.pickup,
        delivery: newDelivery?.delivery,
      },
      itemDetails: itemData,
      rider: undefined,
      type: newDelivery?.type ? newDelivery.type : null,
    });

    if (edit) {
      router.back();
    } else {
      router.push({
        pathname: "/instant-delivery",
        params: {
          step: "confirmDetails", //next step
        },
      });
    }
  };

  return (
    <FrameWithHeader
      showBack={true}
      title={edit ? "Edit Details" : "Item Details"}
    >
      <View style={tw`flex-col gap-3`}>
        <Text style={tw`text-base `}>What are you sending</Text>

        <View style={tw`flex-1`}>
          <Text style={tw`text-xs pb-1`}>Select type of item</Text>
          <RNPickerSelect
            onValueChange={(value) => setItemData({ ...itemData, name: value })}
            items={[
              { label: "Gadget", value: "gadget" },
              { label: "Document", value: "document" },
              // Add other items here
            ]}
            placeholder={{ label: "Select type of item", value: itemData.name }}
            style={tw`w-full flex-row`}
          >
            <Input
              placeholder="Select"
              editable={false}
              error={errors.name}
              value={itemData.name}
              selectTextOnFocus={false}
            />
          </RNPickerSelect>
          {errors.name && (
            <Text style={tw`text-red-500 text-xs`}>{errors.name}</Text>
          )}
        </View>

        <View style={tw`flex flex-row items-start gap-2`}>
          <Entypo name="help-with-circle" size={20} color="red" />
          <Text style={tw`text-xs `}>
            Our Prohibited Items include: blah, blah, blah, blah, blah, blah,
            blah, blah, blah, blah, blah
          </Text>
        </View>
      </View>

      <View style={tw`gap-2`}>
        <Text style={tw`text-base `}>Quantity</Text>
        <Input
          placeholder="Quantity"
          keyboardType="numeric"
          error={errors.quantity}
          value={itemData.quantity}
          onChangeText={(text) => handleOnChange("quantity", text)}
        />
        {errors.quantity && (
          <Text style={tw`text-red-500 text-xs`}>{errors.quantity}</Text>
        )}
      </View>

      <View style={tw`gap-2`}>
        <Text style={tw`text-base `}>Recipient Name</Text>
        <Input
          value={itemData.recipientName}
          error={errors.recipientName}
          onChangeText={(text) => handleOnChange("recipientName", text)}
          placeholder="Recipient Name"
        />
        {errors.recipientName && (
          <Text style={tw`text-red-500 text-xs`}>{errors.recipientName}</Text>
        )}
      </View>

      <View style={tw`gap-2`}>
        <Text style={tw`text-base `}>Load weight</Text>
        <Input
          value={itemData.loadWeight}
          error={errors.loadWeight}
          onChangeText={(text) => handleOnChange("loadWeight", text)}
          placeholder="Load weight"
        />
        {errors.loadWeight && (
          <Text style={tw`text-red-500 text-xs`}>{errors.loadWeight}</Text>
        )}
      </View>

      <View style={tw`gap-2`}>
        <Text style={tw`text-base `}>Breakable item</Text>

        <View style={tw`flex-1`}>
          <RNPickerSelect
            onValueChange={(value) => handleOnChange("breakable", value)}
            items={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            placeholder={{ label: "Breakable item", value: itemData.breakable }}
            style={tw`w-full flex-row`}
          >
            <Input
              placeholder="Select"
              value={itemData.breakable}
              error={errors.breakable}
              editable={false}
              style={tw`capitalize`}
              selectTextOnFocus={false}
            />
          </RNPickerSelect>
          {errors.breakable && (
            <Text style={tw`text-red-500 text-xs`}>{errors.breakable}</Text>
          )}
        </View>
      </View>

      <View style={tw`gap-2`}>
        <Text style={tw`text-base `}>Recipient contact number</Text>
        <Input
          value={itemData.recipientPhone}
          error={errors.recipientPhone}
          onChangeText={(text) => handleOnChange("recipientPhone", text)}
          placeholder="Recipient contact number"
          keyboardType="phone-pad"
        />
        {errors.recipientPhone && (
          <Text style={tw`text-red-500 text-xs`}>{errors.recipientPhone}</Text>
        )}
      </View>

      <View style={tw`gap-2`}>
        <Text style={tw`text-base `}>Recipient Email Address</Text>
        <Input
          value={itemData.recipientEmailAddress}
          error={errors.recipientEmailAddress}
          onChangeText={(text) => handleOnChange("recipientEmailAddress", text)}
          placeholder="Recipient Email Address"
          keyboardType="email-address"
        />
        {errors.recipientEmailAddress && (
          <Text style={tw`text-red-500 text-xs`}>
            {errors.recipientEmailAddress}
          </Text>
        )}
      </View>

      <View style={tw`bg-[#F0F5F5] my-3`}>
        <TouchableOpacity
          style={tw`border-dotted border-2 border-[#A8DADC] p-4 rounded items-center`}
        >
          <View style={tw`bg-[#A8DADC] rounded-full`}>
            <FontAwesome name="camera" size={18} style={tw`p-3 `} />
          </View>
          <Text style={tw`text-gray-500 mt-2`}>
            Take a picture of the package
          </Text>
        </TouchableOpacity>
      </View>

      <Button size="lg" onPress={handleNextStep}>
        <Text style={tw`text-white text-center text-lg`}>
          {edit ? "Update" : "Continue"}
        </Text>
      </Button>
    </FrameWithHeader>
  );
};

export default ItemDetailsScreen;
