/**
 * DEJADO DE USAR como catálogo / vitrina de ofertas.
 * Alias de URL vieja: redirige al catálogo central con filtro Solo ofertas.
 */
import { Navigate } from 'react-router-dom';

const Ofertas = () => {
  return <Navigate to="/buscar?offer=1" replace />;
};

export default Ofertas;
