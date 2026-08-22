# Etapa 1 — Modelo de datos

Pseudomodelo **solo en docs**. En Fase 5 se escriben las interfaces en `src/types`. Aquí quedan los nombres **exactos** de campos.

---

## OBJETIVO

Dejar el contrato de datos alineado a Fase 3: rubros globales, subrubro, `isOffer`, `isFeatured`. Mocks coherentes para que ninguna pantalla nueva quede vacía. La UI pública **sigue navegando** con las páginas viejas (Marca→Rubro→productos) aunque internamente los ids cambien: hay que remapear productos para que `/buscar` y `/marca/:id/rubro/:id` no muestren 0 ítems.

---

## PRECONDICIONES

- Etapa 0 hecha.
- Decisión de `pietra_admin_store` aplicada al arrancar esta etapa (limpiar o confiar en `normalizeProducts`).

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/types/index.ts` | `Category` sin `brandId`. `Product` + `subcategoryId`, `isOffer`, `isFeatured`. Nuevo `Subcategory`. |
| `src/data/mocks/categories.ts` | 9 rubros globales (ids nuevos, sin prefijo de marca). |
| `src/data/mocks/products.ts` | Remap `categoryId` + `subcategoryId` + flags. Conservar los ~30 actuales **y** agregar el **mínimo** de productos de las 5 marcas nuevas para que `/buscar?brand=` no quede vacío. **No** carga masiva. |
| `src/data/mocks/brands.ts` | Pasar de 3 a **8** marcas de producción (abajo). Shape sin cambio. Si falta logo: dejar `logoUrl` vacío o inexistente; **no descargar**. |
| `src/store/adminStore.ts` | `normalizeProducts` sin `c.brandId`. CRUD subrubros **solo getters**. Unicidad de rubro por **nombre**. `getCategoriesByBrand` → cálculo por productos. Quitar `ALLOWED_BRAND_IDS`. Seed banners con imagen existente. |
| `src/utils/pricing.ts` | `isProductOnOffer` lee `isOffer`. |
| `src/pages/admin/AdminRubros.tsx` | **Solo lo inevitable** para que compile: el type ya no tiene `brandId`. Si se deja el selector de marca, **tsc rompe**. Mínimo: dejar de exigir `brandId` en el form (detalle fino de UI = Etapa 8). En esta etapa: que el proyecto **compile el type**. Ver “puente Admin”. |
| `src/pages/admin/AdminProductos.tsx` | Idem puente: select de rubros deja de filtrar por `category.brandId`. Flags se agregan en Etapa 8; acá solo que no reviente el type. |

El puente Admin existe porque `AdminRubros` / `AdminProductos` **importan** `Category` / `Product`. Cambiar el type sin tocarlos deja la demo **no compilable** en esos archivos. Eso es clase A de **esta** etapa, no una campaña.

---

## ARCHIVOS NUEVOS

| Path | Qué |
|---|---|
| `src/data/mocks/subcategories.ts` | Lista chica de subrubros. |

No crear `src/types/subcategory.ts` aparte: vive en `index.ts`.

---

## ARCHIVOS INTACTOS

- `src/types/client.ts` — `Cart` / `CartItem` / `Client` no cambian.
- `src/store/clientStore.ts`
- `src/data/mocks/catalogs.ts`, `clients.ts`
- `src/app/providers/router.tsx`
- Header, Home, Buscar, CartDrawer, CSS, `package.json`
- Admin Banners / Marcas / Clientes / Catálogos / Dashboard (salvo que tsc lo fuerce; no debería)

---

## CAMBIOS DE MODELO

### Brand — SIN CAMBIO de shape

```ts
export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  heroImageUrl?: string;
  description?: string;
}
```

Ids mock **actuales** que se conservan: `'pietra' | 'mota' | 'fv'`.  
Ids **nuevos** (Etapa 1, demo visual, no paridad): `'prive' | 'rao' | 'tramontina' | 'ingco' | 'solyon'`.

| id | Nombre en página Marcas |
|---|---|
| `pietra` | Pietra |
| `mota` | Mota |
| `prive` | Prive |
| `rao` | Rao |
| `fv` | F.V |
| `tramontina` | Tramontina |
| `ingco` | Ingco |
| `solyon` | Solyon Argentina SA |

Hoy la maqueta solo tiene Pietra, Mota, FV. Las 8 deben verse en `/marcas`. Click de cada una → `/buscar?brand=` **con al menos 1 producto**. La constante de orden Pietra-primero usa **`id === 'pietra'`**.

### Category (Rubro global) — ADAPTAR

Hoy:

```ts
export interface Category {
  id: string;
  brandId: string; // QUITAR
  name: string;
  imageUrl?: string;
  order: number;
}
```

Propuesto:

```ts
export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  order: number;
}
```

**No** hay `brandId`. Un “Grifería” es uno solo.

### Subcategory (Subrubro) — CREAR

```ts
export interface Subcategory {
  id: string;
  categoryId: string; // rubro padre obligatorio
  name: string;
  imageUrl?: string;
  order: number;
}
```

Integridad: `product.subcategoryId` → un `Subcategory` cuyo `categoryId === product.categoryId`.

### Product — ADAPTAR

```ts
export interface Product {
  id: string;
  sku: string;
  name: string;
  brandId: string;
  categoryId: string;
  subcategoryId: string;
  images: string[];
  priceList: number;
  priceOffer?: number; // número mock; NO define membresía de oferta
  isOffer: boolean;
  isFeatured: boolean;
}
```

| Campo | Verdad |
|---|---|
| `isOffer` | El producto está en ofertas (Home visitante **sí** muestra tarjetas; menú Ofertas solo cliente → `/buscar?offer=1`; filtro Solo Ofertas en `/buscar` también para visitante) |
| `priceOffer` | Precio tachado/naranja de demo **si** se quiere mostrar. Puede existir con `isOffer: false` (se ignora para membresía) o faltar con `isOffer: true` (la card usa `priceList`) |
| `isFeatured` | Solo lo consume el Home. `filter(p => p.isFeatured).slice(0, 6)` |

**No agregar** en esta demo: `publicado`, `orden`, `copete`, `ean`, `shortDescription`, `stock`.

### Catalog / Banner / Client / Cart

Sin cambio de type. Banner seed: `imageUrl` apuntando a un archivo **existente**; `buttonLink` de ofertas se actualiza en Etapa 4.

---

## Plan de migración de mocks

### Rubros actuales → globales

Hoy 9 categorías, **nombres ya distintos** (no hay dos “Grifería”). No hace falta fusionar filas. Sí hace falta **sacar la marca del id**.

| id actual | id nuevo | name | order |
|---|---|---|---|
| `pietra-herramientas` | `herramientas` | Herramientas | 1 |
| `pietra-plomeria` | `plomeria` | Plomería | 2 |
| `pietra-bano` | `bano` | Baño | 3 |
| `mota-manuales` | `herramientas-manuales` | Herramientas manuales | 4 |
| `mota-corte` | `corte-perforacion` | Corte y perforación | 5 |
| `mota-medicion` | `medicion` | Medición | 6 |
| `fv-griferia` | `griferia` | Grifería | 7 |
| `fv-repuestos` | `repuestos` | Repuestos | 8 |
| `fv-valvulas` | `valvulas` | Válvulas | 9 |

Imágenes: **conservar las Unsplash actuales** (ya son genéricas de rubro, no logos de marca).

### Subrubros (mínimo para recorrer Categorías)

No 205. Objetivo: **ninguna pantalla vacía**.

Propuesta (ajustable si un rubro queda sin hijos):

| id | categoryId | name | order |
|---|---|---|---|
| `herramientas-corte` | `herramientas` | Corte | 1 |
| `herramientas-manual` | `herramientas` | Manuales | 2 |
| `plomeria-canillas` | `plomeria` | Canillas y válvulas | 1 |
| `plomeria-conexion` | `plomeria` | Conexiones | 2 |
| `bano-ducha` | `bano` | Ducha | 1 |
| `bano-accesorios` | `bano` | Accesorios de baño | 2 |
| `herr-man-general` | `herramientas-manuales` | General | 1 |
| `corte-discos` | `corte-perforacion` | Discos y brocas | 1 |
| `medicion-general` | `medicion` | General | 1 |
| `griferia-1-agua` | `griferia` | Griferías 1 agua | 1 |
| `griferia-2-aguas` | `griferia` | Griferías 2 aguas | 2 |
| `griferia-accesorios` | `griferia` | Accesorios de grifería | 3 |
| `repuestos-general` | `repuestos` | General | 1 |
| `valvulas-paso` | `valvulas` | Válvulas de paso | 1 |

**Por qué varios “General”:** cada producto **debe** tener subrubro. Un hijo por rubro evita filtros vacíos. Grifería y Herramientas / Baño tienen 2–3 para **demostrar** Rubro → Subrubros en la reunión.

### Productos (30 actuales)

- Remap `categoryId` con la tabla de ids.
- Asignar `subcategoryId` coherente (por nombre del producto, no al azar): p. ej. “Disco diamantado” → `herramientas-corte`; “Canilla esférica” → `plomeria-canillas`; “Set ducha” → `bano-ducha`; productos FV grifería → `griferia-1-agua` / `griferia-2-aguas` intercalados para que **ambos** subrubros tengan al menos 1 producto.
- `isOffer: true` en los 7 que hoy tienen `priceOffer` (`pie-001`, `pie-004`, `pie-007`, `pie-010`, `mot-010`, `fv-001`, `fv-010`). **Conservar** el número `priceOffer`.
- `isFeatured: true` en **6** productos (no los primeros 6 del array por accidente: marcar un mix Pietra + al menos 1 de otra marca para probar que el flag manda). El Home hará `.slice(0, 6)` **después** del filter; con 6 flagged el slice no recorta.

No agregar productos “para llegar a 24” ni para imitar producción. Con los ~30 actuales, `/buscar` ya tiene **2 páginas**. Eso **demuestra** paginación.

**Sí agregar** el mínimo para las 5 marcas nuevas (Prive, Rao, Tramontina, Ingco, Solyon Argentina SA): **1 producto por marca** alcanza (mismo rubro/subrubro global que ya exista, p. ej. Herramientas / General). Imagen: Unsplash genérica ya usada, o sin foto + fallback. **No** clonar catálogo real. Total esperado ≈ 35 ítems (sigue habiendo 2 páginas).

### `normalizeProducts` (adminStore)

Reemplazar la lógica “primer rubro de la marca”.

Algoritmo:

1. Mapa de ids viejos → nuevos (tabla de arriba). Si `product.categoryId` está en el mapa, remapea.
2. Si `categoryId` no existe en `getCategories()`, asignar el primer rubro **global** por `order` (no por marca).
3. Si falta `subcategoryId` o no es hijo del rubro: primer subrubro de ese `categoryId`.
4. Si falta `isOffer`: `true` solo si `priceOffer !== undefined && priceOffer < priceList` (migración one-shot de datos viejos). **A partir de ahí la verdad es el boolean.**
5. Si falta `isFeatured`: `false`.

`normalizeCategories` sigue pisando desde mock (como hoy).  
Subcategorías: **siempre desde mock**, igual que categories. No persistir subrubros en `pietra_admin_store` (evita drift). Getters: `getSubcategories()`, `getSubcategory(id)`, `getSubcategoriesByCategory(categoryId)`.

`createCategory`: unicidad por `name` case-insensitive **sin** marca.

`getCategoriesByBrand(brandId)` — **no borrar el nombre** en esta etapa si Marca.tsx todavía lo llama. Cambiar el cuerpo:

```
categorías cuyo id aparece en al menos un producto con ese brandId
```

Así `/marca/pietra` (todavía viva hasta Etapa 3) no se queda en blanco.

---

## RUTAS

Ninguna ruta nueva. Las existentes deben seguir abriendo.

`/marca/:brandId/rubro/:categoryId` usará ids **nuevos**. Links viejos `pietra-herramientas` pueden 404 hasta Etapa 3 (redirect). Aceptable: esos links solo viven en `Marca.tsx`, que se actualiza al leer `getCategoriesByBrand` (ya ids nuevos).

---

## VISUAL

Ningún layout nuevo. Cards y Home se ven iguales. Destacados/ofertas pueden **cambiar de ítems** (flag). Verificar que Home no quede vacío.

---

## REUTILIZADOS

- `getProducts` / `getCategories` / `getBrands`
- Persistencia `pietra_admin_store.products`
- `isProductOnOffer` como **función** (cambia el cuerpo, no los call sites)

---

## RIESGO

**ALTO.** Cruza types, mocks, store y dos Admin que no son el foco. Un `categoryId` mal remapeado deja filtros y rubros vacíos. Mitigación: tabla de ids + `normalizeProducts` + no persistir categories.

---

## REGRESIONES

- `/buscar` sigue listando ~30 + el mínimo de las 5 marcas nuevas (~35).
- `/ofertas` sigue mostrando los 7 (vía `isProductOnOffer` → `isOffer`).
- Login, Favoritos, carrito, Catálogos, Empresa: no deberían enterarse.
- Admin Rubros: deja de tener marca; **puede verse distinto** ya en esta etapa (puente). No es el look final (Etapa 8).

---

## VALIDACIÓN MANUAL

1. Recargar app. Consola sin throw.
2. `/buscar` — conteo ≈ 30 actuales + mínimo de marcas nuevas (~35). Cada `?brand=` de las 8 tiene ≥1 producto.
3. `/ofertas` — 7 (o los `isOffer: true`).
4. Home — hay destacados (6) y ofertas.
5. `/marca/pietra` — hay cards de rubro (las que tengan productos Pietra).
6. Click un rubro — hay productos (ids nuevos).
7. Admin → Productos — la tabla abre (aunque siga desalineada).
8. Admin → Rubros — lista **sin** exigir marca; no crash.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] `Category` no tiene `brandId`.
- [ ] Existe `Subcategory` y cada producto tiene `subcategoryId` hijo de su rubro.
- [ ] `isOffer` / `isFeatured` en todos los productos mock.
- [ ] `isProductOnOffer` no usa `priceOffer < priceList` como verdad.
- [ ] `getCategoriesByBrand` deriva de productos.
- [ ] Home / Buscar / Ofertas no vacíos.
- [ ] No hay rutas nuevas.
- [ ] `clientStore` intacto.

---

## NO HACER EN ESTA ETAPA

- No Header, no layout 3 columnas, no paginación, no autocomplete.
- No página Categorías / Marcas / Revisar Pedido.
- No ABM Admin Subrubros.
- No módulo Ofertas Admin.
- No igualar 2258 productos / 47 rubros / 205 subrubros / miles de clientes.
- **Sí** las 8 marcas de producción (visual + 1 producto mínimo cada una). No descargar logos faltantes.
- No persistir pedidos.
- No “arreglar” OfferProductCard / CatalogCarousel / auth `require`.
- No escribir estas interfaces en `src/` **hasta Fase 5**. (Este doc es el contrato.)

---

## Store Admin — funciones nuevas (Fase 5)

```
getSubcategories(): Subcategory[]
getSubcategory(id: string): Subcategory | undefined
getSubcategoriesByCategory(categoryId: string): Subcategory[]
```

No `createSubcategory` / `deleteSubcategory` (no hay ABM).

Checkpoint: `checkpoint-modelo`.
