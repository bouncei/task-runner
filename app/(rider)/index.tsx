import tw from "twrnc";

import { Text, View } from "@/components/Themed";
import { Image, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { primary } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TripCard from "@/components/cards/trip-card";

const HomeScreen = () => {
  const handleNavigation = () => {
    // TODO: Handle navigation logic
  };

  return (
    <View style={tw`flex-1 h-full  gap-4 h-full w-full bg-[#EBF0FA]  `}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 h-full  pb-52 bg-transparent relative `}>
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

          <View style={tw`absolute top-[10rem] w-full px-6 bg-transparent`}>
            <View style={tw`gap-4 bg-transparent`}>
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
            </View>
            {/* <PreviousTripCard /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
