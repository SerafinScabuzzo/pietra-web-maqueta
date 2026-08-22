import { useState } from 'react';

interface ImageGalleryFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}

const ImageGalleryField = ({ label, values, onChange }: ImageGalleryFieldProps) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const handleAdd = () => {
    if (!newImageUrl.trim()) {
      setError('Ingresá una URL válida');
      return;
    }

    if (!isValidUrl(newImageUrl)) {
      setError('La URL debe comenzar con http:// o https://');
      return;
    }

    if (values.includes(newImageUrl)) {
      setError('Esta imagen ya está en la galería');
      return;
    }

    onChange([...values, newImageUrl]);
    setNewImageUrl('');
    setError('');
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      {/* Input para agregar */}
      <div className="flex gap-2 mb-3">
        <input
          type="url"
          value={newImageUrl}
          onChange={(e) => {
            setNewImageUrl(e.target.value);
            setError('');
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="https://ejemplo.com/imagen.jpg"
          className={`flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="btn-primary whitespace-nowrap"
        >
          Agregar imagen
        </button>
      </div>
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

      {/* Galería de previews */}
      {values.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {values.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-brandGray rounded-lg overflow-hidden border-2 border-gray-200">
                {isValidUrl(url) ? (
                  <img
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">Error</div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    URL inválida
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                aria-label="Eliminar imagen"
              >
                ×
              </button>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
          No hay imágenes en la galería. Agregá una URL arriba.
        </div>
      )}
    </div>
  );
};

export default ImageGalleryField;

