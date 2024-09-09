import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Security, User } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/api/config";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface UserStore {
  user: User | null;
  loggedInRole: "rider" | "sender" | null;
  security: Security | null;
  otp: number | string | null;
  forgotEmail: string | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  register: (
    fname: string,
    email: string,
    pnumber: string,
    password: string,
    userRole: string
  ) => void;
  login: (email: string, password: string) => void;
  handleLoginRoleState: (role: "sender" | "rider") => void;
  forgotPassword: (email: string) => void;
  verifyOTP: (otp: string | number) => void;
  setPassword: (password: string) => void;
  handleChangePassword: (
    old_password: string,
    new_password: string,
    security: Security
  ) => void;

  logout: () => void;
}

const initialState = {
  user: null,
  loggedInRole: null,
  security: null,
  otp: null,
  forgotEmail: null,
  loading: false,
  success: false,
  error: null,
};

export const useAuthStore = create(
  persist<UserStore>(
    (set, get) => ({
      ...initialState,

      register: async (fname, email, pnumber, password, userRole) => {
        set({ loading: true });
        try {
          const response = await api.post(
            "/register",
            {
              fname,
              email,
              pnumber,
              password,
              userRole,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data) {
            console.log("Registered successfully:", response.data);
            set({ loading: false, success: true });
            Toast.show({
              type: "success",
              text1: "Registration successful!",
              text2:
                "You have successfully registered. Please login to continue.",
            });
            return true;
          }
        } catch (error: any) {
          set({ error: error.message, success: false });
          console.log("Error while registering a user:", error);
          Toast.show({
            type: "error",
            text1: "Registration failed!",
            text2: error.message,
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      login: async (email, password) => {
        set({ loading: true });
        const { loggedInRole } = get();
        try {
          const response = await api.post(
            "/login",
            {
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data) {
            console.log("Logged in successfully:", response.data);
            set({
              success: true,
              security: response.data.security,
              user: response.data.user_info,
              error: null,
            });

            Toast.show({
              type: "success",
              text1: "Login successful!",
            });

            loggedInRole === "rider"
              ? router.replace("/(rider)")
              : router.replace("/(sender)");

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            "Error while logging in a user:",
            error.response.data.message
          );
          Toast.show({
            type: "error",
            text1: "Login failed!",
            text2: error.response.data.message,
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      handleLoginRoleState: (role) => {
        set({ loggedInRole: role });
      },

      forgotPassword: async (email) => {
        set({ loading: true });
        try {
          const response = await api.post(
            "/forget-password",
            {
              email,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data) {
            console.log(
              "Forget password email sent successfully:",
              response.data
            );
            set({
              otp: response.data.otp,
              success: true,
            });
            Toast.show({
              type: "success",
              text1: "Forget password email sent!",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            "Error forgetting password:",
            error.response.data.message
          );
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      verifyOTP: async (otp) => {
        set({ loading: true });
        const { forgotEmail } = get();
        try {
          const response = await api.post(
            "/confirm-pin",
            {
              email: forgotEmail,
              pin: otp,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data) {
            console.log("OTP verified successfully:", response.data);
            set({
              otp: null,
              success: true,
            });

            Toast.show({
              type: "success",
              text1: "OTP verified",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log("Error verifying otp:", error.response.data.message);
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      setPassword: async (password) => {
        set({ loading: true });
        const { forgotEmail } = get();

        try {
          const response = await api.post(
            "/reset-password",
            {
              email: forgotEmail,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data) {
            console.log("Password reset successfully:", response.data);
            set({
              forgotEmail: null,
              success: true,
            });
            Toast.show({
              type: "success",
              text1: "Password reset successfully",
            });
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            "Error setting new password:",
            error.response.data.message
          );
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      handleChangePassword: async (old_password, new_password, security) => {
        set({ loading: true });
        try {
          const { token, email } = security;
          const response = await api.post(
            "/change-password",
            { old_password, new_password },
            {
              headers: {
                "Content-Type": "application/json",
                UserEmail: email,
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data) {
            set({ success: true });
            Toast.show({
              type: "success",
              text1: "Password updated successfully",
            });

            router.back();

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });

          console.log("Error changing password:", error);
          Toast.show({
            type: "error",
            text1: error.response.data.message,
          });

          return false;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ user: null, security: null });

        Toast.show({
          type: "success",
          text1: "Bye now 👋",
          text2: "See you next time",
        });
      },
    }),

    {
      name: "auth-storage", // name of the item in localStorage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { user, security, loggedInRole } = state;
        return {
          ...initialState,
          user,
          security,
          loggedInRole,

          register: () => {},
          login: () => {},
          handleLoginRoleState: () => {},
          forgotPassword: () => {},
          verifyOTP: () => {},
          setPassword: () => {},
          handleChangePassword: () => {},
          logout: () => {},
        };
      },
    }
  )
);
