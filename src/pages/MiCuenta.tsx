import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentClient, updateClient } from '../store/clientStore';
import { getPriceLists } from '../store/adminStore';
import { downloadPriceListFile } from '../utils/priceListDownload';

const MiCuenta = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState(getCurrentClient());
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );
  const [emailMsg, setEmailMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    const current = getCurrentClient();
    setClient(current);
    if (!current) navigate('/login');
  }, [navigate]);

  if (!client) return null;

  const fullName = `${client.firstName} ${client.lastName}`.trim().toUpperCase();
  const clientNumber = client.clientNumber || client.code;
  const priceLists = getPriceLists();

  const refreshClient = () => {
    setClient(getCurrentClient());
  };

  const handleChangePassword = () => {
    setPasswordMsg(null);
    if (!newPassword.trim()) {
      setPasswordMsg({ type: 'err', text: 'Ingresá una nueva contraseña' });
      return;
    }
    if (newPassword.trim().length < 4) {
      setPasswordMsg({ type: 'err', text: 'La contraseña debe tener al menos 4 caracteres' });
      return;
    }
    updateClient(client.cuit, { code: newPassword.trim() });
    setNewPassword('');
    setPasswordMsg({ type: 'ok', text: 'Contraseña actualizada correctamente' });
    refreshClient();
  };

  const handleChangeEmail = () => {
    setEmailMsg(null);
    const value = newEmail.trim();
    if (!value) {
      setEmailMsg({ type: 'err', text: 'Ingresá un email nuevo' });
      return;
    }
    if (!value.includes('@')) {
      setEmailMsg({ type: 'err', text: 'Email inválido' });
      return;
    }
    updateClient(client.cuit, { email: value });
    setNewEmail('');
    setEmailMsg({ type: 'ok', text: 'Email actualizado correctamente' });
    refreshClient();
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-brandBlue mb-6 sm:mb-8">Mi Cuenta</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-brandOrange">
        <h2 className="text-xl md:text-2xl font-bold text-brandBlue mb-3">
          ¿QUERÉS HACER UN PEDIDO?
        </h2>
        <p className="text-gray-600 mb-4">
          Hacé tu pedido desde el catálogo con precios y cantidades de cliente.
        </p>
        <Link to="/buscar" className="btn-accent inline-block w-full sm:w-auto text-center">
          HACER PEDIDO
        </Link>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          <Link
            to="/pedido-codigo"
            className="group flex items-center gap-3 rounded-xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-white to-violet-50/40 px-4 py-4 shadow-sm transition hover:border-violet-500 hover:shadow-md"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm group-hover:bg-violet-700 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold text-violet-800 group-hover:underline">
                Pedido Código
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                Cargá productos por código
              </span>
            </span>
          </Link>
          <Link
            to="/pedido-excel"
            className="group flex items-center gap-3 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 via-white to-green-50/40 px-4 py-4 shadow-sm transition hover:border-green-500 hover:shadow-md"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm group-hover:bg-green-700 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold text-green-800 group-hover:underline">
                Pedido Excel
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                Subí tu archivo con códigos
              </span>
            </span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="space-y-2 text-gray-900">
          <p>
            <span className="font-semibold">CUIT:</span> {client.cuit}
          </p>
          <p>
            <span className="font-semibold">ID Cliente:</span> {clientNumber}
          </p>
          <p>
            <span className="font-semibold">Nombre:</span> {fullName}
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/mis-pedidos"
              className="group flex items-center gap-3 rounded-xl border-2 border-brandBlue/20 bg-gradient-to-br from-sky-50 to-white px-4 py-3.5 shadow-sm transition hover:border-brandBlue hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brandBlue text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold text-brandBlue group-hover:underline">
                  Ver Mis Pedidos Realizados
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Historial de pedidos
                </span>
              </span>
            </Link>
            <Link
              to="/mis-facturas"
              className="group flex items-center gap-3 rounded-xl border-2 border-brandOrange/25 bg-gradient-to-br from-orange-50 to-white px-4 py-3.5 shadow-sm transition hover:border-brandOrange hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brandOrange text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold text-brandBlue group-hover:underline">
                  Ver Mis Facturas y Comprobantes
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  Documentos y comprobantes
                </span>
              </span>
            </Link>
          </div>
        </div>

        <div className="bg-brandGray rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Descuento:</p>
          <p className="text-3xl font-bold text-brandOrange">
            {Math.round(client.discountRate * 100)}%
          </p>
        </div>

        <div className="bg-brandGray rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Descarga de Listas</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-300 text-gray-700">
                  <th className="py-2 pr-4 font-semibold">Archivo</th>
                  <th className="py-2 pr-4 font-semibold">Lista</th>
                  <th className="py-2 font-semibold">Vigencia</th>
                </tr>
              </thead>
              <tbody>
                {priceLists.map((list) => (
                  <tr key={list.id} className="border-b border-gray-200 last:border-0">
                    <td className="py-3 pr-4">
                      <button
                        type="button"
                        onClick={() => downloadPriceListFile(list)}
                        className="inline-flex items-center gap-2 text-brandBlue hover:underline"
                        title={`Descargar ${list.fileFormat}`}
                      >
                        {list.imageUrl ? (
                          <img
                            src={list.imageUrl}
                            alt=""
                            className="w-10 h-10 object-cover rounded border border-gray-200"
                          />
                        ) : (
                          <span className="w-10 h-10 inline-flex items-center justify-center rounded border border-gray-300 bg-white text-xs font-bold text-gray-600">
                            {list.fileFormat.toUpperCase()}
                          </span>
                        )}
                        <span className="sr-only">
                          Ver {list.fileFormat === 'pdf' ? 'pdf' : 'xlsx'}
                        </span>
                      </button>
                    </td>
                    <td className="py-3 pr-4 font-medium text-gray-900">{list.listType}</td>
                    <td className="py-3 text-gray-700">{list.validity || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {priceLists.length === 0 && (
              <p className="text-gray-500 text-sm py-4">No hay listas disponibles.</p>
            )}
          </div>
        </div>

        <div className="bg-brandGray rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Cambio de Contraseña</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brandBlue"
            />
          </div>
          {passwordMsg && (
            <p
              className={`text-sm ${
                passwordMsg.type === 'ok' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {passwordMsg.text}
            </p>
          )}
          <button type="button" onClick={handleChangePassword} className="btn-primary">
            CAMBIAR CONTRASEÑA
          </button>
        </div>

        <div className="bg-brandGray rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Cambio de Email</h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Email actual:</span> {client.email || '—'}
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brandBlue"
            />
          </div>
          {emailMsg && (
            <p
              className={`text-sm ${emailMsg.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}
            >
              {emailMsg.text}
            </p>
          )}
          <button type="button" onClick={handleChangeEmail} className="btn-primary">
            CAMBIAR EMAIL
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiCuenta;
