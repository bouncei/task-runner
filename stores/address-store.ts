import { api } from "@/api/config";
import { Address, Security } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AddressStore {
  addresses: Address[] | [];
  loading: boolean;
  success: boolean;
  error: string | null;

  getAddresses: (security: Security) => void;
  addAddress: (
    addData: { title: string; pickup_address: string },
    security: Security
  ) => void;
  updateAddress: (
    updateData: { pickup_id: string; title: string; pickup_address: string },
    security: Security
  ) => void;
  setDefaultAddress: (pickup_id: string) => void;
  deleteAddress: (pickup_id: string, security: Security) => void;
}

const initialState = {
  addresses: [],
  loading: false,
  success: false,
  error: null,
};

export const useAddressStore = create(
  persist<AddressStore>(
    (set, get) => ({
      ...initialState,

      getAddresses: async (security) => {
        set({ loading: true });
        try {
          const { email, token } = security;
          const response = await api.post(
            "/get-pickup-address",
            {}, //body
            {
              headers: {
                "Content-Type": "application/json",
                UserEmail: email,
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Get all addresses", response.data);

          response.data &&
            set({ addresses: response.data.pickup_details, success: true });

          return true;
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log("Error getting pickup addresses:", error);
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },
      addAddress: async (addData, security) => {
        set({ loading: true });
        try {
          const { email, token } = security;
          const { title, pickup_address } = addData;

          const response = await api.post(
            "/add-pickup-address",
            {
              title,
              pickup_address,
            },
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
              text1: "Address added successfully",
            });

            router.back();
            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log("Error adding new address:", error);
          Toast.show({
            type: "error",
            text1: error.response.data.message,
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },
      updateAddress: async (updateData, security) => {
        set({ loading: true });
        try {
          const { email, token } = security;
          const { pickup_id, title, pickup_address } = updateData;

          const response = await api.post(
            "/update-pickup-address",
            {
              pickup_id,
              title,
              pickup_address,
            },
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
              text1: "Address updated successfully",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            `Error updating address with id - ${updateData.pickup_id}:`,
            error
          );
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });

          return false;
        } finally {
          set({ loading: false });
        }
      },
      setDefaultAddress: async (pickup_id) => {
        // TODO
      },
      deleteAddress: async (pickup_id, security) => {
        set({ loading: true });
        try {
          const { token, email } = security;

          const response = await api.post(
            "/delete-pickup-address",
            {
              pickup_id,
            },
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
              text1: "Address deleted successfully",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(`Error deleting address with id - ${pickup_id}:`, error);
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });

          return false;
        } finally {
          set({ loading: false });
        }
      },
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
          addAddress: () => {},
          updateAddress: () => {},
          setDefaultAddress: () => {},
          deleteAddress: () => {},
        };
      },
    }
  )
);
