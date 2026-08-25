import { PriceList } from '../../types';

export const PRICE_LIST_TYPES = [
  'OCF XLS',
  'OCF PDF',
  'MOTA XLS',
  'MOTA PRODUCTOS',
  'MOTA REPUESTOS',
  'Que Cambio',
  'Novedades',
] as const;

export const priceLists: PriceList[] = [
  {
    id: 'lista-1',
    listType: 'OCF XLS',
    validity: 'LISTA 293 13/11/2025',
    order: 1,
    imageUrl: '',
    fileFormat: 'xlsx',
    fileName: 'OCF_LISTA_293.xlsx',
  },
  {
    id: 'lista-2',
    listType: 'OCF PDF',
    validity: 'LISTA 293 13/11/2025',
    order: 2,
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    fileFormat: 'pdf',
    fileName: 'OCF_LISTA_293.pdf',
  },
  {
    id: 'lista-3',
    listType: 'MOTA PRODUCTOS',
    validity: 'Vigencia mayo 2026',
    order: 3,
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    fileFormat: 'pdf',
    fileName: 'MOTA_PRODUCTOS.pdf',
  },
];
