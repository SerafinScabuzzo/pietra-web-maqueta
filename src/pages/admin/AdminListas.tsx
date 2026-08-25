import { useState } from 'react';
import { PriceList } from '../../types';
import {
  getPriceLists,
  getPriceList,
  createPriceList,
  updatePriceList,
  deletePriceList,
} from '../../store/adminStore';
import { PRICE_LIST_TYPES } from '../../data/mocks/priceLists';
import { downloadPriceListFile } from '../../utils/priceListDownload';
import ImageField from '../../components/admin/ImageField';

const formatFromType = (listType: string): 'xlsx' | 'pdf' =>
  listType.toUpperCase().includes('PDF') ? 'pdf' : 'xlsx';

const AdminListas = () => {
  const [lists, setLists] = useState(getPriceLists());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<PriceList>>({
    listType: PRICE_LIST_TYPES[0],
    validity: '',
    order: 1,
    imageUrl: '',
    fileFormat: 'xlsx',
    fileName: '',
    fileUrl: '',
  });

  const refresh = () => setLists(getPriceLists());

  const handleOpenNew = () => {
    setFormData({
      listType: PRICE_LIST_TYPES[0],
      validity: '',
      order: lists.length + 1,
      imageUrl: '',
      fileFormat: 'xlsx',
      fileName: '',
      fileUrl: '',
    });
    setEditingId(null);
    setShowForm(true);
    setSuccessMessage('');
  };

  const handleOpenEdit = (id: string) => {
    const list = getPriceList(id);
    if (!list) return;
    setFormData(list);
    setEditingId(id);
    setShowForm(true);
    setSuccessMessage('');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setSuccessMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listType = formData.listType || PRICE_LIST_TYPES[0];
    const fileFormat = formData.fileFormat || formatFromType(listType);
    const payload: Omit<PriceList, 'id'> = {
      listType,
      validity: formData.validity || '',
      order: formData.order ?? 0,
      imageUrl: formData.imageUrl,
      fileFormat,
      fileName:
        formData.fileName ||
        `${listType.replace(/\s+/g, '_')}.${fileFormat === 'pdf' ? 'pdf' : 'xlsx'}`,
      fileUrl: formData.fileUrl,
    };

    if (editingId) {
      updatePriceList(editingId, payload);
      setSuccessMessage('Lista actualizada correctamente');
    } else {
      createPriceList({ id: `lista-${Date.now()}`, ...payload });
      setSuccessMessage('Lista creada correctamente');
    }
    refresh();
    setTimeout(() => handleCloseForm(), 800);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('¿Eliminar esta lista?')) return;
    deletePriceList(id);
    refresh();
  };

  if (showForm) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-brandBlue mb-6">
          {editingId ? 'Editar Lista' : 'Nueva Lista'}
        </h1>
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lista:</label>
            <select
              value={formData.listType || PRICE_LIST_TYPES[0]}
              onChange={(e) => {
                const listType = e.target.value;
                setFormData({
                  ...formData,
                  listType,
                  fileFormat: formatFromType(listType),
                });
              }}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
            >
              {PRICE_LIST_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vigencia:</label>
            <input
              type="text"
              value={formData.validity || ''}
              onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
              placeholder="LISTA 293 13/11/2025"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Orden:</label>
            <input
              type="number"
              value={formData.order ?? 0}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Archivo (mock):</label>
            <input
              type="text"
              value={formData.fileName || ''}
              onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
              placeholder="nombre-archivo.xlsx"
            />
            <p className="text-xs text-gray-500 mt-1">
              En la maqueta no hay upload real; al hacer clic en Ver se descarga un archivo mock.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL archivo (opcional):
            </label>
            <input
              type="url"
              value={formData.fileUrl || ''}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
              placeholder="https://..."
            />
          </div>
          <ImageField
            label="Imagen JPG (800px x 800px)"
            value={formData.imageUrl || ''}
            onChange={(value) => setFormData({ ...formData, imageUrl: value })}
            aspectRatio="square"
          />
          <p className="text-xs text-gray-500 -mt-2">Formato JPG únicamente (URL http/https en la maqueta).</p>
          <div className="flex gap-4 justify-end pt-2">
            <button type="button" onClick={handleCloseForm} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brandBlue">Listas</h1>
        <button type="button" onClick={handleOpenNew} className="btn-primary">
          + Nueva Lista
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden flex flex-col"
          >
            <div className="aspect-square bg-white border-b border-slate-100">
              {list.imageUrl ? (
                <img
                  src={list.imageUrl}
                  alt={list.listType}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-white" />
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <button
                type="button"
                onClick={() => downloadPriceListFile(list)}
                className="text-sm text-brandBlue hover:underline text-left mb-2"
              >
                Ver {list.fileFormat === 'pdf' ? 'pdf' : 'xlsx'}
              </button>
              <h3 className="text-lg font-bold text-gray-900">{list.listType}</h3>
              <p className="text-sm text-gray-600 mt-1">Vigencia: {list.validity || '—'}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(list.id)}
                  className="btn-primary flex-1 text-sm"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(list.id)}
                  className="flex-1 text-sm px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-600 hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lists.length === 0 && (
        <p className="text-gray-500 text-center py-12">No hay listas cargadas.</p>
      )}
    </div>
  );
};

export default AdminListas;
