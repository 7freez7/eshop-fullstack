// Soubor: frontend/types/product.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  slug: string;
}

export type ProductFormPayload = Omit<Product, 'id'>;

export interface CartItem extends Product {
  quantity: number;
}