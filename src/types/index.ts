export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  heroImageUrl?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  order: number;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  imageUrl?: string;
  order?: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brandId: string;
  categoryId: string;
  subcategoryId: string;
  images: string[];
  priceList: number;
  priceOffer?: number;
  isOffer: boolean;
  isFeatured: boolean;
}

export interface Catalog {
  id: string;
  title: string;
  brandId?: string;
  type?: string;
  date: string;
  coverUrl?: string; // Portada principal
  images?: string[]; // Imágenes adicionales opcionales
  pdfUrl?: string;
}

/** Lista de precios (Admin) — PDF o Excel mock */
export interface PriceList {
  id: string;
  listType: string;
  validity: string;
  order: number;
  imageUrl?: string;
  fileFormat: 'xlsx' | 'pdf';
  fileName?: string;
  fileUrl?: string;
}

/** Pedido visible en Admin — mock de historial */
export interface AdminOrder {
  id: string;
  clientName: string;
  clientCode?: string;
  date: string;
  time: string;
  total: number;
}
