import { useState } from 'react';
import { Subcategory } from '../../types';
import {
  getSubcategories,
  getSubcategory,
  getCategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  deleteSubcategories,
} from '../../store/adminStore';
import ImageField from '../../components/admin/ImageField';

const AdminSubrubros = () => {
  const [items, setItems] = useState(getSubcategories());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Subcategory>>({
    name: '',
    categoryId: '',
    imageUrl: '',
    order: 0,
  });

  const categories = getCategories();

  const refresh = () => {
    setItems(getSubcategories());
    setSelected(new Set());
  };

  const handleOpenModal = (id?: string) => {
    if (id) {
      const sub = getSubcategory(id);
      if (sub) {
        setFormData(sub);
        setEditingId(id);
      }
    } else {
      setFormData({
        name: '',
        categoryId: categories[0]?.id || '',
        imageUrl: '',
        order: items.length + 1,
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
    if (!formData.name?.trim() || !formData.categoryId) return;

    if (editingId) {
      updateSubcategory(editingId, formData);
      setSuccessMessage('Subrubro actualizado correctamente');
    } else {
      const newSub: Subcategory = {
        id: `sub-${Date.now()}`,
        name: formData.name.trim(),
        categoryId: formData.categoryId,
        imageUrl: formData.imageUrl,
        order: formData.order ?? 0,
      };
      createSubcategory(newSub);
      setSuccessMessage('Subrubro creado correctamente');
    }
    refresh();
    setTimeout(() => handleCloseModal(), 800);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este subrubro?')) return;
    const ok = deleteSubcategory(id);
    if (!ok) {
      window.alert('No se puede eliminar: hay productos asignados a este subrubro.');
      return;
    }
    refresh();
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDeleteSelected = () => {
    if (selected.size === 0) return;
    if (!window.confirm(`¿Eliminar ${selected.size} subrubro(s) seleccionado(s)?`)) return;
    const { blocked } = deleteSubcategories([...selected]);
    if (blocked > 0) {
      window.alert(
        `${blocked} subrubro(s) no se eliminaron porque tienen productos asignados.`
      );
    }
    refresh();
  };

  const categoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name || categoryId;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-brandBlue">SubRubros</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDeleteSelected}
            disabled={selected.size === 0}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700"
          >
            Eliminar Seleccionados
          </button>
          <button type="button" onClick={() => handleOpenModal()} className="btn-primary">
            + Nuevo SubRubro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((sub) => (
          <div key={sub.id} className="bg-white rounded-lg shadow-md p-4 border border-slate-100">
            <div className="aspect-video bg-brandGray rounded-lg mb-3 overflow-hidden">
              {sub.imageUrl ? (
                <img
                  src={sub.imageUrl}
                  alt={sub.name}
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
            <h3 className="text-base font-semibold text-gray-800 uppercase tracking-wide mb-1">
              {sub.name}
            </h3>
            <p className="text-xs text-gray-500 mb-3">Rubro: {categoryName(sub.categoryId)}</p>
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.has(sub.id)}
                onChange={() => toggleSelect(sub.id)}
                className="rounded border-gray-300"
              />
              Seleccionar para eliminar
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleOpenModal(sub.id)}
                className="btn-primary flex-1 text-sm"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(sub.id)}
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
              {editingId ? 'Editar SubRubro' : 'Nuevo SubRubro'}
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
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rubro <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.categoryId || ''}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
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
                  value={formData.order ?? 0}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  min="0"
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

export default AdminSubrubros;
