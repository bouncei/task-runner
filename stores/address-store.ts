import { Address } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AddressStore {
  addresses: Address[] | [];
  loading: boolean;
  success: boolean;
  error: string | null;
  getAddresses: () => void;
}

const initialState = {
  addresses: [],
  loading: false,
  success: false,
  error: null,
};

export const useRidersStore = create(
  persist<AddressStore>(
    (set, get) => ({
      ...initialState,

      // TODO
      getAddresses: () => {},
    }),
    {
      name: "address-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { addresses } = state;
        return {
          ...initialState,
          addresses,

          getAddresses: () => {},
        };
      },
    }
  )
);
