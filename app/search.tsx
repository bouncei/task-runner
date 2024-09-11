import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import tw from "twrnc";

import { View, Text } from "@/components/Themed";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Input } from "@/components/ui/input";
import {
  EvilIcons,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import Colors, { primary } from "@/constants/Colors";
import { router } from "expo-router";
import { useDeliveryStore } from "@/stores/delivery-store";
import { useAddressStore } from "@/stores/address-store";
import { useAuthStore } from "@/stores/auth-store";
import { Address } from "@/lib/types";

const resentSearches = [
  {
    name: "New York City",
    details: "Manhattan, New York, USA",
    distance: "2.7km",
  },
  {
    name: "Los Angeles",
    details: "California, USA",
    distance: "3.5km",
  },
  {
    name: "Chicago",
    details: "Illinois, USA",
    distance: "1.2km",
  },
  {
    name: "Houston",
    details: "Texas, USA",
    distance: "4.1km",
  },
  {
    name: "Phoenix",
    details: "Arizona, USA",
    distance: "2.1km",
  },
  {
    name: "Philadelphia",
    details: "Pennsylvania, USA",
    distance: "3.8km",
  },
  {
    name: "San Antonio",
    details: "Texas, USA",
    distance: "1.9km",
  },
  {
    name: "San Diego",
    details: "California, USA",
    distance: "2.5km",
  },
  {
    name: "Dallas",
    details: "Texas, USA",
    distance: "3.2km",
  },
  {
    name: "San Jose",
    details: "California, USA",
    distance: "1.7km",
  },
];

const SearchScreen = () => {
  const { from, type } = useRoute().params as any;

  const { security } = useAuthStore();
  const { setNewDelivery, newDelivery } = useDeliveryStore();
  const { addresses, getAddresses, loading } = useAddressStore();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const colorScheme = useColorScheme() ?? "light";

  useEffect(() => {
    getAddresses(security!);
  }, []);

  let timeoutId: any;

  const locationSearch = useCallback((query: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(async () => {
      try {
        // TODO: USE APPROPRAITE ENDPOINT
        const response = await fetch(`https://example.com/search?q=${query}`);
        const data = await response.json();
        setSearchResults(data.results);
        setSearchLoading(false);
      } catch (error) {
        console.error(error);
        setSearchLoading(false);
      }
    }, 1000);
  }, []);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    locationSearch(query);
  };

  const selectLocation = (location: Address) => {
    if (from === "pickup" || from === "delivery") {
      const newLocation = {
        ...location,
        name: location.title,
        details: location.pickup_address,
      };
      if (from === "pickup") {
        setNewDelivery({
          locations: {
            pickup: newLocation,
            delivery: newDelivery?.delivery,
          },
          itemDetails: undefined,
          rider: undefined,
          type,
        });
      } else {
        setNewDelivery({
          locations: {
            delivery: newLocation,
            pickup: newDelivery?.pickup,
          },
          itemDetails: undefined,
          rider: undefined,
          type,
        });
      }
      router.back();
    } else {
      console.error("Invalid 'from' parameter:", from);
    }
  };

  // TODO: IMPLEMENT SEARCH, SELECTION, AND DISPLAY ON DELIVERY LOCATION

  return (
    <FrameWithHeader>
      <View
        style={tw`bg-[#0069701A] px-3 py-2 rounded-lg mt-2 flex flex-row gap-2 items-center `}
      >
        <EvilIcons name="location" size={28} color={Colors[colorScheme].text} />

        <Input
          style={tw`bg-transparent border-0 px-0`}
          placeholder="Search location..."
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
          keyboardType="web-search"
        />
      </View>

      {searchLoading ? (
        <Text style={tw`w-full text-center font-medium text-base`}>
          Loading...
        </Text>
      ) : (
        <View style={tw`gap-3`}>
          {/* PICK UP LOCATIONS */}
          {loading ? (
            <ActivityIndicator style={tw`py-2`} color={primary} />
          ) : (
            <>
              <View
                style={tw`flex flex-row items-center justify-between border-b border-b-[#B8B8B8] py-2`}
              >
                <Text style={tw`text-xl font-semibold`}>Recent places</Text>

                <TouchableOpacity onPress={() => {}}>
                  <Text style={[{ color: primary }, tw`font-semibold`]}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={tw`flex-col gap-4`}>
                {addresses.map((address, index) => (
                  <LocationCard
                    key={index}
                    title={address.title}
                    pickup_address={address.pickup_address}
                    handleSelect={() => selectLocation(address)}
                  />
                ))}
              </View>
            </>
          )}

          {/* //TODO: DELIVERY LOCATIONS */}
        </View>
      )}
    </FrameWithHeader>
  );
};

interface LocationCardProps {
  title: string;
  pickup_address: string;
  distance?: string;

  handleSelect: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  title,
  pickup_address,
  distance,
  handleSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleSelect?.();
      }}
      style={tw`flex items-center flex-row justify-between py-3`}
    >
      <View style={tw`flex flex-row gap-3`}>
        <FontAwesome6 size={25} name="clock" color={primary} />

        <View style={tw`gap-1`}>
          <Text style={tw`font-medium`}>{title}</Text>
          <Text style={tw`text-[#B8B8B8]`}>{pickup_address}</Text>
        </View>
      </View>

      <Text style={tw`font-medium`}>2.7km</Text>
    </TouchableOpacity>
  );
};

export default SearchScreen;
