export interface Item {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
  }


export interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    image: string
  }

  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface AuthState {
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    user: {
      name: string;
      email: string;
    } | null;
  }