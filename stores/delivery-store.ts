import { Delivery } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DeliveryStore {
  deliveries: Delivery[] | [];
  newDelivery: {
    pickup: any;
    delivery: any;
    itemData: any;
    rider: any;
  } | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  getDeliveries: () => void;
  setNewDelivery: (params: {
    itemDetails: any;
    locations: any;
    rider: any;
  }) => void;
  getDeliveryById: (id: number) => void;
  updateDelivery: (delivery: Delivery) => void;
  deleteDelivery: (id: number) => void;
}

const initialState = {
  deliveries: [],
  newDelivery: null,
  loading: false,
  success: false,
  error: null,
};

export const useDeliveryStore = create(
  persist<DeliveryStore>(
    (set, get) => ({
      ...initialState,
      getDeliveries: async () => {
        // implement getDeliveries logic here
      },
      setNewDelivery: (params) => {
        // SAVE NEW DELIVERY DETAILS
        const { locations, itemDetails, rider } = params;
        set({
          newDelivery: {
            pickup: locations ? locations.pickup : null,
            delivery: locations ? locations.delivery : null,
            itemData: itemDetails,
            rider: rider,
          },
        });
      },
      getDeliveryById: async (id: number) => {
        // implement getDeliveryById logic here
      },
      updateDelivery: async (delivery: Delivery) => {
        // implement updateDelivery logic here
      },
      deleteDelivery: async (id: number) => {
        // implement deleteDelivery logic here
      },
    }),
    {
      name: "delivery-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        const { deliveries } = state;
        return {
          ...initialState,
          deliveries,

          getDeliveries: () => {},
          setNewDelivery: () => {},
          getDeliveryById: () => {},
          updateDelivery: () => {},
          deleteDelivery: () => {},
        };
      },
    }
  )
);
