
export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  surname: string;
  email: string;
  cell: string;
  pharmacy: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
