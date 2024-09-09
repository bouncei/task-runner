import { api } from "@/api/config";
import { Delivery, Security } from "@/lib/types";
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
  addDelivery: (
    body: {
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
    },
    useremail: string,
    usertoken: string
  ) => void;
  getDeliveryById: (
    deliveryId: string,
    useremail: string,
    usertoken: string
  ) => void;
  updateDelivery: (delivery: Delivery, security: Security) => void;
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
          const response = await api.post(
            "/get-delivery",
            {}, //body
            {
              headers: {
                "Content-Type": "application/json",
                UserEmail: useremail,
                Authorization: `Bearer ${usertoken}`,
              },
            }
          );

          response.data &&
            set({ deliveries: response.data.delivery_details, success: true });
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log("Error getting deliveries:", error);
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });

          return false;
        } finally {
          set({ loading: false });
        }
      },

      addDelivery: async (body, useremail, usertoken) => {
        set({ loading: true });
        try {
          const response = await api.post("/add-delivery", body, {
            headers: {
              "Content-Type": "application/json",
              useremail,
              usertoken,
            },
          });
          if (response.data) {
            set({ success: true });
            Toast.show({
              type: "success",
              text1: "Delivery added successfully",
              text2: "You can now track your delivery",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            "Error creating a new delivery:",
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
      getDeliveryById: async (deliveryId, useremail, usertoken) => {
        // implement getDeliveryById logic here
        set({ loading: true });
        try {
          const response = await api.post(
            "/get-delivery",
            {
              delivery_id: deliveryId,
            },
            {
              headers: {
                "Content-Type": "application/json",
                useremail,
                usertoken,
              },
            }
          );

          if (response.data) {
            set({ success: true });
            return response.data.delivery_details;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            `Error getting delivery with id-${deliveryId}`,
            error.response.data.message
          );
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
          return null;
        } finally {
          set({ loading: false });
        }
      },
      updateDelivery: async (delivery, security) => {
        // TODO:implement updateDelivery logic here
      },
      deleteDelivery: async (id: number) => {
        // TODO:implement deleteDelivery logic here
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
