import { useState } from 'react';
import { Product } from '../../types';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrands,
  getCategories,
  getSubcategoriesByCategory,
} from '../../store/adminStore';
import ImageGalleryField from '../../components/admin/ImageGalleryField';

const AdminProductos = () => {
  const [products, setProducts] = useState(getProducts());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    sku: '',
    brandId: '',
    categoryId: '',
    subcategoryId: '',
    priceList: 0,
    priceOffer: undefined,
    isOffer: false,
    isFeatured: false,
    images: [],
  });

  const brands = getBrands();
  const categories = getCategories();
  const availableCategories = categories;

  const handleOpenModal = (id?: string) => {
    if (id) {
      const product = getProduct(id);
      if (product) {
        setFormData(product);
        setEditingId(id);
      }
    } else {
      setFormData({
        name: '',
        sku: '',
        brandId: '',
        categoryId: '',
        subcategoryId: '',
        priceList: 0,
        priceOffer: undefined,
        isOffer: false,
        isFeatured: false,
        images: [],
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
      updateProduct(editingId, formData);
      setSuccessMessage('Producto actualizado correctamente');
    } else {
      const categoryId = formData.categoryId || '';
      const firstSub = getSubcategoriesByCategory(categoryId)[0];
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        sku: formData.sku || '',
        name: formData.name || '',
        brandId: formData.brandId || '',
        categoryId,
        subcategoryId: formData.subcategoryId || firstSub?.id || '',
        priceList: formData.priceList || 0,
        priceOffer: formData.priceOffer,
        isOffer: formData.isOffer ?? false,
        isFeatured: formData.isFeatured ?? false,
        images: formData.images || [],
      };
      createProduct(newProduct);
      setSuccessMessage('Producto creado correctamente');
    }
    setProducts(getProducts());
    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const productBrand = (brandId: string) => brands.find((b) => b.id === brandId);
  const productCategory = (categoryId?: string) =>
    categoryId ? categories.find((c) => c.id === categoryId) : undefined;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brandBlue">Productos</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rubro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">Sin img</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                      Sin img
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {productBrand(product.brandId)?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {productCategory(product.categoryId)?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.priceOffer ? (
                    <>
                      <span className="text-brandOrange font-bold">
                        ${product.priceOffer.toLocaleString('es-AR')}
                      </span>
                      <span className="text-gray-400 line-through ml-2">
                        ${product.priceList.toLocaleString('es-AR')}
                      </span>
                    </>
                  ) : (
                    <span>${product.priceList.toLocaleString('es-AR')}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(product.id)}
                    className="text-brandBlue hover:text-brandBlue-dark mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-brandBlue mb-4">
              {editingId ? 'Editar Producto' : 'Nuevo Producto'}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marca <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                    required
                  >
                    <option value="">Seleccionar marca</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rubro <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoryId || ''}
                    onChange={(e) => {
                      const categoryId = e.target.value;
                      const firstSub = getSubcategoriesByCategory(categoryId)[0];
                      setFormData({
                        ...formData,
                        categoryId,
                        subcategoryId: firstSub?.id || '',
                      });
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                    required
                  >
                    <option value="">Seleccionar rubro</option>
                    {availableCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subrubro</label>
                <select
                  value={formData.subcategoryId || ''}
                  onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  disabled={!formData.categoryId}
                >
                  <option value="">Seleccionar subrubro</option>
                  {getSubcategoriesByCategory(formData.categoryId || '').map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Lista <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.priceList || 0}
                    onChange={(e) => setFormData({ ...formData, priceList: Number(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Oferta (opcional)</label>
                  <input
                    type="number"
                    value={formData.priceOffer || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priceOffer: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.isOffer === true}
                    onChange={(e) => setFormData({ ...formData, isOffer: e.target.checked })}
                    className="w-5 h-5"
                  />
                  Oferta
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured === true}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-5 h-5"
                  />
                  Destacado
                </label>
              </div>
              <ImageGalleryField
                label="Galería de Imágenes (URLs)"
                values={formData.images || []}
                onChange={(values) => setFormData({ ...formData, images: values })}
              />
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

export default AdminProductos;
