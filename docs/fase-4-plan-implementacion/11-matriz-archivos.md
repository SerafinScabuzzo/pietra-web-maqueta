# Matriz global de archivos

**Ninguno de estos archivos se modifica en Fase 4.** La matriz es el mapa para Fase 5.

Tipo: ADAPTAR | CREAR | RETIRAR de rol | INTACTO | PUENTE (toque mínimo porque el type cambió).

---

## Matriz

| Archivo | Etapa | Tipo de cambio | Riesgo | Dependencias |
|---|---|---|---|---|
| `src/types/index.ts` | 1 | ADAPTAR | ALTO | Todo producto/rubro/filtro/admin |
| `src/types/client.ts` | — | INTACTO | — | Carrito, cliente |
| `src/data/mocks/products.ts` | 1 | ADAPTAR | ALTO | Home, Buscar, Ofertas, Admin, cards |
| `src/data/mocks/categories.ts` | 1 | ADAPTAR | ALTO | Filtros, Categorías, Admin Rubros, productos |
| `src/data/mocks/subcategories.ts` | 1 | CREAR | MEDIO | Filtros, Categorías nivel 2, Admin Producto |
| `src/data/mocks/brands.ts` | 1 | ADAPTAR | MEDIO | 3 → 8 marcas (Pietra, Mota, Prive, Rao, F.V, Tramontina, Ingco, Solyon Argentina SA). No descargar logos |
| `src/data/mocks/catalogs.ts` | — | INTACTO | — | `/catalogo`, CatalogCarousel (huérfano post-4) |
| `src/data/mocks/clients.ts` | — | INTACTO | — | Login, Mi Cuenta, descuento carrito |
| `src/store/adminStore.ts` | 1 (+4 seed banners, +8 si brandId) | ADAPTAR | ALTO | Casi toda la app de catálogo/admin |
| `src/store/clientStore.ts` | — | INTACTO | ALTO si se toca | Header, ProductCard, CartDrawer, Revisar, Favoritos |
| `src/utils/search.ts` | 2, 7 | ADAPTAR | ALTO | Buscar, filtros, autocomplete |
| `src/utils/pricing.ts` | 1 | ADAPTAR | MEDIO | Cards, Ofertas, Home, filtros |
| `src/utils/auth.ts` | — | INTACTO (B) | MEDIO form CUIT | Login, Header, AdminRoute |
| `src/app/providers/router.tsx` | 2, 3, 6 | ADAPTAR (rutas) | MEDIO | Toda navegación. **No** cambiar BrowserRouter |
| `src/pages/Buscar.tsx` | 2, 5 | ADAPTAR | ALTO | Productos/Armar Pedido, paginación, columna |
| `src/pages/Home.tsx` | 4 | ADAPTAR | MEDIO | Banners, destacados, ofertas visibles; “Ver todas” visitante = aviso (no `offer=1`) |
| `src/pages/Header` → `components/Header.tsx` | 4, 6 | ADAPTAR | ALTO | Todos los estados auth |
| `src/components/SearchBar.tsx` | 7 | ADAPTAR | BAJO | Header, ENTER, autocomplete |
| `src/components/SearchFilters.tsx` | 2 | ADAPTAR | ALTO | `/buscar` URL |
| `src/components/ActiveFiltersChips.tsx` | 2 | ADAPTAR | MEDIO | `/buscar` |
| `src/components/ProductCard.tsx` | 1 (vía pricing) / 5 no rediseño | ADAPTAR mínimo | MEDIO | Home, Buscar, Favoritos, Rubro viejo |
| `src/components/CartDrawer.tsx` | 5, 6 | ADAPTAR | ALTO | E5: variant column, CTA **sin** navegar. E6 (misma tanda): cablea `/revisar-pedido`; overlay sale del Header |
| `src/components/BrandGrid.tsx` | 3 | ADAPTAR destino | BAJO | `/marcas`, Home hasta Etapa 4 |
| `src/components/BannerSlider.tsx` | 4 | ADAPTAR | MEDIO | Home |
| `src/components/CatalogCarousel.tsx` | 4 | RETIRAR de rol | — | Deja de importarse |
| `src/components/OfferProductCard.tsx` | 2 | RETIRAR de rol | — | `/ofertas` redirect |
| `src/components/OfferFilters.tsx` | 2 | RETIRAR de rol | — | idem |
| `src/pages/Ofertas.tsx` | 2 | ADAPTAR → Navigate | BAJO | Menú cliente (luego Header) |
| `src/pages/Marca.tsx` | 3 | ADAPTAR → redirect | BAJO | URLs viejas |
| `src/pages/Rubro.tsx` | 3 | ADAPTAR → redirect | BAJO | URLs viejas |
| `src/pages/Categorias.tsx` | 3 | CREAR | BAJO | Menú, taxonomía |
| `src/pages/CategoriaRubro.tsx` | 3 | CREAR | BAJO | Subrubros |
| `src/pages/Marcas.tsx` | 3 | CREAR | BAJO | BrandGrid |
| `src/pages/RevisarPedido.tsx` | 6 | CREAR | MEDIO | Se crea en la misma tanda que E5. clientStore. Importe de línea = Card/columna |
| `src/pages/Producto.tsx` | 5 o 7 | ADAPTAR mínimo | MEDIO | Autocomplete, cards |
| `src/pages/Login.tsx` | 7 | ADAPTAR label | BAJO | Auth |
| `src/pages/MiCuenta.tsx` | 7 | ADAPTAR CTA | BAJO | Cliente |
| `src/pages/Favoritos.tsx` | — | INTACTO | — | ProductCard |
| `src/pages/Empresa.tsx` | — | INTACTO | — | Label en Header |
| `src/pages/Catalogo.tsx` | — | INTACTO | — | Label en Header |
| `src/pages/QuieroSerCliente.tsx` | — | INTACTO | — | Solo menú visitante |
| `src/pages/admin/AdminProductos.tsx` | 1 puente, 8 | ADAPTAR | ALTO | Type Product, categorías |
| `src/pages/admin/AdminRubros.tsx` | 1 puente, 8 | ADAPTAR | MEDIO | Type Category |
| `src/pages/admin/AdminBanners.tsx` | — | INTACTO | — | Home vía getBanners |
| `src/pages/admin/AdminMarcas.tsx` | — | INTACTO | — | |
| `src/pages/admin/AdminCatalogos.tsx` | — | INTACTO | — | |
| `src/pages/admin/AdminClientes.tsx` | — | INTACTO | — | |
| `src/pages/admin/AdminDashboard.tsx` | — | INTACTO | — | |
| `src/pages/admin/AdminLayout.tsx` | — | INTACTO | — | No nuevos ítems |
| `src/components/Footer.tsx` | — | INTACTO | — | Identidad |
| `src/styles/index.css` | — | INTACTO | — | No design system |
| `tailwind.config.js` | — | INTACTO | — | |
| `package.json` | — | INTACTO | — | |
| `src/App.tsx` / `main.tsx` | — | INTACTO | — | |

---

## Top 10 — mayor impacto (NO modificar en Fase 4)

### 1. `src/store/adminStore.ts`

Dependen: Home, Buscar, filtros, chips, Marca/Rubro/Categorías, Producto, cards, Admin \*, BannerSlider, Catalogo, BrandGrid, Header (brands), Ofertas, Favoritos (productos), CartDrawer (getProducts).  
`normalizeProducts` / `getCategoriesByBrand` / banners seed. Un error acá vacía la demo.

### 2. `src/types/index.ts`

Dependen: **todos** los archivos de la columna Product/Category. Cambiar nombres de campo sin actualizar mocks rompe tsc en cascada.

### 3. `src/pages/Buscar.tsx`

Dependen: SearchBar ENTER, menú Productos/Armar Pedido, Categorías/Marcas, menú Ofertas **cliente** (`offer=1`), filtro Solo Ofertas (también visitante), paginación, layout 3 col. Home visitante “Ver todas” **no** aterriza acá (aviso). Es el catálogo único.

### 4. `src/components/Header.tsx`

Dependen: toda navegación visible, SearchBar, auth UI, carrito badge, hamburguesa, Admin link. Único menú.

### 5. `src/components/SearchFilters.tsx`

Dependen: URL del catálogo, invalidación, subrubros, sort, offer. Casi hecho hoy; el hueco es dependencia de listas.

### 6. `src/store/clientStore.ts`

Dependen: ProductCard, Header count, CartDrawer, RevisarPedido, Favoritos, Login sesión, Mi Cuenta. **No reemplazar.** Cualquier rewrite de carrito rompe persistencia `pietra_cart_{cuit}`.

### 7. `src/components/CartDrawer.tsx`

Dependen: overlay (hasta E6), columna Armar Pedido (variant E5 **sin** navigate), totales. E6 cablea Revisar. Acoplado a portal/scroll lock.

### 8. `src/pages/Home.tsx`

Dependen: reunión visitante. CatalogCarousel vs banners, flags, retiro marcas, ofertas visibles + aviso “Ver todas”.

### 9. `src/data/mocks/products.ts`

Dependen: volumen demo (~30 + mínimo 5 marcas nuevas), isOffer (7), isFeatured (6), paginación 2 páginas, Pietra-primero, subrubros no vacíos, click de las 8 marcas no vacío.

### 10. `src/app/providers/router.tsx`

Dependen: todas las URLs. Se **añaden** rutas; no se cambia el engine ni el layout global (fondo + Header + Footer).

---

## Atención especial (pedido)

| Pieza | Nota |
|---|---|
| `adminStore` | Centro de gravedad del modelo |
| `clientStore` | No tocar shape; solo llamar APIs |
| `Product` | Flags + subcategoryId |
| `Category` | Quitar brandId |
| products/categories/brands mocks | Remap ids + 8 marcas + mínimo productos |
| Header | Menús; carrito destino **solo E6** |
| Buscar | Catálogo + 3 col (E5 sin `/revisar-pedido`) |
| filtros / chips | Params + invalidación |
| Marca / Rubro pages | Redirect, no borrar path |
| ProductCard | No rediseñar |
| CartDrawer | variant, no store nuevo |
| Home | Banners + flags − marcas; “Ver todas” visitante = aviso |
| Admin Productos / Rubros | Solo lo listado |

---

## Archivos que se dejan de usar en su rol (no borrar en Fase 5 salvo estorbo)

- `CatalogCarousel.tsx` como hero
- `OfferProductCard.tsx` / `OfferFilters.tsx` como catálogo
- Dropdown Secciones en Header
- `pages/Admin.tsx` stub (ya huérfano)
