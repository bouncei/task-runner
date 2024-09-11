export interface User {
  ID: string;
  first_name: string;
  last_name: string;
  fullname: string;
  email: string;
  img: string;
  registered: Date;
  role: {
    "1": "administrator";
  };
  phone_number: string;
  country: string;
  state: string;
  address: string;
  landmark: string;
  gender: string;
  email_verified: "no" | "yes";
  phone_verified: "no" | "yes";
  status: "inactive" | "active";
}

export interface Security {
  email: string;
  token: string;
}

export interface Delivery {
  id: string;
  shipment_number: string;
  title: string;
  delivery_address: string;
  client_fullname: string;
  client_email: string;
  rider_id: string;
  status: string;
  current_lat: string;
  current_long: string;
  created_date: string;
  delivered_date: string | null;
  comment: string | null;
}

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  rating: string;
  //  TODO: OTHER RELEVANT FIELDS
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  id: string;
  pickup_id: string;
  title: string;
  pickup_address: string;
  created_date: string;
}

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: Date;
  type: string;
  // TODO: MAKE NECCESSARY MODIFICATIONS TO FIELD NAMES
}

export interface Reservation {
  id?: string;
  location_category?: string;
  equipment?: string;
  accessories?: string; // THIS FIELD SHOULD BE A COMMA SEPERATED STRING OF ACCESSORIES(Options: Gel Cushion, Extended Leg Rest (Right), Extended Leg Rest (Left), Extra Leg)
  address?: string;
  rental_date?: Date; // mm/dd/yyyy
  return_date?: Date; // mm/dd/yyyy
  height?: string;
  weight?: string;
  full_name?: string;
  email_address?: string;
  phone_number?: string;
  status?: "Pending" | "Active" | "Cancelled" | "Retrived"; // options: Active, Pending, Cancelled, Retrived
}
