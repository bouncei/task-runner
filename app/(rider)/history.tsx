import tw from "twrnc";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { primary } from "@/constants/Colors";
import RiderHistoryCard from "@/components/cards/rider-history-card";

const dummyHistory = [
  {
    id: 1,
    status: "completed",
    title: "Nate",
    description: "Mustang Shelby GT",
  },
  {
    id: 2,
    status: "cancelled",
    title: "John",
    description: "Ford Mustang",
  },
  {
    id: 3,
    status: "completed",
    title: "Jane",
    description: "Chevrolet Camaro",
  },
  {
    id: 4,
    status: "cancelled",
    title: "Bob",
    description: "Dodge Challenger",
  },
];

const HistoryScreen = () => {
  const [activeTab, setActiveTab] = useState<`completed` | `cancelled`>(
    "completed"
  );

  const handleTabSwitch = (field: "completed" | "cancelled") => {
    setActiveTab(field);
  };

  const filteredHistory = dummyHistory.filter(
    (item) => item.status === activeTab
  );

  return (
    <FrameWithHeader showBack title="History">
      {/* TABS */}
      <View style={tw`flex-row bg-gray-200 rounded-full `}>
        <TouchableOpacity
          style={tw`flex-1 h-[50px]  justify-center rounded-full ${
            activeTab === "completed" ? `bg-[${primary}]` : ""
          }`}
          onPress={() => handleTabSwitch("completed")}
        >
          <Text
            style={tw`text-center text-white ${
              activeTab === "completed" ? "font-bold" : `text-[${primary}]`
            }`}
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 h-[50px]  justify-center rounded-full ${
            activeTab === "cancelled" ? `bg-[${primary}]` : ""
          }`}
          onPress={() => handleTabSwitch("cancelled")}
        >
          <Text
            style={tw`text-center text-white ${
              activeTab === "cancelled" ? "font-bold" : `text-[${primary}]`
            }`}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Items */}
      {filteredHistory.map((item) => (
        <RiderHistoryCard
          key={item.id}
          status={item.status}
          title={item.title}
          description={item.description}
        />
      ))}
    </FrameWithHeader>
  );
};

export default HistoryScreen;
