import { Client } from '../../types/client';

export const clients: Client[] = [
  {
    id: '23469676439',
    cuit: '23469676439',
    code: '123456',
    firstName: 'Juan',
    lastName: 'Pérez',
    businessName: 'Ferretería Pérez S.A.',
    address: 'Av. Corrientes 1234, CABA',
    discountRate: 0.55, // 55% descuento, paga 45%
    favorites: [],
  },
  {
    id: '11111111111',
    cuit: '11111111111',
    code: '111111',
    firstName: 'Demo',
    lastName: 'Demo',
    businessName: 'Negocio Demo',
    address: 'Dirección Demo 123',
    discountRate: 0.55, // 55% descuento, paga 45%
    favorites: [],
  },
];
