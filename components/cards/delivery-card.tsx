import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { View, Text } from "../Themed";
import tw from "twrnc";

type DeliveryCardProps = {
  deliveryId: string;
  recipient: string;
  location: string;
  date?: string;
  time?: string;
  status?: string;
};

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  deliveryId,
  recipient,
  location,
  date,
  time,
  status,
}) => {
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md my-2`}>
      <Text style={tw`text-lg font-semibold text-gray-800`}>{deliveryId}</Text>
      <Text style={tw`text-base text-gray-600 mt-1`}>
        Recipient: {recipient}
      </Text>

      <View style={tw`flex-row items-center mt-4`}>
        <Image
          // source={require("@/assets/images/empty-state/history.png")}
          style={{
            width: 24,
            height: 24,
            resizeMode: "contain",
            borderRadius: 10,
            backgroundColor: "#F7F7F7",
          }}
        />

        <View>
          <Text style={tw`text-sm font-medium text-gray-700`}>Drop off</Text>
          <Text style={tw`text-base text-gray-800`}>{location}</Text>
        </View>
      </View>

      {/* <Text style={tw`text-sm text-gray-500 mt-2`}>{`${date}, ${time}`}</Text> */}

      {/* STATUS */}
      <View
        style={tw`bg-orange-500 py-2 px-4 rounded-lg mt-4`}
        // onPress={onScheduleDelivery}
      >
        <Text style={tw`text-white text-center font-semibold`}>
          Schedule Delivery
        </Text>
      </View>
    </View>
  );
};

export default DeliveryCard;
