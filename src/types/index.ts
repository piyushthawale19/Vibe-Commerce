export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  email: string;
}

export interface Receipt {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: string;
  customerName: string;
  customerEmail: string;
}
