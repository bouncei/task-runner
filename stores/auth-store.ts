import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Security, User } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStore {
  user: User | null;
  security: Security | null;
  loading: boolean;
  success: boolean;
  error: string | null;
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

      // TODO
      login: (username, password) => {},
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
          login: () => {},
          logout: () => {},
        };
      },
    }
  )
);
