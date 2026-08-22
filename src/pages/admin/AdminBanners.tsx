import { useState } from 'react';
import { Banner, getBanners, getBanner, createBanner, updateBanner, deleteBanner } from '../../store/adminStore';
import ImageField from '../../components/admin/ImageField';

const AdminBanners = () => {
  const [banners, setBanners] = useState(getBanners());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Banner>>({
    title: '',
    subtitle: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
  });

  const handleOpenModal = (id?: string) => {
    if (id) {
      const banner = getBanner(id);
      if (banner) {
        setFormData(banner);
        setEditingId(id);
      }
    } else {
      setFormData({ title: '', subtitle: '', imageUrl: '', buttonText: '', buttonLink: '' });
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
      updateBanner(editingId, formData);
      setSuccessMessage('Banner actualizado correctamente');
    } else {
      const newBanner: Banner = {
        id: `banner-${Date.now()}`,
        title: formData.title || '',
        subtitle: formData.subtitle,
        imageUrl: formData.imageUrl || '',
        buttonText: formData.buttonText || '',
        buttonLink: formData.buttonLink || '',
      };
      createBanner(newBanner);
      setSuccessMessage('Banner creado correctamente');
    }
    setBanners(getBanners());
    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este banner?')) {
      deleteBanner(id);
      setBanners(getBanners());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brandBlue">Banners</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Nuevo Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-brandGray overflow-hidden">
              {banner.imageUrl ? (
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
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
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{banner.title}</h3>
              {banner.subtitle && <p className="text-sm text-gray-600 mb-2">{banner.subtitle}</p>}
              <p className="text-xs text-gray-500 mb-4">
                Botón: {banner.buttonText} → {banner.buttonLink}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(banner.id)}
                  className="btn-secondary flex-1 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
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
              {editingId ? 'Editar Banner' : 'Nuevo Banner'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo (opcional)</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                />
              </div>
              <ImageField
                label="URL Imagen"
                value={formData.imageUrl || ''}
                onChange={(value) => setFormData({ ...formData, imageUrl: value })}
                aspectRatio="wide"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto Botón <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Botón <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
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

export default AdminBanners;
