# Etapa 3 — Categorías y Marcas

Dos vías de entrada al **mismo** `/buscar`. No son dos catálogos.

---

## OBJETIVO

- Página **Categorías**: rubros globales → click → subrubros de ese rubro → click → `/buscar?category=&subcategory=`.
- Página **Marcas**: “Marcas con las que trabajamos” → click → `/buscar?brand=`.
- Dejar de usar Marca → Rubros → Productos como camino.

---

## PRECONDICIONES

- Etapa 1: rubros globales + subrubros con imagen.
- Etapa 2: `/buscar` entiende `brand`, `category`, `subcategory`.

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/app/providers/router.tsx` | Rutas nuevas. Redirects de las viejas. **No** cambiar `BrowserRouter` ni el layout Header/Footer. |
| `src/components/BrandGrid.tsx` | Destino del `Link`: `/buscar?brand=${brand.id}` en lugar de `/marca/${id}`. |
| `src/pages/Marca.tsx` | Convertir a **redirect** `<Navigate to={/buscar?brand=} replace />`. No borrar el archivo (evita imports rotos). |
| `src/pages/Rubro.tsx` | Redirect a `/categorias/:categoryId` (lista subrubros, no productos). |

---

## ARCHIVOS NUEVOS

| Path | Qué |
|---|---|
| `src/pages/Categorias.tsx` | Índice de rubros globales (`getCategories()` ordenados por `order`). |
| `src/pages/CategoriaRubro.tsx` | Subrubros de un `:categoryId`. Nombre de archivo libre; no reutilizar `Rubro.tsx` como listado de productos. |

Opcional: `src/components/CategoryCard.tsx` **solo si** Categorias y CategoriaRubro duplican el mismo JSX de card 4:3. Si son <30 líneas iguales, copiar el markup es preferible a extraer un design system.

---

## ARCHIVOS INTACTOS

- `Buscar.tsx` / filtros (ya aceptan params).
- `Header.tsx` — los ítems Categorías/Marcas se cablean en **Etapa 4**. Hasta entonces las páginas existen y se pueden abrir por URL.
- Home todavía tiene `BrandGrid` (sale en Etapa 4); el click ya irá al catálogo (mejor que a rubros).
- Admin Subrubros: no crear.
- `ProductCard`, carrito, login.

---

## CAMBIOS DE MODELO

Ninguno.

---

## RUTAS

| Ruta | Componente | Rol |
|---|---|---|
| `/categorias` | `Categorias` | Índice rubros. **CREAR.** |
| `/categorias/:categoryId` | `CategoriaRubro` | Subrubros. **CREAR.** |
| `/marcas` | Reusa `BrandGrid` dentro de una página thin, o `Marcas.tsx` de 20 líneas. **CREAR.** |
| `/marca/:brandId` | Redirect → `/buscar?brand=:brandId` | Alias. **RETIRAR** el rol taxonomía. |
| `/marca/:brandId/rubro/:categoryId` | Redirect → `/categorias/:categoryId` | Ya no lista productos. |

No copiar URLs de producción `/rubro/{marca}/{rubro}` ni `/subrubro/...`.

Breadcrumb deseado (Categorías):

```
Inicio / Categorías / {Rubro}
```

Sin marca en la cadena.

Click subrubro:

```
/buscar?category={categoryId}&subcategory={subcategoryId}
```

Visitante y cliente: **misma URL**. El catálogo ya distingue sesión.

---

## VISUAL

### Imagen 2 — Categorías (índice)

- **Requisito de la imagen / Fase 3:** grilla de cards categoría (foto 4:3 + nombre). Rubros **globales**. Imagen genérica, no logo Pietra.
- **Sigue de producción/maqueta:** sombra suave, card blanca, tipografía/colores del sitio (`brandBlue` títulos). Patrón visual ya usado en `Marca.tsx` (cards de rubro). Reutilizar esa estructura, no el destino.
- No hero de marca. No dropdown.

### Imagen 3 — Rubro → Subrubros

- **Requisito:** grilla de subrubros (foto genérica + nombre). **No** productos. Título = nombre del rubro.
- **Sigue de producción:** card categoría 4:3. Breadcrumb.
- No clonar 800×600 de Admin real.

### Imagen 4 — Marcas

- **Requisito:** título “Marcas con las que trabajamos”. Grilla logo + nombre. Click → catálogo filtrado.
- **Sigue de producción/maqueta:** `BrandGrid` tal cual (fondo blanco, aspect 4:3). **Mudar**, no redibujar.
- Volumen: **8 marcas** de producción (Pietra, Mota, Prive, Rao, F.V, Tramontina, Ingco, Solyon Argentina SA). No 3. Logos faltantes: placeholder/`onError`; no descargar.

---

## REUTILIZADOS

- `getCategories`, `getSubcategoriesByCategory`, `getBrands`
- `BrandGrid`
- Markup de card de `Marca.tsx` (copiar a Categorias)
- `/buscar` + params

---

## RIESGO

**MEDIO.** Rutas nuevas son chicas. El riesgo es dejar `/marca/.../rubro/...` listando productos (segundo catálogo) o un click de marca que abra rubros. Mitigación: redirects, no dual-mode.

Si un rubro no tiene subrubros, la página 2 queda vacía → volver a Etapa 1 y agregar un hijo “General” (mocks mínimos).

---

## REGRESIONES

- Home `BrandGrid` (aún visible) ahora manda a Productos/Armar Pedido. Aceptable e incluso alineado.
- Links viejos `/marca/pietra` no 404.
- Catálogos / Empresa / Login intactos.
- Header todavía no muestra Categorías (se entra por URL hasta Etapa 4).

---

## VALIDACIÓN MANUAL

1. Abrir `/categorias` — todos los rubros globales, **sin** duplicar “Herramientas Pietra / Herramientas Mota”.
2. Click Grifería — solo subrubros de Grifería (2–3). Cero `ProductCard`.
3. Click “Griferías 1 agua” — `/buscar` con ambos params; grilla filtrada.
4. `/marcas` — **8 marcas**. Click Pietra — `/buscar?brand=pietra`. Click de cada una de las otras 7 → catálogo con ≥1 producto (no vacío).
5. `/marca/fv` — redirect al catálogo FV, **no** grilla de Válvulas/Repuestos.
6. `/marca/pietra/rubro/herramientas` — redirect a subrubros de Herramientas.
7. Cliente logueado: mismos clicks aterrizan en Armar Pedido (título), mismos params.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Existen `/categorias`, `/categorias/:id`, `/marcas`.
- [ ] Rubro no lista productos.
- [ ] Subrubro no es un tercer catálogo.
- [ ] Click marca = filtro `brand`, no taxonomía.
- [ ] Redirects viejos funcionan.
- [ ] Imágenes de rubro/subrubro genéricas.

---

## NO HACER EN ESTA ETAPA

- No cambiar Header (Etapa 4).
- No sacar `BrandGrid` del Home todavía.
- No Admin Subrubros.
- No paginación en estas grillas (son pocas cards).
- No hero de marca.
- No meter marca en el breadcrumb de Categorías.

Checkpoint: `checkpoint-categorias-marcas`.
