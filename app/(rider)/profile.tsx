import { View, Text } from "@/components/Themed";
import { Button } from "@/components/ui/button";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { primary } from "@/constants/Colors";
import { useAuthStore } from "@/stores/auth-store";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
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
    <FrameWithHeader>
      {/* Profile Section */}
      <View
        style={tw`items-center flex-row items-center py-5  border-b border-gray-200 `}
      >
        <View style={tw` flex-1 flex-row items-center gap-4`}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
            }} // Replace with your image URL or require local asset
            style={tw`size-20 rounded-full `}
          />
          <View>
            <Text style={tw` text-lg font-semibold`}>Oluwa Tobi</Text>
            <Text style={tw` text-base `}>Biker</Text>
          </View>
        </View>

        {/* EDIT BUTTON */}
        <Button>
          <Text style={tw`text-white`}>Edit</Text>
        </Button>
      </View>

      {/* Navigation Options */}
      <View style={tw``}>
        {/* EDIT PROFILE */}
        <TouchableOpacity
          style={tw`flex-row items-center py-4 `}
          //   onPress={() => router.push("/address")}
        >
          <FontAwesome5
            name="user-edit"
            size={23}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text style={tw`ml-4 text-base`}>Edit Profile</Text>
        </TouchableOpacity>

        {/* PAYMENTS */}
        <TouchableOpacity
          style={tw`flex-row items-center py-4 `}
          //   onPress={() => router.push("/address")}
        >
          <MaterialIcons
            name="credit-card"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text style={tw`ml-4 text-base`}>Payments</Text>
        </TouchableOpacity>

        {/* MY ADDRESSES */}
        <TouchableOpacity
          style={tw`flex-row items-center py-4 `}
          onPress={() => router.push("/address")}
        >
          <FontAwesome
            name="history"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text style={tw`ml-4 text-base`}>My Address</Text>
        </TouchableOpacity>

        {/* DELIVERY HISTORY */}
        <TouchableOpacity
          style={tw`flex-row items-center py-4 `}
          onPress={() => router.push("/(rider)/history")}
        >
          <FontAwesome
            name="history"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />

          <Text style={tw`ml-4 text-base`}>Delivery History</Text>
        </TouchableOpacity>

        {/* SUPPOTY/FAQ */}
        <TouchableOpacity
          style={tw`flex-row items-center py-4 `}
          onPress={() => router.push("/support-faq")}
        >
          <Entypo
            name="help-with-circle"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text style={tw`ml-4 text-base`}>Support/FAQ</Text>
        </TouchableOpacity>

        {/* INVITE FRIENDS */}
        <TouchableOpacity style={tw`flex-row items-center py-4 `}>
          <Ionicons
            name="person-add-sharp"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text style={tw`ml-4 text-base`}>Invite Friends</Text>
        </TouchableOpacity>

        {/* MY RIDES */}
        <TouchableOpacity
          style={tw`flex-row items-center py-4 `}
          onPress={() => router.push("/my-rides")}
        >
          <FontAwesome5
            name="car-alt"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text style={tw`ml-4 text-base`}>My Rides</Text>
        </TouchableOpacity>

        {/* SETTINGS */}
        <TouchableOpacity
          style={tw`flex-row items-center py-4 `}
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
        style={tw`flex-row items-center   py-4`}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={28} color="red" />
        <Text style={tw`ml-4 text-lg text-red-500`}>Sign out</Text>
      </TouchableOpacity>
    </FrameWithHeader>
  );
};

export default ProfileScreen;
