import { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";

import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useDeliveryStore } from "@/stores/delivery-store";
import PickLocation from "@/components/schedule-delivery/pick-location";

const ScheduleDeliveryScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const { params } = useRoute() as any;
  const { newDelivery, setNewDelivery } = useDeliveryStore();
  const [pickupLocation, setPickUpLocation] = useState<any | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<any | null>(null);

  const [step, setStep] = useState<"location" | "confirmDetails">("location"); // TODO: location, time/date, confirmDetails
  const { width, height } = Dimensions.get("window");
  const snapPoints = useMemo(() => {
    if (step === "confirmDetails" || step === "location") return ["25%", "55%"];

    return ["15%", "40%"];
  }, [step]);

  useEffect(() => {
    setPickUpLocation(newDelivery?.pickup);
    setDeliveryLocation(newDelivery?.delivery);
  }, [newDelivery]);

  useEffect(() => {
    if (!params.step) return;
    const { step } = params;

    setStep(step);
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
          setNewDelivery({
            itemDetails: null,
            locations: null,
            rider: null,
            type: null,
          });
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
        ) : null}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default ScheduleDeliveryScreen;
