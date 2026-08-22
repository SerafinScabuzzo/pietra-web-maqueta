import { loginClient as clientLogin } from '../store/clientStore';

interface AuthData {
  role: 'client' | 'admin';
  cuit?: string;
}

const AUTH_KEY = 'pietra_auth';

/**
 * Emite evento cuando cambia la autenticación
 * Permite que componentes como Header se enteren de cambios en tiempo real
 */
export const emitAuthChanged = (): void => {
  window.dispatchEvent(new Event('pietra_auth_changed'));
};

/**
 * Normaliza CUIT (elimina todo lo que no sea dígito)
 */
const normalizeCuit = (cuit: string): string => {
  return cuit.replace(/\D/g, '').trim();
};

/**
 * Valida formato básico de CUIT (11 dígitos)
 */
const isValidCuitFormat = (cuit: string): boolean => {
  const normalized = normalizeCuit(cuit);
  return /^\d{11}$/.test(normalized);
};

/**
 * Login de cliente (usa clientStore)
 */
export const loginClient = (cuit: string, code: string): boolean => {
  // Normalizar CUIT primero
  const normalizedCuit = normalizeCuit(cuit);
  const normalizedCode = String(code).trim();

  // Debug temporal
  console.log('=== AUTH UTILS LOGIN ===');
  console.log('Input CUIT:', cuit);
  console.log('Normalized CUIT:', normalizedCuit);
  console.log('Input Code:', code);
  console.log('Normalized Code:', normalizedCode);

  if (!normalizedCuit || !normalizedCode) {
    console.log('Validation failed: empty fields');
    console.log('=======================');
    return false;
  }

  if (!isValidCuitFormat(normalizedCuit)) {
    console.log('Validation failed: invalid CUIT format (must be 11 digits)');
    console.log('CUIT length:', normalizedCuit.length);
    console.log('=======================');
    return false;
  }

  const success = clientLogin(normalizedCuit, normalizedCode);

  if (success) {
    const authData: AuthData = {
      role: 'client',
      cuit: normalizedCuit,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    console.log('Auth data saved to localStorage:', authData);
    emitAuthChanged(); // Notificar cambio de auth
  } else {
    console.log('Login failed in clientStore');
  }

  console.log('=======================');
  return success;
};

/**
 * Logout
 */
/**
 * Logout
 * NO usa require() - funciona completamente en navegador
 */
export const logout = (): void => {
  // Limpiar sesión de auth
  localStorage.removeItem(AUTH_KEY);
  
  // También cerrar sesión de cliente (sin require)
  const CURRENT_CLIENT_KEY = 'pietra_current_client';
  localStorage.removeItem(CURRENT_CLIENT_KEY);
  
  emitAuthChanged(); // Notificar cambio de auth
};

/**
 * Obtiene estado de autenticación
 */
export const getAuth = (): {
  isClient: boolean;
  isAdmin: boolean;
  cuit?: string;
} => {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) {
      return { isClient: false, isAdmin: false };
    }

    const authData: AuthData = JSON.parse(stored);
    return {
      isClient: authData.role === 'client',
      isAdmin: authData.role === 'admin',
      cuit: authData.cuit,
    };
  } catch {
    return { isClient: false, isAdmin: false };
  }
};

/**
 * Activa modo admin (solo para pruebas/demo)
 */
export const setAdminMode = (isAdmin: boolean): void => {
  if (isAdmin) {
    const authData: AuthData = {
      role: 'admin',
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    emitAuthChanged(); // Notificar cambio de auth
  } else {
    logout(); // logout ya emite el evento
  }
};

/**
 * Activa modo cliente demo (solo para pruebas/demo)
 * Similar a setAdminMode pero para cliente
 * Reutiliza EXACTAMENTE la misma fuente de verdad de auth
 * NO usa require() - funciona completamente en navegador
 */
export const setClientDemoMode = (): boolean => {
  try {
    console.log('=== setClientDemoMode START ===');
    
    // 1. Cliente demo fijo (hardcode)
    const demoClient = {
      id: '11111111111',
      cuit: '11111111111',
      code: '111111',
      firstName: 'Demo',
      lastName: 'Demo',
      businessName: 'Negocio Demo',
      address: 'Direccion Demo 123',
      discountRate: 0.55,
      favorites: [] as string[],
    };
    
    console.log('Cliente demo definido:', demoClient);
    
    // Keys de localStorage (mismas que usa clientStore)
    const CLIENTS_STORAGE_KEY = 'pietra_clients';
    const CURRENT_CLIENT_KEY = 'pietra_current_client';
    const CART_STORAGE_PREFIX = 'pietra_cart_';
    
    // 2. Asegurar que el cliente demo existe en pi_clients
    console.log('Verificando si el cliente demo existe en localStorage...');
    let clients: any[] = [];
    
    try {
      const stored = localStorage.getItem(CLIENTS_STORAGE_KEY);
      if (stored) {
        clients = JSON.parse(stored);
        if (!Array.isArray(clients)) {
          clients = [];
        }
      }
    } catch (err) {
      console.warn('Error leyendo clientes de localStorage, inicializando array vacío:', err);
      clients = [];
    }
    
    // Buscar si ya existe el cliente demo
    const existingClient = clients.find((c: any) => c.cuit === demoClient.cuit);
    
    if (!existingClient) {
      console.log('Cliente demo no existe, agregándolo a la lista...');
      clients.push(demoClient);
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
      console.log('Cliente demo agregado a localStorage');
    } else {
      console.log('Cliente demo ya existe en la lista');
    }
    
    // 3. Setear cliente actual en localStorage
    console.log('Seteando cliente actual en localStorage...');
    localStorage.setItem(CURRENT_CLIENT_KEY, JSON.stringify(demoClient.cuit));
    
    // 4. Inicializar carrito vacío si no existe (pi_cart_11111111111)
    const cartKey = `${CART_STORAGE_PREFIX}${demoClient.cuit}`;
    if (!localStorage.getItem(cartKey)) {
      console.log('Inicializando carrito vacío para cliente demo...');
      localStorage.setItem(cartKey, JSON.stringify({ items: [] }));
    }
    
    // 5. Favoritos ya están en el objeto cliente (favorites: []), se inicializan automáticamente
    
    // 6. Persistir sesión cliente en localStorage (misma key que usa el login real)
    // Usa la misma clave AUTH_KEY que el resto de la app consume
    const authData: AuthData = {
      role: 'client',
      cuit: demoClient.cuit,
    };
    
    console.log('Guardando auth data en localStorage:', authData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    
    // Verificar que se guardó correctamente
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) {
      throw new Error('No se pudo guardar en localStorage');
    }
    
    const parsed = JSON.parse(stored);
    console.log('Auth data guardado y verificado:', parsed);
    
    // Verificar que getAuth() lo lee correctamente
    const auth = getAuth();
    console.log('getAuth() retorna:', auth);
    
    if (!auth.isClient || auth.cuit !== demoClient.cuit) {
      throw new Error('La sesión no se seteo correctamente');
    }
    
    // 7. Notificar a la app que cambió la autenticación (para que Header re-renderice)
    emitAuthChanged();
    
    console.log('=== setClientDemoMode SUCCESS ===');
    return true;
  } catch (error) {
    console.error('=== setClientDemoMode ERROR ===');
    console.error('Error activando cliente demo:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    console.error('================================');
    return false;
  }
};
