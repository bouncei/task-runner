import React, { useState } from "react";
import { TouchableOpacity, Switch } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { Text, View } from "@/components/Themed";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Button } from "@/components/ui/button";
import { primary } from "@/constants/Colors";
import { router } from "expo-router";

const FilterScreen = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [saveSearch, setSaveSearch] = useState(false);

  // Dynamic picker data
  const years = Array.from({ length: 50 }, (_, i) => ({
    label: (new Date().getFullYear() - i).toString(),
    value: (new Date().getFullYear() - i).toString(),
  }));

  const getMonthName = (monthIndex: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: getMonthName(i),
    value: getMonthName(i),
  }));

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));

  const resetFilters = () => {
    setYear("");
    setMonth("");
    setDay("");
    setSaveSearch(false);
  };

  const applyFilters = () => {
    console.log({ year, month, day, saveSearch });
    // Handle applying filters here
    // You can make API calls or perform any other action based on the selected filters
  };

  return (
    <FrameWithHeader>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mb-4 px-4`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="gray" />
        </TouchableOpacity>
        <Text
          style={tw`text-xl tracking-wide text-center font-semibold uppercase`}
        >
          Filters
        </Text>
        <TouchableOpacity onPress={() => resetFilters()}>
          <Text style={tw`text-base text-gray-500`}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* INPUTS */}
      <View style={tw`gap-8`}>
        {/* Year Picker */}
        <RNPickerSelect
          onValueChange={(value) => setYear(value)}
          items={years}
          style={pickerSelectStyles}
          placeholder={{ label: "Year", value: null }}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={25}
              color="gray"
              style={tw`mt-4`}
            />
          )}
        />

        {/* Month Picker */}
        <RNPickerSelect
          onValueChange={(value) => setMonth(value)}
          items={months}
          style={pickerSelectStyles}
          placeholder={{ label: "Month", value: null }}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={25}
              color="gray"
              style={tw`mt-4`}
            />
          )}
        />

        {/* Day Picker */}
        <RNPickerSelect
          onValueChange={(value) => setDay(value)}
          items={days}
          style={pickerSelectStyles}
          placeholder={{ label: "Day", value: null }}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={25}
              color="gray"
              style={tw`mt-4`}
            />
          )}
        />
      </View>

      {/* Save Search Toggle */}
      <View style={tw`flex-row gap-4 items-center mt-8`}>
        <Text style={tw`text-base`}>Save search</Text>
        <Switch
          value={saveSearch}
          onValueChange={setSaveSearch}
          thumbColor={saveSearch ? "white" : "gray"}
        />
      </View>

      {/* Apply Button */}
      <Button style={tw` mt-8`} size="lg" onPress={applyFilters}>
        <Text style={tw`text-center text-white text-lg`}>Apply</Text>
      </Button>
    </FrameWithHeader>
  );
};
const pickerSelectStyles = {
  inputIOS: tw`border-b border-gray-300 text-lg p-2`,
  inputAndroid: tw`border-b border-gray-300 text-lg p-2`,
};

export default FilterScreen;
