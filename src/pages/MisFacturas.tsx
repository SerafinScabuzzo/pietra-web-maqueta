import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentClient, getClientInvoices } from '../store/clientStore';

const formatTotal = (total: number): string =>
  total.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const MisFacturas = () => {
  const navigate = useNavigate();
  const client = getCurrentClient();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [applied, setApplied] = useState({ dateFrom: '', dateTo: '' });

  useEffect(() => {
    if (!client) navigate('/login');
  }, [client, navigate]);

  const allInvoices = client ? getClientInvoices(client.cuit) : [];

  const filtered = useMemo(() => {
    const from = applied.dateFrom ? new Date(applied.dateFrom) : null;
    const to = applied.dateTo ? new Date(applied.dateTo) : null;
    if (from) from.setHours(0, 0, 0, 0);
    if (to) to.setHours(23, 59, 59, 999);

    return allInvoices.filter((inv) => {
      const invDate = new Date(inv.date);
      if (Number.isNaN(invDate.getTime())) return false;
      if (from && invDate < from) return false;
      if (to && invDate > to) return false;
      return true;
    });
  }, [allInvoices, applied]);

  if (!client) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied({ dateFrom, dateTo });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <h1 className="text-3xl font-bold text-brandBlue">Mis Facturas y Comprobantes</h1>
        <Link to="/mi-cuenta" className="btn-secondary shrink-0">
          ← Volver a Mi Cuenta
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
            />
          </div>
          <span className="text-gray-500 pb-2">-</span>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
            />
          </div>
          <button type="submit" className="btn-primary">
            Buscar
          </button>
        </form>

        <ul className="space-y-3">
          {filtered.map((inv) => (
            <li key={inv.id} className="text-gray-800">
              {inv.label} — {inv.displayDate}
              {inv.total !== undefined ? ` — Total $ ${formatTotal(inv.total)}` : ''}
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="text-gray-500">No se encontraron facturas en ese rango.</p>
        )}
      </div>
    </div>
  );
};

export default MisFacturas;
