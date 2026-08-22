import { useState } from 'react';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  aspectRatio?: 'square' | 'wide';
}

const ImageField = ({
  label,
  value,
  onChange,
  required = false,
  aspectRatio = 'wide',
}: ImageFieldProps) => {
  const [error, setError] = useState('');

  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return !required;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (newValue.trim() && !isValidUrl(newValue)) {
      setError('La URL debe comenzar con http:// o https://');
    } else {
      setError('');
    }
  };

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-video';

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="https://ejemplo.com/imagen.jpg"
        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {/* Preview */}
      <div className={`mt-3 ${aspectClass} bg-brandGray rounded-lg overflow-hidden border-2 border-gray-200`}>
        {value && isValidUrl(value) ? (
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400">Error al cargar imagen</div>';
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageField;

