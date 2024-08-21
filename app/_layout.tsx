import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import Toast from "react-native-toast-message";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "welcome/splash",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Toast />
      <Stack>
        <Stack.Screen name="welcome/splash" options={{ headerShown: false }} />

        {/* PUBLIC SCREEN */}
        <Stack.Screen name="(auth)/start" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/onboarding"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/forgot-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/verify-otp"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/verify-email"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/set-new-password"
          options={{ headerShown: false }}
        />

        {/* PRIVATE SCREENS */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="instant-delivery"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="schedule-delivery"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="select-item" options={{ headerShown: false }} />

        {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
      </Stack>
    </ThemeProvider>
  );
}
