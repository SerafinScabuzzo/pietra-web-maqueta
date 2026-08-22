# Búsqueda y filtros

Runtime: `screenshots/02-buscar.png` (`/buscar` sin query), `03-ofertas.png`. Código: `SearchBar`, `Buscar`, `SearchFilters`, `ActiveFiltersChips`, `utils/search.ts`.

---

## SearchBar (`src/components/SearchBar.tsx`)

- Form `onSubmit` → `preventDefault`
- Si hay texto: `navigate('/buscar?q=' + encodeURIComponent(trim))`
- Si vacío: `navigate('/buscar')`
- **ENTER envía el form** (es un `<form>`)
- **No hay** sugerencias, dropdown, debounce, ni AJAX
- Placeholder: “Buscar por producto, rubro o código”
- Fuera de `/buscar` limpia el input; dentro, sincroniza con `?q=`
- Botón “Buscar” siempre visible

### Vs producción

| | Maqueta | Producción |
|---|---|---|
| Al tipear | Nada | POST `buscarDinamico.php` → `#resultadoBusqueda` |
| ENTER | **Navega a `/buscar?q=`** | **No cambia la URL** |
| Click sugerencia | N/A | `/articulo/{slug}` |
| SKU | Funciona si se envía el form (busca en `sku` y `name`) | Sugerencia al artículo |
| Destino | Página de resultados | Permanece en la página actual |

**FUNCIONALIDAD YA EXISTENTE Y POTENCIALMENTE REUTILIZABLE:** ENTER → `/buscar?q=`. En prod ENTER no abre resultados; acá sí.

`matchesQuery` busca solo `product.name` y `product.sku` (normalizado, sin acentos). **No busca nombre de rubro** pese al placeholder. Tampoco EAN (el campo no está en el type).

---

## `/buscar` sin query

Título: “Todos los productos”. Runtime: “30 productos disponibles”.  
Es un catálogo completo. **EXTRA** vs prod (prod no tiene listado único “Productos” independiente de marca).

Botón “Limpiar” (disabled si no hay query/filtros/sort).

---

## `/buscar` con query

Título: “Resultados para: {q}” + conteo. Vacío: mensaje + Limpiar filtros + Volver al inicio.

Pipeline (`useMemo`):

1. `matchesQuery` si `q` no vacío
2. `applyFilters` (brands, categories, offerOnly)
3. `applySort`

---

## URL params

| Param | Multi | Significado |
|---|---|---|
| `q` | no | texto |
| `brand` | sí (`getAll`) | `brandId` |
| `category` | sí | `categoryId` |
| `offer` | `1` o ausente | Solo ofertas |
| `sort` | `price_asc` \| `price_desc` \| `name_asc` | orden |

Los filtros viven en la URL (`setSearchParams`). Recargable/compartible.

---

## Filtros (`SearchFilters.tsx`)

Sidebar `lg+` sticky; mobile colapsable.

1. **Ordenar por:** Sin orden / Nombre A-Z / Precio menor-mayor / Precio mayor-menor  
   Sort de precio usa `priceOffer || priceList` (también para público; el número no se muestra pero el orden sí corre).
2. **Solo ofertas:** checkbox → `offer=1` → `priceOffer < priceList`
3. **Marcas:** checkboxes de `getBrands()` (Pietra, Mota, FV)
4. **Rubros:** checkboxes de **todas** `getCategories()` (9 ítems). Runtime visible: Herramientas, Plomería, Baño, Herramientas manuales, Corte y perforación, Medición, Grifería (+ scroll para el resto)

**Casi hecho:** el filtro Marca existe y filtra productos por `brandId`, **pero no restringe el listado de Rubros**. Elegir Pietra sigue mostrando rubros de Mota y FV. Combinar Marca Pietra + Rubro “Grifería” (FV) puede dar 0 resultados.

No hay filtro precio min/max, stock, subrubro, destacado.

`onClose` prop declarado y no usado.

---

## Chips (`ActiveFiltersChips`)

Muestra marcas, rubros, “Solo ofertas”, sort, “Limpiar todo”. No muestra el `q` (el título de página sí). Limpiar chips **no borra `q`**. El botón “Limpiar” de `Buscar` sí navega a `/buscar` y borra todo.

---

## Cards en `/buscar`

`ProductCard` (no `OfferProductCard`). Público: badge Oferta si aplica, sin corazón, “Iniciá sesión…”, “Ingresá para comprar”, “Ver detalles”.

---

## Ordenamiento

Ver tabla `sort` arriba. Sin “relevancia”. Sin “mayor descuento” en `/buscar` (eso está en `/ofertas`).

---

## Paginación

**NO HAY PAGINACIÓN.** Los 30 productos se listan juntos. No hay `pagina`, ni select 10/20/50/100.  
Prod `/ofertas`: paginación `ofertas.php?pagina=N` y select de cantidad.

---

## Ofertas (relacionado)

`OfferFilters` es similar (Marca + Rubro + sort) **sin** checkbox Solo ofertas (la página ya filtra ofertas). Default sort `discount_desc`. Rubros **tampoco** se reducen al elegir marca. **NO HAY PAGINACIÓN.**
