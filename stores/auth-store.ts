import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Security, User } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/api/config";
import Toast from "react-native-toast-message";

interface UserStore {
  user: User | null;
  security: Security | null;
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
  login: (username: string, password: string) => void;
  logout: () => void;
}

const initialState = {
  user: null,
  security: null,
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

          // console.log("Here", fname, email);
        } catch (error: any) {
          // TODO: HANDLE ERROR PROPERLY
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

      login: (username, password: string) => {
        set({ loading: true });
        // TODO
        console.log("Login user", username, password);
      },
      logout: () => {},
    }),

    {
      name: "auth-storage", // name of the item in localStorage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { user, security } = state;
        return {
          ...initialState,
          user,
          security,

          register: () => {},
          login: () => {},
          logout: () => {},
        };
      },
    }
  )
);
