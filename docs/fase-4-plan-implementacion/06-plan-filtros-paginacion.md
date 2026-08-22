# Filtros, URL state y paginación

Contrato que **se implementa en la Etapa 2**. No es una etapa extra de código.

---

## OBJETIVO

Definir nombres exactos, dependencia de listas, invalidación (sin filtros fantasma), cálculo de página y resets. En Fase 5 no se inventan params.

---

## PRECONDICIONES

Etapa 1 (modelo). Ejecución: Etapa 2.

---

## ARCHIVOS A MODIFICAR

Los de Etapa 2: `search.ts`, `Buscar.tsx`, `SearchFilters.tsx`, `ActiveFiltersChips.tsx`.

---

## ARCHIVOS NUEVOS / INTACTOS

Ver `03-plan-catalogo.md`. No tocar `OfferFilters.tsx` (la página Ofertas redirige).

---

## CAMBIOS DE MODELO

Ninguno.

---

## RUTAS / params (nombres finales)

```
/buscar
  ?q=
  &brand=pietra          # repetible
  &category=griferia     # repetible
  &subcategory=griferia-1-agua   # repetible  ← NUEVO
  &offer=1               # solo este valor enciende
  &sort=name_asc|price_asc|price_desc
  &page=2                # NUEVO; omitir si page===1
```

**No usar:** `subrubro`, `pagina`, `oferta`, `marca`, `idmarca` (nombres de producción PHP). La maqueta ya habla inglés en la query; se **amplía** ese dialecto.

---

## Pipeline de datos (orden obligatorio)

1. `getProducts()`
2. Si `q` no vacío → `matchesQuery` (name + sku, `normalizeText`)
3. `applyFilters({ brands, categories, subcategories, offerOnly })`
   - `offerOnly` ⇔ `product.isOffer === true` (**no** `priceOffer`)
   - `subcategories`: `product.subcategoryId` ∈ lista
4. Sort:
   - si `sort` presente → `applySort` actual (pisa default)
   - si ausente → `applyDefaultSort`:
     - grupo Pietra (`brandId === 'pietra'`) ordenado `localeCompare` es, sensitivity base
     - resto **un solo array** A–Z global (Mota y FV mezclados por nombre)
5. Paginación client-side sobre el array ya filtrado/ordenado.

---

## Listas visibles (dependientes)

Universo de partida para **opciones** (no para el resultado): productos que cumplen los filtros **ancestros**, no el filtro de la propia dimensión.

### Marcas

Lista = `getBrands()` (**8**). No se ocultan marcas sin stock (ocultarlas no se pidió). Check = filtra productos. Tras Etapa 1 cada marca tiene ≥1 producto, así que el click/check no deja la grilla vacía.

### Rubros (se reducen)

```
base = productos que cumplen: q + brands seleccionadas + offerOnly
         (NO filtrar aún por category/subcategory para armar la lista de rubros)
ids = unique categoryId de base
mostrar = getCategories() cuyo id ∈ ids, order asc
```

Elegir Pietra ⇒ desaparecen rubros que solo tienen Mota/FV.

### Subrubros (se reducen)

```
base = productos que cumplen: q + brands + categories seleccionadas + offerOnly
ids = unique subcategoryId de base
mostrar = esos Subcategory, agrupados visualmente es opcional; basta lista plana
si no hay ningún rubro seleccionado: subrubros presentes en `base`
si hay rubros seleccionados: además cada subrubro debe tener categoryId ∈ selectedCategories
```

Pietra + Grifería ⇒ solo subrubros de Grifería con productos Pietra.

### Solo ofertas

Checkbox. **Existe para visitante y cliente** en `/buscar`. Intersección AND. No vacía las otras listas: las **recalcula** con `offerOnly` en `base`.

El visitante **no** llega a `?offer=1` desde el menú (no tiene Ofertas) ni desde “Ver todas” del Home (aviso). Puede tildar el filtro si ya está en Productos. El cliente llega por menú Ofertas → `/buscar?offer=1`.

---

## Invalidación (sin filtros fantasma)

Al **cambiar Marca** (toggle on/off):

1. Recalcular rubros disponibles.
2. `selectedCategories = selectedCategories ∩ availableCategoryIds`
3. Recalcular subrubros.
4. `selectedSubcategories = selectedSubcategories ∩ availableSubcategoryIds`
5. Escribir URL sin los ids caídos.
6. `page` → 1 (borrar param).

Al **cambiar Rubro**:

1. Recalcular subrubros.
2. Limpiar subrubros cuyo padre ya no está seleccionado **o** ya no aparecen en `base`.
3. Reset página.

Al **cambiar Subrubro / offer / q / sort**:

- Reset página.
- No hace falta limpiar marcas.

Al quitar un chip: misma invalidación que descheckear.

“Limpiar filtros” de sidebar/chips: borra `brand`, `category`, `subcategory`, `offer`, `sort`, `page`. **Conserva `q`.**

“Limpiar” de la página Buscar: navega a `/buscar` (borra todo, incluido `q`).

---

## Paginación — cálculo

```
PAGE_SIZE = 24  // constante única. No hay selector de tamaño.

total = filteredSorted.length
totalPages = max(1, ceil(total / PAGE_SIZE))   // si total=0, totalPages=1 y grilla vacía

rawPage = parseInt(pageParam, 10)
si NaN o < 1 → 1
si rawPage > totalPages → usar totalPages
  y opcionalmente replace URL a page=totalPages (o borrar si 1)
  para no dejar ?page=99 en la barra

start = (currentPage - 1) * PAGE_SIZE
slice(start, start + PAGE_SIZE)
```

Reset a pág 1 cuando cambian: `q`, `brand`, `category`, `subcategory`, `offer`, `sort`.

Si la página actual **deja de existir** (ej. filtro más estricto): ir a **última válida** o 1. Con el reset a 1 en cada filtro, el caso típico es URL compartida `?page=5` con pocos resultados → clamp.

UI: no mostrar paginación si `totalPages === 1` **o** mostrarla disabled. Preferir **ocultar** si hay una sola página (menos ruido con 30 mocks y un filtro que deja 3 ítems). Con catálogo completo (30) **sí** se ve (2 páginas).

---

## VISUAL

- Scroll interno: `max-h-64 overflow-y-auto` en Marcas, Rubros y Subrubros (ya existe en los dos primeros).
- Chips: 4 dimensiones + sort como feedback (no es 5º filtro de negocio).
- No rediseñar el sidebar.

---

## REUTILIZADOS

`URLSearchParams.getAll` / `append` / `delete` como hoy.

---

## RIESGO

**ALTO** si la invalidación se hace “a mano” en 4 handlers distintos y se olvida un caso. **Mitigación:** una función `syncDependentParams(params) → URLSearchParams` usada por SearchFilters y chips.

---

## REGRESIONES / VALIDACIÓN / ACEPTACIÓN / NO HACER

Cubiertos en `03-plan-catalogo.md`. Matriz extra:

| Acción | Rubros | Subrubros | page |
|---|---|---|---|
| Check Pietra | solo Pietra | se recortan | 1 |
| Uncheck Pietra (queda vacío) | globales con producto | todos presentes | 1 |
| Check Grifería | (si marcas vacías: todos los que apliquen) | solo hijos Grifería | 1 |
| Uncheck Grifería | — | se van subrubros de Grifería | 1 |
| offer=1 | recálculo | recálculo | 1 |
| sort | no | no | 1 |

---

## NO HACER

- Filtro precio min/max, stock, destacado, “relevancia”.
- Select 10/20/50/100.
- Paginación server-side.
- Guardar filtros en localStorage (la URL es la fuente).
