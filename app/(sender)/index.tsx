import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Button } from "@/components/ui/button";
import { useDeliveryStore } from "@/stores/delivery-store";
import { useEffect } from "react";
import DeliveryCard from "@/components/cards/delivery-card";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/auth-store";

export default function TabOneScreen() {
  const theme = useColorScheme() ?? "light";
  const { security } = useAuthStore();
  const { getDeliveries, deliveries, loading } = useDeliveryStore();

  useEffect(() => {
    if (!security) return;

    getDeliveries(security.email, security.token);
  }, [security]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.username}>Davidson Edgar</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  styles.avatar,
                ]}
              >
                <FontAwesome name="bell" size={25} color={Colors[theme].text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    backgroundColor: "#A8DADC",
                  },
                  styles.avatar,
                ]}
              >
                <Text>DE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`flex flex-col gap-4 pt-5`}>
            <Text style={tw`text-base`}>What would you like to do?</Text>

            <View style={tw`flex flex-row gap-4 `}>
              {/* INSTANT DELIVERY */}
              <LinearGradient
                colors={["#006970", "#008C94", "#00C9D6"]}
                style={tw`p-4 w-[48%] rounded-xl text-white`}
              >
                <TouchableOpacity
                  style={tw`flex gap-y-2 w-full`}
                  onPress={() => router.push("/instant-delivery")}
                >
                  <MaterialCommunityIcons
                    name="lightning-bolt-outline"
                    size={35}
                    color="white"
                  />
                  <Text style={tw`text-lg font-medium text-white`}>
                    Instant Delivery
                  </Text>

                  <Text style={tw`text-xs text-white`}>
                    Courier takes only your package and delivers instantly
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              {/* SCHEDULED DELIVERY */}
              <LinearGradient
                colors={["#1E1E1E", "#006B72"]}
                style={tw`p-4 w-[48%]  rounded-xl text-white`}
              >
                <TouchableOpacity
                  style={tw`flex gap-2`}
                  onPress={() => router.push("/schedule-delivery")}
                >
                  <FontAwesome name="clock-o" size={35} color="white" />
                  <Text style={tw`text-lg font-medium text-white`}>
                    Schedule Delivery
                  </Text>

                  <Text style={tw`text-xs text-white`}>
                    Courier comes to pick up on your specified date and time
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* HISTORY */}
            <View>
              {deliveries.length !== 0 && (
                <View
                  style={tw`w-full flex items-center flex-row justify-between`}
                >
                  <Text style={tw`text-lg font-medium`}>History</Text>

                  <TouchableOpacity
                    onPress={() => router.push("/(sender)/history")}
                  >
                    <Text style={tw`text-[#006970]`}>View all</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* DISPLAY HISTORY */}
              {loading ? (
                <View style={tw`py-20`}>
                  <ActivityIndicator size="large" color="#006970" />
                </View>
              ) : deliveries.length === 0 ? (
                <View
                  style={tw`flex flex-col py-10 gap-5 items-center  my-auto justify-center`}
                >
                  <Text style={tw`text-base`}>No history yet</Text>
                  {/* IMAGE FOR EMPTY STATE */}
                  <Image
                    source={require("@/assets/images/empty-state/history.png")}
                    style={{
                      width: "80%",
                      height: 200,
                      resizeMode: "cover",
                      // borderRadius: 10,
                    }}
                  />

                  <Button
                    onPress={() => router.push("/instant-delivery")}
                    style={tw`rounded-xl`}
                  >
                    <Text style={tw`text-white `}>Instant Delivery</Text>
                  </Button>
                </View>
              ) : (
                deliveries.map((delivery, index) => (
                  <DeliveryCard key={index} delivery={delivery} />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 80,
    // borderRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  welcomeText: {
    // color: "#fff",
    fontSize: 18,
  },
  username: {
    // color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    // color: "#fff",
    fontSize: 14,
    marginVertical: 10,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  scheduleButton: {
    backgroundColor: "#006B72",
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    width: "50%",
  },
  scheduleButtonInner: {
    // padding: 5,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 8,
    color: "#000",
  },
  scheduleButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  instantButton: {
    // backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    position: "absolute",
    bottom: 20,

    left: "10%",
    right: "10%",
  },
  instantButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
