import React, { useState } from "react";
import tw from "twrnc";
import { ScrollView, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { primary } from "@/constants/Colors";
import MainTripCard from "@/components/cards/main-trip-card";

interface TabSwitcherProps {
  activeTab: string;
  handleTabSwitch: (field: "Ongoing" | "Upcoming") => void;
}

const dummyTrips = [
  {
    status: "Ongoing",
    itemNumber: "JDIEISKLAWKD",
    pickupLocation: "32 Samwell Sq, Chevron",
    deliveryLocation: "21b, Karimu Kotun Street, Victoria Island",
  },
  {
    status: "Ongoing",
    itemNumber: "JDIEISKLAWKD",
    pickupLocation: "32 Samwell Sq, Chevron",
    deliveryLocation: "21b, Karimu Kotun Street, Victoria Island",
  },

  // Add more trip data as needed
];

const RidesScreen = () => {
  const [activeTab, setActiveTab] = useState<"Ongoing" | "Upcoming">("Ongoing");

  const handleTabSwitch = (field: "Ongoing" | "Upcoming") => {
    setActiveTab(field);
  };

  return (
    <FrameWithHeader title={activeTab} disableScroll showBack>
      <TabSwitcher activeTab={activeTab} handleTabSwitch={handleTabSwitch} />

      <ScrollView contentContainerStyle={tw``}>
        {dummyTrips.map((trip, index) => (
          <MainTripCard
            key={index}
            status={trip.status}
            itemNumber={trip.itemNumber}
            pickupLocation={trip.pickupLocation}
            deliveryLocation={trip.deliveryLocation}
          />
        ))}
      </ScrollView>
    </FrameWithHeader>
  );
};

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  handleTabSwitch,
}) => {
  return (
    <View style={tw`flex-row bg-gray-200 rounded-full `}>
      <TouchableOpacity
        style={tw`flex-1 h-[50px]  justify-center rounded-full ${
          activeTab === "Ongoing" ? `bg-[${primary}]` : ""
        }`}
        onPress={() => handleTabSwitch("Ongoing")}
      >
        <Text
          style={tw`text-center text-white ${
            activeTab === "Ongoing" ? "font-bold" : `text-[${primary}]`
          }`}
        >
          Ongoing
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-1 h-[50px]  justify-center rounded-full ${
          activeTab === "Upcoming" ? `bg-[${primary}]` : ""
        }`}
        onPress={() => handleTabSwitch("Upcoming")}
      >
        <Text
          style={tw`text-center text-white ${
            activeTab === "Upcoming" ? "font-bold" : `text-[${primary}]`
          }`}
        >
          Upcoming
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RidesScreen;
