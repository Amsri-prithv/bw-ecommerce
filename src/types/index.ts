export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  category: 'Men' | 'Women' | 'Unisex';
  sizes: string[];
  description?: string;
  isNew?: boolean;
  isSale?: boolean;
  color?: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  status: 'Placed' | 'Confirmed' | 'Processing' | 'Packed' | 'Out for Delivery' | 'Delivered';
  total: number;
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
}
