# Fase 4 — Plan técnico de implementación

Fecha: 22/08/2026  
Reunión: 31/08/2026  
Estado: **plan**. No se modificó `src/`. No se inició Fase 5.

---

## Qué es este paquete

Plan **quirúrgico** para pasar de la maqueta actual al resultado aprobado de Fase 3.

Reglas:

- Modificar lo mínimo. Cada etapa deja la maqueta **navegable**.
- Cambios pequeños → validar → continuar.
- **NO** reescribir la app, **NO** design system, **NO** reemplazar stores, **NO** cambiar Router/Tailwind.
- Pseudomodelos **solo en docs**. Interfaces reales se escriben en Fase 5.
- Fuera: backend, checkout, mobile Armar Pedido, Listas, Pedidos Admin, TXT, paridad 2258 productos / 47 rubros / 205 subrubros / miles de clientes.
- Dentro (demo): **8 marcas** de producción en página Marcas + mínimo de productos para que el click no dé vacío. No carga masiva.

---

## Confirmación de alcance

| Qué | Estado |
|---|---|
| Fases 1, 2 y 3 | Aprobadas, usadas como entrada |
| `src/`, mocks, routes, CSS, `package.json` | **No modificados** en esta fase |
| Fase 5 | **No iniciada**. Requiere autorización explícita |

---

## Orden definitivo de implementación (10 etapas)

Se analiza el orden conceptual pedido. **Dos movimientos** respecto de ese listado, con dependencia real del código:

1. **Filtros + paginación no son una etapa de código separada.** Viven en `Buscar.tsx`, `SearchFilters.tsx`, `ActiveFiltersChips.tsx` y `utils/search.ts`. Separarlos después del catálogo obligaría a tocar dos veces los mismos archivos. El contrato está en `06-plan-filtros-paginacion.md`; **se ejecuta dentro de la Etapa 2**.
2. **Header “Carrito” → Revisar Pedido no va en la Etapa 4 ni en la 5.** En Etapa 5 la ruta `/revisar-pedido` aún no existe. El CTA de la columna conserva el comportamiento previo (hoy: “Finalizar compra” inerte) o queda visual sin cambiar destino. **Etapa 6 se ejecuta en la misma tanda** que la 5: crea `/revisar-pedido`, cablea “Revisar pedido” del lateral + Carrito Header + confirmación mock. Así `checkpoint-carrito` **no deja 404**. Un solo comportamiento final (tras E6): Header Carrito → Revisar Pedido.

El resto del orden conceptual se conserva: Modelo primero (todo lo demás miente si `Category.brandId` sigue existiendo); Categorías/Marcas **antes** del Header (si no, los ítems nuevos 404); Armar Pedido después del catálogo; Admin al final (la demo funciona con mocks).

| # | Etapa | Riesgo | Por qué ese lugar |
|---|---|---|---|
| 0 | Preflight | — | Solo lectura. Clasificar tsc A/B. Verificar banners y localStorage. |
| 1 | Modelo de datos | ALTO | Base. Sin esto, filtros, Categorías y Home contradicen Fase 3. |
| 2 | Catálogo `/buscar` + filtros + paginación | ALTO | Una sola lógica Productos/Armar Pedido (aún 2 columnas). |
| 3 | Categorías + Marcas | MEDIO | Necesita modelo + params del catálogo. Rutas nuevas antes del menú. |
| 4 | Header + Home | MEDIO | Menús apuntan a rutas ya creadas. Banners Admin → Home. |
| 5 | Armar Pedido + carrito columna | ALTO | Layout 3 col + carrito abierto + minimizar + `clientStore` + cantidades/totales. **No** cablea `/revisar-pedido`. |
| 6 | Revisar Pedido + confirmación + Header Carrito | MEDIO | **Misma tanda que E5.** Crea la ruta y cablea CTAs. `checkpoint-carrito` sin 404. |
| 7 | Buscador / login / Mi Cuenta | BAJO | Autocomplete, label Usuario, CTA. ENTER ya existe. |
| 8 | Admin mínimo | MEDIO | Flags y rubro global. Sin ABM Subrubros ni Pedidos/Listas. |
| 9 | Regresión visual | BAJO | Recorrido, no features nuevas. |

---

## Decisiones técnicas CERRADAS (esta fase las fija; no se repreguntan)

| Tema | Decisión |
|---|---|
| URL catálogo | Reutilizar **`/buscar`**. Sin login = Productos. Con login = Armar Pedido. Mismo componente. |
| Query params | Reutilizar `q`, `brand`, `category`, `offer`, `sort`. Ampliar **`subcategory`** y **`page`**. |
| Orden default | Pietra primero (A–Z interno). Resto **A–Z GLOBAL** (no agrupar por marca). `sort` de usuario pisa. |
| Paginación | **24** por página. Client-side. Param `page`. Reset a 1 al filtrar/buscar/ordenar. Página inexistente → última válida o 1. |
| Oferta | **`isOffer: boolean`** es la verdad. `priceOffer` puede quedar como número mock. |
| Destacado | **`isFeatured: boolean`**. Home: `filter(isFeatured).slice(0, 6)`. |
| Subrubro | Type `Subcategory`. Campo producto `subcategoryId`. Param `subcategory`. **Sin ABM Admin**. |
| Rubro | `Category` **sin** `brandId`. Globales. |
| Carrito | **Un store: `clientStore`**. Header, columna y Revisar Pedido. |
| Header Carrito | Un solo comportamiento **tras Etapa 6**: **`/revisar-pedido`**. En E4–E5 sigue overlay / no cambia destino. |
| Armar Pedido desktop | Filtros \| Productos \| Carrito **abierto default**. No overlay, no oscurece, no lock scroll. Minimizable. |
| Confirmar | Mensaje “Pedido confirmado correctamente” + número mock + vaciar carrito + Volver a Armar Pedido. **Sin** store de pedidos. |
| Autocomplete | SKU + nombre. **Máximo 8.** Debounce **250 ms**. Click → ficha. ENTER → `/buscar?q=`. Teclado: ↑↓ Enter Escape. |
| Ofertas Home visitante | **Puede** ver tarjetas de oferta. **No** tiene Ofertas en el menú. Click “Ver más” / “Ver todas las ofertas” → **aviso** (ofertas completas para clientes; Ingresar / Quiero ser cliente). Copy no hace falta perfecto. El filtro Solo Ofertas en `/buscar` visitante **sigue existiendo**. Cliente: menú Ofertas → `/buscar?offer=1` (Armar Pedido con Solo Ofertas). |
| Volumen | **8 marcas** en `/marcas`: Pietra, Mota, Prive, Rao, F.V, Tramontina, Ingco, Solyon Argentina SA. Mocks visuales en Etapa 1 + **mínimo** de productos para que el click de marca no dé vacío. **No** paridad 2258/47/205 ni miles de clientes. Si faltan logos: documentar; **no** descargar. |
| Precios Card / carrito / Revisar | La misma línea debe mostrar un **importe coherente** en card, carrito lateral y Revisar Pedido (Etapas 5–6). Etapa 0 **solo registra** el estado actual; **no** cambia la fórmula todavía. |
| Mobile Armar Pedido | **FUERA DE ALCANCE**. No destruir `md:` / hamburguesa. |
| tsc/eslint | Clase A = bloquea el archivo que esa etapa toca (arreglar **dentro** de la etapa). Clase B = no tocar. |

Detalle de params, modelo y migración: `02-modelo-datos.md` y `06-plan-filtros-paginacion.md`.

---

## Top 10 archivos de mayor impacto

**No se modifican en Fase 4.** Lista para no tocarlos a ciegas en Fase 5:

1. `src/store/adminStore.ts`
2. `src/types/index.ts`
3. `src/pages/Buscar.tsx`
4. `src/components/Header.tsx`
5. `src/components/SearchFilters.tsx`
6. `src/store/clientStore.ts`
7. `src/components/CartDrawer.tsx`
8. `src/pages/Home.tsx`
9. `src/data/mocks/products.ts`
10. `src/app/providers/router.tsx`

Qué depende de cada uno: `11-matriz-archivos.md`.

---

## Documentos de esta carpeta

| Archivo | Contenido |
|---|---|
| `00-resumen-plan.md` | Este archivo |
| `01-preflight.md` | Etapa 0 |
| `02-modelo-datos.md` | Etapa 1 + modelo TS propuesto + migración mocks |
| `03-plan-catalogo.md` | Etapa 2 (catálogo central) |
| `04-plan-categorias-marcas.md` | Etapa 3 |
| `05-plan-header-home.md` | Etapa 4 + mapeo visual Home |
| `06-plan-filtros-paginacion.md` | Contrato de filtros/URL/página (se ejecuta en Etapa 2) |
| `07-plan-carrito.md` | Etapa 5 (navegable; sin `/revisar-pedido`) |
| `08-plan-revisar-pedido.md` | Etapa 6 (misma tanda; crea ruta + cablea) |
| `09-plan-auth-buscador-mi-cuenta.md` | Etapa 7 |
| `10-plan-admin-minimo.md` | Etapa 8 |
| `11-matriz-archivos.md` | Matriz global + Top 10 |
| `12-riesgos-regresiones.md` | Riesgos + checklist |
| `13-validacion.md` | Validación por etapa + Etapa 9 |
| `14-checkpoints.md` | Puntos conceptuales de rollback |
| `15-alcance-no-tocar.md` | Legacy y prohibiciones |

---

## Cómo ejecutar en Fase 5

Cuando haya autorización: **“Ejecutá la Etapa N exactamente como fue aprobada.”**  
Una etapa por vez. Validación manual del documento de esa etapa. Checkpoint conceptual. Seguir.

**DETENERSE** al terminar este paquete. Esperar autorización explícita para Fase 5.
