import React, { useState } from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TouchableOpacity } from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";

const ContactUsScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pNumber: "",
    message: "",
  });

  const handleOnChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateInput(field, value);
  };

  const validateInput = (field: keyof typeof formData, value: string) => {
    switch (field) {
      case "name":
        if (value.trim() === "") {
          setErrors({ ...errors, name: "Name is required" });
        } else {
          setErrors({ ...errors, name: "" });
        }
        break;
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          setErrors({ ...errors, email: "Invalid email address" });
        } else {
          setErrors({ ...errors, email: "" });
        }
        break;
      case "pNumber":
        const phoneRegex = /^\d{10,15}$/; // adjust the regex to match your phone number format
        if (!phoneRegex.test(value)) {
          setErrors({ ...errors, pNumber: "Invalid phone number" });
        } else {
          setErrors({ ...errors, pNumber: "" });
        }
        break;
      case "message":
        if (value.trim() === "") {
          setErrors({ ...errors, message: "Message is required" });
        } else {
          setErrors({ ...errors, message: "" });
        }
        break;
      default:
        break;
    }
  };

  const handleSavePassword = () => {
    if (Object.values(errors).every((error) => error === "")) {
      // Save password logic here
    } else {
      alert("Please fix the errors and try again");
    }
  };

  return (
    <FrameWithHeader showBack title="Contact Us">
      <View style={tw`items-center justify-center pt-5`}>
        {/* ADDRESS */}
        <View style={tw`items-center justify-center`}>
          <Text
            style={tw`text-xl font-medium text-gray-700 tracking-wide text-center `}
          >
            Address
          </Text>

          <Text
            style={tw`text-sm text-center mt-2 text-gray-600 tracking-wide leading-6`}
          >
            House# 72, Road# 21, Banani, Dhaka-1213 (near Banani Bidyaniketon
            School & College, beside University of South Asia)
          </Text>

          <Text
            style={tw`text-sm mt-5 text-center text-gray-600 tracking-wide leading-6`}
          >
            Call : 13301 (24/7)
          </Text>

          <Text
            style={tw`text-sm  text-center text-gray-600 tracking-wide leading-6`}
          >
            Email : support@pathao.com
          </Text>
        </View>

        {/* CONTACT FORM */}
        <View style={tw`gap-4 py-8 w-full`}>
          <Text
            style={tw`text-lg font-medium text-gray-700 tracking-wide text-center `}
          >
            Send Message
          </Text>

          {/* NAME INPUT */}
          <Input
            style={tw`h-[60px]`}
            value={formData.name}
            onChangeText={(text) => {
              handleOnChange("name", text);
            }}
            placeholder="Name"
          />
          {errors.name && (
            <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.name}</Text>
          )}

          {/* EMAIL INPUT */}
          <Input
            style={tw`h-[60px]`}
            value={formData.email}
            onChangeText={(text) => {
              handleOnChange("email", text);
            }}
            placeholder="Email"
          />
          {errors.email && (
            <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.email}</Text>
          )}

          {/* PHONE NUMBER INPUT */}
          <View
            style={tw`flex-row items-center border border-[#E0E0E0] bg-[#F0F5F5] rounded-xl pr-2  pl-[15px]`}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={tw`border-r border-gray-300 pr-1 flex-row gap-2`}
            >
              {/* TODO: COUNTRY FLAGS */}
              <FontAwesome6 name="map" size={24} color="black" />

              <Entypo name="chevron-down" size={24} color="gray" />
            </TouchableOpacity>
            <Input
              style={tw`flex-1 h-[60px] border-0`}
              value={formData.pNumber}
              onChangeText={(text) => {
                handleOnChange("pNumber", text);
              }}
              placeholder="Phone Number"
              keyboardType="number-pad"
            />
          </View>
          {errors.pNumber && (
            <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.pNumber}</Text>
          )}

          <Input
            style={tw`h-[120px]`}
            value={formData.message}
            onChangeText={(text) => {
              handleOnChange("message", text);
            }}
            placeholder="Message"
            multiline={true}
          />
          {errors.message && (
            <Text style={tw`text-red-500 text-xs -mt-3`}>{errors.message}</Text>
          )}
        </View>

        {/* Save */}
        <Button size="lg" style={tw`mt-4 w-full`} onPress={handleSavePassword}>
          <Text style={tw`text-white text-base`}>Save</Text>
        </Button>
      </View>
    </FrameWithHeader>
  );
};

export default ContactUsScreen;
