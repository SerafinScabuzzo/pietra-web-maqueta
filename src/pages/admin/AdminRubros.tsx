import { useState } from 'react';
import { Category } from '../../types';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../store/adminStore';
import ImageField from '../../components/admin/ImageField';

const AdminRubros = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    imageUrl: '',
    order: 0,
  });

  const categories = getCategories();

  const handleOpenModal = (categoryId?: string) => {
    if (categoryId) {
      const category = getCategory(categoryId);
      if (category) {
        setFormData(category);
        setEditingId(categoryId);
      }
    } else {
      setFormData({ name: '', imageUrl: '', order: getCategories().length + 1 });
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
      updateCategory(editingId, formData);
      setSuccessMessage('Rubro actualizado correctamente');
    } else {
      const newCategory: Category = {
        id: `category-${Date.now()}`,
        name: formData.name || '',
        imageUrl: formData.imageUrl,
        order: formData.order || 0,
      };
      createCategory(newCategory);
      setSuccessMessage('Rubro creado correctamente');
    }
    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este rubro?')) {
      deleteCategory(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brandBlue">Rubros</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Nuevo Rubro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="aspect-video bg-brandGray rounded-lg mb-4 overflow-hidden">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Sin imagen
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(category.id)}
                className="btn-primary flex-1 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="btn-secondary flex-1 text-sm bg-red-50 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-brandBlue mb-4">
              {editingId ? 'Editar Rubro' : 'Nuevo Rubro'}
            </h2>
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
                label="URL Imagen (opcional)"
                value={formData.imageUrl || ''}
                onChange={(value) => setFormData({ ...formData, imageUrl: value })}
                aspectRatio="wide"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  min="0"
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

export default AdminRubros;
