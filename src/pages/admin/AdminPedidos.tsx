import { useMemo, useState } from 'react';
import { getOrders } from '../../store/adminStore';

const parseDisplayDate = (value: string): Date | null => {
  // Espera DD/MM/YY
  const m = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const month = parseInt(m[2], 10) - 1;
  const year = 2000 + parseInt(m[3], 10);
  const d = new Date(year, month, day);
  return Number.isNaN(d.getTime()) ? null : d;
};

const formatTotal = (total: number): string =>
  total.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const AdminPedidos = () => {
  const allOrders = getOrders();
  const [clientQuery, setClientQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [applied, setApplied] = useState({ clientQuery: '', dateFrom: '', dateTo: '' });

  const filtered = useMemo(() => {
    const q = applied.clientQuery.trim().toLowerCase();
    const from = applied.dateFrom ? new Date(applied.dateFrom) : null;
    const to = applied.dateTo ? new Date(applied.dateTo) : null;
    if (from) from.setHours(0, 0, 0, 0);
    if (to) to.setHours(23, 59, 59, 999);

    return allOrders.filter((order) => {
      if (q) {
        const hay = `${order.clientName} ${order.clientCode || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (from || to) {
        const orderDate = parseDisplayDate(order.date);
        if (!orderDate) return false;
        if (from && orderDate < from) return false;
        if (to && orderDate > to) return false;
      }
      return true;
    });
  }, [allOrders, applied]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied({ clientQuery, dateFrom, dateTo });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-brandBlue mb-6">Pedidos</h1>

      <form onSubmit={handleSearch} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nº Cliente / Nombre
            </label>
            <input
              type="text"
              value={clientQuery}
              onChange={(e) => setClientQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn-primary px-10">
            Buscar
          </button>
        </div>
      </form>

      <hr className="border-slate-200 mb-6" />

      <ul className="space-y-3">
        {filtered.map((order) => {
          const label = order.clientName.trim() || '-';
          return (
            <li key={order.id} className="text-gray-800 text-sm md:text-base">
              {label} - {order.date} - {order.time} - Total $ {formatTotal(order.total)}
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-8">No se encontraron pedidos.</p>
      )}
    </div>
  );
};

export default AdminPedidos;
