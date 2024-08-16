import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Text } from "../Themed";
import { useDeliveryStore } from "@/stores/delivery-store";

interface SelectRiderProps {
  handleNextStep: () => void;
}

const SelectRider = ({ handleNextStep }: SelectRiderProps) => {
  const { newDelivery, setNewDelivery } = useDeliveryStore();

  // TODO: GET RIDERS BY LOCATION USING THE useRidersStore custom hook

  const dummyRiderData = [
    {
      id: 1,
      name: "John Doe",
      phone: "B0BZK295",
      location: "Lagos",
      rating: 4.5,
      time: "10 mins",
    },
    {
      id: 2,
      name: "Meech Doe",
      phone: "B0BZK295",
      location: "Lagos",
      rating: 4.5,
      time: "10 mins",
    },
    {
      id: 3,
      name: "Divine James",
      phone: "B0BZK295",
      location: "Lagos",
      rating: 4.5,
      time: "13x mins",
    },
  ];

  const selectRider = (rider: any) => {
    setNewDelivery({
      itemDetails: newDelivery?.itemData,
      locations: {
        pickup: newDelivery?.pickup,
        delivery: newDelivery?.delivery,
      },
      rider: rider,
    });

    handleNextStep();
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 items-center p-6 `}>
      <View style={tw`w-full flex flex-col gap-5`}>
        {dummyRiderData.map((rider) => (
          <TouchableOpacity
            key={rider.id}
            onPress={() => selectRider(rider)}
            style={tw`bg-white p-5 rounded-xl
              shadow-md flex flex-row border border-gray-300 items-center justify-between gap-2`}
          >
            <View style={tw`flex-row gap-3 items-center`}>
              <Image
                source={require("@/assets/images/icons/bike.png")}
                style={{
                  resizeMode: "contain",
                }}
              />
              <View style={tw`items-start gap-1 flex-col`}>
                <Text style={tw` font-bold`}>{rider.name}</Text>

                <Text style={tw`bg-gray-100 text-sm px-2 py-1 rounded-lg `}>
                  {rider.phone}
                </Text>
              </View>
            </View>

            <Text style={tw`text-gray-500 text-sm`}>{rider.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default SelectRider;
