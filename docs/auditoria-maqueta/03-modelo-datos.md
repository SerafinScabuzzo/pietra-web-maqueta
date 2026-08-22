# Modelo de datos — maqueta

Fuente de types: `src/types/index.ts` y `src/types/client.ts`.  
**No se inventan campos.** Lo que el Admin UI intenta usar y no está en el type se marca como extra de UI.

---

## PRODUCTO

Type real (`src/types/index.ts`):

```ts
export interface Product {
  id: string;
  sku: string;
  name: string;
  brandId: string;
  categoryId: string;
  images: string[];
  priceList: number;
  priceOffer?: number;
}
```

Campos que **no existen** en el type:

- `shortDescription` — usado en `AdminProductos.tsx` (textarea) y `OfferProductCard.tsx` → error TS2339
- `ean` — usado en `AdminProductos.tsx` → error TS2339
- `destacado` / `featured`
- `oferta` booleano
- `publicado`
- `orden`
- `copete` / descripción larga
- `subrubroId`
- `stock`

Mock: `src/data/mocks/products.ts` — 30 ítems. IDs `pie-001`…`pie-010`, `mot-001`…`mot-010`, `fv-001`…`fv-010`. Imágenes Unsplash. Store: `adminStore` (`getProducts`, CRUD). Persistencia: `pietra_admin_store.products`.

Relación: cada producto tiene `brandId` **y** `categoryId`. El rubro a su vez también tiene `brandId`. No hay validación de que `product.brandId === category.brandId` más allá del select del Admin (al crear/editar).

---

## MARCA (`Brand`)

```ts
export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  heroImageUrl?: string;
  description?: string;
}
```

Mock `brands.ts`:

| id | name | logoUrl | heroImageUrl |
|---|---|---|---|
| pietra | Pietra | `/uploads/LOGO PIETRA 4.1.png` | mismo logo |
| mota | Mota | `/uploads/mota-logo.png` (**archivo no encontrado**) | `/uploads/motaPortada.png` (existe) |
| fv | FV | `/uploads/fv-logo.png` (**archivo no encontrado**) | `/uploads/portadaFV.jpg` (existe) |

Store: `getBrands` / `getBrand` / `updateBrand`. **No hay create/delete de marca.**  
`ALLOWED_BRAND_IDS = ['pietra','mota','fv']` está declarado y **no se usa**.

`AdminMarcas` tiene un `brandOrder` con 11 ids (tramontina, ingco, mozart, prive, rao, varios-…). Solo aparecen las 3 que existen en el mock.

**Brands no persisten en recarga:** `loadFromStorage` no aplica brands; `normalizeBrands()` siempre resetea al mock.

Rutas: `/marca/:brandId`. Click desde Home `BrandGrid` y dropdown Secciones.

Relación con producto: `product.brandId`. Relación con rubro: `category.brandId` (el rubro **pertenece a una marca** en este modelo).

---

## RUBRO (`Category`)

Nombre en código: **`Category`**. UI: “Rubros”.

```ts
export interface Category {
  id: string;
  brandId: string;
  name: string;
  imageUrl?: string;
  order: number;
}
```

**Sí tiene `brandId`.** El rubro pertenece a una marca.

Mock `categories.ts` (9):

| id | brandId | name | order |
|---|---|---|---|
| pietra-herramientas | pietra | Herramientas | 1 |
| pietra-plomeria | pietra | Plomería | 2 |
| pietra-bano | pietra | Baño | 3 |
| mota-manuales | mota | Herramientas manuales | 1 |
| mota-corte | mota | Corte y perforación | 2 |
| mota-medicion | mota | Medición | 3 |
| fv-griferia | fv | Grifería | 1 |
| fv-repuestos | fv | Repuestos | 2 |
| fv-valvulas | fv | Válvulas | 3 |

Imágenes: Unsplash. Store: `getCategories`, `getCategory`, `getCategoriesByBrand`, CRUD. Unicidad al crear: mismo `brandId` + mismo `name` (case insensitive). Delete bloqueado si hay productos con ese `categoryId`.

**Categories no persisten en recarga:** se fuerzan al mock (`normalizeCategories`).

Componentes/páginas: `Marca`, `Rubro`, `SearchFilters`, `OfferFilters`, `ActiveFiltersChips`, `AdminRubros`, `AdminProductos` (select filtrado por marca).

Rutas: no hay `/rubro` suelta; es `/marca/:brandId/rubro/:categoryId`.

En producción (Fase 1): rubros son catálogo **global**, form Admin **sin selector Marca**.

---

## SUBRUBRO

**SUBRUBRO NO ESTÁ MODELADO EN LA MAQUETA.**

Grep en `src/` de `subrubro` / `subRubro` / `Subrubro`: **0 coincidencias**.

Dónde conceptualmente aparece el hueco (sin implementar):

- Type `Product`: no hay `subrubroId`
- Type `Category`: no hay hijos
- Rutas: no hay `/subrubro/...`
- Página `Rubro.tsx`: lista **productos**, no subrubros (en prod `/rubro/{marca}/{slug}` lista subrubros)
- Admin: no hay ítem SubRubros (prod sí: `adminSubRubros.php`)
- Filtros `/buscar` y `/ofertas`: Marca + Rubro, sin tercer nivel
- Admin productos: Marca + Rubro, sin SubRubro (prod muestra Rubro y SubRubro como texto de sync)

---

## OFERTA

No hay boolean `oferta` en el type.

Condición real:

```ts
// utils/pricing.ts isProductOnOffer
product.priceOffer !== undefined && product.priceOffer < product.priceList
```

Misma idea en `search.applyFilters` (`offerOnly`), `Home` (bloque ofertas), `ProductCard` (`isOnOffer`), `Producto` (badge si hay `priceOffer`).

Campo: `priceOffer?: number` (precio especial, no flag Sí/No).

Componentes: `Home`, `Ofertas`, `OfferProductCard`, `OfferFilters`, `SearchFilters` (checkbox Solo ofertas), `ProductCard`, `Producto`, `AdminProductos` (input Precio Oferta).

No hay rubro mock llamado OFERTA/LIQUIDACION.

7 productos mock con oferta: `pie-001`, `pie-004`, `pie-007`, `pie-010`, `mot-010`, `fv-001`, `fv-010`. Verificado en runtime: `/ofertas` muestra “7 productos en oferta disponibles”.

En producción: radio Admin `oferta` Sí/No **y** rubro OFERTA/LIQUIDACION **y** página `/ofertas`.

---

## DESTACADO

No hay campo `destacado` en `Product`.

Home (`Home.tsx` ~líneas 14–17):

```ts
const featuredProducts = useMemo(() => {
  return products.slice(0, 6);
}, [products]);
```

Los “Productos destacados” son los **primeros 6 del array mock** (todos Pietra: herramientas + plomería). No hay ABM Destacados. Admin producto no tiene radio Destacado.

En producción: flag `destacado` Sí/No en el form de producto; carrusel Home.

---

## CATALOG

```ts
export interface Catalog {
  id: string;
  title: string;
  brandId?: string;
  type?: string;
  date: string;
  coverUrl?: string;
  images?: string[];
  pdfUrl?: string;
}
```

Mock: 1 ítem `catalog-2025-pietra`, type `general`, PDF Google Drive, cover `/uploads/portadaCatalogo.png` (existe).

`normalizeCatalogs()` **pisa** catálogos con el mock en cada load, aunque `loadFromStorage` los haya leído.

---

## BANNER (solo en adminStore, no en types/index.ts)

```ts
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}
```

Seed: banner-1 `/uploads/banner-1.jpg` → `/catalogo`; banner-2 `/uploads/banner-2.jpg` → `/ofertas`. **Esos JPG no están en `public/uploads/`.**  
Home no consume `getBanners()`.

---

## CLIENT / CART

```ts
export interface Client {
  id: string; // comentario: usar CUIT como id
  cuit: string;
  code: string;
  firstName: string;
  lastName: string;
  businessName: string;
  address: string;
  discountRate: number; // ej 0.55
  favorites: string[]; // productIds
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
```

Sin email, sin N° cliente separado del CUIT, sin pedidos.

Mocks: CUIT `23469676439` / code `123456`; demo `11111111111` / `111111`. Ambos `discountRate: 0.55`.

---

## Matrices de dependencias (efecto en cascada, sin cambiar nada)

### brandId

| Archivo / ruta / store | Uso |
|---|---|
| `types/index.ts` | `Brand.id`, `Category.brandId`, `Product.brandId`, `Catalog.brandId?` |
| `data/mocks/{brands,categories,products,catalogs}.ts` | valores |
| `store/adminStore.ts` | getBrand(s), getCategoriesByBrand, createCategory (unicidad por marca+nombre), normalizeProducts (primer rubro de la marca), ALLOWED_BRAND_IDS unused |
| `router.tsx` | `/marca/:brandId`, `/marca/:brandId/rubro/:categoryId` |
| `pages/Marca.tsx` | param + getBrand + getCategoriesByBrand |
| `pages/Rubro.tsx` | param brandId + getBrand |
| `pages/Producto.tsx` | lookup marca del producto |
| `pages/Home.tsx` | BrandGrid |
| `pages/Catalogo.tsx` | filtro `?brand=` |
| `components/Header.tsx` | dropdown Secciones; `brandOrder` fijo pietra/mota/fv |
| `components/BrandGrid.tsx` | Link `/marca/${id}` |
| `components/ProductCard.tsx` / `OfferProductCard.tsx` | nombre de marca |
| `components/SearchFilters.tsx` / `OfferFilters.tsx` / `ActiveFiltersChips.tsx` / `CatalogFilters.tsx` | checkboxes/select `brand` |
| `utils/search.ts` | `applyFilters` por `p.brandId` |
| `pages/admin/AdminProductos.tsx` | select marca; filtra rubros |
| `pages/admin/AdminMarcas.tsx` | edición |
| `pages/admin/AdminRubros.tsx` | filtro y campo requerido Marca |
| `pages/admin/AdminCatalogos.tsx` | marca opcional |
| `components/CatalogCard.tsx` | lookup marca (**importa mock `brands` directo**, no el store) |

### categoryId

| Archivo / ruta / store | Uso |
|---|---|
| `types/index.ts` | `Category.id`, `Product.categoryId` |
| mocks products/categories | valores |
| `adminStore` | getCategory(ies), getProductsByCategory, normalizeProducts, deleteCategory bloqueado si hay productos |
| `router` | `/marca/:brandId/rubro/:categoryId` |
| `pages/Marca.tsx` | cards → esa ruta |
| `pages/Rubro.tsx` | listado `getProductsByCategory` |
| `pages/Producto.tsx` | muestra nombre de rubro |
| `utils/search.ts` | filtro `p.categoryId` |
| `SearchFilters` / `OfferFilters` / `ActiveFiltersChips` | query `category` |
| `AdminProductos` | select rubro filtrado por `formData.brandId`; `productCategory()` **declarado y no usado** en la tabla |
| `AdminRubros` | CRUD |

Si `Category` dejara de depender de Marca (hipótesis; **no se hizo el cambio**), quedarían afectados como mínimo: type `Category.brandId`; mocks de categories; `getCategoriesByBrand`; unicidad createCategory; `normalizeProducts` (busca primer rubro de la marca); `AdminRubros` (filtro + select Marca required + `disabled` en edit); `AdminProductos` (availableCategories por brandId); `Marca.tsx`; ruta anidada `/marca/:id/rubro/:id`; Header no lista rubros hoy. Filtros de buscar/ofertas seguirían listando todos los rubros (hoy ya no los restringen por marca).

### Oferta / priceOffer

`types/index.ts` · mocks products · `pricing.ts` · `search.ts` (offerOnly) · `Home` · `Ofertas` · `OfferProductCard` · `OfferFilters` · `SearchFilters` (`offer=1`) · `ActiveFiltersChips` · `ProductCard` · `Producto` · `AdminProductos` (precio oferta).  
**No entra en CartDrawer:** el carrito usa `priceList` + `discountRate`.

### Auth

`utils/auth.ts` · `clientStore` (login/sesión) · `Login.tsx` · `Header` · `AdminRoute` · `AdminLayout` (setAdminMode false) · `ProductCard` · `OfferProductCard` · `Producto` · `Favoritos` · `MiCuenta` · `CartDrawer` (vía Header). Keys: `pietra_auth`, `pietra_current_client`, `pietra_clients`.

### Carrito

`types/client.ts` · `clientStore` (`pietra_cart_{cuit}`) · `ProductCard.addToCart` · `Header` (count + drawer) · `CartDrawer`. **Ficha `Producto.tsx` no agrega al carrito.**
