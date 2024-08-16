import { Rider } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RiderStore {
  riders: Rider[] | [];
  loading: boolean;
  success: boolean;
  error: string | null;
  getRiders: () => void;
  getRiderByLocation: () => void;
}

const initialState = {
  riders: [],
  loading: false,
  success: false,
  error: null,
};

export const useRidersStore = create(
  persist<RiderStore>(
    (set, get) => ({
      ...initialState,

      // TODO
      getRiders: () => {},
      getRiderByLocation: () => {},
    }),
    {
      name: "riders-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { riders } = state;
        return {
          ...initialState,
          riders,

          getRiders: () => {},
          getRiderByLocation: () => {},
        };
      },
    }
  )
);
