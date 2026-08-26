export interface Client {
  id: string; // usar CUIT como id
  cuit: string;
  code: string; // contraseña/código
  clientNumber?: string; // ID Cliente visible (ej. 287)
  firstName: string;
  lastName: string;
  businessName: string;
  address: string;
  email?: string;
  discountRate: number; // ej 0.4 (40% descuento, paga 60%)
  favorites: string[]; // productIds
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface ClientOrder {
  id: string;
  clientCuit: string;
  date: string;
  time: string;
  total: number;
}

export interface ClientInvoice {
  id: string;
  clientCuit: string;
  date: string; // YYYY-MM-DD para filtros
  displayDate: string;
  label: string;
  total?: number;
}
