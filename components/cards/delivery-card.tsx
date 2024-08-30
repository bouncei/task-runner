import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { View, Text } from "../Themed";
import tw from "twrnc";
import { Delivery } from "@/lib/types";
import { Entypo } from "@expo/vector-icons";
import Colors, { primary } from "@/constants/Colors";
import { formatDateTime } from "@/lib/utils";

type DeliveryCardProps = {
  delivery: Delivery;
};

const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery }) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={tw` p-2 pb-4 rounded-lg border-b border-gray-200 my-2`}
    >
      <View style={tw`flex-row justify-between items-center`}>
        <View>
          <Text style={tw`text-lg font-semibold text-[${primary}]`}>
            ORDER - {delivery.id}
          </Text>
          <Text style={tw`text-base text-gray-500 `}>
            Recipient: {delivery.client_fullname}
          </Text>
        </View>

        {/* STATUS */}
        <View
          style={tw`bg-orange-500 p-2 rounded-md `}
          // onPress={onScheduleDelivery}
        >
          <Text style={tw`text-white text-center font-semibold text-xs `}>
            Schedule Delivery
          </Text>
        </View>
      </View>

      <View style={tw`flex-row items-start gap-3 mt-3`}>
        <View style={tw`bg-[#006970] bg-opacity-10 p-2 rounded-md`}>
          <Image
            source={require("@/assets/images/icons/bike.png")}
            style={[
              {
                resizeMode: "contain",
              },
              tw` size-9`,
            ]}
          />
        </View>

        <View style={tw`flex-col items-start`}>
          <View style={tw`flex-row items-center`}>
            <Entypo name="location-pin" size={18} color={primary} />
            <Text style={tw`text-sm font-medium text-gray-500`}>Drop off</Text>
          </View>
          <Text style={tw`text-base text-[${primary}]`}>
            {delivery.delivery_address}
          </Text>

          {/* TODO: DATE */}
          <Text style={tw`text-sm text-gray-500 mt-2`}>
            {formatDateTime(new Date(delivery.created_date))}
          </Text>
        </View>
      </View>

      {/* <Text style={tw`text-sm text-gray-500 mt-2`}>{`${date}, ${time}`}</Text> */}
    </TouchableOpacity>
  );
};

export default DeliveryCard;
