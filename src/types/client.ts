export interface Client {
  id: string; // usar CUIT como id
  cuit: string;
  code: string; // contraseña/código
  firstName: string;
  lastName: string;
  businessName: string;
  address: string;
  discountRate: number; // ej 0.55 (55% descuento, paga 45%)
  favorites: string[]; // productIds
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
