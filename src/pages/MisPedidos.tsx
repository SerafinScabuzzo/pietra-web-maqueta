import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentClient, getClientOrders } from '../store/clientStore';

const formatTotal = (total: number): string =>
  total.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const MisPedidos = () => {
  const navigate = useNavigate();
  const client = getCurrentClient();

  useEffect(() => {
    if (!client) navigate('/login');
  }, [client, navigate]);

  if (!client) return null;

  const orders = getClientOrders(client.cuit);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <h1 className="text-3xl font-bold text-brandBlue">Mis Pedidos Realizados</h1>
        <Link to="/mi-cuenta" className="btn-secondary shrink-0">
          ← Volver a Mi Cuenta
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {orders.length > 0 ? (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id} className="text-gray-800">
                Pedido {order.date} - {order.time} - Total $ {formatTotal(order.total)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tenés pedidos realizados.</p>
        )}
      </div>
    </div>
  );
};

export default MisPedidos;
