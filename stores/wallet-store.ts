import { Expense } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WalletStore {
  balance: number | string;
  expenses: Expense[] | [];
  loading: boolean;
  success: boolean;
  error: string | null;
  getBalance: () => void;
  getExpenses: () => void;
}

const initialState = {
  balance: 0,
  expenses: [],
  loading: false,
  success: false,
  error: null,
};

export const useWalletStore = create(
  persist<WalletStore>(
    (set, get) => ({
      ...initialState,

      // TODO
      getBalance: () => {},
      getExpenses: () => {},
    }),
    {
      name: "wallat-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { balance, expenses } = state;
        return {
          ...initialState,
          balance,
          expenses,

          getBalance: () => {},
          getExpenses: () => {},
        };
      },
    }
  )
);
