# Etapa 5 — Armar Pedido y carrito columna

---

## OBJETIVO

En desktop, cliente en `/buscar` ve **Filtros | Productos | Carrito abierto a la derecha**. El carrito **no** es overlay: no oscurece, no bloquea scroll, es minimizable. Misma persistencia `clientStore` + cantidades/totales. Visitante no ve la columna.

**Navegable sin 404:** esta etapa **no** crea ni cablea `/revisar-pedido`. El CTA final conserva el comportamiento previo (hoy: “Finalizar compra” **inerte**) o queda visual (label “Revisar pedido”) **sin cambiar destino**. Etapa 6 se ejecuta **en la misma tanda** y ahí se crea la ruta y se conectan los botones. `checkpoint-carrito` debe poder entregarse solo **sin** romper la demo.

---

## PRECONDICIONES

- Etapa 2: `/buscar` ya es Productos / Armar Pedido (título).
- `clientStore`: `getCart`, `addToCart`, `updateCartItemQuantity`, `removeFromCart`, `clearCart`, `getCartItemCount` — **no reemplazar**.

---

## ARCHIVOS A MODIFICAR

| Path | Qué |
|---|---|
| `src/pages/Buscar.tsx` | Si `getAuth().isClient`: layout 3 columnas en `lg+`. Columna derecha = panel carrito `defaultOpen`. Al minimizar, la grilla gana `flex-1`. |
| `src/components/CartDrawer.tsx` | **Mínimo cambio, no refactor general.** Agregar `variant?: 'overlay' \| 'column'`. Default `'overlay'` (Header sigue usándolo hasta Etapa 6). `'column'`: **sin** portal, **sin** overlay `bg-black/40`, **sin** `document.body.style.overflow = hidden'`, **sin** `fixed` fullscreen. Es un `aside` en el flujo. Reutilizar `cartContent` interno (líneas, qty, vaciar, totales). Botón que hoy dice “Finalizar compra” → label **“Revisar pedido”** (visual). **NO** `navigate('/revisar-pedido')` acá: la ruta no existe. El CTA conserva el comportamiento previo (botón **sin** `onClick`) o queda visual sin destino nuevo. **Etapa 6 (misma tanda)** crea la página y cablea este botón + Header Carrito. |
| `src/components/ProductCard.tsx` | **No rediseñar.** Solo si el badge aún mira `priceOffer` en vez de `isProductOnOffer` (debería estar ok desde Etapa 1). |

`src/pages/Producto.tsx` — **ADAPTAR mínimo** para que el cliente pueda qty + `addToCart` + favorito real. Si se deja para Etapa 5, la ficha deja de contradecir Armar Pedido. Alcance: botones que hoy están inertes. **No** rediseñar galería.

---

## ARCHIVOS NUEVOS

Evitar un tercer carrito. Preferir `variant` en `CartDrawer`.

Si el JSX overlay vs column pelea demasiado: extraer **solo** la lista+totales a `src/components/CartLines.tsx` (presentacional) y que overlay/column/Revisar la usen. **No** extraer si `variant` alcanza. Decisión: intentar `variant` primero; extraer `CartLines` **solo** si CartDrawer supera el lío de `createPortal`.

---

## ARCHIVOS INTACTOS

- `src/store/clientStore.ts` — **NO reemplazar**. No agregar `orders`.
- `src/types/client.ts`
- Totales: **misma línea = mismo importe** que la Card y (luego) Revisar Pedido. Hoy Card muestra `priceOffer` o `priceList` **sin** `discountRate`; el drawer usa `priceList * (1 - discountRate)` e ignora `priceOffer`. Etapa 0 solo **registró** eso. En E5–E6 hay que dejar el importe **coherente** entre card y columna (elegir/unificar fórmula al implementar; no dejar dos números distintos para la misma línea). **No** abrir módulo de listas.
- Header: drawer overlay sigue hasta Etapa 6. **No** cambiar su destino en esta etapa.
- Tailwind / Router engine.
- Mobile: el `lg:hidden` de filtros **se conserva**. En viewport chico **no** se exige la 3ª columna (FUERA DE ALCANCE). No introducir bottom-sheet.

---

## CAMBIOS DE MODELO

Ninguno. `CartItem` sigue `{ productId, quantity }`.

---

## RUTAS

Sigue `/buscar`. No `/armar-pedido`. **No** crear `/revisar-pedido` aquí.

Botón del panel: **sin destino nuevo**. Se cablea en Etapa 6 (misma tanda).

---

## VISUAL

### Imagen 7 — Armar Pedido

```
┌────────────┬─────────────────────┬──────────────┐
│  Filtros   │     Productos       │   Carrito    │
│  (izq.)    │     grilla          │  ABIERTTO    │
│            │     chips           │  DEFAULT     │
│            │     paginación      │  minimizable │
└────────────┴─────────────────────┴──────────────┘
```

- **Requisito de layout:** tres columnas desktop; carrito es columna, no modal.
- **Conservar de producción:** `ProductCard` (precio, qty, agregar, ✓ Agregado, favorito, ver detalles). Sidebar filtros de la maqueta. Colores del sitio.
- **No copiar** de una imagen IA: header, paleta, look “Shopify”.
- Minimizar: la columna se pliega a un rail angosto o un botón “Mostrar carrito”; **no** overlay al restaurar.
- Default **abierto** al entrar. No recordar collapsed en localStorage (no pedido).

Lógica vs UI overlay (`CartDrawer` actual):

| Qué | Es | En columna |
|---|---|---|
| Leer/escribir `clientStore` | Lógica | Igual |
| Totales + discountRate | Lógica | Igual |
| Portal `document.body` | UI overlay | **No** |
| `bg-black/40` + blur | UI overlay | **No** |
| `overflow: hidden` body | UI overlay | **No** |
| `fixed right-0 z-[9999]` | UI overlay | **No** (`sticky` top o flujo) |
| Expandir a `w-full` | UI overlay | Reemplazado por minimizar columna |
| Líneas imagen/qty/eliminar | UI lista | Sí |
| Vaciar | Lógica | Sí |
| Finalizar inerte | UI | Label “Revisar pedido”; **sigue sin navegar** hasta E6 |

---

## REUTILIZADOS

- Todo `clientStore` de carrito
- Cálculo de totales del drawer
- `getProducts()` para resolver líneas
- `ProductCard.addToCart`

---

## RIESGO

**ALTO** en layout: `CartDrawer` está acoplado a portal + lock scroll. Un `variant` mal hecho puede lockear el scroll de Armar Pedido (exactamente lo prohibido) o duplicar dos carritos (columna + overlay del header). Mitigación: en `/buscar` logueado **no** abrir el overlay; el Header todavía puede abrirlo desde otras páginas. En Armar Pedido, si el usuario abre Header Carrito, vería overlay **encima** de la columna (feo). **Aceptable hasta Etapa 6** (misma tanda). Opcional mínimo: en `Header`, si `location.pathname === '/buscar' && isClient`, el botón Carrito no abre overlay (no-op o scroll al panel). Eso es un if de 3 líneas. **Recomendado** para no tener dos carritos en la misma pantalla.

Riesgo extra: cablear `/revisar-pedido` acá → **404**. Mitigación: **no cablear**. El checkpoint de esta etapa es navegable.

---

## REGRESIONES

- Visitante `/buscar`: 2 columnas, sin carrito.
- Agregar desde card actualiza la columna **y** el badge del header (`getCartItemCount` = líneas).
- Favoritos intactos.
- Descuento % visible como hoy.
- Mobile `/buscar`: filtros colapsables + grilla; **no** exigir columna.

---

## VALIDACIÓN MANUAL

1. Cliente → Armar Pedido: carrito visible a la derecha **sin** fondo oscuro. Se puede scrollear la grilla.
2. Minimizar / restaurar. Grilla se ensancha.
3. Agregar producto → aparece en la columna. Qty +/−, eliminar, vaciar.
4. Visitante: no hay columna.
5. Header badge = número de líneas.
6. Click “Revisar pedido” / CTA final: **no 404**. No navega a ruta inexistente. Tras Etapa 6 (misma tanda) sí va a `/revisar-pedido`.
7. Importe de una línea en la columna **coincide** con el de la Card (misma qty). Si hace falta unificar fórmula, hacerlo acá o en E6; no dejar dos números.
8. Ficha `/producto/:id` cliente: puede agregar (si se incluyó el mínimo).
9. Viewport &lt; `lg`: no se rompe el menú; no se implementa trío mobile.

---

## CRITERIOS DE ACEPTACIÓN

- [ ] Desktop cliente: 3 columnas, carrito abierto default.
- [ ] No overlay / no lock scroll en Armar Pedido.
- [ ] Minimizable.
- [ ] Un store.
- [ ] Visitante sin columna.
- [ ] Mobile no destruido y no “resuelto” como proyecto.
- [ ] CTA final **sin** destino `/revisar-pedido`. Cero 404.
- [ ] Importe de línea coherente con la Card.

---

## NO HACER EN ESTA ETAPA

- No wizard.
- No persistir pedido.
- No reemplazar `clientStore`.
- No rediseñar ProductCard.
- No carrito en el Home.
- No bottom sheet.
- No crear `/revisar-pedido` ni `navigate` a esa ruta.
- No cambiar la fórmula “de gusto” más allá de dejar Card y columna coherentes.

Checkpoint: `checkpoint-carrito`.
