import tw from "twrnc";
import { Image, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

import { Text, View } from "@/components/Themed";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { primary } from "@/constants/Colors";
import TripCard from "@/components/cards/trip-card";
import PreviousTripCard from "@/components/cards/previous-trip-card";

const HomeScreen = () => {
  const handleNavigation = () => {
    // TODO: Handle navigation logic
  };

  return (
    <View style={tw`flex-1  gap-4 h-full w-full bg-[#EBF0FA]  `}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`relative`}
      >
        <View style={tw`flex-1  bg-transparent relative `}>
          {/* HEADER */}
          <View
            style={tw`flex-row justify-between items-center px-4 h-[13rem] bg-[${primary}] rounded-b-[50px]`}
          >
            <View style={tw`flex-row items-center bg-[${primary}]`}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={tw`w-12 h-12 rounded-full`}
              />
              <View style={tw`ml-4 bg-transparent gap-2`}>
                <Text style={tw`text-xl text-white font-bold`}>
                  Hi Michael,
                </Text>
                <Text style={tw`text-xs text-white`}>G5JHSKAI</Text>
              </View>
            </View>

            <View style={tw`flex-row items-center gap-4 bg-transparent`}>
              <FontAwesome name="bell" size={25} color="white" />
              <FontAwesome name="search" size={25} color="white" />
            </View>
          </View>

          <View
            style={tw`absolute top-[10rem] w-full h-full px-6 bg-transparent pb-20`}
          >
            <View style={tw`gap-4 bg-transparent`}>
              {/* ALL TRIPS FOR THE PRESENT DAY*/}
              <Pressable
                onPress={() => router.push("/rides")}
                style={tw`bg-white shadow-md py-4 rounded-[20px] `}
              >
                <View
                  style={tw`bg-transparent h-[6rem] items-center justify-center px-4 pb-4`}
                >
                  <Text style={tw`text-2xl tracking-wider`}>Today</Text>
                </View>

                <View
                  style={tw`px-4 pt-4 border-t border-[#EBF0FA] flex-row items-center justify-between`}
                >
                  <View style={tw`flex-row items-center gap-1`}>
                    <FontAwesome6 name="repeat" size={20} color="black" />
                    <Text style={tw`text-lg tracking-wide`}>14 Rides</Text>
                  </View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <FontAwesome6 name="clock" size={20} color="black" />
                    <Text style={tw`text-base tracking-wide`}>23H</Text>
                  </View>
                </View>
              </Pressable>

              {/* LATEST TRIPS */}
              <TripCard
                title="Ongoing Trip"
                user="Megan Fox"
                rating="4.8"
                onPress={handleNavigation}
              />
              <TripCard
                title="Upcoming Trip"
                user="Megan Fox"
                rating="4.8"
                onPress={handleNavigation}
              />

              {/* PREVIUS TRIPS */}
              <PreviousTripCard />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
