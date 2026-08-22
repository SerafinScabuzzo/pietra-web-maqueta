import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentClient, updateClient } from '../store/clientStore';

const MiCuenta = () => {
  const navigate = useNavigate();
  const client = getCurrentClient();
  const [showChangeCode, setShowChangeCode] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!client) {
      navigate('/login');
    }
  }, [client, navigate]);

  if (!client) {
    return null;
  }

  const handleChangeCode = () => {
    setError('');
    setSuccess('');

    if (!newCode.trim()) {
      setError('El código no puede estar vacío');
      return;
    }

    if (newCode !== confirmCode) {
      setError('Los códigos no coinciden');
      return;
    }

    if (newCode.length < 4) {
      setError('El código debe tener al menos 4 caracteres');
      return;
    }

    updateClient(client.cuit, { code: newCode });
    setSuccess('Código actualizado correctamente');
    setNewCode('');
    setConfirmCode('');
    setShowChangeCode(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-brandBlue mb-8">Mi Cuenta</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-brandOrange">
        <h2 className="text-xl md:text-2xl font-bold text-brandBlue mb-3">
          ¿QUERÉS HACER UN PEDIDO?
        </h2>
        <p className="text-gray-600 mb-4">
          Armá tu pedido desde el catálogo con precios y cantidades de cliente.
        </p>
        <Link to="/buscar" className="btn-accent inline-block">
          ARMAR PEDIDO
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* CUIT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CUIT</label>
          <p className="text-gray-900 font-semibold">{client.cuit}</p>
        </div>

        {/* Código */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Código</label>
            {!showChangeCode && (
              <button
                onClick={() => setShowChangeCode(true)}
                className="text-sm text-brandBlue hover:text-brandBlue-dark"
              >
                Cambiar código
              </button>
            )}
          </div>
          {showChangeCode ? (
            <div className="space-y-3">
              <input
                type="password"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Nuevo código"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue"
              />
              <input
                type="password"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                placeholder="Confirmar código"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue"
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-600">{success}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleChangeCode}
                  className="btn-primary"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => {
                    setShowChangeCode(false);
                    setNewCode('');
                    setConfirmCode('');
                    setError('');
                    setSuccess('');
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-900 font-semibold">••••••</p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <p className="text-gray-900">{client.firstName}</p>
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <p className="text-gray-900">{client.lastName}</p>
        </div>

        {/* Nombre de negocio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de negocio</label>
          <p className="text-gray-900">{client.businessName}</p>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <p className="text-gray-900">{client.address}</p>
        </div>

        {/* Descuento */}
        <div className="bg-brandGray rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descuento</label>
          <p className="text-2xl font-bold text-brandOrange">
            {Math.round(client.discountRate * 100)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Pagás {Math.round((1 - client.discountRate) * 100)}% del precio de lista
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiCuenta;
