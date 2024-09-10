import DeliveryCard from "@/components/cards/delivery-card";
import { Text, View } from "@/components/Themed";
import { Input } from "@/components/ui/input";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { primary } from "@/constants/Colors";
import { useDeliveryStore } from "@/stores/delivery-store";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";

const RiderSearch = () => {
  const { deliveries } = useDeliveryStore();
  const [searchQuery, setSearchQuery] = useState(""); // Add a state for search query

  return (
    <FrameWithHeader showBack title="Search">
      {/* HEADER */}
      <View style={tw`flex flex-row items-center gap-2 `}>
        {/* SEARCH BAR */}
        <View
          style={tw` flex-1 flex-row bg-[#F0F5F5] items-center  border border-[${primary}] rounded-full px-3  `}
        >
          <MaterialIcons name="search" size={25} style={tw`text-gray-400`} />
          <Input
            style={[
              tw` pb-3 border-0`,
              {
                width: "auto",
              },
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Where do you want to go?"
            placeholderTextColor="gray"
          />
        </View>

        {/* FILTER ICON */}
        <TouchableOpacity onPress={() => router.push("/rider-filter")}>
          <MaterialIcons name="tune" size={28} style={tw`text-[#060607]`} />
        </TouchableOpacity>
      </View>

      {/* DISPLAY RECET SEARCHES */}
      <View style={tw`mt-3`}>
        <View style={tw`flex-row items-center justify-between `}>
          <Text style={tw`font-medium text-lg `}>Recent Rides</Text>
          <TouchableOpacity>
            <Text style={tw`text-gray-500`}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`gap-3 `}>
          {/* TODO: MAKE NECCESSARY UPDATES HERE */}
          {deliveries.map((delivery, index) => (
            <DeliveryCard key={index} delivery={delivery} />
          ))}
        </View>
      </View>
    </FrameWithHeader>
  );
};

export default RiderSearch;
