import { ClientInvoice } from '../../types/client';

export const clientInvoices: ClientInvoice[] = [
  {
    id: 'inv-1',
    clientCuit: '11111111111',
    date: '2026-08-10',
    displayDate: '10/08/26',
    label: 'Factura A 0001-00001234',
    total: 45210.0,
  },
  {
    id: 'inv-2',
    clientCuit: '11111111111',
    date: '2026-07-22',
    displayDate: '22/07/26',
    label: 'Factura A 0001-00001198',
    total: 1921.55,
  },
  {
    id: 'inv-3',
    clientCuit: '23469676439',
    date: '2026-08-21',
    displayDate: '21/08/26',
    label: 'Factura A 0001-00001250',
    total: 17024.4,
  },
];
