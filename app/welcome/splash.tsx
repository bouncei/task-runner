import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "@/stores/auth-store";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";

const Splash = () => {
  const navigation = useNavigation();
  const { security, loggedInRole } = useAuthStore();
  const pulseAnimation = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 0.75,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();

    const timer = setTimeout(() => {
      security
        ? loggedInRole === "sender" || !loggedInRole
          ? router.replace("/(sender)")
          : router.replace("/(rider)")
        : router.push("/(auth)/start");
      // router.push("/(sender)");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation, pulseAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: pulseAnimation }] },
        ]}
      >
        <Text style={{ fontSize: 40 }}>Taskrunner</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
  },
  logoContainer: {},
  img: {
    width: 290,
    height: 280,
    resizeMode: "contain",
  },
});

export default Splash;
