/**
 * DEJADO DE USAR como listado de productos por marca + rubro.
 * Alias: /marca/:brandId/rubro/:categoryId → /buscar?brand=&category=
 */
import { Navigate, useParams } from 'react-router-dom';

const Rubro = () => {
  const { brandId, categoryId } = useParams<{ brandId: string; categoryId: string }>();
  const params = new URLSearchParams();
  if (brandId) params.set('brand', brandId);
  if (categoryId) params.set('category', categoryId);
  const query = params.toString();
  return <Navigate to={query ? `/buscar?${query}` : '/buscar'} replace />;
};

export default Rubro;
