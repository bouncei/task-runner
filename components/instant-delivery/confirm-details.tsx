import { ScrollView } from "react-native";
import tw from "twrnc";

import { useDeliveryStore } from "@/stores/delivery-store";
import { Text, View } from "../Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "../ui/button";
import { router } from "expo-router";

interface ConfirmDetailsProps {
  handleNextStep: () => void;
}

const ConfirmDetails = ({ handleNextStep }: ConfirmDetailsProps) => {
  const { newDelivery } = useDeliveryStore();

  return (
    <ScrollView contentContainerStyle={tw`flex-1 p-6 `}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-medium`}>Confirm Details</Text>
      </View>

      <View style={tw`mb-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <FontAwesome name="map-marker" size={24} color="red" />
          <Text style={tw`ml-2 text-gray-600`}>Pickup Location</Text>
        </View>
        <Text style={tw`text-base font-medium text-black`}>
          {newDelivery?.pickup?.details}
        </Text>
      </View>

      <View style={tw`mb-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <FontAwesome name="map-marker" size={24} color="green" />
          <Text style={tw`ml-2 text-gray-600`}>Delivery Location</Text>
        </View>
        <Text style={tw`text-base font-medium text-black`}>
          {newDelivery?.delivery?.details}
        </Text>
      </View>

      <View style={tw`mb-4`}>
        <View style={tw`flex-row gap-20`}>
          <View>
            <Text style={tw`text-gray-600`}>What you are sending</Text>
            <Text style={tw`text-base font-medium text-black`}>
              {newDelivery?.itemData?.name}
            </Text>
          </View>
          <View>
            <Text style={tw`text-gray-600`}>Recipient</Text>
            <Text style={tw`text-base font-medium text-black`}>
              {newDelivery?.itemData?.recipientName}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600`}>Recipient contact number</Text>
        <Text style={tw`text-base font-medium text-black`}>
          {newDelivery?.itemData?.recipientPhone}
        </Text>
      </View>

      <View style={tw`mb-2`}>
        <Button
          variant="link"
          onPress={() =>
            router.push({
              pathname: "/select-item",
              params: {
                edit: "true",
              },
            })
          }
        >
          <Text style={tw`text-center text-base  text-[#006970] underline`}>
            Edit Details
          </Text>
        </Button>
      </View>

      <Button size="lg" onPress={handleNextStep}>
        <Text style={tw`text-center text-white text-base font-medium`}>
          Look for rider
        </Text>
      </Button>
    </ScrollView>
  );
};

export default ConfirmDetails;
