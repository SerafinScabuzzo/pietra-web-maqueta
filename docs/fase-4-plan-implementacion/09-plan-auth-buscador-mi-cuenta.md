# Etapa 7 — Buscador, login y Mi Cuenta

---

## OBJETIVO

Autocomplete de producción (SKU + nombre, máx. 8, click → ficha). ENTER ya existe y se **reutiliza**. Label login **Usuario**. Mi Cuenta + CTA grande a Armar Pedido. Ficha: terminar qty/agregar/favorito si no quedó cerrado en Etapa 5.

---

## PRECONDICIONES

- `/buscar` y `/producto/:id` vivos.
- Etapa 6: Header Carrito ya no es overlay (no choca con el dropdown de sugerencias).

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/components/SearchBar.tsx` | Input `onChange` → debounce 250 ms → sugerencias. Dropdown. Click ítem → `/producto/:id` y cierra. Submit (ENTER / botón Buscar) → **igual que hoy** `/buscar?q=` o `/buscar`. Teclado: ArrowDown/Up, Enter (si hay ítem destacado), Escape cierra. |
| `src/utils/search.ts` | `suggestProducts(products, query, limit = 8)` reusando `matchesQuery`. |
| `src/pages/Login.tsx` | Label visible `CUIT` → **Usuario**. `id="cuit"` interno puede quedarse. Borrar `handleDemoLogin` unused (clase A). **No** cambiar `loginClient` ni matching. |
| `src/pages/MiCuenta.tsx` | Bloque CTA: “¿Querés hacer un pedido?” + botón/link **ARMAR PEDIDO** → `/buscar`. Usa `Link` (clase A se resuelve). Conservar datos, descuento, cambiar código. |
| `src/pages/Producto.tsx` | Si falta de Etapa 5: cliente `addToCart`, `toggleFavorite`, qty. Visitante sin precio. Badge oferta vía `isOffer`. |

---

## ARCHIVOS NUEVOS

Ninguno. No `SearchAutocomplete.tsx` salvo que `SearchBar` se vuelva ilegible (>~120 líneas extra). Preferir todo en `SearchBar`.

---

## ARCHIVOS INTACTOS

- `auth.ts` — **no** tocar `require()` (clase B) salvo que el form CUIT se pruebe y explote **en esta etapa**.
- Recupero de contraseña — no crear.
- Placeholder del input — **FUERA DE ALCANCE** unificar con “Buscar...” de prod.
- `maxlength` 30 — no.
- Favoritos página — no, salvo que el corazón de ficha lo requiera (store ya existe).
- Header ítems — ya Etapa 4/6.

---

## CAMBIOS DE MODELO

Ninguno.

---

## RUTAS

Sin rutas nuevas.

| Acción | Destino |
|---|---|
| ENTER / submit con texto | `/buscar?q=` (visitante Productos, cliente Armar Pedido — misma URL) |
| submit vacío | `/buscar` |
| click sugerencia | `/producto/:productId` |
| CTA Mi Cuenta | `/buscar` |
| post-login cliente | `/mi-cuenta` **CONSERVAR** |
| post-login admin | `/admin` **CONSERVAR** |

---

## VISUAL

### Imagen 6 — Mi Cuenta

- **Requisito nuevo:** CTA grande a Armar Pedido (texto de Fase 3).
- **Conservar:** ficha de datos de la maqueta (CUIT mostrado como dato, no el label del login; el campo cuenta puede seguir diciendo CUIT porque **es el dato del cliente**, no el label del form de acceso). Descuento %. No pedidos/facturas/listas de producción.

### Autocomplete

- Dropdown bajo el input, lista corta (máx. 8): nombre + SKU.
- Estilo sitio (blanco, sombra). No clonar HTML de `buscarDinamico.php`.
- No busca rubro (aunque el placeholder lo mencione).

### Login

- Solo el **label** “Usuario”. Placeholder puede quedar. Botones demo se **conservan**.

---

## REUTILIZADOS

- `matchesQuery` / `normalizeText`
- `getProducts()`
- `useNavigate` del form actual
- Sync `?q=` cuando `pathname === '/buscar'`

---

## RIESGO

**BAJO.** Piezas locales. Riesgo: debounce mal cerrado dispara navigate; o Enter envía form **y** selecciona sugerencia. Regla: si el dropdown tiene ítem **activo** (teclado), Enter elige ficha y `preventDefault`; si no hay activo, submit al catálogo (comportamiento actual). Click fuera cierra.

---

## REGRESIONES

- ENTER sin tocar flechas = catálogo (como ahora).
- Login demo cliente/admin.
- Logout → Home pública.
- Precios siguen ocultos sin sesión.

---

## VALIDACIÓN MANUAL

1. Tipear “PIE-001” — ≤8 sugerencias, incluye ese SKU.
2. Click → ficha `pie-001`.
3. Tipear “ducha” + ENTER → `/buscar?q=ducha`.
4. Flechas + Enter → ficha. Escape cierra.
5. Vacío + Buscar → `/buscar`.
6. Login: se lee **Usuario**. Demo cliente → Mi Cuenta.
7. CTA Armar Pedido → `/buscar` título Armar Pedido.
8. Ficha cliente: agregar y favorito funcionan.
9. No aparece “Quiero ser cliente” logueado (Etapa 4).

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Autocomplete máx. 8, name+sku, debounce 250 ms.
- [ ] Click → ficha; ENTER → `/buscar?q=`.
- [ ] Teclado básico sin librería.
- [ ] Label Usuario.
- [ ] CTA Mi Cuenta.
- [ ] Ficha no contradice Armar Pedido.

---

## NO HACER EN ESTA ETAPA

- No AJAX PHP.
- No recupero.
- No cambiar `cuit` en el type Client.
- No corazón público.
- No rediseñar Mi Cuenta a la de producción (pedidos/facturas).
- No arreglar `require` “por las dudas”.

Checkpoint: `checkpoint-auth-buscador`.
