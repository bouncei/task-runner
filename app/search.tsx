import { useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import tw from "twrnc";
import debounce from "lodash.debounce";

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
  const { from } = useRoute().params as any;
  const { setNewDelivery, newDelivery } = useDeliveryStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? "light";

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      // Call your search API or perform search logic here
      // For demo purposes, let's assume we have a search function
      const searchFunction = async (query: string) => {
        try {
          const response = await fetch(`https://example.com/search?q=${query}`);
          const data = await response.json();
          return data.results;
        } catch (error) {
          console.error(error);
          return [];
        }
      };

      setLoading(true);
      searchFunction(query)
        .then((results) => {
          setSearchResults(results);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 500),
    []
  );

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const selectLocation = (location: any) => {
    if (from === "pickup" || from === "delivery") {
      const newLocation = {
        ...location,
        name: location.name,
        details: location.details,
      };
      if (from === "pickup") {
        setNewDelivery({
          locations: {
            pickup: newLocation,
            delivery: newDelivery?.delivery,
          },
          itemDetails: undefined,
          rider: undefined,
        });
      } else {
        setNewDelivery({
          locations: {
            delivery: newLocation,
            pickup: newDelivery?.pickup,
          },
          itemDetails: undefined,
          rider: undefined,
        });
      }
      router.back();
    } else {
      console.error("Invalid 'from' parameter:", from);
    }
  };

  return (
    <FrameWithHeader>
      <KeyboardAvoidingView
        style={tw`bg-[#0069701A] px-3 py-2 rounded-lg mt-2 flex flex-row gap-2 items-center `}
      >
        <EvilIcons name="location" size={28} color={Colors[colorScheme].text} />

        <Input
          colorScheme={colorScheme}
          style={tw`bg-transparent border-0 px-0`}
          placeholder="Search location..."
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
          keyboardType="web-search"
        />
      </KeyboardAvoidingView>

      {loading ? (
        <Text style={tw`w-full text-center font-medium text-base`}>
          Loading...
        </Text>
      ) : (
        <View style={tw`gap-3`}>
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
            {resentSearches.map((result, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  selectLocation(result);
                }}
                style={tw`flex items-center flex-row justify-between py-3`}
              >
                <View style={tw`flex flex-row gap-3`}>
                  <FontAwesome6 size={25} name="clock" color={primary} />

                  <View style={tw`gap-1`}>
                    <Text style={tw`font-medium`}>{result.name}</Text>
                    <Text style={tw`text-[#B8B8B8]`}>{result.details}</Text>
                  </View>
                </View>

                <Text style={tw`font-medium`}>{result.distance}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </FrameWithHeader>
  );
};

export default SearchScreen;
