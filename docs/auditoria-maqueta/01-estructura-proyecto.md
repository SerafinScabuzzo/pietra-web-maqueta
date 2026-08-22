# Estructura del proyecto — maqueta

Raíz de la maqueta: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB\`

---

## package.json

Nombre: `pietra-italy` · `private` · `version` `0.0.0` · `"type": "module"`

Scripts:

```
dev     → vite
build   → tsc && vite build
lint    → eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0
preview → vite preview
```

### Dependencias de runtime

- `react` ^18.2.0 (instalado 18.3.1)
- `react-dom` ^18.2.0
- `react-router-dom` ^6.20.0 (instalado 6.30.3)

No hay axios, Zustand, Redux, React Query, MUI, ni librería de carousel.

### DevDependencies

- Vite 5.x + `@vitejs/plugin-react`
- TypeScript 5.x
- Tailwind 3.x + PostCSS + Autoprefixer
- ESLint 8.x + plugins TS / react-hooks / react-refresh
- `@types/react`, `@types/react-dom`

---

## Bundler / TS / Tailwind / Router / estado

| Tema | Qué hay |
|---|---|
| Bundler | Vite 5.4.21 · `vite.config.ts` · `publicDir: 'public'` |
| Entry HTML | `index.html` → `/src/main.tsx` · `lang="es"` · title PietraItaly · favicon `/vite.svg` |
| TS | `tsconfig.json` strict, `noUnusedLocals`, `noUnusedParameters`, `moduleResolution: bundler`, `noEmit` |
| CSS | `src/styles/index.css` — Tailwind layers + clases `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.badge-offer` |
| Tailwind | `tailwind.config.js` — colores `brandBlue`, `brandOrange`, `brandGray` |
| Router | `src/app/providers/router.tsx` — `BrowserRouter` + `Routes` |
| Stores | `src/store/adminStore.ts` y `src/store/clientStore.ts` (módulo JS + localStorage). **No hay Context, no hay Zustand.** |
| Auth | `src/utils/auth.ts` + keys `pietra_auth` / `pietra_current_client` |
| Mocks | `src/data/mocks/{products,brands,categories,catalogs,clients}.ts` |
| Hooks | **No hay carpeta `src/hooks/`** |
| Servicios | **No hay carpeta `src/services/`** |
| Persistencia | `localStorage` keys documentadas en `03` y `04` |

---

## Árbol `src/` (todos los archivos de aplicación)

```
src/
  main.tsx                          Entry ReactDOM + StrictMode + CSS
  App.tsx                           Renderiza AppRouter
  styles/index.css                  Tailwind + botones/badges
  app/providers/router.tsx          Layout global (fondo, Header, Routes, Footer)
  types/index.ts                    Brand, Category, Product, Catalog
  types/client.ts                   Client, CartItem, Cart
  store/adminStore.ts               Productos, marcas, rubros, catálogos, banners
  store/clientStore.ts              Clientes, sesión, favoritos, carrito
  utils/auth.ts                     Login/logout/demo admin/cliente
  utils/pricing.ts                  isProductOnOffer, % descuento
  utils/search.ts                   matchesQuery, applyFilters, applySort
  data/mocks/products.ts            30 productos
  data/mocks/brands.ts              3 marcas
  data/mocks/categories.ts          9 rubros con brandId
  data/mocks/catalogs.ts            1 catálogo
  data/mocks/clients.ts             2 clientes
  pages/Home.tsx
  pages/Login.tsx
  pages/Buscar.tsx
  pages/Marca.tsx
  pages/Rubro.tsx
  pages/Producto.tsx
  pages/Ofertas.tsx
  pages/Favoritos.tsx
  pages/MiCuenta.tsx
  pages/Catalogo.tsx
  pages/Empresa.tsx
  pages/QuieroSerCliente.tsx
  pages/Admin.tsx                   Stub no enrutado
  pages/admin/AdminLayout.tsx
  pages/admin/AdminDashboard.tsx
  pages/admin/AdminProductos.tsx
  pages/admin/AdminMarcas.tsx
  pages/admin/AdminRubros.tsx
  pages/admin/AdminCatalogos.tsx
  pages/admin/AdminBanners.tsx
  pages/admin/AdminClientes.tsx
  components/Header.tsx
  components/Footer.tsx
  components/SearchBar.tsx
  components/SearchFilters.tsx
  components/ActiveFiltersChips.tsx
  components/ProductCard.tsx
  components/OfferProductCard.tsx
  components/OfferFilters.tsx
  components/CartDrawer.tsx
  components/BrandGrid.tsx
  components/BannerSlider.tsx       No usado por Home
  components/CatalogCarousel.tsx
  components/CatalogCard.tsx
  components/CatalogFilters.tsx
  components/AdminRoute.tsx
  components/admin/ImageField.tsx
  components/admin/ImageGalleryField.tsx
```

Otros en raíz de maqueta: `public/uploads/` (imágenes locales), `index.html`, configs Vite/TS/Tailwind/ESLint, `node_modules/`, `dist/` (generado por el build de esta auditoría; está en `.gitignore`).

---

## Componentes clave (formato pedido)

### Header

- **Ubicación:** `src/components/Header.tsx`
- **Responsabilidad:** barra sticky; logo; SearchBar; menú Secciones/Ofertas/Catálogo/Empresa; CTA Quiero ser cliente; estados auth; CartDrawer
- **Dependencias:** `getBrands`, `getAuth`, `logout`, `getCurrentClient`, `getCartItemCount`, `SearchBar`, `CartDrawer`
- **Estado:** `showSections`, `showMobileMenu`, `showCart`, `auth`, `cartCount`; listeners `storage` + `pietra_auth_changed` + poll 1s
- **Rutas que enlaza:** `/`, `/marca/:id`, `/ofertas`, `/catalogo`, `/empresa`, `/login`, `/quiero-ser-cliente`, `/favoritos`, `/mi-cuenta`, `/admin`
- **Público:** Ingresar + CTA naranja. Sin carrito ni favoritos.
- **Cliente:** Favoritos, Carrito (badge = cantidad de líneas), Mi cuenta, Salir. El CTA “Quiero ser cliente” **sigue visible**.
- **Equivalente prod:** header de `index_2026.php`
- **Diferencias observadas:** menú dice “Catálogo” (prod: “Catálogos”); no hay link `/secciones`; buscador con botón Buscar y ENTER a `/buscar`; logo local `LOGO PIETRA 4.1.png`; carrito es drawer (prod: panel `.carritoTop`); poll cada 1s

### SearchBar

- **Ubicación:** `src/components/SearchBar.tsx`
- **Responsabilidad:** form de búsqueda; sincroniza input con `?q=` si la ruta es `/buscar`
- **Dependencias:** `useNavigate`, `useSearchParams`, `useLocation`
- **Estado:** `searchQuery`
- **Rutas:** submit → `/buscar` o `/buscar?q=`
- **Público / Cliente:** igual
- **Equivalente prod:** `input#busqueda` + AJAX `buscarDinamico.php`
- **Diferencias:** **FUNCIONALIDAD YA EXISTENTE:** ENTER/submit abre página de resultados. **No hay autocomplete.** Placeholder menciona “rubro” pero `matchesQuery` no busca en rubros.

### ProductCard

- **Ubicación:** `src/components/ProductCard.tsx`
- **Responsabilidad:** card genérica de producto
- **Dependencias:** `Product`, `getBrands`, `getCurrentClient`, `toggleFavorite`, `isFavorite`, `addToCart`, `getAuth`
- **Estado:** `quantity` (default **1**), `showAdded`, `favorite`
- **Rutas:** `/producto/:id`, `/login`
- **Público:** texto “Iniciá sesión para ver precios”; CTA “Ingresá para comprar”; **sin corazón**
- **Cliente:** precio (`priceOffer` o `priceList`); cantidad +/-; Agregar al carrito; corazón
- **Equivalente prod:** card de listado / home / ofertas
- **Diferencias:** cantidad default 1 (prod: 0); corazón solo logueado (prod: visible también en público); no hay CTA “Ver detalles” naranja específico de ofertas (eso es `OfferProductCard`); el descuento de cliente **no se aplica en la card** (sí en el carrito)

### OfferProductCard

- **Ubicación:** `src/components/OfferProductCard.tsx`
- **Responsabilidad:** card de `/ofertas` con borde naranja
- **Dependencias:** `Product`, `getBrands`, `calculateDiscountPercentage`, `getAuth`
- **Estado:** ninguno
- **Rutas:** `/producto/:id`
- **Público:** badge OFERTA; sin precios; botón “Ver producto”
- **Cliente/Admin:** badge `-% OFF`; precios lista/oferta; “Ahorrás”
- **Equivalente prod:** card de `/ofertas` con borde naranja
- **Diferencias:** **no tiene** cantidad ni agregar al carrito (prod logueado sí); usa `product.shortDescription` que **no está en el type**; no hay corazón

### CartDrawer

- **Ubicación:** `src/components/CartDrawer.tsx`
- **Responsabilidad:** panel lateral del carrito (portal a `document.body`)
- **Dependencias:** `createPortal`, `clientStore` (get/update/remove/clear), `getProducts`
- **Estado:** `cart`, `isExpanded`
- **Rutas:** ninguna (el botón Finalizar no navega)
- **Público:** no se monta (`Header` lo renderiza solo si `auth.isClient`)
- **Cliente:** overlay blur, ~420px desktop / full mobile, expandible a `w-full`, Escape, click overlay, scroll lock
- **Equivalente prod:** `.carritoTop` (dropdown/top; overlay drawer no confirmado en Fase 1)
- **Diferencias:** drawer a pantalla completa opcional; totales = `priceList * (1 - discountRate)` (**ignora `priceOffer`**); Finalizar **sin handler**; no hay ruta Pedido

### BrandGrid

- **Ubicación:** `src/components/BrandGrid.tsx`
- **Responsabilidad:** grilla de marcas (imagen `heroImageUrl || logoUrl` + nombre)
- **Dependencias:** `Brand`, `Link`
- **Estado:** ninguno
- **Rutas:** `/marca/${brand.id}`
- **Público / Cliente:** igual
- **Equivalente prod:** “Marcas con las que trabajamos”
- **Diferencias:** 3 marcas vs 8 en prod; **FUNCIONALIDAD YA EXISTENTE Y POTENCIALMENTE REUTILIZABLE** para una eventual página Marcas (el click ya va a `/marca/:brandId`; esa página de listado global de marcas **no existe** como ruta aparte)

### CatalogCarousel

- **Ubicación:** `src/components/CatalogCarousel.tsx`
- **Responsabilidad:** hero de Home a partir de **catálogos** (no banners)
- **Dependencias:** `Catalog`
- **Estado:** `currentIndex`, `isPaused`; autoplay 5s; dots; flechas
- **Rutas:** link externo `pdfUrl` (Drive)
- **Equivalente prod:** carrusel de **banners** (2 slides, PDF `/banners/1.pdf`)
- **Diferencias:** fuente = catálogos; 1 slide mock; `useEffect` **después de early return** (error de hooks; ver `12`)

### BannerSlider

- **Ubicación:** `src/components/BannerSlider.tsx`
- **Responsabilidad:** muestra solo el **primer** banner de un array
- **Dependencias:** ninguna (interface local `Banner` duplicada vs adminStore)
- **Rutas:** `banner.buttonLink`
- **Uso actual:** **ninguna página lo importa**
- **Equivalente prod:** carrusel Home

### AdminRoute

- **Ubicación:** `src/components/AdminRoute.tsx`
- **Responsabilidad:** si `!getAuth().isAdmin` → `<Navigate to="/" />`
- **Rutas:** envuelve `/admin/*`

### AdminLayout

- **Ubicación:** `src/pages/admin/AdminLayout.tsx`
- **Responsabilidad:** sidebar + header “Admin Panel” + `<Outlet />`
- **Menú:** Dashboard, Productos, Marcas, Rubros, Catálogos, Banners, Clientes
- **Diferencia de layout:** el `router.tsx` **también** renderiza el Header/Footer públicos alrededor, así que Admin tiene **doble chrome** (header sitio + header admin)

### pages/Admin.tsx

Stub “Página de administración”. **No está en el router.** El Admin real de la maqueta es `AdminLayout`.
