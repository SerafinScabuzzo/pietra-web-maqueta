# Etapa 2 — Catálogo central (`/buscar`)

Incluye el contrato de `06-plan-filtros-paginacion.md`. **No hay etapa de código aparte** para filtros/página.

---

## OBJETIVO

`/buscar` es **el** catálogo: visitante = **Productos**, cliente = **Armar Pedido** (título y chips; el carrito columna es Etapa 5). Filtros dependientes (Marca → Rubros → Subrubros) + Solo ofertas por `isOffer` + orden Pietra default + paginación 24 + params de URL recargables.

---

## PRECONDICIONES

- Etapa 1 hecha: rubros globales, `subcategoryId`, `isOffer`, getters de subrubros.
- Query params actuales ya existen: `q`, `brand`, `category`, `offer`, `sort`.

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/utils/search.ts` | `applyFilters` + `subcategories` + `isOffer`. `applyDefaultSort`. `suggestProducts` puede esperar a Etapa 7; **no obligatorio acá**. |
| `src/pages/Buscar.tsx` | Título según sesión y `q`. Pipeline: query → filters → sort/default → paginar. Leer `page` y `subcategory`. Usar `setSearchParams` (clase A). Layout **sigue 2 columnas**. |
| `src/components/SearchFilters.tsx` | Subrubros. Listas dependientes + invalidación. Reset `page`. `_onClose` (clase A). Scroll interno (ya hay `max-h-64`; aplicarlo también a subrubros). |
| `src/components/ActiveFiltersChips.tsx` | Chip `subcategory`. Invalidación al quitar. No borrar `q`. Reset `page`. |
| `src/app/providers/router.tsx` | **Solo si** se hace `/ofertas` → redirect aquí. Preferible **sí**: un solo catálogo. Componente `Ofertas` puede quedar como `<Navigate to="/buscar?offer=1" replace />`. |

---

## ARCHIVOS NUEVOS

Ninguno obligatorio. Si el pipeline en `Buscar.tsx` supera ~40 líneas de params, extraer `src/utils/catalogParams.ts` **solo entonces**:

```
PAGE_SIZE = 24
readCatalogParams(searchParams)
writeCatalogParams(...)
clampPage(page, totalPages)
```

No crear un hook genérico ni un “filter engine” framework.

---

## ARCHIVOS INTACTOS

- `Header.tsx` (menús viejos: Secciones sigue; ENTER del SearchBar **ya** va a `/buscar`)
- `Home.tsx`, `ProductCard.tsx` (badge oferta ya usa `isProductOnOffer` → actualizado en Etapa 1)
- `CartDrawer.tsx`, `clientStore.ts`
- `BrandGrid.tsx`, `Marca.tsx`, `Rubro.tsx` (siguen hasta Etapa 3)
- CSS / Tailwind / `package.json`

---

## CAMBIOS DE MODELO

Ninguno nuevo. Consumir Etapa 1.

---

## RUTAS

| Ruta | Rol |
|---|---|
| `/buscar` | Catálogo central. **Conservar path.** |
| `/buscar?q=` | Resultados de texto |
| `/buscar?brand=pietra` | Prefiltro marca (lo usará Etapa 3) |
| `/buscar?category=griferia&subcategory=griferia-1-agua` | Prefiltro taxonomía |
| `/buscar?offer=1` | Solo ofertas. **Visitante y cliente:** el filtro existe. El menú **Ofertas** solo lo tiene el cliente. El CTA Home visitante “Ver todas las ofertas” **no** usa esta URL (aviso; ver `05`). |
| `/buscar?page=2` | Página 2 |
| `/ofertas` | **Dejar de ser catálogo.** Redirect a `/buscar?offer=1` (misma URL; el título lo decide la sesión). Es alias de URL vieja, no el CTA de Home visitante. |

No crear `/productos` ni `/armar-pedido`.

### Nombres técnicos exactos de query params

| Param | Multi | Valores | Default si ausente |
|---|---|---|---|
| `q` | no | string | sin filtro de texto |
| `brand` | sí (`getAll`) | `brandId` (las 8: `pietra`, `mota`, `prive`, `rao`, `fv`, `tramontina`, `ingco`, `solyon`) | todas |
| `category` | sí | `categoryId` (`griferia`, …) | todos los rubros |
| `subcategory` | sí | `subcategoryId` | todos los subrubros |
| `offer` | no | `1` = on; **ausente** = off. No usar `0` ni `true` | off |
| `sort` | no | `name_asc` \| `price_asc` \| `price_desc` | **ausente = default Pietra** |
| `page` | no | entero ≥ 1. **Omitir si es 1** | `1` |

Compatibilidad: params actuales se **reutilizan**. Links viejos `?brand=&category=&offer=1&sort=` siguen funcionando. `subcategory` y `page` son ampliación.

OR dentro de la misma dimensión (varios `brand=`), AND entre dimensiones. **CONSERVAR**.

---

## VISUAL

**Visitante (imagen 5 — Productos):**

- Conservar de producción / maqueta actual: sidebar filtros izquierda, grilla `ProductCard`, chips, fondo celeste, cards existentes (no rediseñar).
- Nuevo: título **Productos** (si no hay `q`) o **Resultados para: …**; bloque paginación bajo la grilla; filtro Subrubros.
- No copiar una imagen IA de header/footer.

**Cliente en esta etapa:** mismo layout 2 columnas. Título **Armar Pedido** (o “Resultados para” si hay `q`). Precio/qty ya salen de `ProductCard`. **Sin** columna carrito todavía (Etapa 5). Sigue pudiendo abrir el drawer del Header.

Paginación UI: controles simples Anterior / números / Siguiente. **No** select 10/20/50/100 de producción.

---

## REUTILIZADOS

- `matchesQuery` (name + sku) — no ampliar a rubro.
- `setSearchParams` / recarga de URL.
- `SearchFilters` sidebar sticky `lg:` + colapsable mobile (**no destruir**).
- `ActiveFiltersChips` + “Limpiar todo” **sin** borrar `q`.
- Botón “Limpiar” de `Buscar` sí limpia todo (incluye `q`) → `/buscar`.
- `ProductCard`.

---

## RIESGO

**ALTO.** Es el archivo más compartido (`Buscar`). Un bug de invalidación deja filtros fantasma (Pietra + Grifería FV = 0). Un bug de `page` deja URLs rotas. Mitigación: helpers de invalidación en un solo lugar; tests manuales de la matriz de `06`.

---

## REGRESIONES

- ENTER del header sigue aterrizando en `/buscar?q=`.
- Público: precios ocultos.
- Cliente: agregar desde la card sigue funcionando.
- `/favoritos` y ficha no se tocan.
- Header todavía dice “Secciones” (Etapa 4).

---

## VALIDACIÓN MANUAL

Pasos detallados también en `06` y `13`.

1. Visitante `/buscar` — título Productos; ~30 ítems; página 1 muestra 24; existe página 2 con el resto.
2. Orden default: primeros ítems son Pietra A–Z; después el resto A–Z mezclado (Mota y FV intercalados por nombre, **no** bloque Mota luego bloque FV).
3. Elegir sort Nombre A–Z — mezcla marcas; quitar sort — vuelve Pietra-primero.
4. Check Pietra — la lista **Rubros** solo muestra rubros con productos Pietra (Herramientas, Plomería, Baño). No Grifería.
5. Check Pietra + Plomería — Subrubros solo hijos de Plomería presentes en Pietra.
6. Cambiar a solo Mota — se limpian rubros/subrubros de Pietra (no quedan checks fantasma).
7. Solo ofertas (visitante y cliente) — solo `isOffer`. Recargar URL `?offer=1` da lo mismo. El visitante **sí** puede usar el checkbox; **no** llega desde el menú ni desde “Ver todas” del Home.
8. `/buscar?page=99` — aterriza en última válida o 1.
9. Filtrar estando en página 2 — vuelve a página 1 (`page` desaparece).
10. Cliente: título Armar Pedido; precios visibles; agregar 1 ítem (drawer header).
11. `/ofertas` redirige a `/buscar?offer=1`.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Una sola página de catálogo: `/buscar`.
- [ ] Título Productos vs Armar Pedido según `getAuth().isClient`.
- [ ] Params exactos de la tabla.
- [ ] Default Pietra A–Z + resto A–Z global.
- [ ] 24 / página, client-side, reset e clamp.
- [ ] Filtros dependientes + invalidación (ver `06`).
- [ ] `offer=1` usa `isOffer`.
- [ ] Layout aún 2 columnas.
- [ ] Mobile filtros colapsables **siguen**.

---

## NO HACER EN ESTA ETAPA

- No columna carrito / overlay change.
- No `/revisar-pedido`.
- No Header menús nuevos (los links Categorías/Marcas 404).
- No autocomplete.
- No página Categorías.
- No rediseñar ProductCard.
- No clonar paginación PHP.
- No segundo catálogo en `/ofertas` (redirect, no reescribir OfferFilters).

Contrato fino de filtros: **`06-plan-filtros-paginacion.md`**.  
Checkpoint: `checkpoint-catalogo`.
