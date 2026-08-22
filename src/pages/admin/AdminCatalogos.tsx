import { useState } from 'react';
import { Catalog } from '../../types';
import {
  getCatalogs,
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  getBrands,
} from '../../store/adminStore';
import ImageField from '../../components/admin/ImageField';

const AdminCatalogos = () => {
  const [catalogs, setCatalogs] = useState(getCatalogs());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Catalog>>({
    title: '',
    brandId: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    coverUrl: '',
    pdfUrl: '',
  });

  const brands = getBrands();

  const handleOpenModal = (id?: string) => {
    if (id) {
      const catalog = getCatalog(id);
      if (catalog) {
        setFormData(catalog);
        setEditingId(id);
      }
    } else {
      setFormData({
        title: '',
        brandId: '',
        type: '',
        date: new Date().toISOString().split('T')[0],
        coverUrl: '',
        pdfUrl: '',
      });
      setEditingId(null);
    }
    setShowModal(true);
    setSuccessMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSuccessMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCatalog(editingId, formData);
      setSuccessMessage('Catálogo actualizado correctamente');
    } else {
      const newCatalog: Catalog = {
        id: `catalog-${Date.now()}`,
        title: formData.title || '',
        brandId: formData.brandId,
        type: formData.type,
        date: formData.date || new Date().toISOString().split('T')[0],
        coverUrl: formData.coverUrl,
        pdfUrl: formData.pdfUrl,
      };
      createCatalog(newCatalog);
      setSuccessMessage('Catálogo creado correctamente');
    }
    setCatalogs(getCatalogs());
    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este catálogo?')) {
      deleteCatalog(id);
      setCatalogs(getCatalogs());
    }
  };

  const getBrandName = (brandId?: string) =>
    brandId ? brands.find((b) => b.id === brandId)?.name || '-' : '-';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brandBlue">Catálogos</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Nuevo Catálogo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogs.map((catalog) => (
          <div key={catalog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-[3/4] bg-brandGray overflow-hidden">
              {catalog.coverUrl ? (
                <img
                  src={catalog.coverUrl}
                  alt={catalog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Sin portada
                </div>
              )}
            </div>
            <div className="p-6">
              {catalog.brandId && (
                <p className="text-xs text-brandBlue font-medium mb-1">
                  {getBrandName(catalog.brandId)}
                </p>
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{catalog.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(catalog.date).toLocaleDateString('es-AR')}
              </p>
              {catalog.type && (
                <p className="text-xs text-gray-500 mb-4 capitalize">{catalog.type}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(catalog.id)}
                  className="btn-secondary flex-1 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(catalog.id)}
                  className="btn-secondary flex-1 text-sm bg-red-50 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-brandBlue mb-4">
              {editingId ? 'Editar Catálogo' : 'Nuevo Catálogo'}
            </h2>
            {successMessage && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca (opcional)</label>
                <select
                  value={formData.brandId || ''}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value || undefined })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                >
                  <option value="">Sin marca</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo (opcional)</label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value || undefined })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                >
                  <option value="">Sin tipo</option>
                  <option value="general">General</option>
                  <option value="ofertas">Ofertas</option>
                  <option value="nuevos">Nuevos</option>
                  <option value="especializado">Especializado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
                />
              </div>
              <ImageField
                label="URL Portada"
                value={formData.coverUrl || ''}
                onChange={(value) => setFormData({ ...formData, coverUrl: value })}
                aspectRatio="wide"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL PDF</label>
                <input
                  type="url"
                  value={formData.pdfUrl || ''}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  placeholder="https://ejemplo.com/catalogo.pdf"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCatalogos;
