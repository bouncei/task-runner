import React, { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import tw from "twrnc";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Button } from "@/components/ui/button";
import { View, Text } from "@/components/Themed";
import { useDeliveryStore } from "@/stores/delivery-store";

interface PickLocationProps {
  pickupLocation: any | null;
  deliveryLocation: any | null;
}

interface ConfirmDetailsProps {
  handleNextStep: () => void;
}

interface SelectRiderProps {
  handleNextStep: () => void;
}

interface RideDetailsProps {
  handleNextStep: () => void;
}

const DeliveryScreen: React.FC = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const { params } = useRoute() as any;
  const { newDelivery, setNewDelivery } = useDeliveryStore();

  const [pickupLocation, setPickUpLocation] = useState<any | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<any | null>(null);
  const [itemData, setItemData] = useState<any | null>(null);

  const [step, setStep] = useState<
    "location" | "confirmDetails" | "selectRider" | "rideDetails" | "rateRider"
  >("location"); // Options: location, confirmDetails, selectRider, rideDetails, rateRider

  const { width, height } = Dimensions.get("window");
  const snapPoints = useMemo(() => {
    if (step === "confirmDetails" || step === "selectRider")
      return ["25%", "55%"];

    return ["15%", "40%"];
  }, [step]);

  useEffect(() => {
    setPickUpLocation(newDelivery?.pickup);
    setDeliveryLocation(newDelivery?.delivery);
  }, [newDelivery]);

  useEffect(() => {
    if (!params.step) return;
    const { step, ...newItemData } = params;

    if (params.step === "confirmDetails") setItemData(newItemData);
    setStep(params.step);
  }, [params]);

  return (
    <GestureHandlerRootView style={tw`flex-1 `}>
      {/* Map View */}
      <MapView
        style={[{ width, height }, tw`absolute inset-0`]}
        initialRegion={{
          latitude: 6.5244,
          longitude: 3.3792,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Markers */}
        <Marker
          coordinate={{ latitude: 6.5244, longitude: 3.3792 }}
          title="Pickup Location"
          description="32 Samwell Sq, Chevron"
        />
        <Marker
          coordinate={{ latitude: 6.43, longitude: 3.4127 }}
          title="Delivery Location"
          description="21b, Karimu Kotun Street, Victoria Island"
        />
        {/* //TODO: ADD REQUIRED MARKERS */}
      </MapView>

      {/* Back Button */}
      <TouchableOpacity
        style={tw`absolute top-14 left-5 bg-white p-2 rounded-full shadow-xl`}
        onPress={() => {
          // RESET newDelevery global state
          setNewDelivery({ itemDetails: null, locations: null, rider: null });
          router.replace("/(tabs)");
        }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        style={tw`shadow-lg`}
      >
        {step === "location" ? (
          // SELECT LOCATION
          <PickLocation
            pickupLocation={pickupLocation}
            deliveryLocation={deliveryLocation}
          />
        ) : step === "confirmDetails" ? (
          <ConfirmDetails handleNextStep={() => setStep("selectRider")} />
        ) : step === "selectRider" ? (
          <SelectRider handleNextStep={() => setStep("rideDetails")} />
        ) : step === "rideDetails" ? (
          <RideDetails handleNextStep={() => {}} />
        ) : null}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default DeliveryScreen;

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
            params: { from: "pickup" },
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
            params: { from: "delivery" },
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

const RideDetails = ({}: RideDetailsProps) => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl`}>Next Step: Delivery Details</Text>
    </View>
  );
};
