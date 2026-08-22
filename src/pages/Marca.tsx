/**
 * DEJADO DE USAR como taxonomía Marca → Rubros.
 * Alias: /marca/:brandId → /buscar?brand=:brandId
 */
import { Navigate, useParams } from 'react-router-dom';

const Marca = () => {
  const { brandId } = useParams<{ brandId: string }>();
  if (!brandId) {
    return <Navigate to="/buscar" replace />;
  }
  return <Navigate to={`/buscar?brand=${encodeURIComponent(brandId)}`} replace />;
};

export default Marca;
