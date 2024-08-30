export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  //  TODO: OTHER RELEVANT FIELDS
  created_at: Date;
  updated_at: Date;
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
  title: string;
  address: string;
}
