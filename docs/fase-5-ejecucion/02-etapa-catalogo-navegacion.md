# Fase 5 — Etapa 2: catálogo central + filtros + categorías + marcas

Fecha: 22/08/2026  
CWD: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`  
Checkpoint conceptual: `checkpoint-catalogo` + `checkpoint-categorias-marcas` (en esta ejecución de Fase 5 van juntas)  
Git: **no hay repositorio**. **No se hizo commit.**

**No se inició Etapa 3.** No se implementó Home/Header definitivo, autocomplete, Mi Cuenta, ni el nuevo flujo de carrito fuera del alcance de Etapa 2.

Se leyó `01-etapa-modelo.md` (Etapa 1 aprobada: 8 marcas, 9 rubros globales, 14 subrubros, 37 productos, `isOffer`).

---

## Principio

**UN SOLO CATÁLOGO:** `/buscar`. No hay `/productos`, `/armar-pedido` ni `/ofertas` como segundo catálogo.

| Sesión | Título en `/buscar` sin `q` |
|---|---|
| Visitante | **PRODUCTOS** |
| Cliente | **ARMAR PEDIDO** |

Internamente siempre `/buscar`. Layout **2 columnas** (filtros + grilla). El carrito sigue siendo el drawer del Header.

---

## Archivos de código modificados

- `src/utils/search.ts` — `applyFilters` + `subcategories` + `isOffer === true`; `applyDefaultSort` (Pietra A–Z + resto A–Z global)
- `src/pages/Buscar.tsx` — título por sesión; pipeline query → filtros → sort/default → página 24; usa `setSearchParams`; contador; normaliza URL
- `src/components/SearchFilters.tsx` — Subrubros; listas dependientes; invalidación; reset `page`; `_onClose` (clase A); scroll `max-h-64`
- `src/components/ActiveFiltersChips.tsx` — chip `subcategory`; quitar actualiza URL; “Limpiar todo” no borra `q`
- `src/app/providers/router.tsx` — rutas `/categorias`, `/categorias/:categoryId`, `/marcas` (aliases legacy siguen en sus componentes)
- `src/components/BrandGrid.tsx` — `Link` → `/buscar?brand=`
- `src/pages/Ofertas.tsx` — **DEJADO DE USAR** como catálogo; `<Navigate to="/buscar?offer=1" />`
- `src/pages/Marca.tsx` — **DEJADO DE USAR** como taxonomía; redirect a `/buscar?brand=`
- `src/pages/Rubro.tsx` — **DEJADO DE USAR** como listado de productos; redirect a `/buscar?brand=&category=`

**No se modificó:** `Home.tsx`, `Header.tsx`, `Login.tsx`, `MiCuenta.tsx`, `SearchBar.tsx`, `CartDrawer.tsx`, `ProductCard.tsx`, admin, `clientStore`, lógica comercial de precios.

---

## Archivos creados

- `src/utils/catalogParams.ts` — `PAGE_SIZE`, `readCatalogParams`, `writeCatalogParams`, `clampPage`, `normalizeCatalogParams` / `sync` de hijos inválidos
- `src/components/CategoryCard.tsx` — card 4:3 + fallback de nombre (sin descargar imágenes)
- `src/pages/Categorias.tsx` — índice de rubros globales
- `src/pages/CategoriaRubro.tsx` — subrubros de un rubro (no productos)
- `src/pages/Marcas.tsx` — “MARCAS CON LAS QUE TRABAJAMOS” + `BrandGrid`
- `docs/fase-5-ejecucion/02-etapa-catalogo-navegacion.md` (este archivo)
- Screenshots en `docs/fase-5-ejecucion/screenshots-etapa-2/`

---

## Cómo quedó `/buscar`

1. `getProducts()` (37 mocks)
2. Si `q` → `matchesQuery` (name + sku)
3. `applyFilters({ brands, categories, subcategories, offerOnly })` — `offerOnly` ⇔ `isOffer === true`
4. Si hay `sort` → `applySort` (pisa el default). Si no → `applyDefaultSort`
5. Paginación client-side, 24 por página, param `page` (se omite si es 1)

Sin `q`/`brand`/`category`/`subcategory`/`offer` → **todos** los productos.

---

## Query params (nombres finales)

| Param | Multi | Valores | Default si ausente |
|---|---|---|---|
| `q` | no | string | sin filtro de texto |
| `brand` | sí | `pietra`, `mota`, `prive`, `rao`, `fv`, `tramontina`, `ingco`, `solyon` | todas |
| `category` | sí | ids de rubro global | todos |
| `subcategory` | sí | ids de subrubro | todos |
| `offer` | no | `1` = on; ausente = off | off |
| `sort` | no | `name_asc` \| `price_asc` \| `price_desc` | default Pietra |
| `page` | no | entero ≥ 1; **omitir si es 1** | `1` |

OR dentro de la dimensión, AND entre dimensiones. Links compartibles. URL incompatible se **normaliza** (replace).

---

## Orden default

1. Marca `pietra` A–Z (`localeCompare` es, sensitivity base)
2. Resto A–Z **global** (Mota, FV, Tramontina, etc. mezclados por nombre; no bloques por marca)

Sort manual pisa el default. Quitar sort vuelve a Pietra-primero. Sorts existentes conservados.

Verificado en Chrome: primeros 10 = Pietra A–Z (Asiento… → Válvula…); el 11º es “Alicate Tramontina universal”, el 12º “Alicate universal” (Mota).

---

## Paginación

- `PAGE_SIZE = 24`, client-side
- 37 productos → página 1 muestra 1–24; página 2 muestra 25–37
- Contador: `Mostrando 1 a 24 de 37`
- Reset a `page=1` al cambiar `q` / `brand` / `category` / `subcategory` / `offer` / `sort`
- Página inválida (`?page=99`) → **page=1** (preferencia) y se borra el param
- Controles Anterior / números / Siguiente; se ocultan si hay una sola página
- No se agregaron productos extra (mocks ya > 24)

---

## Filtros (reutilizado `SearchFilters`)

Solo: Ofertas (`isOffer`), Marcas, Rubros, Subrubros. Scroll interno `max-h-64`.

Dependientes vía **productos**:

| Estado | Rubros visibles | Subrubros visibles |
|---|---|---|
| Sin marca | rubros presentes en el universo (q + offer) | subrubros presentes en ese universo |
| Con marca | solo rubros de productos de esa marca | se recortan |
| Con rubro (+ marca) | — | solo subrubros de productos que cumplen |

Intersección acumulativa.

Verificado: Pietra → Herramientas, Plomería, Baño (**no** Grifería). Pietra + Plomería → Canillas y válvulas, Conexiones.

“Limpiar filtros” / chips “Limpiar todo”: borra marca/rubro/subrubro/oferta/sort/page. **Conserva `q`.**  
Botón “Limpiar” de la página → `/buscar` (borra todo, incluido `q`).

---

## Limpieza de filtros incompatibles

`normalizeCatalogParams` (un solo lugar, usado por sidebar, chips y load de URL):

- Al cambiar marca: rubros = intersección con disponibles; subrubros se recortan; `page` → 1
- Al cambiar rubro: se van subrubros huérfanos; `page` → 1
- URL `?brand=pietra&category=griferia` → queda `?brand=pietra` (Grifería no existe en Pietra)
- Cambio Pietra+Plomería → solo Mota: chip Plomería **desaparece**; rubros pasan a los de Mota

---

## Categorías

`/categorias` — Header/Footer/colores actuales. Rubros globales en tarjetas (imagen tipo producto + nombre). Unsplash ya en el mock de Etapa 1; `onError` → fallback de nombre. **No se descargó nada.**

Click rubro → `/categorias/:categoryId` (subrubros, **no** productos).

---

## Rubro → Subrubros

`/categorias/griferia` muestra Griferías 1 agua / 2 aguas / Accesorios. Breadcrumb `Inicio / Categorías / Grifería`. Cero `ProductCard`.

Click subrubro → `/buscar?category=griferia&subcategory=griferia-1-agua`.

Si un rubro no tiene subrubros: estado vacío (no aplica a los 9 actuales).  
`griferia-accesorios` no tiene productos demo (deuda Etapa 1): la card existe; el catálogo puede quedar en 0.

---

## Marcas

`/marcas` — título **MARCAS CON LAS QUE TRABAJAMOS**. Reutiliza `BrandGrid`. **8 marcas** + fallback de nombre (Etapa 1). Click → `/buscar?brand=pietra` (no rubros).

---

## Legacy (archivos NO borrados)

| Ruta vieja | Destino | Archivo |
|---|---|---|
| `/marca/:brandId` | `/buscar?brand=` | `Marca.tsx` — **DEJADO DE USAR** |
| `/marca/:brandId/rubro/:categoryId` | `/buscar?brand=&category=` | `Rubro.tsx` — **DEJADO DE USAR** |
| `/ofertas` | `/buscar?offer=1` | `Ofertas.tsx` — **DEJADO DE USAR** |

Verificado: `/marca/pietra` → `/buscar?brand=pietra`. `/marca/pietra/rubro/herramientas` → `/buscar?brand=pietra&category=herramientas`. `/ofertas` → `/buscar?offer=1`.

Header/Home siguen apuntando a esas URLs viejas; el redirect las cubre. **No se tocó Header ni Home.**

---

## Público vs cliente

| | Visitante | Cliente |
|---|---|---|
| Título | PRODUCTOS | ARMAR PEDIDO |
| Precios | ocultos (`Iniciá sesión…`) | visibles (`ProductCard` existente) |
| Cantidad / carrito | no | sí, drawer actual |
| Favoritos | no | corazón de la card |
| Filtros / paginación / marcas / categorías | mismos | mismos |
| Layout | 2 columnas | 2 columnas (sin columna carrito) |

`ProductCard` no se rediseñó. Card $1200 vs carrito $675 **sigue pendiente** (no Etapa 2).

ENTER del SearchBar → `/buscar?q=` **conservado**. Sin autocomplete.

---

## Validación manual (Chrome headless + Vite `http://127.0.0.1:5173/`)

| Caso | Resultado |
|---|---|
| `/buscar` público | Título PRODUCTOS; 37; Mostrando 1 a 24 de 37; precios ocultos |
| Orden Pietra | 10 Pietra A–Z primero; resto mezclado |
| Página 2 | `/buscar?page=2` — Mostrando 25 a 37 de 37 |
| `?page=99` | normaliza a `/buscar` página 1 |
| Pietra | rubros Herramientas/Plomería/Baño; 10 ítems |
| Pietra + Plomería | subrubros Canillas y válvulas, Conexiones |
| Cambio a Mota | limpia Plomería; rubros de Mota |
| `isOffer` / `?offer=1` | 7 productos |
| `q=canilla` | 6 resultados; título “Resultados para: canilla” |
| Chips | quitar / Limpiar todo conserva `q` |
| Cliente | ARMAR PEDIDO; precios; Agregar al carrito |
| `/categorias` | 9 rubros globales; sin SKU |
| `/categorias/griferia` | 3 subrubros; breadcrumb; sin productos |
| Subrubro → buscar | `category` + `subcategory` |
| `/marcas` | 8; click Pietra → `?brand=pietra` |
| Redirects | `/marca/pietra`, `/marca/pietra/rubro/herramientas`, `/ofertas` |
| `/producto/pie-001` | ficha viva |
| `/favoritos` | viva (cliente) |
| Admin demo | `/admin` — 37 productos, 8 marcas, 9 rubros |
| Carrito drawer | abre; card **$1.200** vs línea **$675** (pendiente, no tocado) |

---

## Screenshots

Carpeta: `docs/fase-5-ejecucion/screenshots-etapa-2/`

| Archivo | Qué |
|---|---|
| `01-buscar-publico.png` | `/buscar` visitante, PRODUCTOS, 1–24 de 37 |
| `02-buscar-pietra.png` | Filtro Pietra + chip |
| `03-categorias.png` | Índice de rubros |
| `04-rubro-subrubros.png` | Grifería → 3 subrubros + breadcrumb |
| `05-marcas.png` | 8 marcas + fallbacks |
| `06-buscar-cliente-armar-pedido.png` | Cliente, ARMAR PEDIDO, precios visibles |

---

## Vite build

`node.exe node_modules/vite/bin/vite.js build` → **exit 0** (~2.4 s, 85 módulos).

---

## tsc — antes / después / nuevos

`node.exe node_modules/typescript/bin/tsc --noEmit --pretty false`

| | Errores |
|---|---|
| Etapa 1 | **13** |
| Etapa 2 | **11** |
| Nuevos inexplicados | **0** |

Se fueron (clase A de archivos abiertos):

- `SearchFilters.tsx` `onClose` unused
- `Buscar.tsx` `setSearchParams` unused

Quedan baseline clase B / etapas posteriores: `OfferProductCard` `shortDescription`, `AdminProductos` `productCategory`/`shortDescription`/`ean`, `Favoritos` `navigate`, `Login` `handleDemoLogin`, `MiCuenta` `Link`, `clientStore` `CartItem`.

---

## eslint — antes / después

`eslint . --ext ts,tsx --max-warnings 0`

| | Errores |
|---|---|
| Etapa 1 | **12** |
| Etapa 2 | **10** |
| Nuevos | **0** |

Se fueron `onClose` y `setSearchParams`. Resto = baseline (`CatalogCarousel` hooks, unused, `auth.ts` require/any, `_` de `updateBrand`).

---

## Regresiones controladas

- ENTER del header sigue a `/buscar?q=`
- Público: precios ocultos
- Cliente: agregar desde la card + drawer
- `/favoritos` y ficha no se tocaron
- Header todavía dice “Secciones” (Etapa 3/4)
- Home `BrandGrid` (aún visible) ahora manda al catálogo filtrado (aceptable)
- `/ofertas` ya no es vitrina propia (redirect)
- Card vs carrito $1200 vs $675 **igual que Etapa 1**

---

## Pendientes que afectan Etapa 3

- Cablear menú Header: Categorías / Marcas (hoy se entra por URL; Secciones sigue)
- Home: sacar o reubicar `BrandGrid`; no se tocó el layout
- Autocomplete del SearchBar (**Etapa 3**): no implementado a propósito
- `griferia-accesorios` sin productos demo (click puede dejar grilla vacía)
- Columna carrito / overlay: **fuera de alcance**
- Unificar precio Card vs Drawer: no Etapa 2
- Flags admin `isOffer`/`isFeatured` en UI: Etapa 8

---

## Criterios de aceptación

- [x] Una sola página de catálogo: `/buscar`
- [x] Título PRODUCTOS vs ARMAR PEDIDO según `getAuth().isClient`
- [x] Params exactos de la tabla
- [x] Default Pietra A–Z + resto A–Z global
- [x] 24 / página, client-side, reset y página inválida → 1
- [x] Filtros dependientes + invalidación
- [x] `offer=1` usa `isOffer`
- [x] Layout 2 columnas; mobile filtros colapsables
- [x] Existen `/categorias`, `/categorias/:id`, `/marcas`
- [x] Rubro no lista productos; subrubro empuja filtros
- [x] Click marca = `brand`, no taxonomía
- [x] Redirects legacy funcionan; archivos no borrados
