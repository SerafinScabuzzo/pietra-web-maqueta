# Fase 5 — Etapa 3: Header, Home, buscador, Login, Mi Cuenta

Fecha: 22/08/2026  
CWD: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`  
Servidor de validación: Vite `http://127.0.0.1:5174/`

**No se inició Etapa 4.** No se implementó carrito lateral de 3 columnas, Revisar Pedido ni confirmación de pedido. El carrito del Header sigue abriendo `CartDrawer`.

---

## Archivos modificados

- `src/components/Header.tsx`
- `src/pages/Home.tsx`
- `src/components/BannerSlider.tsx`
- `src/components/SearchBar.tsx`
- `src/utils/search.ts`
- `src/utils/auth.ts`
- `src/pages/Login.tsx`
- `src/pages/MiCuenta.tsx`

## Archivos creados

- `src/components/OffersLoginModal.tsx`
- `docs/fase-5-ejecucion/03-etapa-header-home.md` (este archivo)
- `docs/fase-5-ejecucion/screenshots-etapa-3/` (8 PNG)

**No se tocó:** ProductCard, CartDrawer, detalle de producto, Favoritos (lógica), Catálogos, Empresa (contenido), Admin, filtros de `/buscar`, páginas Categorías/Marcas (solo se linkean).

`CatalogCarousel` dejó de usarse en Home. El archivo se conservó (sigue con el error de hooks de baseline; clase B). `BrandGrid` se conservó y sigue usándose en `/marcas`.

---

## Header público final

Cuando **no** hay sesión de cliente:

1. Inicio → `/`
2. Productos → `/buscar`
3. Categorías → `/categorias`
4. Marcas → `/marcas`
5. Catálogos → `/catalogo`
6. Quiénes somos → `/empresa` (solo el label; la página sigue titulada Empresa)
7. Ingresar → `/login`
8. Quiero ser cliente → `/quiero-ser-cliente`

**No aparecen:** Secciones, Ofertas, Favoritos.

Si hay sesión **admin**, se agrega el link Admin (sin cambiar el sidebar Admin).

Identidad visual conservada: logo, paleta, buscador, `btn-accent` naranja, sticky glass.

## Header cliente final

Cuando `getAuth().isClient`:

1. Inicio → `/`
2. Armar Pedido → `/buscar`
3. Categorías → `/categorias`
4. Marcas → `/marcas`
5. Ofertas → `/buscar?offer=1`
6. Favoritos → `/favoritos`
7. Catálogos → `/catalogo`
8. Mi Cuenta → `/mi-cuenta`
9. Salir → `logout()` existente → `/`

**No aparecen:** Secciones, Ingresar, Quiero ser cliente.

El botón **Carrito** se conservó y abre `CartDrawer` (Etapa 4 lo conectará a Revisar Pedido). No se creó `/revisar-pedido`.

---

## Home antes / después

| | Antes | Después |
|---|---|---|
| Hero | `CatalogCarousel` (catálogos) | `BannerSlider` alimentado por `getBanners()` |
| Altura hero | `h-96` (~384px) | `h-[420px] md:h-[560px]` |
| Marcas | `BrandGrid` en el medio | **ausente** (página `/marcas`) |
| Destacados | `products.slice(0, 6)` | `isFeatured === true`, luego `slice(0, 6)` visual |
| Ofertas | `priceOffer` / comparación de precio | `isOffer === true`, luego `slice(0, 6)` visual |
| Ver todas ofertas | iba a `/ofertas` | visitante → aviso; cliente → `/buscar?offer=1` |
| CTA “Todos nuestros productos” | presente | quitado |

Estructura única para público y cliente:

**Banners → Productos destacados → Ofertas → Footer**

Lo que cambia según sesión es `ProductCard` (precios/acciones) y el destino de “Ver todas”.

---

## Fuente de banners

Una sola fuente: store Admin (`getBanners()` / `pietra_admin_store` / seed de Etapa 1).

Seed:

- Banner 1: `/uploads/banner%20principal.jpg` → botón **Ver Catálogos** → `/catalogo`
- Banner 2: `/uploads/portadaCatalogo.png` → botón **Ver Ofertas** → `/ofertas` (redirect Etapa 2 a `/buscar?offer=1`)

El click usa `banner.buttonLink` del modelo; no se hardcodeó el destino en Home.

Validación: ambas imágenes HTTP 200 (`image/jpeg`, `image/png`). Hero medido en 560px de alto en desktop. Slider con flechas, puntos y autoplay pausable.

---

## Destacados

`products.filter(p => p.isFeatured === true).slice(0, 6)`

Hay **6** productos con flag en el mock; se muestran todos. Visitante: sin precio. Cliente: precio, cantidad, agregar, favorito, detalle (ProductCard existente, no rediseñada).

---

## Ofertas del Home

`products.filter(p => p.isOffer === true).slice(0, 6)`

Hay **7** con `isOffer`; Home muestra 6 (tope visual).

### Público

Puede ver las cards de oferta (precio oculto).  
**Ver todas →** **no navega**. Abre aviso. URL permanece `/`.

### Cliente

Misma grilla, con acciones de cliente.  
**Ver todas →** `/buscar?offer=1` con título **ARMAR PEDIDO** y filtro Solo ofertas activo.

---

## Modal / aviso público

Componente mínimo `OffersLoginModal` (sin librería, sin animación).

Texto: *Las ofertas completas están disponibles para clientes. Iniciá sesión o solicitá ser cliente para continuar.*

- Ingresar → `/login`
- Quiero ser cliente → `/quiero-ser-cliente`
- Cerrar / click en overlay → cierra

---

## Buscador autocomplete

Apariencia del campo **sin cambios** (posición, placeholder, botón Buscar).

| Regla | Implementación |
|---|---|
| Campos | SKU + nombre (`matchesQuery`). El modelo `Product` **no tiene descripción**; no se inventó el campo. |
| Máximo | 8 |
| Debounce | **250 ms** (`setTimeout`). Los datos son locales; el debounce evita recalcular en cada tecla y no agrega arquitectura extra. |
| Sugerencia | nombre, SKU, thumbnail si `images[0]` existe |
| Click | `/producto/:productId` (validado: `disco` → `/producto/pie-001`) |
| Enter (sin resaltar sugerencia) | `/buscar?q=...` conservado (validado: `canilla` → `/buscar?q=canilla`) |
| Teclado | Arrow Up/Down, Enter sobre sugerencia, Escape (secundario, incluido porque era barato) |
| Cierre | seleccionar, input vacío, click fuera, Escape, navegación |

Visitante y cliente usan la misma URL de resultados; `/buscar` ya muestra PRODUCTOS vs ARMAR PEDIDO según sesión (Etapa 2). Con query, el H1 sigue siendo “Resultados para: …”.

---

## Login

Pantalla existente conservada.

- Label visible: **Usuario** (antes CUIT). El `id` del input sigue `cuit`; internamente se autentica por CUIT/código mock.
- Botones demo Cliente y Admin **conservados**.
- Post login: `/mi-cuenta`.
- `require('../store/clientStore')` reemplazado por **import ESM**. El formulario tradicional **ya no crashea** Vite/React.

Validado:

- Demo Cliente → `/mi-cuenta` (CUIT demo `11111111111`)
- Formulario Usuario `23469676439` / `123456` → `/mi-cuenta`, sin crash
- Demo Admin → `/admin` (Dashboard 37 productos / 8 marcas / 9 rubros / 2 banners)

Se eliminó `handleDemoLogin` (función muerta que eslint/tsc marcaban). Los dos botones demo visibles siguen.

---

## Mi Cuenta

Datos y bloques existentes conservados.

CTA superior:

- Título: **¿QUERÉS HACER UN PEDIDO?**
- Botón naranja existente `btn-accent`: **ARMAR PEDIDO** → `/buscar`

No se agregó historial, facturas, listas ni seguimiento.

---

## Rutas utilizadas

| Destino | Ruta |
|---|---|
| Inicio | `/` |
| Productos / Armar Pedido | `/buscar` |
| Ofertas cliente | `/buscar?offer=1` |
| Categorías | `/categorias` |
| Marcas | `/marcas` |
| Catálogos | `/catalogo` |
| Quiénes somos | `/empresa` |
| Ingresar | `/login` |
| Alta cliente | `/quiero-ser-cliente` |
| Favoritos | `/favoritos` |
| Mi Cuenta | `/mi-cuenta` |
| Producto (autocomplete) | `/producto/:productId` |

`/ofertas` sigue existiendo como redirect (Etapa 2). No se creó `/revisar-pedido`.

---

## Validaciones

| # | Caso | Resultado |
|---|---|---|
| 68 | Home público | Header correcto; sin Secciones; sin Ofertas en menú; banners grandes; sin Marcas; destacados; ofertas; footer |
| 69 | Banners | Imágenes 200; slider; fuente Admin; CatalogCarousel no en Home; link catálogo |
| 70 | Destacados | `isFeatured` |
| 71 | Ofertas Home | `isOffer` |
| 72 | Ver más público | aviso; no navega; Ingresar / Quiero ser cliente / Cerrar |
| 73–76 | Productos, Categorías, Marcas, Quiénes somos, Catálogos | vivas |
| 77 | Autocomplete | SKU/nombre; click producto; Enter `/buscar?q=` |
| 78–79 | Login Usuario + demos + form | OK; post login Mi Cuenta |
| 80 | CTA Armar Pedido | visible; `/buscar` |
| 81 | Header cliente | menú aprobado; sin Quiero ser cliente |
| 82 | Ofertas cliente | `/buscar?offer=1` + ARMAR PEDIDO + Solo ofertas |
| 83 | Home cliente | misma estructura, sin Marcas, precios visibles |
| 84 | Logout | restaura menú público |
| 85 | Admin demo | abre `/admin` |

---

## Screenshots

Carpeta: `docs/fase-5-ejecucion/screenshots-etapa-3/`

| Archivo | Qué |
|---|---|
| `01-home-publico.png` | Home visitante completo |
| `02-header-publico.png` | Header público |
| `03-aviso-ofertas-publico.png` | Aviso Ver todas las ofertas |
| `04-autocomplete.png` | Sugerencias “disco” |
| `05-login-usuario.png` | Login con label Usuario |
| `06-mi-cuenta-cta.png` | CTA ARMAR PEDIDO |
| `07-home-cliente.png` | Home logueado |
| `08-header-cliente.png` | Header cliente |

---

## TypeScript antes / después

Comando: `node.exe node_modules/typescript/bin/tsc --noEmit --pretty false`

| | Errores |
|---|---|
| Etapa 1 | **13** |
| Etapa 3 | **9** |
| Nuevos inexplicados de esta etapa | **0** |

Corregidos al tocar archivos de esta etapa:

- `MiCuenta.tsx` `Link` unused (ahora se usa en el CTA)
- `Login.tsx` `handleDemoLogin` unused (función muerta eliminada)

Siguen (clase B / Admin, no campaña):

- `OfferProductCard` `shortDescription` (2)
- `AdminProductos` `productCategory` / `shortDescription` / `ean` (5)
- `Favoritos` `navigate`
- `clientStore` `CartItem`

Etapa 2 ya había bajado SearchFilters/Buscar del conteo de Etapa 1; no se reabrieron.

## ESLint antes / después

`eslint . --ext ts,tsx --max-warnings 0`

| | Errores |
|---|---|
| Etapa 1 | **12** |
| Etapa 3 | **7** |
| Nuevos de esta etapa | **0** |

Se fue:

- `auth.ts` `require()` (reemplazado por import ESM)
- `MiCuenta` unused `Link`
- `Login` unused `handleDemoLogin`

Quedan: `CatalogCarousel` hooks (archivo huérfano de Home), Favoritos, AdminProductos, `adminStore` `_`, `clientStore` CartItem, `auth.ts` `any` en demo client.

## Vite build

`node.exe node_modules/vite/bin/vite.js build` → **OK** (exit 0, 86 modules).

---

## Problemas pendientes para Etapa 4

Nada de esto bloquea **cerrar** Etapa 3. Sí condicionan Etapa 4:

1. El carrito del Header sigue siendo overlay `CartDrawer`. No hay `/revisar-pedido`.
2. Inconsistencia de precio Card vs carrito (PIE-001 Card `$1.200` vs línea `$675`) — documentada desde Etapa 0; **no se tocó la fórmula**.
3. Header cliente queda denso (9 ítems + Carrito + buscador) en 1440px. No se rediseñó.
4. `CatalogCarousel.tsx` quedó sin uso en Home; el error de hooks sigue. Se puede borrar o ignorar en limpieza posterior; no forma parte de Etapa 4 funcional.
5. La página `/empresa` sigue titulada “Empresa”; solo cambió el label del Header.

---

## Confirmación de alcance

No se inició Etapa 4 y no se implementó carrito lateral, Revisar Pedido ni confirmación de pedido.
