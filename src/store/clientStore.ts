import { Client, Cart } from '../types/client';
import { clients as initialClients } from '../data/mocks/clients';

const CLIENTS_STORAGE_KEY = 'pietra_clients';
const CURRENT_CLIENT_KEY = 'pietra_current_client';
const CART_STORAGE_PREFIX = 'pietra_cart_';

// Estado inicial
let clientList: Client[] = JSON.parse(JSON.stringify(initialClients));

// Cargar desde localStorage
const loadClients = (): void => {
  try {
    const stored = localStorage.getItem(CLIENTS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validar que sea un array y tenga al menos el cliente por defecto
      if (Array.isArray(parsed) && parsed.length > 0) {
        clientList = parsed;
      } else {
        // Si está corrupto o vacío, resetear
        clientList = JSON.parse(JSON.stringify(initialClients));
        saveClients();
      }
    } else {
      // Seed inicial - asegurar que el cliente por defecto esté guardado
      clientList = JSON.parse(JSON.stringify(initialClients));
      saveClients();
    }
  } catch (error) {
    console.error('Error loading clients from localStorage:', error);
    // En caso de error, resetear a los valores iniciales
    clientList = JSON.parse(JSON.stringify(initialClients));
    saveClients();
  }
};

// Guardar en localStorage
const saveClients = (): void => {
  try {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clientList));
  } catch (error) {
    console.error('Error guardando clientes:', error);
  }
};

// Inicializar
loadClients();

// Obtener cliente actual
export const getCurrentClient = (): Client | null => {
  try {
    const stored = localStorage.getItem(CURRENT_CLIENT_KEY);
    if (!stored) return null;
    const cuit = JSON.parse(stored);
    return getClientByCuit(cuit) || null;
  } catch {
    return null;
  }
};

// Establecer cliente actual
export const setCurrentClient = (cuit: string | null): void => {
  if (cuit) {
    localStorage.setItem(CURRENT_CLIENT_KEY, JSON.stringify(cuit));
  } else {
    localStorage.removeItem(CURRENT_CLIENT_KEY);
  }
};

// Obtener cliente por CUIT
export const getClientByCuit = (cuit: string): Client | undefined => {
  return clientList.find((c) => c.cuit === cuit);
};

// Obtener todos los clientes
export const getClients = (): Client[] => {
  return [...clientList];
};

// Crear cliente
export const createClient = (client: Client): void => {
  // Evitar duplicados por CUIT
  if (getClientByCuit(client.cuit)) {
    console.warn(`Cliente con CUIT ${client.cuit} ya existe`);
    return;
  }
  clientList.push(client);
  saveClients();
};

// Asegurar que el cliente demo existe (crear si no existe)
export const ensureDemoClient = (): Client => {
  const demoCuit = '11111111111';
  
  console.log('=== ensureDemoClient START ===');
  console.log('Buscando cliente demo con CUIT:', demoCuit);
  
  // Buscar cliente existente
  let demoClient = getClientByCuit(demoCuit);
  
  if (!demoClient) {
    console.log('Cliente demo no existe, creando...');
    demoClient = {
      id: demoCuit,
      cuit: demoCuit,
      code: '111111',
      firstName: 'Demo',
      lastName: 'Demo',
      businessName: 'Negocio Demo',
      address: 'Dirección Demo 123',
      discountRate: 0.55,
      favorites: [],
    };
    
    // Crear cliente (esto lo guarda en store y localStorage)
    createClient(demoClient);
    
    // Verificar que se creó correctamente
    const created = getClientByCuit(demoCuit);
    if (!created) {
      throw new Error('No se pudo crear el cliente demo');
    }
    
    console.log('Cliente demo creado exitosamente:', created);
    demoClient = created;
  } else {
    console.log('Cliente demo ya existe:', demoClient);
  }
  
  console.log('=== ensureDemoClient SUCCESS ===');
  return demoClient;
};

// Actualizar cliente
export const updateClient = (cuit: string, updates: Partial<Client>): void => {
  const index = clientList.findIndex((c) => c.cuit === cuit);
  if (index !== -1) {
    clientList[index] = { ...clientList[index], ...updates };
    saveClients();
    // Si es el cliente actual, actualizar también
    const current = getCurrentClient();
    if (current && current.cuit === cuit) {
      setCurrentClient(cuit); // Esto recargará el cliente actualizado
    }
  }
};

// Eliminar cliente
export const deleteClient = (cuit: string): void => {
  clientList = clientList.filter((c) => c.cuit !== cuit);
  saveClients();
  // Si es el cliente actual, cerrar sesión
  const current = getCurrentClient();
  if (current && current.cuit === cuit) {
    setCurrentClient(null);
  }
};

// Normalizar CUIT (elimina todo lo que no sea dígito)
const normalizeCuit = (cuit: string): string => {
  return cuit.replace(/\D/g, '').trim();
};

// Login cliente
export const loginClient = (cuit: string, code: string): boolean => {
  // Asegurar que el CUIT ya viene normalizado (pero normalizar por si acaso)
  const normalizedCuit = normalizeCuit(cuit);
  // Asegurar que el código sea string y esté normalizado
  const normalizedCode = String(code).trim();
  
  // Debug temporal
  console.log('=== CLIENT STORE LOGIN ===');
  console.log('Input CUIT:', cuit);
  console.log('Normalized CUIT:', normalizedCuit);
  console.log('Input Code:', code);
  console.log('Normalized Code:', normalizedCode);
  
  // Obtener todos los clientes disponibles
  const allClients = getClients();
  console.log('Available clients:', allClients.map(c => ({ cuit: c.cuit, code: c.code })));
  
  // Buscar cliente por CUIT normalizado
  const client = getClientByCuit(normalizedCuit);
  console.log('Found client:', client ? { cuit: client.cuit, code: client.code } : null);
  
  if (client) {
    // Comparar código como string
    const codeMatch = String(client.code) === normalizedCode;
    console.log('Code match:', codeMatch);
    console.log('Client code type:', typeof client.code);
    console.log('Normalized code type:', typeof normalizedCode);
    
    if (codeMatch) {
      setCurrentClient(normalizedCuit);
      console.log('Login SUCCESS - Client session set');
      console.log('===============================');
      return true;
    }
  }
  
  console.log('Login FAILED');
  console.log('===============================');
  return false;
};

// Logout cliente
export const logoutClient = (): void => {
  setCurrentClient(null);
};

// Favoritos
export const toggleFavorite = (productId: string): void => {
  const client = getCurrentClient();
  if (!client) return;

  // Obtener cliente actualizado del store
  const updatedClient = getClientByCuit(client.cuit);
  if (!updatedClient) return;

  const currentFavorites = [...(updatedClient.favorites || [])];
  const index = currentFavorites.indexOf(productId);
  
  if (index === -1) {
    currentFavorites.push(productId);
  } else {
    currentFavorites.splice(index, 1);
  }

  // Actualizar cliente con nuevos favoritos
  updateClient(client.cuit, { favorites: currentFavorites });
  
  // Emitir evento para notificar cambios
  window.dispatchEvent(new Event('pietra_favorites_changed'));
};

export const isFavorite = (productId: string): boolean => {
  const client = getCurrentClient();
  if (!client) return false;
  
  // Obtener cliente actualizado del store
  const updatedClient = getClientByCuit(client.cuit);
  if (!updatedClient) return false;
  
  return (updatedClient.favorites || []).includes(productId);
};

// Carrito
const getCartKey = (cuit: string): string => {
  return `${CART_STORAGE_PREFIX}${cuit}`;
};

export const getCart = (cuit: string): Cart => {
  try {
    const stored = localStorage.getItem(getCartKey(cuit));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignorar errores
  }
  return { items: [] };
};

export const emitCartChanged = (): void => {
  window.dispatchEvent(new Event('pietra_cart_changed'));
};

export const saveCart = (cuit: string, cart: Cart): void => {
  try {
    localStorage.setItem(getCartKey(cuit), JSON.stringify(cart));
    emitCartChanged();
  } catch (error) {
    console.error('Error guardando carrito:', error);
  }
};

export const addToCart = (productId: string, quantity: number = 1): void => {
  const client = getCurrentClient();
  if (!client) return;

  const cart = getCart(client.cuit);
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  saveCart(client.cuit, cart);
};

export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  const client = getCurrentClient();
  if (!client) return;

  const cart = getCart(client.cuit);
  const item = cart.items.find((item) => item.productId === productId);

  if (item) {
    if (quantity <= 0) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
    } else {
      item.quantity = quantity;
    }
    saveCart(client.cuit, cart);
  }
};

export const removeFromCart = (productId: string): void => {
  const client = getCurrentClient();
  if (!client) return;

  const cart = getCart(client.cuit);
  cart.items = cart.items.filter((item) => item.productId !== productId);
  saveCart(client.cuit, cart);
};

export const getCartItemCount = (): number => {
  const client = getCurrentClient();
  if (!client) return 0;

  const cart = getCart(client.cuit);
  return cart.items.length;
};

export const getCartUnitCount = (): number => {
  const client = getCurrentClient();
  if (!client) return 0;

  const cart = getCart(client.cuit);
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
};

export const isInCart = (productId: string): boolean => {
  const client = getCurrentClient();
  if (!client) return false;
  return getCart(client.cuit).items.some((item) => item.productId === productId);
};

export const clearCart = (): void => {
  const client = getCurrentClient();
  if (!client) return;

  saveCart(client.cuit, { items: [] });
};
