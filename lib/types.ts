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
  recipient: string;
  email: string;
  phone: string;
  status: string;
  location: string;
  //  TODO: OTHER RELEVANT FIELDS

  created_at: Date;
  updated_at: Date;
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
