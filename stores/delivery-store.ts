import { api } from "@/api/config";
import { Delivery } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
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
  setNewDelivery: (params: {
    itemDetails?: any;
    locations?: any;
    time?: any;
    date?: any;
    rider?: any;
    type?: "instant" | "schedule" | null;
  }) => void;
  getDeliveries: (useremail: string, usertoken: string) => void;
  addDelivery: (body: {
    title: string;
    delivery_address: string;
    client_fullname: string;
    client_email: string;
    rider_id: string;
    status: string;
    current_lat: string;
    current_long: string;
    delivered_date: string | null;
    comment: string | null;
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

      getDeliveries: async (useremail, usertoken) => {
        set({ loading: true });
        try {
          const response = await api.get("/get-delivery", {
            headers: {
              "Content-Type": "application/json",
              useremail,
              usertoken,
            },
          });

          console.log("get deliveries response:", response.data);

          response.data &&
            set({ deliveries: response.data.deliveries, success: true });
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

      addDelivery: async (body) => {
        // TODO
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
          addDelivery: () => {},
          setNewDelivery: () => {},
          getDeliveryById: () => {},
          updateDelivery: () => {},
          deleteDelivery: () => {},
        };
      },
    }
  )
);
