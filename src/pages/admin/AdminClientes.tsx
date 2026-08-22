import { useState, useEffect } from 'react';
import { Client } from '../../types/client';
import { getClients, getClientByCuit, updateClient, deleteClient, createClient } from '../../store/clientStore';

const AdminClientes = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCuit, setEditingCuit] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Client>>({
    cuit: '',
    code: '',
    firstName: '',
    lastName: '',
    businessName: '',
    address: '',
    discountRate: 0,
    favorites: [],
  });

  useEffect(() => {
    setClients(getClients());
  }, []);

  const handleOpenModal = (cuit?: string) => {
    if (cuit) {
      const client = getClientByCuit(cuit);
      if (client) {
        setFormData(client);
        setEditingCuit(cuit);
      }
    } else {
      setFormData({
        cuit: '',
        code: '',
        firstName: '',
        lastName: '',
        businessName: '',
        address: '',
        discountRate: 0,
        favorites: [],
      });
      setEditingCuit(null);
    }
    setShowModal(true);
    setSuccessMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCuit(null);
    setSuccessMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (editingCuit) {
      // Actualizar
      updateClient(editingCuit, formData);
      setSuccessMessage('Cliente actualizado correctamente');
    } else {
      // Crear
      if (!formData.cuit) {
        setSuccessMessage('El CUIT es requerido');
        return;
      }
      createClient({
        id: formData.cuit,
        cuit: formData.cuit,
        code: formData.code || '',
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        businessName: formData.businessName || '',
        address: formData.address || '',
        discountRate: formData.discountRate || 0,
        favorites: formData.favorites || [],
      });
      setSuccessMessage('Cliente creado correctamente');
    }

    setClients(getClients());
    setTimeout(() => {
      handleCloseModal();
    }, 1500);
  };

  const handleDelete = (cuit: string) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      deleteClient(cuit);
      setClients(getClients());
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-brandBlue">Clientes</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          Nuevo Cliente
        </button>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CUIT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre / Apellido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Negocio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dirección
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descuento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.cuit}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {client.cuit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.firstName} {client.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.businessName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {client.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Math.round(client.discountRate * 100)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(client.cuit)}
                    className="text-brandBlue hover:text-brandBlue-dark mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(client.cuit)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brandBlue mb-4">
                {editingCuit ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h2>

              {successMessage && (
                <div className={`mb-4 p-3 rounded-lg ${
                  successMessage.includes('correctamente') 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CUIT {editingCuit && '(no editable)'}
                  </label>
                  <input
                    type="text"
                    value={formData.cuit || ''}
                    onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                    disabled={!!editingCuit}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue disabled:bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código
                  </label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.firstName || ''}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={formData.lastName || ''}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de negocio
                  </label>
                  <input
                    type="text"
                    value={formData.businessName || ''}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descuento (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.discountRate ? Math.round(formData.discountRate * 100) : 0}
                    onChange={(e) => {
                      const percent = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, discountRate: percent / 100 });
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    El cliente pagará {formData.discountRate ? Math.round((1 - formData.discountRate) * 100) : 100}% del precio de lista
                  </p>
                </div>

                <div className="flex gap-4 justify-end pt-4">
                  <button type="button" onClick={handleCloseModal} className="btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingCuit ? 'Guardar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClientes;
