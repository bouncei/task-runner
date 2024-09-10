import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Reservation, Security } from "@/lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { api } from "@/api/config";

interface ReservationStore {
  reservations: Reservation[] | [];
  loading: boolean;
  success: boolean;
  error: string | null;

  getReservations: (security: Security) => void;
  addReservation: (addData: Reservation, security: Security) => void;
  updateReservation: (updateData: Reservation, security: Security) => void;
  deleteReservation: (reservation_id: string, security: Security) => void;
}

const initialState = {
  reservations: [],
  loading: false,
  success: false,
  error: null,
};

export const useReservationsStore = create(
  persist<ReservationStore>(
    (set, get) => ({
      ...initialState,

      getReservations: async (security) => {
        set({ loading: true });
        try {
          const { email, token } = security;

          const response = await api.post(
            "/get-reservations",
            {}, //body
            {
              headers: {
                "Content-Type": "application/json",
                UserEmail: email,
                Authorization: `Bearer ${token}`,
              },
            }
          );

          response.data &&
            set({
              reservations: response.data.reservation_details,
              success: true,
            });
          return true;
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log("Error getting reservations:", error);
          Toast.show({
            type: "error",
            text1: "Something went wrong",
          });

          return false;
        } finally {
          set({ loading: false });
        }
      },
      addReservation: async (addData, security) => {
        set({ loading: true });
        try {
          const { email, token } = security;
          const {
            location_category,
            equipment,
            accessories,
            address,
            rental_date,
            return_date,
            height,
            weight,
            full_name,
            email_address,
            phone_number,
            status,
          } = addData;

          const response = await api.post(
            "/add-reservations",
            {
              location_category,
              equipment,
              accessories,
              address,
              rental_date,
              return_date,
              height,
              weight,
              full_name,
              email_address,
              phone_number,
              status,
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
              text1: "Reservation made successfully",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log("Error adding a reservation:", error);
          Toast.show({
            type: "error",
            text1: error.response.data.message,
          });

          return false;
        } finally {
          set({ loading: false });
        }
      },
      updateReservation: async (updateData, security) => {
        set({ loading: true });
        try {
          const { email, token } = security;
          const {
            id,
            location_category,
            equipment,
            accessories,
            address,
            rental_date,
            return_date,
            height,
            weight,
            full_name,
            email_address,
            phone_number,
            status,
          } = updateData;

          const response = await api.post(
            "/update-reservations",
            {
              reservation_id: id,
              location_category,
              equipment,
              accessories,
              address,
              rental_date,
              return_date,
              height,
              weight,
              full_name,
              email_address,
              phone_number,
              status,
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
              text1: "Reservation updated successfully",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            `Error updating reeservation with id - ${updateData.id}:`,
            error
          );
          Toast.show({
            type: "error",
            text1: error.response.data.message,
          });

          return false;
        } finally {
          set({ loading: false });
        }
      },
      deleteReservation: async (reservation_id, security) => {
        set({ loading: true });
        try {
          const { email, token } = security;

          const response = await api.post(
            "/delete-reservations",
            {
              reservation_id,
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
              text1: "Reservation deleted successfully",
            });

            return true;
          }
        } catch (error: any) {
          set({ error: error.response.data.message, success: false });
          console.log(
            `Error deleting reservation with id - ${reservation_id}:`,
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
    }),
    {
      name: "reservations-store",
      getStorage: () => AsyncStorage,
      partialize(state) {
        const { reservations } = state;

        return {
          ...initialState,
          reservations,

          getReservations: () => {},
          addReservation: () => {},
          updateReservation: () => {},
          deleteReservation: () => {},
        };
      },
    }
  )
);
