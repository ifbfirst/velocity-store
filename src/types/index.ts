
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: { rate: number; count: number };
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  