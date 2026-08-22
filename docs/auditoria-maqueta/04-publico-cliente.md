# Público vs Cliente — auth y diferencias

---

## Store y keys

| Key | Dónde | Contenido |
|---|---|---|
| `pietra_auth` | `utils/auth.ts` | `{ role: 'client' \| 'admin', cuit?: string }` |
| `pietra_current_client` | `clientStore` / `auth.setClientDemoMode` | JSON string del CUIT |
| `pietra_clients` | `clientStore` | array `Client[]` |
| `pietra_cart_{cuit}` | `clientStore` | `{ items: CartItem[] }` |
| `pietra_admin_store` | `adminStore` | products, brands, categories, catalogs, banners (brands/categories/catalogs se resetan al mock al recargar) |
| `pietra_favorites_changed` | evento window | tras `toggleFavorite` |
| `pietra_auth_changed` | evento window | tras login/logout/demo |

No hay cookie de sesión. Todo es `localStorage` + memoria de módulo.

---

## Usuarios mock

`src/data/mocks/clients.ts`:

1. CUIT `23469676439` · código `123456` · Juan Pérez · Ferretería Pérez S.A. · descuento 55%
2. CUIT `11111111111` · código `111111` · Demo Demo · Negocio Demo · descuento 55%

Admin **no es un usuario en `clients`**. Es `setAdminMode(true)` → `pietra_auth = { role: 'admin' }` sin CUIT.

`ensureDemoClient()` en clientStore recrea el cliente `11111111111` si falta. `setClientDemoMode()` escribe directo a localStorage (duplica esa lógica, sin `require`).

---

## Login

Página `/login` (`Login.tsx`):

- Título “Acceso Clientes”
- Texto: “Solo clientes existentes. No se crean cuentas desde la web.”
- Campos: CUIT, Código/Contraseña (toggle ojo)
- Submit → `loginClient` de `utils/auth.ts` (normaliza CUIT a 11 dígitos)
- Éxito → `navigate('/mi-cuenta')`  (**igual que prod: post-login va a Mi Cuenta, no a Home**)
- Error → “CUIT o código incorrecto”
- **No hay** “Olvidé mi contraseña” (prod sí: `recuperoPass_2026.php`)
- Bloque “Modo demo”:
  - Entrar como Cliente (modo demo) → `setClientDemoMode()` → `/mi-cuenta`
  - Entrar como Admin (modo demo) → `setAdminMode(true)` → `/admin`
- `handleDemoLogin` (CUIT `23469676439`) está **definido y no se usa** en el JSX

**Runtime del form real:** `auth.loginClient` hace `require('../store/clientStore')`. ESLint: `@typescript-eslint/no-var-requires`. En Vite ESM el `require` del navegador **suele no existir**. Los botones demo **no** usan esa función. Verificación del form con CUIT/código: **NO VERIFICADO en runtime** (no se ejecutó el submit del form para no depender de ese error). Los botones demo sí están en el DOM (screenshot `04-login.png`).

---

## Logout

- Cliente: `Header.handleLogout` → `logout()` (borra `pietra_auth` y `pietra_current_client`) → `navigate('/')`. **No vacía el carrito** en localStorage.
- Admin: `AdminLayout.handleLogoutAdmin` → `setAdminMode(false)` → `logout()` → `/`

Prod: `logout_2026.php` → Home pública.

Redirects:

- `/mi-cuenta` sin cliente → `/login`
- `/favoritos` sin cliente → UI “Acceso requerido” + link `/login` (no redirect automático)
- `/admin/*` sin admin → `Navigate` a `/`

No hay guard de “solo cliente” en `/buscar` ni en ficha.

---

## Estados de sesión

`getAuth()`:

| | isClient | isAdmin | cuit |
|---|---|---|---|
| Público | false | false | — |
| Cliente | true | false | CUIT |
| Admin | false | true | — |

No hay sesión simultánea cliente+admin en el modelo (un solo `role`).

Admin ve precios (`canSeePrices = isClient \|\| isAdmin`) en cards/ficha/ofertas, **pero no tiene carrito ni favoritos** (Header solo muestra esos ítems si `isClient`).

---

## Diferencias público / cliente (maqueta observada)

| Elemento | Público | Cliente |
|---|---|---|
| Header extra | Ingresar + Quiero ser cliente | Favoritos, Carrito N, Mi cuenta, Salir. **Quiero ser cliente permanece** |
| Precio en cards | “Iniciá sesión para ver precios” | `priceOffer` o `priceList` (sin aplicar `discountRate` en la card) |
| CTA card | “Ingresá para comprar” → `/login` | Cantidad (min 1) + “Agregar al carrito” |
| Corazón | **No se renderiza** | Sí; toggle `favorites[]` |
| Carrito | No | Drawer |
| `/favoritos` | Mensaje acceso requerido | Grilla |
| `/mi-cuenta` | Redirect login | Datos + % descuento + cambiar código |
| Ofertas | 7 ítems, sin precio, “Ver producto” | Precios de oferta visibles; **sigue sin cantidad/carrito en OfferProductCard** |
| Ficha | “Iniciá sesión para ver precios”; botones Consultar / Favoritos **sin handlers** | Precio visible; **mismos botones inertes**; **no hay Agregar al carrito** |
| Admin link en header | No | No (solo si `isAdmin`) |

---

## Vs producción (Fase 1), observacional

| | Producción | Maqueta |
|---|---|---|
| Post-login | `miCuenta_2026.php` | `/mi-cuenta` — SIMILAR |
| CTA Armar Pedido en Mi Cuenta | No hay | No hay |
| Header logueado oculta Ingresar y Quiero ser cliente | Sí | Ingresar se oculta; **Quiero ser cliente no** |
| Precio | Visible logueado (ya con descuento de lista/cliente en el número) | Visible logueado; descuento de cliente **solo en carrito** |
| Cantidad default | 0 | 1 |
| Corazón público | Visible | Ausente |
| Login demo | No hay botones demo | EXTRA (cliente y admin) |
| Recupero password | Form | AUSENTE |
| Un form para cliente y admin | Sí (`/ingreso`) | Form cliente + botones demo separados |
