# Fase 5 — Etapa 4: flujo de compra (Armar Pedido + carrito + confirmación)

Fecha: 22/08/2026  
CWD: `C:\Users\scabu\OneDrive\Escritorio\PAGINA WEB\PAGINA WEB`

**No se inició Etapa 5.** No hay backend, pagos, logística, facturación ni checkout tradicional.

---

## Archivos modificados

- `src/utils/pricing.ts`
- `src/store/clientStore.ts`
- `src/pages/Buscar.tsx`
- `src/components/ProductCard.tsx`
- `src/components/Header.tsx`
- `src/pages/Producto.tsx`
- `src/app/providers/router.tsx`
- `src/pages/admin/AdminRubros.tsx`
- `src/pages/admin/AdminProductos.tsx`

## Archivos creados

- `src/utils/cartView.ts`
- `src/components/CartPanel.tsx`
- `src/pages/RevisarPedido.tsx`
- `docs/fase-5-ejecucion/04-etapa-flujo-compra.md`
- `docs/fase-5-ejecucion/screenshots-etapa-4/` (9 PNG)

`CartDrawer.tsx` **no se eliminó**. Dejó de usarse: el Header ya no abre overlay.

---

## Layout final de Armar Pedido

Solo con **cliente logueado**, `/buscar` queda:

**Filtros (izq.) | Productos (centro) | Carrito (der.)**

Visitante: dos columnas (filtros + productos), título **PRODUCTOS**, sin columna de carrito.

Desktop: carrito `lg:w-[300px]` / `xl:w-[320px]`, sticky, no overlay, no bloquea scroll.  
Mobile: se apila debajo; no hay UX móvil nueva.

## Reutilización de `/buscar`

No hay segunda página de catálogo. Filtros, chips, paginación, Solo ofertas y título ARMAR PEDIDO se conservan (Etapa 2).

---

## Carrito lateral

- Abierto **por default** al entrar (aunque esté vacío).
- Vacío: “Tu carrito está vacío. Agregá productos para comenzar tu pedido.”
- Cada línea: miniatura, nombre, SKU, precio unitario, − / cantidad / +, subtotal, eliminar.
- Totales: **Productos** (líneas) ≠ **Unidades** (suma de qty) + **Total**.
- CTA: **REVISAR PEDIDO** → `/revisar-pedido`.
- Scroll interno si hay muchas líneas.

## Minimizar / restaurar

- **Minimizar** pliega a un recuadro: `🛒 Carrito — X productos / X unidades` + **Mostrar carrito**.
- No se persiste en localStorage. Al volver a entrar a Armar Pedido, abre otra vez.

---

## Store utilizado

**El mismo `clientStore`** (`pietra_cart_{cuit}`).

`addToCart` incrementa la línea existente (una línea por `productId`).  
`saveCart` emite `pietra_cart_changed` para que panel, cards y Header se actualicen.

Logout **no borra** el carrito persistido del CUIT (comportamiento previo).

---

## Fórmula EXACTA de precio efectivo

```
si priceOffer es un número > 0:
  unitario = priceOffer
si no:
  unitario = priceList × (1 − client.discountRate)
```

Cliente demo: `discountRate = 0.55` → paga 45% del lista en productos **sin** `priceOffer`.

`isOffer` **no** entra en el cálculo: solo marca membresía a Ofertas.  
No se agregó IVA.

La misma función `getEffectiveUnitPrice` se usa en ProductCard, CartPanel, Revisar Pedido y ficha de producto.

### Casos de precio (cliente demo)

| Producto | Lista | Oferta | Cálculo | Card | Carrito | Revisar |
|---|---|---|---|---|---|---|
| Disco diamantado PIE-001 | 1500 | 1200 | `priceOffer` | **$1.200** | **$1.200** | **$1.200** |
| Cutter profesional PIE-002 | 800 | — | 800 × 0,45 | **$360** | **$360** | **$360** |
| Cepillo de alambre PIE-003 | 1200 | — | 1200 × 0,45 | **$540** | **$540** | **$540** |

Antes: Card $1.200 vs carrito $675 en PIE-001. **Corregido.**

---

## ProductCard “ya agregado”

Sin rediseño. Si el SKU está en el store: botón verde **✓ En carrito**. Tras agregar: **✓ Agregado** ~2 s. Se puede volver a agregar (incrementa cantidad).

Badge Oferta usa `isOffer`.

---

## `/revisar-pedido`

Página completa, no wizard. Lista expandida: imagen, nombre, SKU, unitario, qty editable, subtotal, eliminar. Resumen productos/unidades/total.

**No hay:** pasos, timeline, envío, pago, observaciones, datos fiscales.

Protección: visitante → `/login`.

Vacío: “Tu carrito está vacío.” + **ARMAR PEDIDO**.

**VOLVER A ARMAR PEDIDO** → `/buscar` conservando el store.

---

## Confirmación mock

Al **CONFIRMAR PEDIDO**:

1. Se guarda el resumen actual en state del componente.
2. Número `PED-` + 6 dígitos aleatorios (`generateOrderNumber`).
3. `clearCart()`.
4. Pantalla de éxito con número, productos, unidades y total **del resumen guardado** (no $0).

No hay request, mail, archivo ni orderStore. Refrescar después de confirmar muestra carrito vacío (esperado).

---

## Admin mínimo

- **Rubros:** se quitó el filtro “por marca”. El form nunca tuvo marca dueña. Rubros globales.
- **Productos:** selector de Subrubro según Rubro; checks Oferta y Destacado. Se eliminaron campos inválidos `shortDescription` / `ean`.
- **Banners:** sin cambio de modelo; sigue siendo la fuente de Home.

No se creó Admin Pedidos ni ABM de subrubros.

---

## CartDrawer

Archivo conservado, **sin importadores**. Header Carrito → `/revisar-pedido`.

---

## Validaciones

Login demo → Mi Cuenta → Armar Pedido vacío 3 columnas, sin overlay. Minimizar/restaurar. 3 SKUs, precios coherentes. Filtro ofertas conserva carrito. Detalle agrega al mismo store. Header Carrito abre Revisar. Editar qty se refleja al volver. Confirmar PED-781379, total $4.500, carrito vacío. Público: PRODUCTOS, sin columna, `/revisar-pedido` → login. Admin Rubros/Productos/Banners OK.

---

## Screenshots

`docs/fase-5-ejecucion/screenshots-etapa-4/`

| Archivo | Qué |
|---|---|
| `01-armar-pedido-vacio.png` | 3 columnas, carrito vacío |
| `02-armar-pedido-con-productos.png` | 3 SKUs en el panel |
| `03-carrito-minimizado.png` | Indicador + Mostrar carrito |
| `04-armar-pedido-ofertas.png` | `offer=1` + carrito |
| `05-revisar-pedido.png` | Resumen expandido |
| `06-revisar-pedido-editado.png` | Cantidad cambiada |
| `07-pedido-confirmado.png` | PED-XXXXXX |
| `08-admin-rubros.png` | Rubros globales |
| `09-admin-producto.png` | Subrubro / Oferta / Destacado |

---

## TypeScript / ESLint / Vite

| | Etapa 3 | Etapa 4 |
|---|---|---|
| tsc | 9 | **3** |
| eslint | 7 | **5** |
| Vite build | OK | **OK** |

Nuevos de esta etapa: **0**.

Se fueron al tocar archivos de alcance: `AdminProductos` (shortDescription/ean/productCategory), `clientStore` unused `CartItem`.

Quedan clase B / Favoritos (no tocado a propósito): `OfferProductCard` shortDescription (2), `Favoritos` navigate unused. ESLint: CatalogCarousel hooks, Favoritos, adminStore `_`, auth `any`.

---

## Pendiente para Etapa 5 (no bloquea esta etapa)

- Limpieza cosmética: `CartDrawer` y `CatalogCarousel` huérfanos.
- Header cliente sigue denso con muchas opciones.
- Admin sigue mostrando el Header público encima del panel (preexistente).
- Imágenes Unsplash en mocks (deuda de datos, no de flujo).

Nada de eso es el flujo de compra.
