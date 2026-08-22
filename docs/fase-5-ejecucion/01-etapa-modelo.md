# Fase 5 — Etapa 1: modelo de datos

Fecha: 22/08/2026  
CWD: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`  
Checkpoint conceptual: `checkpoint-modelo`  
Git: **no hay repositorio** (`git` no está en PATH; no hay `.git`). **No se inicializó repo. No hay commit.**

**No se inició Etapa 2.** No se crearon páginas Categorías/Marcas, no se transformó `/buscar`, no se tocó Header/Home (salvo que Home ahora lista 8 marcas porque `getBrands()` cambió), no hay paginación, filtros dependientes, Armar Pedido, carrito lateral, Revisar Pedido, autocomplete ni cambios de Mi Cuenta.

---

## Antes / después

| | Antes (Etapa 0) | Después (Etapa 1) |
|---|---|---|
| Marcas | 3 (`pietra`, `mota`, `fv`) | **8** (ids conservados + `prive`, `rao`, `tramontina`, `ingco`, `solyon`) |
| Rubros | 9 atados a marca (`pietra-herramientas`, …) | **9 globales** (`herramientas`, `plomeria`, …) **sin `brandId`** |
| Subrubros | no existían | **14**, cada uno con `categoryId` padre |
| Productos | 30 | **37** (30 remapeados + 7 demo de marcas nuevas) |
| Oferta | `priceOffer < priceList` | Flag **`isOffer`** (7 true; se conservó `priceOffer`) |
| Destacado | `products.slice(0, 6)` en Home | Flag **`isFeatured`** en esos 6; Home **no se cambió** |
| Banners seed | `/uploads/banner-1.jpg` y `banner-2.jpg` (HTML 404) | `banner principal.jpg` y `portadaCatalogo.png` |
| `pietra_admin_store` | Rehidrataba products/banners; normalize usaba `c.brandId` | Versión `1`; clave vieja **se borra una vez** |

---

## Archivos de código modificados

- `src/types/index.ts`
- `src/data/mocks/brands.ts`
- `src/data/mocks/categories.ts`
- `src/data/mocks/products.ts`
- `src/store/adminStore.ts`
- `src/utils/pricing.ts`
- `src/utils/search.ts`
- `src/pages/Rubro.tsx` (filtro temporal por `brandId` para que el rubro de una marca no mezcle otras)
- `src/components/BrandGrid.tsx` (fallback de nombre: `text-center px-2`)
- `src/pages/admin/AdminRubros.tsx` (puente: sin `brandId` en el form)
- `src/pages/admin/AdminProductos.tsx` (puente: rubros globales; `subcategoryId`/`isOffer`/`isFeatured` al crear)
- `src/pages/admin/AdminMarcas.tsx` (orden de las 8 marcas de producción; sin `mozart`/`varios-*`)

**No se modificó:** `Home.tsx`, `Header.tsx`, `Buscar.tsx`, `Ofertas.tsx` (sigue usando `isProductOnOffer`), `Marca.tsx` (consume `getCategoriesByBrand` ya derivado de productos), `clientStore.ts`, `router.tsx`, `package.json`.

---

## Archivos nuevos

- `src/data/mocks/subcategories.ts`
- `src/utils/catalogInvariants.ts`
- `docs/fase-5-ejecucion/01-etapa-modelo.md` (este archivo)
- Screenshots en `docs/fase-5-ejecucion/screenshots/` (`10-` … `20-*-e1.png`)

---

## Modelo final

### Brand (shape sin cambio)

`id`, `name`, `logoUrl?`, `heroImageUrl?`, `description?`

Ids: `pietra`, `mota`, `prive`, `rao`, `fv`, `tramontina`, `ingco`, `solyon`.

### Category (rubro global)

`id`, `name`, `imageUrl?`, `order` — **sin `brandId`**.

### Subcategory

`id`, `name`, `categoryId`, `imageUrl?`, `order?`

Un subrubro → un rubro. No pertenece a una marca.

### Product

`id`, `sku`, `name`, `brandId`, `categoryId`, `subcategoryId`, `images`, `priceList`, `priceOffer?`, `isOffer`, `isFeatured`

**No** se agregaron `shortDescription` ni `ean`.

`isOffer` es la verdad de membresía a ofertas. `priceOffer` es número mock (cards/Home siguen pintándolo).  
`isFeatured` listo para Home en Etapa 4; Home sigue haciendo `.slice(0, 6)`.

---

## Cantidades

| Entidad | Cantidad |
|---|---|
| Marcas | **8** |
| Rubros | **9** |
| Subrubros | **14** |
| Productos | **37** |
| Ofertas (`isOffer: true`) | **7** (`pie-001`, `pie-004`, `pie-007`, `pie-010`, `mot-010`, `fv-001`, `fv-010`) |
| Destacados (`isFeatured: true`) | **6** (los 6 primeros actuales: `pie-001` … `pie-006`) |

### Rubros globales

| id | name |
|---|---|
| `herramientas` | Herramientas |
| `plomeria` | Plomería |
| `bano` | Baño |
| `herramientas-manuales` | Herramientas manuales |
| `corte-perforacion` | Corte y perforación |
| `medicion` | Medición |
| `griferia` | Grifería |
| `repuestos` | Repuestos |
| `valvulas` | Válvulas |

### Subrubros

`herramientas-corte`, `herramientas-manual`, `plomeria-canillas`, `plomeria-conexion`, `bano-ducha`, `bano-accesorios`, `herr-man-general`, `corte-discos`, `medicion-general`, `griferia-1-agua`, `griferia-2-aguas`, `griferia-accesorios`, `repuestos-general`, `valvulas-paso`.

`griferia-accesorios` no tiene productos demo (queda para Etapa 3 / Categorías). El resto de subrubros usados tienen al menos un producto, salvo ese.

### Productos demo marcas nuevas

| id | marca | rubro / subrubro |
|---|---|---|
| `prv-001` | Prive | griferia / griferia-1-agua |
| `rao-001` | Rao | plomeria / plomeria-canillas |
| `tra-001`, `tra-002` | Tramontina | herramientas-manuales / herr-man-general |
| `ing-001` | Ingco | herramientas / herramientas-corte |
| `ing-002` | Ingco | corte-perforacion / corte-discos |
| `sol-001` | Solyon | medicion / medicion-general |

Imágenes: Unsplash ya usadas en el mock. **No se descargaron logos.**

### Migración oferta / destacado

- `isOffer: true` donde hoy había oferta por precio (los 7 de arriba). Se conservó el número `priceOffer`.
- `isFeatured: true` en los 6 primeros del array original (coincide con lo que Home ya muestra).
- `isProductOnOffer` y el filtro `offerOnly` de `search.ts` leen **`isOffer`**, no `priceOffer < priceList`.
- Home **no** se tocó: ofertas del Home siguen filtrando por `priceOffer` (los 7 mocks migrados mantienen el visual).

---

## Compatibilidad Marca → Rubros (temporal)

`/marca/:brandId` **sigue viva**. `Category` **no** volvió a tener `brandId`.

`getCategoriesByBrand(brandId)` (alias `getCategoriesForBrand`) calcula:

1. productos con ese `brandId`
2. `categoryId` distintos
3. esos rubros globales, ordenados por `order`

`Marca.tsx` no se reescribió: ya llamaba `getCategoriesByBrand`.

`Rubro.tsx` filtra `getProductsByCategory(categoryId)` **por `brandId` de la URL**, para que `/marca/pietra/rubro/herramientas` no mezcle Ingco. Verificado: 4 productos Pietra, sin Ingco.

Ids viejos tipo `/marca/pietra/rubro/pietra-herramientas` pueden 404 (aceptable; los links actuales ya salen con ids nuevos).

Admin Rubros: lista global; el filtro “por marca” usa el mismo helper (imperfecto hasta E8, **sin crash**).

---

## `pietra_admin_store` — estrategia B

- Clave: `pietra_admin_store`
- Campo `version: 1` al guardar
- Si la clave existe **sin** `version === 1` (estructura vieja con `category.brandId`): **`removeItem` una sola vez** en ese load. No se borra en cada carga.
- No se tocan `pietra_auth`, carrito, favoritos, clientes.
- `brands` / `categories` / `subcategories` **siempre** desde mock (subrubros no se persisten).
- `normalizeProducts` ya no asigna “primer rubro de la marca”. Remapea ids legacy → globales, valida marca/rubro/subrubro y `subcategory.categoryId === product.categoryId`. `isOffer` ausente se migra one-shot desde precio; después manda el boolean.

En la sesión headless de validación la clave **no existía** (perfil limpio, sin CRUD admin). En la máquina de demo del usuario: si había store viejo, el primer load de esta etapa lo limpia.

---

## Banners rotos

Seed anterior `banner-1.jpg` / `banner-2.jpg` **no existen** (Vite sigue sirviendo `index.html`, `Content-Type: text/html`).

Reemplazo (assets locales existentes):

- banner-1 → `/uploads/banner%20principal.jpg` (`image/jpeg`, 200)
- banner-2 → `/uploads/portadaCatalogo.png` (`image/png`, 200)

Home **no consume** banners admin (sigue `CatalogCarousel`). Cambio de seed para no dejar 404 cuando Etapa 4 los use.

---

## Marcas sin logo

| Marca | Logo | Qué se ve |
|---|---|---|
| Pietra | `/uploads/LOGO PIETRA 4.1.png` | logo |
| Mota | no hay `mota-logo.png` | hero `motaPortada.png` (se quitó el `logoUrl` roto) |
| F.V | no hay `fv-logo.png` | hero `portadaFV.jpg` |
| Prive, Rao, Tramontina, Ingco, Solyon | sin archivo | **fallback neutro por nombre** en `BrandGrid` |

No se descargó ningún logo.

---

## Invariantes

Helper: `src/utils/catalogInvariants.ts`, corrido al inicializar `adminStore`. Expone `window.__catalogInvariantCount`.

Chequea: cada producto tiene marca/rubro/subrubro válidos; `subcategory.categoryId === product.categoryId`; category sin `brandId`; padre del subrubro existe; `isOffer` / `isFeatured` booleanos.

**Resultado: 0 issues** (Home y post-admin).

---

## Vite build

`node.exe node_modules/vite/bin/vite.js build` → **exit 0** (~2.5 s, 83 módulos).

---

## tsc — antes / después / nuevos

Comando: `node.exe node_modules/typescript/bin/tsc --noEmit --pretty false`

| | Errores |
|---|---|
| Etapa 0 | **15** |
| Etapa 1 | **13** |
| Nuevos inexplicados | **0** |

Se fueron (clase A de archivos abiertos):

- `adminStore.ts` `ALLOWED_BRAND_IDS` unused
- `AdminProductos.tsx` `categoryId` `string | undefined` al crear

Quedan los de baseline (clase B / Etapa 8): `OfferProductCard` `shortDescription` (2), `SearchFilters` `onClose`, `AdminProductos` `productCategory` + `shortDescription`/`ean` (4), `Buscar` `setSearchParams`, `Favoritos` `navigate`, `Login` `handleDemoLogin`, `MiCuenta` `Link`, `clientStore` `CartItem`.

---

## eslint — antes / después

`eslint . --ext ts,tsx --max-warnings 0`

| | Errores |
|---|---|
| Etapa 0 | **13** |
| Etapa 1 | **12** |
| Nuevos | **0** |

Se fue `ALLOWED_BRAND_IDS`. Queda el `_` de `updateBrand` (clase B, no tocado a propósito). Resto = baseline (`CatalogCarousel` hooks, unused, `auth.ts` require/any).

---

## Rutas probadas (Chrome headless + Vite `http://127.0.0.1:5173/`)

| Ruta | Resultado |
|---|---|
| `/` | Home viva; 8 marcas; destacados (primeros 6); ofertas |
| `/buscar` | **37** productos; filtro Solo ofertas; 8 marcas en sidebar |
| `/ofertas` | **7** vía `isOffer` |
| `/marca/pietra` `/mota` `/fv` | Rubros vía productos (ids globales) |
| `/marca/prive` `/rao` `/tramontina` `/ingco` `/solyon` | Vivas; ≥1 rubro |
| `/marca/pietra/rubro/herramientas` | 4 productos Pietra (sin Ingco) |
| `/producto/pie-001` | Ficha viva |
| Login demo cliente | `/mi-cuenta` |
| Carrito | Card **$1.200** vs línea **$675** (pendiente, no tocado) |
| Login demo admin | Dashboard **37 / 8 / 9**; Rubros sin crash |

---

## Screenshots

Carpeta: `docs/fase-5-ejecucion/screenshots/` (no en `src/assets`). Baseline E0 (`01`–`05`) se conservó.

| Archivo | Qué |
|---|---|
| `10-home-e1.png` | Home con 8 marcas y fallback de nombre |
| `11-buscar-e1.png` | `/buscar` 37 productos |
| `12-ofertas-e1.png` | `/ofertas` 7 |
| `13-marca-pietra-e1.png` | Pietra → 3 rubros globales |
| `14-marca-prive-e1.png` | Prive sin hero; rubro Grifería |
| `15-rubro-herramientas-e1.png` | Rubro Pietra con productos |
| `16-producto-e1.png` | Ficha PIE-001 |
| `17-admin-e1.png` | Dashboard 37/8/9 |
| `18-mi-cuenta-e1.png` | Cliente demo |
| `19-carrito-e1.png` | Card vs carrito (inconsistencia) |
| `20-marca-solyon-e1.png` | Solyon Argentina SA |

---

## Pendientes (deuda Etapa 2 y más)

- **Etapa 2:** transformar `/buscar` (catálogo único, `subcategory`, `page`, paginación 24, orden Pietra-primero). **No hecho.**
- `/ofertas` → redirect a `/buscar?offer=1` (E2). Hoy la página Ofertas **sigue** (solo el flag).
- Páginas `/categorias` `/marcas` (E3). `/marca/:id` se retira después.
- Header/Home banners, menús, `isFeatured` en Home (E4).
- Unificar precio Card $1200 vs Carrito $675 (E5–E6). **No resuelto a propósito.**
- Flags `isOffer`/`isFeatured` en UI Admin (E8). Admin Rubros/Productos son puente.
- `griferia-accesorios` sin productos demo.
- Marcas sin logo: fallback permanente hasta que haya assets (no descargar).
- tsc/eslint clase B intactos.

---

## Criterios de aceptación

- [x] `Category` no tiene `brandId`
- [x] Existe `Subcategory`; cada producto tiene `subcategoryId` hijo de su rubro
- [x] `isOffer` / `isFeatured` en todos los mocks
- [x] `isProductOnOffer` no usa `priceOffer < priceList` como verdad
- [x] `getCategoriesByBrand` deriva de productos
- [x] Home / Buscar / Ofertas no vacíos
- [x] No hay rutas nuevas
- [x] `clientStore` intacto
