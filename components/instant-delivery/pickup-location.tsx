import tw from "twrnc";
import { Text, View } from "../Themed";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Button } from "../ui/button";

interface PickLocationProps {
  pickupLocation: any | null;
  deliveryLocation: any | null;
}

const PickLocation = ({
  pickupLocation,
  deliveryLocation,
}: PickLocationProps) => {
  return (
    <View style={tw`px-4`}>
      <Text style={tw`text-lg font-semibold mt-4`}>Instant Delivery</Text>

      {/* Pickup Location */}
      <Text style={tw`text-sm font-medium text-gray-500 mt-4`}>
        Pickup Location
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/search",
            params: { from: "pickup", type: "instant" },
          });
        }}
        style={tw`bg-gray-100 p-3 rounded-lg mt-2`}
      >
        <Text style={tw`text-base text-gray-700`}>
          📍 {pickupLocation ? pickupLocation?.details : "Pick a location"}
        </Text>
      </TouchableOpacity>

      {/* Delivery Location */}
      <Text style={tw`text-sm font-medium text-gray-500 mt-4`}>
        Delivery Location
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/search",
            params: { from: "delivery", type: "instant" },
          });
        }}
        style={tw`bg-gray-100 p-3 rounded-lg mt-2`}
      >
        <Text style={tw`text-base text-gray-700`}>
          📍 {deliveryLocation ? deliveryLocation?.details : "Pick a location"}
        </Text>
      </TouchableOpacity>

      {/* //TODO" FOR SCHEDULED DELIVERY, ADD DATE AND TIME INPUTS */}

      {/* Vehicle Type */}
      {/* <Text style={tw`text-sm font-medium text-gray-500   mt-4`}>
              Vehicle Type
            </Text>
            <View style={tw`flex-row gap-5 mt-2 w-full `}>
              <TouchableOpacity
                style={[
                  tw`w-[30%] bg-gray-100 flex items-center justify-center p-4 rounded-lg`,
                  selectedVehicle === "bike" ? tw`bg-[#A8DADC]` : null,
                ]}
                onPress={() => handleVehicleSelect("bike")}
              >
                <Image
                  source={require("@/assets/images/icons/bike.png")}
                  style={{
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`w-[30%] flex items-center justify-center bg-gray-100 p-4 rounded-lg`,
                  selectedVehicle === "car" ? tw`bg-[#A8DADC]` : null,
                ]}
                onPress={() => handleVehicleSelect("car")}
              >
                <Image
                  source={require("@/assets/images/icons/car.png")}
                  style={{
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`w-[30%] flex items-center justify-center bg-gray-100 p-4 rounded-lg`,
                  selectedVehicle === "van" ? tw`bg-[#A8DADC]` : null,
                ]}
                onPress={() => handleVehicleSelect("van")}
              >
                <Image
                  source={require("@/assets/images/icons/van.png")}
                  style={{
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View> */}

      {/* Next Button */}
      <Button
        style={[
          tw`rounded-lg mt-6 `,
          pickupLocation === null || deliveryLocation == null
            ? tw`opacity-40`
            : null,
        ]}
        onPress={() => router.push("/select-item")}
        size="lg"
        disabled={pickupLocation === null || deliveryLocation == null}
      >
        <Text style={tw`text-white text-center font-semibold `}>Next</Text>
      </Button>
    </View>
  );
};

export default PickLocation;
