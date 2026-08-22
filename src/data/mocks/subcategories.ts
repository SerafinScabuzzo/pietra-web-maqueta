import { Subcategory } from '../../types';

export const subcategories: Subcategory[] = [
  { id: 'herramientas-corte', categoryId: 'herramientas', name: 'Corte', order: 1 },
  { id: 'herramientas-manual', categoryId: 'herramientas', name: 'Manuales', order: 2 },
  { id: 'plomeria-canillas', categoryId: 'plomeria', name: 'Canillas y válvulas', order: 1 },
  { id: 'plomeria-conexion', categoryId: 'plomeria', name: 'Conexiones', order: 2 },
  { id: 'bano-ducha', categoryId: 'bano', name: 'Ducha', order: 1 },
  { id: 'bano-accesorios', categoryId: 'bano', name: 'Accesorios de baño', order: 2 },
  { id: 'herr-man-general', categoryId: 'herramientas-manuales', name: 'General', order: 1 },
  { id: 'corte-discos', categoryId: 'corte-perforacion', name: 'Discos y brocas', order: 1 },
  { id: 'medicion-general', categoryId: 'medicion', name: 'General', order: 1 },
  { id: 'griferia-1-agua', categoryId: 'griferia', name: 'Griferías 1 agua', order: 1 },
  { id: 'griferia-2-aguas', categoryId: 'griferia', name: 'Griferías 2 aguas', order: 2 },
  { id: 'griferia-accesorios', categoryId: 'griferia', name: 'Accesorios de grifería', order: 3 },
  { id: 'repuestos-general', categoryId: 'repuestos', name: 'General', order: 1 },
  { id: 'valvulas-paso', categoryId: 'valvulas', name: 'Válvulas de paso', order: 1 },
];
