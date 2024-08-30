import { View, Text } from "@/components/Themed";
import { primary } from "@/constants/Colors";
import { useAuthStore } from "@/stores/auth-store";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import tw from "twrnc";

const ProfileScreen = () => {
  const colorScheme = useColorScheme() ?? "light";
  const { logout } = useAuthStore();

  const handleImgUpload = () => {};

  const handleLogout = () => {
    logout();
    router.replace("/start");
  };

  return (
    <View style={tw`flex-1 p-4  `}>
      <ScrollView>
        {/* Profile Section */}
        <View
          style={tw`items-center justify-center py-10 mt-20 border-b border-gray-200 `}
        >
          <View style={tw`relative items-center`}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
              }} // Replace with your image URL or require local asset
              style={tw`w-24 h-24 rounded-full `}
            />
            <Text style={tw`mt-4 text-xl font-semibold`}>Davidson Edgar</Text>

            <TouchableOpacity
              onPress={() => handleImgUpload()}
              style={tw`absolute bottom-10 right-6`}
            >
              <Entypo name="camera" size={20} color={primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Options */}
        <View style={tw`mt-3`}>
          <TouchableOpacity
            style={tw`flex-row items-center p-4 `}
            onPress={() => router.push("/address")}
          >
            <FontAwesome
              name="history"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text style={tw`ml-4 text-base`}>My Address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center p-4 `}
            onPress={() => router.push("/(tabs)/history")}
          >
            <FontAwesome
              name="history"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />

            <Text style={tw`ml-4 text-base`}>Delivery History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center p-4 `}
            onPress={() => router.push("/support-faq")}
          >
            <Entypo
              name="help-with-circle"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text style={tw`ml-4 text-base`}>Support/FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-row items-center p-4 `}>
            <Ionicons
              name="person-add-sharp"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text style={tw`ml-4 text-base`}>Invite Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center p-4 `}
            onPress={() => router.push("/my-riders")}
          >
            <FontAwesome5
              name="car-alt"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text style={tw`ml-4 text-base`}>My Riders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center p-4 `}
            onPress={() => router.push("/settings")}
          >
            <Ionicons
              name="settings-sharp"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text style={tw`ml-4 text-base`}>Setting</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={tw`flex-row items-center  mt-10 p-4`}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="red" />
          <Text style={tw`ml-4 text-base text-red-500`}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
