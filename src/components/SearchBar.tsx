import { useState, FormEvent, useEffect, useRef, KeyboardEvent } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Product } from '../types';
import { getProducts } from '../store/adminStore';
import { getSearchSuggestions } from '../utils/search';

const DEBOUNCE_MS = 250;
const MAX_SUGGESTIONS = 8;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (location.pathname === '/buscar') {
      const queryFromUrl = searchParams.get('q') || '';
      setSearchQuery(queryFromUrl);
    } else {
      setSearchQuery('');
    }
    setSuggestions([]);
    setOpen(false);
    setHighlight(-1);
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  const updateSuggestions = (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      setOpen(false);
      setHighlight(-1);
      return;
    }
    const next = getSearchSuggestions(getProducts(), value, MAX_SUGGESTIONS);
    setSuggestions(next);
    setOpen(next.length > 0);
    setHighlight(-1);
  };

  const handleChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      updateSuggestions(value);
    }, DEBOUNCE_MS);
  };

  const goToProduct = (productId: string) => {
    setOpen(false);
    setSuggestions([]);
    setHighlight(-1);
    navigate(`/producto/${productId}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (highlight >= 0 && suggestions[highlight]) {
      goToProduct(suggestions[highlight].id);
      return;
    }
    setOpen(false);
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/buscar');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setHighlight(-1);
      return;
    }
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-[480px]">
      <div className="relative" ref={wrapRef}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por producto, rubro o código"
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 px-5 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue transition-colors"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
          />
          <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap">
            Buscar
          </button>
        </div>

        {open && suggestions.length > 0 && (
          <ul
            className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-[60] max-h-80 overflow-y-auto"
            role="listbox"
          >
            {suggestions.map((product, index) => (
              <li key={product.id} role="option" aria-selected={index === highlight}>
                <button
                  type="button"
                  className={`w-full text-left px-3 py-2 flex items-center gap-3 ${
                    index === highlight ? 'bg-sky-50' : 'hover:bg-slate-50'
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToProduct(product.id)}
                >
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-10 h-10 object-cover rounded bg-brandGray flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </span>
                    <span className="block text-xs text-gray-500">{product.sku}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
