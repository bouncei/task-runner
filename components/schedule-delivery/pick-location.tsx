import { useState } from "react";
import tw from "twrnc";
import { Text, View } from "../Themed";
import { TouchableOpacity, Platform } from "react-native";
import { router } from "expo-router";
import { Button } from "../ui/button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDeliveryStore } from "@/stores/delivery-store";

interface PickLocationProps {
  pickupLocation: any | null;
  deliveryLocation: any | null;
}

const PickLocation = ({
  pickupLocation,
  deliveryLocation,
}: PickLocationProps) => {
  const { setNewDelivery, newDelivery } = useDeliveryStore();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    setNewDelivery({ date: currentDate, type: "schedule" });
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
    setNewDelivery({ time: currentTime, type: "schedule" });
  };

  return (
    <View style={tw`px-4`}>
      <Text style={tw`text-lg font-semibold mt-4`}>Schedule Delivery</Text>

      {/* Pickup Location */}
      <Text style={tw`text-sm font-medium text-gray-500 mt-4`}>
        Pickup Location
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/search",
            params: { from: "pickup", type: "schedule" },
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
            params: { from: "delivery", type: "schedule" },
          });
        }}
        style={tw`bg-gray-100 p-3 rounded-lg mt-2`}
      >
        <Text style={tw`text-base text-gray-700`}>
          📍 {deliveryLocation ? deliveryLocation?.details : "Pick a location"}
        </Text>
      </TouchableOpacity>

      <View style={tw`flex items-center gap-5 flex-row `}>
        {/* Select Date */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-sm font-medium text-gray-500 mt-4`}>
            Select Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={tw`bg-gray-100 p-3 rounded-lg mt-2`}
          >
            <Text style={tw`text-base text-gray-700`}>
              📅 {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        {/* Select Time */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-sm font-medium text-gray-500 mt-4`}>
            Select Time
          </Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={tw`bg-gray-100 p-3 rounded-lg mt-2`}
          >
            <Text style={tw`text-base text-gray-700`}>
              ⏰ {time.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
      </View>

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
