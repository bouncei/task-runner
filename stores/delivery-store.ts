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
    date: any; //* FOR SCHEDULED DELIVERY
    time: any; //* FOR SCHEDULED DELIVERY
    rider: any; //* THIS WILL BE NULL FOR SCHEDULED DELIVERY
    type: "instant" | "schedule" | null;
  } | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  getDeliveries: () => void;
  setNewDelivery: (params: {
    itemDetails?: any;
    locations?: any;
    time?: any;
    date?: any;
    rider?: any;
    type?: "instant" | "schedule" | null;
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
        const { locations, itemDetails, rider, type, date, time } = params;
        const { newDelivery } = get();

        if (type === "instant" || type === "schedule") {
          set({
            newDelivery: {
              pickup: locations ? locations.pickup : newDelivery?.pickup,
              delivery: locations ? locations.delivery : newDelivery?.delivery,
              time: time ? time : newDelivery?.time,
              date: date ? date : newDelivery?.date,
              itemData: itemDetails ? itemDetails : newDelivery?.itemData,
              rider: rider ? rider : newDelivery?.rider,
              type: type ? type : newDelivery?.type || null,
            },
          });
        } else {
          set({
            newDelivery: {
              pickup: null,
              delivery: null,
              time: null,
              date: null,
              itemData: null,
              rider: null,
              type: null,
            },
          });
        }
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
