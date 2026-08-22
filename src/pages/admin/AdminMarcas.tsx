import { useState } from 'react';
import { Brand } from '../../types';
import { getBrands, getBrand, updateBrand } from '../../store/adminStore';
import ImageField from '../../components/admin/ImageField';

const AdminMarcas = () => {
  // Orden fijo de marcas según especificación
  const brandOrder = [
    'pietra',
    'mota',
    'prive',
    'rao',
    'fv',
    'tramontina',
    'ingco',
    'solyon',
  ];
  
  const allBrands = getBrands();
  const sortedBrands = brandOrder
    .map((id) => allBrands.find((b) => b.id === id))
    .filter((b): b is typeof allBrands[0] => b !== undefined);
  
  const [brands, setBrands] = useState(sortedBrands);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    logoUrl: '',
    heroImageUrl: '',
    description: '',
  });

  const handleOpenModal = (id: string) => {
    const brand = getBrand(id);
    if (brand) {
      setFormData(brand);
      setEditingId(id);
      setShowModal(true);
      setSuccessMessage('');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setSuccessMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Solo permitir editar nombre, logoUrl y heroImageUrl
      updateBrand(editingId, {
        name: formData.name,
        logoUrl: formData.logoUrl,
        heroImageUrl: formData.heroImageUrl,
      });
      setSuccessMessage('Marca actualizada correctamente');
      const updatedBrands = brandOrder
        .map((id) => getBrands().find((b) => b.id === id))
        .filter((b): b is Brand => b !== undefined);
      setBrands(updatedBrands);
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brandBlue">Marcas</h1>
          <p className="text-sm text-gray-600 mt-1">Solo se pueden editar las marcas existentes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-brandGray rounded-lg mb-4 overflow-hidden">
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Sin logo
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{brand.name}</h3>
            {brand.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{brand.description}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(brand.id)}
                className="btn-primary w-full text-sm"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-brandBlue mb-4">
              Editar Marca
            </h2>
            {editingId && (
              <p className="text-sm text-gray-600 mb-4">
                ID: <span className="font-mono">{editingId}</span> (no editable)
              </p>
            )}
            {successMessage && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
                />
              </div>
              <ImageField
                label="URL Logo"
                value={formData.logoUrl || ''}
                onChange={(value) => setFormData({ ...formData, logoUrl: value })}
                aspectRatio="wide"
              />
              <ImageField
                label="URL Hero Image (opcional)"
                value={formData.heroImageUrl || ''}
                onChange={(value) => setFormData({ ...formData, heroImageUrl: value })}
                aspectRatio="wide"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  rows={3}
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMarcas;
