import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginClient, setAdminMode, setClientDemoMode } from '../utils/auth';

// Normalizar CUIT: elimina todo lo que no sea dígito
const normalizeCuit = (value: string): string => {
  return value.replace(/\D/g, '').trim();
};

const Login = () => {
  const [cuit, setCuit] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Normalizar CUIT antes de enviar
    const normalizedCuit = normalizeCuit(cuit);
    const normalizedCode = code.trim();

    // Debug temporal
    console.log('=== LOGIN DEBUG ===');
    console.log('CUIT input:', cuit);
    console.log('CUIT normalized:', normalizedCuit);
    console.log('Code input:', code);
    console.log('Code normalized:', normalizedCode);

    if (!normalizedCuit || !normalizedCode) {
      setError('Por favor, completá todos los campos');
      return;
    }

    const success = loginClient(normalizedCuit, normalizedCode);

    // Debug temporal
    console.log('Login success:', success);
    console.log('==================');

    if (success) {
      // Redirigir a /mi-cuenta en lugar de Home
      navigate('/mi-cuenta');
    } else {
      setError('Usuario o código incorrecto');
    }
  };

  const handleAdminDemo = () => {
    setAdminMode(true);
    navigate('/admin');
  };

  const handleClientDemo = (e?: React.MouseEvent) => {
    // Prevenir cualquier comportamiento por defecto
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Limpiar cualquier error previo
    setError('');

    try {
      console.log('=== CLIENT DEMO MODE ===');
      
      // Activar modo cliente demo (similar a setAdminMode)
      const success = setClientDemoMode();

      if (success) {
        console.log('Client demo mode activated - redirecting to /mi-cuenta');
        navigate('/mi-cuenta');
      } else {
        console.error('Client demo mode FAILED - setClientDemoMode returned false');
        setError('Error al activar modo cliente demo. Revisá consola.');
      }
    } catch (err) {
      console.error('Demo client error:', err);
      console.error('Stack:', err instanceof Error ? err.stack : 'No stack available');
      setError('Error al activar modo cliente demo. Revisá consola.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-brandBlue mb-2">Acceso Clientes</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Solo clientes existentes. No se crean cuentas desde la web.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              id="cuit"
              type="text"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              placeholder="Ingresá tu usuario"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue"
              required
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Código/Contraseña
            </label>
            <div className="relative">
              <input
                id="code"
                type={showPassword ? 'text' : 'password'}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingresá tu código"
                className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-brandBlue"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            Ingresar
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-[11px] text-gray-400 text-center mb-2 tracking-wide">[DEMO]</p>
          <button
            onClick={(e) => handleClientDemo(e)}
            className="w-full text-xs text-gray-500 hover:text-brandOrange underline mb-2"
            type="button"
          >
            Entrar como Cliente
          </button>
          <button
            onClick={handleAdminDemo}
            className="w-full text-xs text-gray-500 hover:text-brandOrange underline"
            type="button"
          >
            Entrar como Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
