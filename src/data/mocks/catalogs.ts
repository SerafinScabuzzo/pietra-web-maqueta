import { Catalog } from '../../types';

export const catalogs: Catalog[] = [
  {
    id: 'catalog-2025-pietra',
    title: 'Catálogo Pietra 2025',
    brandId: 'pietra',
    type: 'general',
    date: '2025-01-01',
    coverUrl: '/uploads/portadaCatalogo.png',
    pdfUrl: 'https://drive.google.com/file/d/14HcANutT_ctn6rwwLKdf3txPXO70mMy9/view',
  },
  {
    id: 'catalog-herramientas',
    title: 'Herramientas y corte',
    brandId: 'mota',
    type: 'herramientas',
    date: '2025-06-01',
    coverUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
    pdfUrl: 'https://drive.google.com/file/d/14HcANutT_ctn6rwwLKdf3txPXO70mMy9/view',
  },
  {
    id: 'catalog-griferia',
    title: 'Grifería y baño',
    brandId: 'fv',
    type: 'griferia',
    date: '2025-09-01',
    coverUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80',
    pdfUrl: 'https://drive.google.com/file/d/14HcANutT_ctn6rwwLKdf3txPXO70mMy9/view',
  },
];
